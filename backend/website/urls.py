from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CoffeeShopViewSet, CityStatsListView, IndexCoffeeShopListView

router = DefaultRouter()
router.register(r'coffeeshops', CoffeeShopViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('city-stats/', CityStatsListView.as_view(), name='city-stats-list'),
    path('index-coffee-shops/', IndexCoffeeShopListView.as_view(), name='coffee-shops-list'),
]


app_name = "website"
