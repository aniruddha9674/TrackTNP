from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models import Volunteer, Staff

User = get_user_model()


class VolunteerSerializer(serializers.ModelSerializer):
    # Fields pulled from the related User, not stored on Volunteer itself
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    phone_number = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, required=False)

    # Read-only display fields, sourced from the linked user
    volunteer_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_phone_number = serializers.CharField(source='user.phone_number', read_only=True)

    class Meta:
        model = Volunteer
        fields = [
            'id',
            'first_name', 'last_name', 'email', 'phone_number', 'password',
            'volunteer_name', 'user_email', 'user_phone_number',
            'drive', 'drive_name', 'drive_span_days',
            'is_profile_complete', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'is_profile_complete', 'created_at', 'updated_at']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
 
    def validate_drive_span_days(self, value):
        if value is not None and value <= 0:
            raise serializers.ValidationError("Drive span must be greater than 0.")
        return value

    def create(self, validated_data):
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        email = validated_data.pop('email')
        phone_number = validated_data.pop('phone_number')
        password = validated_data.pop('password', None)

        user = User(
            username=email,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
            role='volunteer',
        )
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()  # volunteer sets password later, e.g. via "set password" email link
        user.save()

        volunteer = Volunteer.objects.create(user=user, **validated_data)
        return volunteer


class StaffSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    phone_number = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, required=False)

    staff_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_phone_number = serializers.CharField(source='user.phone_number', read_only=True)
    college_name = serializers.CharField(source='college.name', read_only=True)

    class Meta:
        model = Staff
        fields = [
            'id',
            'first_name', 'last_name', 'email', 'phone_number', 'password',
            'staff_name', 'user_email', 'user_phone_number',
            'college', 'college_name', 'department', 'role', 'status',
            'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        email = validated_data.pop('email')
        phone_number = validated_data.pop('phone_number')
        password = validated_data.pop('password', None)
        role = validated_data.get('role')

        user = User(
            username=email,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
            role=role,  # keep User.role in sync with Staff.role
        )
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()

        staff = Staff.objects.create(user=user, **validated_data)
        return staff