from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CoffeeShopViewSet, CityStatsListView, IndexCoffeeShopListView, LikeReview, DislikeReview

router = DefaultRouter()
router.register(r'coffeeshops', CoffeeShopViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('city-stats/', CityStatsListView.as_view(), name='city-stats-list'),
    path('index-coffee-shops/', IndexCoffeeShopListView.as_view(), name='coffee-shops-list'),
    path('reviews/<int:pk>/like/', LikeReview.as_view(), name='like-review'),
    path('reviews/<int:pk>/dislike/', DislikeReview.as_view(), name='dislike-review'),
]

app_name = "website"
