from rest_framework.routers import DefaultRouter
from django.urls import path, include
from api.views import InternshipViewSet

router = DefaultRouter()
router.register(r'internships', InternshipViewSet, basename='internship')

urlpatterns = [
    path('', include(router.urls)),
]