from django.db.models import Avg, Q, Count
from django.utils.timezone import now
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

        # Query parameters from the request
        city = self.request.query_params.get("city")
        name = self.request.query_params.get("name")
        address = self.request.query_params.get("address")
        district = self.request.query_params.get("district")
        with_owner = self.request.query_params.get("with_owner")
        tags = self.request.query_params.get("tags")
        is_network = self.request.query_params.get("is_network")
        min_rating = self.request.query_params.get("min_rating")
        max_rating = self.request.query_params.get("max_rating")
        pricing_rate = self.request.query_params.get("pricing_rate")
        hours_from = self.request.query_params.get("hours_from")
        hours_to = self.request.query_params.get("hours_to")

        # Filtering by city
        if city:
            queryset = queryset.filter(address__city__icontains=city)

        # Filtering by name
        if name:
            queryset = queryset.filter(name__icontains=name)

        # Filtering by address
        if address:
            queryset = queryset.filter(address__street__icontains=address)

        # Filtering by district
        if district:
            queryset = queryset.filter(address__district__icontains=district)

        # Filtering by whether the shop belongs to a network
        if is_network is not None:
            is_network_bool = is_network.lower() == 'true'
            queryset = queryset.filter(is_network=is_network_bool)

        # Filtering by owner presence
        if with_owner is not None:
            has_owner = with_owner.lower() == "true"
            queryset = queryset.filter(owner__isnull=not has_owner)

        # Filtering by tags (ManyToMany relation)
        if tags:
            tags_list = tags.split(',')
            for tag in tags_list:
                queryset = queryset.filter(tags__name__icontains=tag)

        # Filtering by pricing policy (1, 2, 3)
        if pricing_rate:
            pricing_rate_list = pricing_rate.split(',')
            queryset = queryset.filter(price_rate__in=pricing_rate_list)

        # Annotate the queryset with average rating and review count
        queryset = queryset.annotate(
            average_rating=Avg('review__stars'),
            evaluations_count=Count('review')
        )

        # Filtering by rating
        if min_rating is not None or max_rating is not None:
            queryset = queryset.annotate(average_rating=Avg('review__stars'))

            rating_filter = Q()
            if min_rating is not None:
                rating_filter &= Q(average_rating__gte=int(min_rating))
            if max_rating is not None:
                rating_filter &= Q(average_rating__lte=int(max_rating))

            queryset = queryset.filter(rating_filter)

        # Filtering by current day's working hours
        if hours_from is not None or hours_to is not None:
            current_day = now().strftime('%a').lower()[:3]
            filters = Q()
            if hours_from is not None:
                filters &= Q(**{f"work_time__{current_day}_open__lte": hours_from})
            if hours_to is not None:
                filters &= Q(**{f"work_time__{current_day}_close__gte": hours_to})

            queryset = queryset.filter(filters)

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
                description='Фільтрація за назвою міста.'
            ),
            OpenApiParameter(
                name='name', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Фільтрація за назвою кав\'ярні.'
            ),
            OpenApiParameter(
                name='address', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Фільтрація за вулицею (адресою).'
            ),
            OpenApiParameter(
                name='district', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Фільтрація за районом.'
            ),
            OpenApiParameter(
                name='with_owner', type=OpenApiTypes.BOOL, location=OpenApiParameter.QUERY,
                description='Фільтрація за наявністю власника (true або false).'
            ),
            OpenApiParameter(
                name='tags', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Фільтрація за тегами (надається список тегів, розділений комами).'
            ),
            OpenApiParameter(
                name='is_network', type=OpenApiTypes.BOOL, location=OpenApiParameter.QUERY,
                description='Фільтрація за належністю до мережі (true або false).'
            ),
            OpenApiParameter(
                name='pricing_rate', type=OpenApiTypes.INT, location=OpenApiParameter.QUERY,
                description='Фільтрація за ціновою політикою (1, 2, 3).'
            ),
            OpenApiParameter(
                name='min_rating', type=OpenApiTypes.INT, location=OpenApiParameter.QUERY,
                description='Фільтрація за мінімальним середнім рейтингом.'
            ),
            OpenApiParameter(
                name='max_rating', type=OpenApiTypes.INT, location=OpenApiParameter.QUERY,
                description='Фільтрація за максимальним середнім рейтингом.'
            ),
            OpenApiParameter(
                name='hours_from', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Фільтр за годинами роботи. Вкажіть час, з(!) '
                            'якого кав\'ярня має бути відкритою (формат: HH:MM).'
            ),
            OpenApiParameter(
                name='hours_to', type=OpenApiTypes.STR, location=OpenApiParameter.QUERY,
                description='Фільтр за годинами роботи. Вкажіть час, до(!) '
                            'якого кав\'ярня має бути відкритою (формат: HH:MM).'
            )
        ],
        responses={
            200: OpenApiResponse(
                description="Список кав'ярень, що відповідають параметрам запиту",
                response=CoffeeShopListSerializer
            ),
        },
        description=(
                "Отримати список кав'ярень з необов'язковими фільтрами. Ви можете фільтрувати за містом, "
                "назвою, адресою, районом, типом, наявністю власника, тегами та рейтингом. Результати "
                "включають додаткові дані, такі як середній рейтинг та загальна кількість оцінок."
        ),
        tags=["Кав'ярні"]
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
