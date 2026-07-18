from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary_storage.storage import RawMediaCloudinaryStorage
# User Management
class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('college_coordinator', 'College Coordinator'),
        ('department_coordinator', 'Department Coordinator'),
        ('student', 'Student'),
        ('volunteer', 'Volunteer'),
    ]
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    phone_number = models.CharField(max_length=15, blank=True)
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    
    class Meta:
        db_table = 'users'

# College & Department
class College(models.Model):
    name = models.CharField(max_length=200, unique=True)
    code = models.CharField(max_length=20, unique=True)
    location = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'colleges'
    
    def __str__(self):
        return self.name

class Department(models.Model):
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='departments')
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'departments'
        unique_together = ['college', 'code']
    
    def __str__(self):
        return f"{self.name} - {self.college.code}"

# Staff Management
class Staff(models.Model):
    ROLE_CHOICES = [
        ('college_coordinator', 'College Coordinator'),
        ('department_coordinator', 'Department Coordinator'),
    ]
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='staff_profile')
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='staff')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True, related_name='staff')
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'staff'
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.role}"

# Student Management
class Student(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    ]
    YEAR_CHOICES = [
        ('1', 'First Year'),
        ('2', 'Second Year'),
        ('3', 'Third Year'),
        ('4', 'Fourth Year'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    prn_number = models.CharField(max_length=50, unique=True)
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name='students')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='students')
    year = models.CharField(max_length=1, choices=YEAR_CHOICES)
    
    # Personal Details
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    date_of_birth = models.DateField(null=True, blank=True)
    student_mobile = models.CharField(max_length=15)
    parent_mobile = models.CharField(max_length=15, blank=True)
    student_email = models.EmailField()
    personal_email = models.EmailField(blank=True)
    parent_email = models.EmailField(blank=True)
    linkedin = models.URLField(blank=True)
    aadhar_no = models.CharField(max_length=12, blank=True)
    pan_no = models.CharField(max_length=10, blank=True)
    passport_no = models.CharField(max_length=20, blank=True)
    
    # Address
    temporary_address = models.TextField(blank=True)
    permanent_address = models.TextField(blank=True)
    home_town = models.CharField(max_length=100, blank=True)
    home_district = models.CharField(max_length=100, blank=True)
    home_state = models.CharField(max_length=100, blank=True)
    
    # Family Details
    profession_of_father = models.CharField(max_length=200, blank=True)
    designation_of_father = models.CharField(max_length=200, blank=True)
    organization_of_working = models.CharField(max_length=200, blank=True)
    
    # Academic Info
    university_reg_no = models.CharField(max_length=50, blank=True)
    roll_no = models.CharField(max_length=50, blank=True)
    division = models.CharField(max_length=50, blank=True)
    honours = models.CharField(max_length=200, blank=True)
    live_backlogs = models.IntegerField(default=0)
    dead_backlogs = models.IntegerField(default=0)
    years_down = models.IntegerField(default=0)
    
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'students'
    
    def __str__(self):
        return f"{self.prn_number} - {self.first_name} {self.last_name}"

