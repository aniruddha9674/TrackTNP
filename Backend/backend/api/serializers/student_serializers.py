from rest_framework import serializers
from api.models import Internship, Certification, OfferLetter,Project


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
    
class OfferLetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferLetter
        fields = [
            'id', 'student', 'company', 'company_name', 'company_type',
            'offer_type', 'package_value', 'status',
            'offer_letter_file', 'joining_letter_file',
            'joining_date', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'student', 'created_at', 'updated_at']

    def validate_package_value(self, value):
        if value <= 0:
            raise serializers.ValidationError("Package value must be greater than 0.")
        return value

    def validate(self, data):
        status = data.get('status') or getattr(self.instance, 'status', 'offer')
        joining_letter = data.get('joining_letter_file') or getattr(self.instance, 'joining_letter_file', None)
        if status == 'final' and not joining_letter:
            raise serializers.ValidationError(
                {"joining_letter_file": "Joining letter is required for a final offer."}
            )
        return data
    
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'student', 'project_title', 'technologies',
            'group_members', 'description', 'project_link',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'student', 'created_at', 'updated_at']

    def validate_group_members(self, value):
        if value <= 0:
            raise serializers.ValidationError("Group members must be greater than 0.")
        return value

    def validate_description(self, value):
        if len(value.strip()) < 20:
            raise serializers.ValidationError("Description must be at least 20 characters.")
        return value