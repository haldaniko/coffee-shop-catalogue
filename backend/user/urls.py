from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView)

from user.views import (
    CreateUserView,
    ManageUserView,
    ChangePasswordView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    AddFavoriteShopView,
    RemoveFavoriteShopView,
    ListFavoriteShopsView
)

app_name = "user"

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="create"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path("me/", ManageUserView.as_view(), name="manage"),
    path("me/change-password/", ChangePasswordView.as_view(), name="change_password"),
    path('me/favorites/add/<int:shop_id>/', AddFavoriteShopView.as_view(), name='add_favorite'),
    path('me/favorites/remove/<int:shop_id>/', RemoveFavoriteShopView.as_view(), name='remove_favorite'),
    path('me/favorites/', ListFavoriteShopsView.as_view(), name='list_favorites'),
]
