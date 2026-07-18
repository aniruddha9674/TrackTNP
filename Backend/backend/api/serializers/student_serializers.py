from rest_framework import serializers
from api.models import Internship, Certification


class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = [
            'id',
            'student',
            'company_name',
            'company_type',
            'stipend',
            'start_date',
            'end_date',
            'offer_letter',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'student', 'created_at', 'updated_at']

    def validate(self, data):
        start = data.get('start_date') or getattr(self.instance, 'start_date', None)
        end = data.get('end_date') or getattr(self.instance, 'end_date', None)
        if start and end and end < start:
            raise serializers.ValidationError("end_date cannot be before start_date.")
        return data
    

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = [
            'id', 'student', 'certification_name', 'platform',
            'duration', 'certificate_file', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'student', 'created_at', 'updated_at']

    def validate_duration(self, value):
        if value <= 0:
            raise serializers.ValidationError("Duration must be greater than 0.")
        return value