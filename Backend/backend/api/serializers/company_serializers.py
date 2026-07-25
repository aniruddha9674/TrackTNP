from rest_framework import serializers
from api.models import Company, CompanyFile


class CompanyFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyFile
        fields = [
            "id",
            "file",
            "uploaded_at",
        ]
        read_only_fields = [
            "id",
            "uploaded_at",
        ]


class CompanySerializer(serializers.ModelSerializer):
    """
    Full serializer used by CompanyManager.jsx.
    Files are uploaded separately through:
        /companies/<id>/upload-file/
    """

    files = CompanyFileSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Company
        fields = "__all__"
        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def validate(self, attrs):
        """
        Validation for:
        1. Registration end date.
        2. Negative integer values.
        """

        # Handles both CREATE and UPDATE operations.
        date = attrs.get(
            "date",
            getattr(self.instance, "date", None)
        )

        reg_end_date = attrs.get(
            "reg_end_date",
            getattr(self.instance, "reg_end_date", None)
        )

        # Registration date validation.
        if date and reg_end_date:
            if reg_end_date < date:
                raise serializers.ValidationError(
                    {
                        "reg_end_date":
                        "Registration end date cannot be before the drive date."
                    }
                )

        # Fields which should never be negative.
        integer_fields = [
            "job_openings",

            "total_registered",
            "candidates_present",

            "pccoe_present",
            "pccoer_present",
            "nmiet_present",
            "ncer_present",

            "total_selected",
            "total_selected_pccoe",
            "total_selected_pccoer",
            "total_selected_nmiet",
            "total_selected_ncer",

            "total_internship_selected",
            "total_internship_selected_pccoe",
            "total_internship_selected_pccoer",
            "total_internship_selected_nmiet",
            "total_internship_selected_ncer",
        ]

        for field in integer_fields:

            value = attrs.get(
                field,
                getattr(self.instance, field, None)
            )

            # Ignore empty values.
            if value is None:
                continue

            if value < 0:
                raise serializers.ValidationError(
                    {
                        field:
                        "Value cannot be negative."
                    }
                )

        return attrs


class CompanyListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer used for:
    - Recent Drives
    - Company Cards
    - Dashboard List
    """

    class Meta:
        model = Company
        fields = [
            "id",
            "company_name",
            "job_profile",
            "date",
            "venue",
            "salary_offered",
            "total_selected",
            "registration_status",
            "drive_completed",
        ]


class DashboardStatsSerializer(serializers.Serializer):
    """
    Used for:
    - Total Companies
    - Open Registrations
    - Completed Drives
    - Total Placements
    """

    total = serializers.IntegerField()
    open_drives = serializers.IntegerField()
    completed = serializers.IntegerField()
    total_placements = serializers.IntegerField()