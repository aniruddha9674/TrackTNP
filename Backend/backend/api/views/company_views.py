from django.db.models import Sum
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.models import Company, CompanyFile

from api.serializers import (
    CompanySerializer,
    CompanyListSerializer,
    CompanyFileSerializer,
    DashboardStatsSerializer,
)


class CompanyViewSet(viewsets.ModelViewSet):

    queryset = Company.objects.all().order_by("-date")
    serializer_class = CompanySerializer

    # -------------------------------------
    # Select Serializer
    # -------------------------------------

    def get_serializer_class(self):

        if self.action == "list":
            return CompanyListSerializer

        return CompanySerializer

    # -------------------------------------
    # Dashboard Statistics
    # -------------------------------------

    @action(
        detail=False,
        methods=["get"],
        url_path="dashboard-stats",
    )
    def dashboard_stats(self, request):

        queryset = self.get_queryset()

        total = queryset.count()

        open_drives = queryset.filter(
            registration_status="open"
        ).count()

        completed = queryset.filter(
            drive_completed=True
        ).count()

        total_placements = (
            queryset.aggregate(
                total=Sum("total_selected")
            )["total"]
            or 0
        )

        data = {
            "total": total,
            "open_drives": open_drives,
            "completed": completed,
            "total_placements": total_placements,
        }

        serializer = DashboardStatsSerializer(data)

        return Response(serializer.data)

    # -------------------------------------
    # Upload Multiple Files
    # -------------------------------------

    @action(
        detail=True,
        methods=["post"],
        url_path="upload-file",
    )
    def upload_file(self, request, pk=None):

        company = self.get_object()

        files = request.FILES.getlist("files")

        if not files:
            return Response(
                {
                    "error": "No files were provided."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        uploaded_files = []

        for file in files:

            obj = CompanyFile.objects.create(
                company=company,
                file=file,
            )

            uploaded_files.append(obj)

        serializer = CompanyFileSerializer(
            uploaded_files,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )

    # -------------------------------------
    # Delete File
    # -------------------------------------

    @action(
        detail=True,
        methods=["delete"],
        url_path=r"delete-file/(?P<file_id>[^/.]+)",
    )
    def delete_file(
        self,
        request,
        pk=None,
        file_id=None
    ):

        company = self.get_object()

        try:

            file = company.files.get(
                id=file_id
            )

            file.delete()

            return Response(
                {
                    "message":
                    "File deleted successfully."
                }
            )

        except CompanyFile.DoesNotExist:

            return Response(
                {
                    "error":
                    "File not found."
                },
                status=status.HTTP_404_NOT_FOUND,
            )