# Past Qualifications
class PastQualification(models.Model):
    QUALIFICATION_TYPE_CHOICES = [
        ('ssc', 'SSC'),
        ('hsc', 'HSC'),
        ('diploma', 'Diploma'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='qualifications')
    qualification_type = models.CharField(max_length=10, choices=QUALIFICATION_TYPE_CHOICES)
    board = models.CharField(max_length=200)
    passing_year = models.CharField(max_length=4)
    institution_name = models.CharField(max_length=200)
    city = models.CharField(max_length=100, blank=True)
    district = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    percentage = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'past_qualifications'
        unique_together = ['student', 'qualification_type']
    
    def __str__(self):
        return f"{self.student.prn_number} - {self.qualification_type}"

# Semester Results
class SemesterResult(models.Model):
    SEMESTER_CHOICES = [
        ('fe_sem1', 'FE Semester 1'),
        ('fe_sem2', 'FE Semester 2'),
        ('se_sem1', 'SE Semester 1'),
        ('se_sem2', 'SE Semester 2'),
        ('te_sem1', 'TE Semester 1'),
        ('te_sem2', 'TE Semester 2'),
        ('be_sem1', 'BE Semester 1'),
        ('be_sem2', 'BE Semester 2'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='semester_results')
    semester = models.CharField(max_length=10, choices=SEMESTER_CHOICES)
    sgpa = models.DecimalField(max_digits=4, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'semester_results'
        unique_together = ['student', 'semester']
    
    def __str__(self):
        return f"{self.student.prn_number} - {self.semester}: {self.sgpa}"

# Coding Platforms
class CodingPlatform(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='coding_platforms')
    platform_name = models.CharField(max_length=100)
    profile_url = models.URLField()
    rating = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'coding_platforms'
        unique_together = ['student', 'platform_name']
    
    def __str__(self):
        return f"{self.student.prn_number} - {self.platform_name}"

# Achievements
class Achievement(models.Model):
    ACHIEVEMENT_TYPE_CHOICES = [
        ('technical', 'Technical'),
        ('non_technical', 'Non-Technical'),
    ]
    
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='achievements')
    achievement_type = models.CharField(max_length=20, choices=ACHIEVEMENT_TYPE_CHOICES)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'achievements'
    
    def __str__(self):
        return f"{self.student.prn_number} - {self.achievement_type}"

# Company & Drives
class Company(models.Model):
    COMPANY_TYPE_CHOICES = [
        ('product', 'Product'),
        ('core', 'Core'),
        ('it', 'IT'),
        ('other', 'Other'),
    ]
    DRIVE_TYPE_CHOICES = [
        ('internship', 'Internship'),
        ('placement', 'Placement'),
        ('internship_ppo', 'Internship + PPO'),
    ]
    RECRUITMENT_METHOD_CHOICES = [
        ('everyone', 'Everyone'),
        ('unplaced', 'Unplaced'),
        ('placed_below', 'Placed Below XYZ Package'),
    ]
    REGISTRATION_STATUS_CHOICES = [
        ('open', 'Open'),
        ('closed', 'Closed'),
    ]
    RESUME_REQUIRED_CHOICES = [
        ('required', 'Required'),
        ('not_required', 'Not Required'),
    ]
    
    company_name = models.CharField(max_length=200)
    company_related_info = models.TextField(blank=True)
    company_type = models.CharField(max_length=20, choices=COMPANY_TYPE_CHOICES, blank=True)
    drive_type = models.CharField(max_length=20, choices=DRIVE_TYPE_CHOICES, blank=True)
    job_profile = models.CharField(max_length=200, blank=True)
    job_openings = models.IntegerField(null=True, blank=True)
    
    # Dates & Time
    date = models.DateField()
    month = models.IntegerField()
    year = models.IntegerField()
    reg_end_date = models.DateField()
    registration_time = models.TimeField()
    
    # Eligibility
    recruitment_method = models.CharField(max_length=20, choices=RECRUITMENT_METHOD_CHOICES)
    placed_below = models.CharField(max_length=50, blank=True)
    eligible_batch_years = models.JSONField(default=list)
    eligible_branches = models.JSONField(default=list)
    eligible_colleges = models.JSONField(default=list)
    ssc_criteria = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    hsc_criteria = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    cgpa_criteria = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    backlog_criteria = models.CharField(max_length=200, blank=True)
    
    # Compensation
    salary_offered = models.CharField(max_length=100, blank=True)
    internship_stipend = models.CharField(max_length=100, blank=True)
    company_bond = models.CharField(max_length=200, blank=True)
    venue = models.CharField(max_length=200, blank=True)
    
    # Participation Data
    total_registered = models.IntegerField(default=0)
    candidates_present = models.IntegerField(default=0)
    pccoe_present = models.IntegerField(default=0)
    pccoer_present = models.IntegerField(default=0)
    nmiet_present = models.IntegerField(default=0)
    ncer_present = models.IntegerField(default=0)
    
    # Selection Results
    total_selected = models.IntegerField(default=0)
    total_selected_pccoe = models.IntegerField(default=0)
    total_selected_pccoer = models.IntegerField(default=0)
    total_selected_nmiet = models.IntegerField(default=0)
    total_selected_ncer = models.IntegerField(default=0)
    
    # Branch-wise Selection (PCCOE)
    pccoe_computer_selected = models.IntegerField(default=0)
    pccoe_aiml_selected = models.IntegerField(default=0)
    pccoe_computer_regional_selected = models.IntegerField(default=0)
    pccoe_it_selected = models.IntegerField(default=0)
    pccoe_entc_selected = models.IntegerField(default=0)
    pccoe_mechanical_selected = models.IntegerField(default=0)
    pccoe_civil_selected = models.IntegerField(default=0)
    
    # Branch-wise Selection (PCCOER)
    pccoer_computer_selected = models.IntegerField(default=0)
    pccoer_it_selected = models.IntegerField(default=0)
    pccoer_entc_selected = models.IntegerField(default=0)
    pccoer_mechanical_selected = models.IntegerField(default=0)
    pccoer_civil_selected = models.IntegerField(default=0)
    
    # Branch-wise Selection (NMIET)
    nmiet_computer_selected = models.IntegerField(default=0)
    nmiet_it_selected = models.IntegerField(default=0)
    nmiet_entc_selected = models.IntegerField(default=0)
    nmiet_mechanical_selected = models.IntegerField(default=0)
    
    # Branch-wise Selection (NCER)
    ncer_computer_selected = models.IntegerField(default=0)
    ncer_aiml_selected = models.IntegerField(default=0)
    ncer_entc_selected = models.IntegerField(default=0)
    ncer_mechanical_selected = models.IntegerField(default=0)
    ncer_automobile_selected = models.IntegerField(default=0)
    
    # Internship Selection
    total_internship_selected = models.IntegerField(default=0)
    total_internship_selected_pccoe = models.IntegerField(default=0)
    total_internship_selected_pccoer = models.IntegerField(default=0)
    total_internship_selected_nmiet = models.IntegerField(default=0)
    total_internship_selected_ncer = models.IntegerField(default=0)
    
    # PRNs
    placed_student_prn = models.TextField(blank=True)
    internship_selected_prn = models.TextField(blank=True)
    
    # Expenditure
    approved_expenditure = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    actual_expenditure = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Status
    resume_required = models.CharField(max_length=20, choices=RESUME_REQUIRED_CHOICES, default='required')
    registration_status = models.CharField(max_length=10, choices=REGISTRATION_STATUS_CHOICES, default='open')
    drive_completed = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'companies'
    
    def __str__(self):
        return f"{self.company_name} - {self.date}"

# Company Files
class CompanyFile(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='files')
    file = models.FileField(upload_to='company_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'company_files'
    
    def __str__(self):
        return f"{self.company.company_name} - File"

# Student Internships
class Internship(models.Model):
    COMPANY_TYPE_CHOICES = [
        ('core', 'Core'),
        ('service', 'Service'),
        ('product', 'Product'),
        ('other', 'Other'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='internships')
    company_name = models.CharField(max_length=200)
    company_type = models.CharField(max_length=20, choices=COMPANY_TYPE_CHOICES, blank=True)
    stipend = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    offer_letter = models.FileField(upload_to='internship_offers/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'internships'
    
    def __str__(self):
        return f"{self.student.prn_number} - {self.company_name}"

# Student Certifications
class Certification(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='certifications')
    certification_name = models.CharField(max_length=200)
    platform = models.CharField(max_length=200)
    duration = models.IntegerField(help_text='Duration in weeks')
    certificate_file = models.FileField(upload_to='certificates/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'certifications'
    
    def __str__(self):
        return f"{self.student.prn_number} - {self.certification_name}"

# Student Projects
class Project(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='projects')
    project_title = models.CharField(max_length=200)
    technologies = models.TextField()
    group_members = models.IntegerField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'projects'
    
    def __str__(self):
        return f"{self.student.prn_number} - {self.project_title}"

# Notifications
class Notification(models.Model):
    NOTIFICATION_TYPE_CHOICES = [
        ('general', 'General'),
        ('drive', 'Drive'),
        ('result', 'Result'),
        ('urgent', 'Urgent'),
    ]
    
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPE_CHOICES)
    target_colleges = models.JSONField(default=list, blank=True)
    target_departments = models.JSONField(default=list, blank=True)
    target_years = models.JSONField(default=list, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='notifications_created')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'notifications'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

# Offer Letters
class OfferLetter(models.Model):
    COMPANY_TYPE_CHOICES = [
        ('product', 'Product'),
        ('service', 'Service'),
        ('startup', 'Startup'),
        ('mnc', 'MNC'),
        ('government', 'Government'),
    ]
    OFFER_TYPE_CHOICES = [
        ('full_time', 'Full-Time'),
        ('internship', 'Internship'),
        ('apprenticeship', 'Apprenticeship'),
        ('ppo', 'PPO'),
        ('contract', 'Contract'),
        ('part_time', 'Part-Time'),
    ]
    STATUS_CHOICES = [
        ('offer', 'Offer'),
        ('final', 'Final'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='offer_letters')
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name='offer_letters',
        null=True, blank=True
    )
    company_name = models.CharField(max_length=200)
    company_type = models.CharField(max_length=20, choices=COMPANY_TYPE_CHOICES)
    offer_type = models.CharField(max_length=20, choices=OFFER_TYPE_CHOICES)
    package_value = models.DecimalField(max_digits=6, decimal_places=2, help_text='Package in LPA')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='offer')
    offer_letter_file = models.FileField(
        upload_to='offer_letters/',
        storage=RawMediaCloudinaryStorage(),
    )
    joining_letter_file = models.FileField(
        upload_to='joining_letters/',
        storage=RawMediaCloudinaryStorage(),
        null=True, blank=True,  # only required when status='final', enforced in serializer
    )
    joining_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'offer_letters'

    def __str__(self):
        return f"{self.student.prn_number} - {self.company_name}"

# Calendar Events
class CalendarEvent(models.Model):
    EVENT_TYPE_CHOICES = [
        ('drive', 'Company Drive'),
        ('interview', 'Interview'),
        ('meeting', 'Meeting'),
        ('deadline', 'Deadline'),
        ('exam', 'Exam'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    event_type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    location = models.CharField(max_length=200, blank=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True, related_name='events')
    target_colleges = models.JSONField(default=list, blank=True)
    target_departments = models.JSONField(default=list, blank=True)
    target_years = models.JSONField(default=list, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='events_created')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'calendar_events'
        ordering = ['start_date']
    
    def __str__(self):
        return f"{self.title} - {self.start_date.date()}"
# Create your models here.
