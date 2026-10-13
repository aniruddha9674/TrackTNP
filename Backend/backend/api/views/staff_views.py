from rest_framework import viewsets, permissions
from api.models import Volunteer, Staff
from api.serializers import VolunteerSerializer, StaffSerializer


class VolunteerViewSet(viewsets.ModelViewSet):
    """
    Admin-facing CRUD for volunteers.
    TODO(auth): once JWT auth is live, swap permission_classes to
    IsAuthenticated + a custom IsAdmin check (role == 'admin' on request.user).
    """
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer
    permission_classes = [permissions.AllowAny]  # TODO(auth): IsAdminUser / custom IsAdmin


class StaffViewSet(viewsets.ModelViewSet):
    """
    Admin-facing CRUD for staff (college/department coordinators).
    TODO(auth): swap permission_classes to IsAuthenticated + IsAdmin.
    """
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [permissions.AllowAny]  # TODO(auth)