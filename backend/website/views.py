from django.db.models import Avg, Q, Count
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    CoffeeShop, City, Review
)
from .permissions import IsAdminOrReadOnly
from .serializers import (
    CoffeeShopSerializer,
    CoffeeShopDetailSerializer,
    CityStatsSerializer,
    IndexCoffeeShopSerializer, CoffeeShopListSerializer,
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
        district = self.request.query_params.get("district")
        with_owner = self.request.query_params.get("with_owner")
        tags = self.request.query_params.get("tags")
        is_network = self.request.query_params.get("is_network")
        min_rating = self.request.query_params.get("min_rating")
        max_rating = self.request.query_params.get("max_rating")

        if city:
            queryset = queryset.filter(address__city__icontains=city)
        if name:
            queryset = queryset.filter(name__icontains=name)
        if address:
            queryset = queryset.filter(address__street__icontains=address)
        if district:
            queryset = queryset.filter(address__district__icontains=district)

        if is_network is not None:
            is_network_bool = is_network.lower() == 'true'
            queryset = queryset.filter(is_network=is_network_bool)
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
            return CoffeeShopListSerializer

        if self.action == "retrieve":
            return CoffeeShopDetailSerializer

        return CoffeeShopSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='city', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Filter coffee shops by city name. Case-insensitive match.'
            ),
            OpenApiParameter(
                name='name', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Filter coffee shops by name. Case-insensitive match.'
            ),
            OpenApiParameter(
                name='address', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Filter coffee shops by street address. Case-insensitive match.'
            ),
            OpenApiParameter(
                name='district', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Filter coffee shops by district. Case-insensitive match.'
            ),
            OpenApiParameter(
                name='with_owner', type=OpenApiTypes.BOOL, location=OpenApiParameter.QUERY,
                description='Filter by whether the coffee shop has an owner (true or false).'
            ),
            OpenApiParameter(
                name='tags', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Filter by tags. Provide a comma-separated list of tags.'
            ),
            OpenApiParameter(
                name='type', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Filter by type of coffee shop.'
            ),
            OpenApiParameter(
                name='min_rating', type=OpenApiTypes.INT, location=OpenApiParameter.QUERY,
                description='Filter by minimum average rating (integer value).'
            ),
            OpenApiParameter(
                name='max_rating', type=OpenApiTypes.INT, location=OpenApiParameter.QUERY,
                description='Filter by maximum average rating (integer value).'
            )
        ],
        responses={
            200: OpenApiResponse(
                description='A list of coffee shops matching the query parameters',
                response=CoffeeShopListSerializer
            ),
        },
        description=(
            "Retrieve a list of coffee shops with optional filters. You can filter by city, name, address, "
            "district, type, owner presence, tags, and rating. Results include additional data such as average rating "
            "and total number of evaluations."
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


class LikeReview(APIView):
    def post(self, request, pk):
        review = Review.objects.get(pk=pk)
        if request.user in review.likes.all():
            review.likes.remove(request.user)
        else:
            review.likes.add(request.user)
            review.dislikes.remove(request.user)
        return Response(
            {'total_likes': review.total_likes(), 'total_dislikes': review.total_dislikes()},
            status=status.HTTP_200_OK)


class DislikeReview(APIView):
    def post(self, request, pk):
        review = Review.objects.get(pk=pk)
        if request.user in review.dislikes.all():
            review.dislikes.remove(request.user)
        else:
            review.dislikes.add(request.user)
            review.likes.remove(request.user)
        return Response(
            {'total_likes': review.total_likes(), 'total_dislikes': review.total_dislikes()},
            status=status.HTTP_200_OK)
