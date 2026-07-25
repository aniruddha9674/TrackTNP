from rest_framework.routers import DefaultRouter
from django.urls import path, include

from api.views import (
    InternshipViewSet,
    CertificationViewSet,
    OfferLetterViewSet,
    CompanyViewSet,
)

router = DefaultRouter()

router.register(
    r'internships',
    InternshipViewSet,
    basename='internship'
)

router.register(
    r'certifications',
    CertificationViewSet,
    basename='certification'
)

router.register(
    r'offer-letters',
    OfferLetterViewSet,
    basename='offerletter'
)

router.register(
    r'companies',
    CompanyViewSet,
    basename='company'
)

urlpatterns = [
    path('', include(router.urls)),
]