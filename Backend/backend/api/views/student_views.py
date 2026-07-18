from rest_framework import viewsets, permissions
from api.models import Internship, Student, Certification, OfferLetter
from api.serializers import InternshipSerializer, CertificationSerializer, OfferLetterSerializer

# ---------------------------------------------------------------------
# TEMP DEV SWITCH — remove this whole block once real auth is wired in.
# Set to the PK of any Student row in your DB so you can test locally.
# ---------------------------------------------------------------------
DEV_HARDCODED_STUDENT_ID = 1
   

def get_current_student(request):
    """ 
    Single source of truth for 'which student is making this request'.
    TODO(auth): once JWT auth is live, replace this function's body with:

        return Student.objects.get(user=request.user)

    Nothing else in this file needs to change.
    """
    return Student.objects.get(pk=DEV_HARDCODED_STUDENT_ID)


class InternshipViewSet(viewsets.ModelViewSet):
    serializer_class = InternshipSerializer
    permission_classes = [permissions.AllowAny]  # TODO(auth): swap to IsAuthenticated

    def get_queryset(self):
        student = get_current_student(self.request)
        return Internship.objects.filter(student=student)

    def perform_create(self, serializer):
        student = get_current_student(self.request)
        serializer.save(student=student)



class CertificationViewSet(viewsets.ModelViewSet):
    serializer_class = CertificationSerializer
    permission_classes = [permissions.AllowAny]  # TODO(auth): IsAuthenticated

    def get_queryset(self):
        student = get_current_student(self.request)
        return Certification.objects.filter(student=student)

    def perform_create(self, serializer):
        student = get_current_student(self.request)
        serializer.save(student=student)

class OfferLetterViewSet(viewsets.ModelViewSet):
    serializer_class = OfferLetterSerializer
    permission_classes = [permissions.AllowAny]  # TODO(auth): IsAuthenticated

    def get_queryset(self):
        return OfferLetter.objects.filter(student=get_current_student(self.request))

    def perform_create(self, serializer):
        serializer.save(student=get_current_student(self.request))