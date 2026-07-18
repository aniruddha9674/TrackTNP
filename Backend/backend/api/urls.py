from rest_framework.routers import DefaultRouter
from django.urls import path, include
from api.views import InternshipViewSet, CertificationViewSet

router = DefaultRouter()
router.register(r'internships', InternshipViewSet, basename='internship')
router.register(r'certifications', CertificationViewSet, basename='certification')

urlpatterns = [
    path('', include(router.urls)),
]