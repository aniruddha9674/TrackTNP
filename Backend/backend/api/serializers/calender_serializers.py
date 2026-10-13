from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models import CalendarEvent

User = get_user_model()

class CalendarEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarEvent
        fields = [
            'id', 'title', 'description', 'event_type', 'color',
            'start_date', 'end_date', 'location', 'company',
            'target_colleges', 'target_departments', 'target_years',
            'created_by', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

    def validate(self, data):
        start = data.get('start_date') or getattr(self.instance, 'start_date', None)
        end = data.get('end_date') or getattr(self.instance, 'end_date', None)
        if start and end and end < start:
            raise serializers.ValidationError("end_date cannot be before start_date.")
        return data

    def validate_target_colleges(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("target_colleges must be a list.")
        return value

    def validate_target_departments(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("target_departments must be a list.")
        return value

    def validate_target_years(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("target_years must be a list.")
        return value