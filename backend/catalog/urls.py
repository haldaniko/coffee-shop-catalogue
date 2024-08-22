from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('website.urls'), name="website"),
    path('api/', include('user.urls'), name="user"),
]
