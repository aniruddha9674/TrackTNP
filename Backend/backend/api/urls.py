from rest_framework.routers import DefaultRouter
from django.urls import path, include

from api.views import (
    InternshipViewSet,
    CertificationViewSet,
    OfferLetterViewSet,
    CompanyViewSet,
    VolunteerViewSet,
    StaffViewSet,
    CalendarEventViewSet
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
router.register(
    r'volunteers',
    VolunteerViewSet,
    basename='volunteer'
)

router.register(
    r'staff',
    StaffViewSet,
    basename='staff'
)
router.register(r'events', CalendarEventViewSet, basename='calendarevent')

urlpatterns = [
    path('', include(router.urls)),
]