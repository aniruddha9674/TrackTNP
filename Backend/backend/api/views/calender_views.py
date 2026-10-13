from rest_framework import viewsets, permissions
from api.models import CalendarEvent
from api.serializers import CalendarEventSerializer


class CalendarEventViewSet(viewsets.ModelViewSet):
    """
    Admin-facing CRUD for calendar events.
    TODO(auth): once JWT auth is live, set created_by=request.user in perform_create,
    and swap permission_classes to IsAuthenticated.
    """
    queryset = CalendarEvent.objects.all()
    serializer_class = CalendarEventSerializer
    permission_classes = [permissions.AllowAny]  # TODO(auth)