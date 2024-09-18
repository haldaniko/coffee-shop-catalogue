from django.db.models import Avg, Q, Count
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    CoffeeShop, City
)
from .permissions import IsAdminOrReadOnly
from .serializers import (
    CoffeeShopSerializer,
    CoffeeShopDetailSerializer,
    CityStatsSerializer,
    IndexCoffeeShopSerializer,
)


class CityStatsListView(generics.ListAPIView):
    queryset = City.objects.all()
    serializer_class = CityStatsSerializer


class CoffeeShopViewSet(viewsets.ModelViewSet):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAdminOrReadOnly,)
    queryset = CoffeeShop.objects.all()
    serializer_class = CoffeeShopSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        city = self.request.query_params.get("city")
        name = self.request.query_params.get("name")
        address = self.request.query_params.get("address")
        with_owner = self.request.query_params.get("with_owner")
        tags = self.request.query_params.get("tags")
        min_rating = self.request.query_params.get("min_rating")
        max_rating = self.request.query_params.get("max_rating")

        if city:
            queryset = queryset.filter(address__city__icontains=city)
        if name:
            queryset = queryset.filter(name__icontains=name)
        if address:
            queryset = queryset.filter(address__street__icontains=address)
        if with_owner is not None:
            has_owner = with_owner.lower() == "true"
            queryset = queryset.filter(owner__isnull=not has_owner)
        if tags:
            tags_list = tags.split(',')
            for i in tags_list:
                queryset = queryset.filter(tags__name__icontains=i)

        queryset = queryset.annotate(
            average_rating=Avg('review__stars'),
            evaluations_count=Count('review')
        )

        if min_rating is not None or max_rating is not None:
            min_rating = int(min_rating) if min_rating is not None else None
            max_rating = int(max_rating) if max_rating is not None else None
            rating_filter = Q()
            if min_rating is not None:
                rating_filter &= Q(review__stars__gte=min_rating)
            if max_rating is not None:
                rating_filter &= Q(review__stars__lte=max_rating)
            queryset = queryset.annotate(
                average_rating=Avg('review__stars')
            ).filter(rating_filter)

        return queryset

    def get_serializer_class(self):
        if self.action == "list":
            return CoffeeShopSerializer

        if self.action == "retrieve":
            return CoffeeShopDetailSerializer

        return CoffeeShopSerializer

    @extend_schema(
        parameters=[
            OpenApiParameter(name='city', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                             description='Filter by city name'),
            OpenApiParameter(name='name', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                             description='Filter by coffee shop name'),
            OpenApiParameter(name='address', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                             description='Filter by street address'),
            OpenApiParameter(name='with_owner', type=OpenApiTypes.BOOL, location=OpenApiParameter.QUERY,
                             description='Filter by presence of an owner (true or false)'),
            OpenApiParameter(name='tags', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                             description='Filter by tags (comma-separated list)'),
            OpenApiParameter(name='min_rating', type=OpenApiTypes.INT, location=OpenApiParameter.QUERY,
                             description='Filter by minimum rating'),
            OpenApiParameter(name='max_rating', type=OpenApiTypes.INT, location=OpenApiParameter.QUERY,
                             description='Filter by maximum rating')
        ],
        responses={
            200: OpenApiResponse(
                description='A list of coffee shops matching the query parameters',
                response=CoffeeShopSerializer
            )
        },
        description=(
                "Retrieve a list of coffee shops with optional filtering by city, name, address, "
                "owner presence, tags, and ratings. The response includes details such as average rating "
                "and the list of coffee shops matching the given criteria."
        ),
        tags=['Coffee Shops']
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class IndexCoffeeShopListView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):

        popular_shops = CoffeeShop.objects.annotate(
            average_rating=Avg("review__stars")
        ).order_by("-average_rating")[:6]
        popular_shops_serializer = IndexCoffeeShopSerializer(popular_shops, many=True)

        recent_shops = CoffeeShop.objects.order_by('-id')[:6]
        recent_shops_serializer = IndexCoffeeShopSerializer(recent_shops, many=True)

        return Response({
            'popular': popular_shops_serializer.data,
            'recent': recent_shops_serializer.data,
        })