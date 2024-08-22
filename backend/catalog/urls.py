from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('website.urls'), name="website"),
    path('users/', include('user.urls'), name="user"),
]
