import React, { useState } from "react";
import { Upload, User, Sun, Moon, ChevronLeft, ChevronRight, UserCircle, FileText, GraduationCap, Award, Briefcase, Code } from "lucide-react";

const FirstTimeLogin = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [qualificationType, setQualificationType] = useState("hsc");
  const [theme, setTheme] = useState("light");

  const totalSteps = 6;
  const isDarkTheme = theme === "dark";

  // Theme Styles matching Services and Pricing pages
  const getThemeStyles = () => {
    if (isDarkTheme) {
      return {
        background: "bg-slate-950",
        textPrimary: "text-slate-50",
        textSecondary: "text-slate-400",
        textTertiary: "text-slate-500",
        cardBg: "bg-slate-900",
        cardBorder: "border-slate-800",
        cardShadow: "shadow-lg shadow-slate-900/50",
        inputBg: "bg-slate-800",
        inputBorder: "border-slate-700",
        inputFocus: "focus:border-blue-500 focus:ring-blue-500",
        buttonPrimary: "bg-blue-600 hover:bg-blue-700",
        buttonSecondary: "bg-slate-800 hover:bg-slate-700 border-slate-700",
        progressActive: "bg-blue-600 text-white shadow-lg scale-105",
        progressComplete: "bg-blue-900/30 text-blue-400",
        progressInactive: "bg-slate-800 text-slate-500",
      };
    }
    return {
      background: "bg-slate-50",
      textPrimary: "text-slate-900",
      textSecondary: "text-slate-600",
      textTertiary: "text-slate-400",
      cardBg: "bg-white",
      cardBorder: "border-slate-200",
      cardShadow: "shadow-lg",
      inputBg: "bg-white",
      inputBorder: "border-slate-300",
      inputFocus: "focus:border-blue-500 focus:ring-blue-500",
      buttonPrimary: "bg-blue-600 hover:bg-blue-700",
      buttonSecondary: "bg-white hover:bg-slate-50 border-slate-300",
      progressActive: "bg-blue-600 text-white shadow-lg scale-105",
      progressComplete: "bg-blue-100 text-blue-600",
      progressInactive: "bg-slate-100 text-slate-400",
    };
  };

  const themeStyles = getThemeStyles();

  const [profileData, setProfileData] = useState({
    name: "",
    title: "",
    location: "",
  });

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
  });

  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    studentMobNo: "",
    parentMobNo: "",
    studentEmail: "",
    personalEmail: "",
    parentEmail: "",
    aadharNo: "",
    linkedin: "",
  });

  const [pastQualifications, setPastQualifications] = useState({
    admissionYear: "",
    ssc: {
      board: "",
      passingYear: "",
      schoolName: "",
      percentage: "",
    },
    hsc: {
      board: "",
      passingYear: "",
      collegeName: "",
      percentage: "",
    },
    diploma: {
      board: "",
      passingYear: "",
      collegeName: "",
      percentage: "",
    },
  });

  const [academicDetails, setAcademicDetails] = useState({
    courseName: "",
    yearOfCompletion: "",
    collegeName: "",
    branch: "",
    universityRegNo: "",
    rollNo: "",
    honours: "",
    division: "",
    feSem1: { sgpa: "" },
    feSem2: { sgpa: "" },
    seSem1: { sgpa: "" },
    seSem2: { sgpa: "" },
    teSem1: { sgpa: "" },
    teSem2: { sgpa: "" },
    beSem1: { sgpa: "" },
    beSem2: { sgpa: "" },
    liveBacklogs: "",
    deadBacklogs: "",
    yearsDown: "",
  });

  const [otherInfo, setOtherInfo] = useState({
    technicalAchievements: "",
    nonTechnicalAchievements: "",
    codingPlatforms: {
      codebes: { profile: "" },
      github: { profile: "" },
      leetcode: { profile: "" },
      codechef: { profile: "" },
      hackerrank: { profile: "" },
      gfg: { profile: "" },
      codeforces: { profile: "" },
      hackerearth: { profile: "" },
    },
    customPlatforms: [
      { name: "", link: "" },
      { name: "", link: "" },
      { name: "", link: "" },
    ],
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Step 1: Profile validation
      if (!profileImage) {
        newErrors.profileImage = "Profile image is required";
      }
      if (!profileData.name || profileData.name.trim() === "") {
        newErrors.name = "Name is required";
      }
      if (!profileData.title || profileData.title.trim() === "") {
        newErrors.title = "Title is required";
      }
      if (!profileData.location || profileData.location.trim() === "") {
        newErrors.location = "Location is required";
      }
    } else if (step === 2) {
      // Step 2: Personal Information validation
      if (!personalInfo.firstName || personalInfo.firstName.trim() === "") {
        newErrors.firstName = "First name is required";
      }
      if (!personalInfo.lastName || personalInfo.lastName.trim() === "") {
        newErrors.lastName = "Last name is required";
      }
      if (!personalInfo.email || personalInfo.email.trim() === "") {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      if (!personalInfo.phone || personalInfo.phone.trim() === "") {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10,}$/.test(personalInfo.phone.replace(/\D/g, ""))) {
        newErrors.phone = "Please enter a valid phone number";
      }
    } else if (step === 3) {
      // Step 3: Personal Details validation
      if (!personalDetails.firstName || personalDetails.firstName.trim() === "") {
        newErrors.firstName = "First name is required";
      }
      if (!personalDetails.lastName || personalDetails.lastName.trim() === "") {
        newErrors.lastName = "Last name is required";
      }
      if (!personalDetails.gender || personalDetails.gender === "") {
        newErrors.gender = "Gender is required";
      }
      if (!personalDetails.dateOfBirth || personalDetails.dateOfBirth === "") {
        newErrors.dateOfBirth = "Date of birth is required";
      }
      if (!personalDetails.studentMobNo || personalDetails.studentMobNo.trim() === "") {
        newErrors.studentMobNo = "Student mobile number is required";
      } else if (!/^\d{10}$/.test(personalDetails.studentMobNo.replace(/\D/g, ""))) {
        newErrors.studentMobNo = "Please enter a valid 10-digit mobile number";
      }
      if (!personalDetails.parentMobNo || personalDetails.parentMobNo.trim() === "") {
        newErrors.parentMobNo = "Parent mobile number is required";
      } else if (!/^\d{10}$/.test(personalDetails.parentMobNo.replace(/\D/g, ""))) {
        newErrors.parentMobNo = "Please enter a valid 10-digit mobile number";
      }
      if (!personalDetails.studentEmail || personalDetails.studentEmail.trim() === "") {
        newErrors.studentEmail = "Student email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.studentEmail)) {
        newErrors.studentEmail = "Please enter a valid student email";
      }
      if (!personalDetails.parentEmail || personalDetails.parentEmail.trim() === "") {
        newErrors.parentEmail = "Parent email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalDetails.parentEmail)) {
        newErrors.parentEmail = "Please enter a valid parent email";
      }
      if (!personalDetails.aadharNo || personalDetails.aadharNo.trim() === "") {
        newErrors.aadharNo = "Aadhar number is required";
      } else if (!/^\d{12}$/.test(personalDetails.aadharNo.replace(/\D/g, ""))) {
        newErrors.aadharNo = "Please enter a valid 12-digit Aadhar number";
      }
      if (!personalDetails.linkedin || personalDetails.linkedin.trim() === "") {
        newErrors.linkedin = "LinkedIn profile is required";
      }
    } else if (step === 4) {
      // Step 4: Education validation
      if (!pastQualifications.admissionYear || pastQualifications.admissionYear === "") {
        newErrors.admissionYear = "Admission year is required";
      }
      // Validate based on qualification type
      const activeQual = pastQualifications[qualificationType];
      if (activeQual) {
        if (!activeQual.board || activeQual.board === "") {
          newErrors.board = "Board is required";
        }
        if (!activeQual.passingYear || activeQual.passingYear === "") {
          newErrors.passingYear = "Passing year is required";
        }
        if (!activeQual.percentage || activeQual.percentage === "") {
          newErrors.percentage = "Percentage is required";
        } else if (isNaN(activeQual.percentage) || activeQual.percentage < 0 || activeQual.percentage > 100) {
          newErrors.percentage = "Please enter a valid percentage (0-100)";
        }
        const schoolKey = qualificationType === "hsc" || qualificationType === "ssc" ? "schoolName" : "collegeName";
        if (!activeQual[schoolKey] || activeQual[schoolKey] === "") {
          newErrors[schoolKey] = `${schoolKey === "schoolName" ? "School" : "College"} name is required`;
        }
      }
    } else if (step === 5) {
      // Step 5: Academic Details validation
      if (!academicDetails.courseName || academicDetails.courseName.trim() === "") {
        newErrors.courseName = "Course name is required";
      }
      if (!academicDetails.yearOfCompletion || academicDetails.yearOfCompletion === "") {
        newErrors.yearOfCompletion = "Year of completion is required";
      }
      if (!academicDetails.collegeName || academicDetails.collegeName.trim() === "") {
        newErrors.collegeName = "College name is required";
      }
      if (!academicDetails.branch || academicDetails.branch.trim() === "") {
        newErrors.branch = "Branch is required";
      }
      if (!academicDetails.universityRegNo || academicDetails.universityRegNo.trim() === "") {
        newErrors.universityRegNo = "University registration number is required";
      }
      if (!academicDetails.rollNo || academicDetails.rollNo.trim() === "") {
        newErrors.rollNo = "Roll number is required";
      }
    } else if (step === 6) {
      // Step 6: Other Info validation
      if (!otherInfo.technicalAchievements || otherInfo.technicalAchievements.trim() === "") {
        newErrors.technicalAchievements = "Technical achievements are required";
      }
      if (!otherInfo.nonTechnicalAchievements || otherInfo.nonTechnicalAchievements.trim() === "") {
        newErrors.nonTechnicalAchievements = "Non-technical achievements are required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    // Validate step 6 before submitting
    if (validateStep(6)) {
      alert("Form submitted successfully!");
      console.log("Form Data:", {
        profileData,
        personalInfo,
        personalDetails,
        pastQualifications,
        academicDetails,
        otherInfo,
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const steps = [
    { number: 1, title: "Profile", icon: UserCircle },
    { number: 2, title: "Personal", icon: User },
    { number: 3, title: "Details", icon: FileText },
    { number: 4, title: "Education", icon: GraduationCap },
    { number: 5, title: "Academics", icon: Award },
    { number: 6, title: "Achievements", icon: Briefcase },
  ];

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite 3s;
        }
      `}</style>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold ${themeStyles.textPrimary}`}>
              Complete Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Profile</span>
            </h1>
            <p className={`text-sm ${themeStyles.textSecondary} mt-2`}>
              Step {currentStep} of {totalSteps} - Let's get you started
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-xl ${themeStyles.cardBg} ${themeStyles.cardBorder} border ${themeStyles.cardShadow} hover:scale-105 transition-all`}
          >
            {isDarkTheme ? (
              <Sun size={20} className={themeStyles.textPrimary} />
            ) : (
              <Moon size={20} className={themeStyles.textPrimary} />
            )}
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="relative z-10 py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`p-4 rounded-xl text-center transition-all cursor-pointer ${currentStep === step.number
                      ? themeStyles.progressActive
                      : currentStep > step.number
                        ? themeStyles.progressComplete
                        : themeStyles.progressInactive
                    }`}
                  onClick={() => setCurrentStep(step.number)}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-xs font-semibold">{step.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="relative z-10 px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div
            className={`${themeStyles.cardBg} rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} p-8 md:p-12 mb-6`}
          >
            {/* Step 1: Profile Header */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold ${themeStyles.textPrimary} mb-3`}>
                    Profile Header
                  </h2>
                  <p className={`${themeStyles.textSecondary}`}>
                    Let's start with your basic profile information
                  </p>
                </div>

                <div className="flex flex-col items-center mb-8">
                  <label className={`block text-sm font-semibold mb-3 ${themeStyles.textSecondary}`}>
                    Profile Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col items-center gap-4">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-500/20"
                      />
                    ) : (
                      <div className={`w-32 h-32 rounded-full ${themeStyles.inputBg} border-2 border-dashed ${errors.profileImage ? "border-red-500" : themeStyles.inputBorder} flex items-center justify-center`}>
                        <User className={`w-16 h-16 ${themeStyles.textTertiary}`} />
                      </div>
                    )}
                    <label className={`flex items-center gap-2 px-6 py-3 border ${themeStyles.buttonSecondary} border rounded-xl cursor-pointer transition-all hover:scale-105 font-medium`}>
                      <Upload className="w-4 h-4" />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {errors.profileImage && (
                      <p className="text-red-500 text-sm font-medium">{errors.profileImage}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.name ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm font-medium mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Title / Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.title}
                      onChange={(e) =>
                        setProfileData({ ...profileData, title: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.title ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="e.g., Computer Science Student"
                    />
                    {errors.title && <p className="text-red-500 text-sm font-medium mt-1">{errors.title}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({ ...profileData, location: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.location ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="City, State"
                    />
                    {errors.location && <p className="text-red-500 text-sm font-medium mt-1">{errors.location}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Info */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold ${themeStyles.textPrimary} mb-3`}>
                    Personal Information
                  </h2>
                  <p className={`${themeStyles.textSecondary}`}>
                    Tell us more about yourself
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          firstName: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.firstName ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="First name"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm font-medium mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          lastName: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.lastName ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="Last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm font-medium mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          email: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.email ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm font-medium mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...personalInfo,
                          phone: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.phone ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="+91 1234567890"
                    />
                    {errors.phone && <p className="text-red-500 text-sm font-medium mt-1">{errors.phone}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Bio / About You
                    </label>
                    <textarea
                      value={personalInfo.bio}
                      onChange={(e) =>
                        setPersonalInfo({ ...personalInfo, bio: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      rows={4}
                      placeholder="Tell us about yourself, your interests, and goals..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Personal Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold ${themeStyles.textPrimary} mb-3`}>
                    Detailed Information
                  </h2>
                  <p className={`${themeStyles.textSecondary}`}>
                    Additional personal and contact details
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalDetails.firstName}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          firstName: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.firstName ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm font-medium mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Middle Name
                    </label>
                    <input
                      type="text"
                      value={personalDetails.middleName}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          middleName: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalDetails.lastName}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          lastName: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.lastName ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm font-medium mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={personalDetails.gender}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          gender: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.gender ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm font-medium mt-1">{errors.gender}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={personalDetails.dateOfBirth}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          dateOfBirth: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.dateOfBirth ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.dateOfBirth && <p className="text-red-500 text-sm font-medium mt-1">{errors.dateOfBirth}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Student Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={personalDetails.studentMobNo}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          studentMobNo: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.studentMobNo ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.studentMobNo && <p className="text-red-500 text-sm font-medium mt-1">{errors.studentMobNo}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Parent Mobile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={personalDetails.parentMobNo}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          parentMobNo: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.parentMobNo ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.parentMobNo && <p className="text-red-500 text-sm font-medium mt-1">{errors.parentMobNo}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Student Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={personalDetails.studentEmail}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          studentEmail: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.studentEmail ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.studentEmail && <p className="text-red-500 text-sm font-medium mt-1">{errors.studentEmail}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Personal Email
                    </label>
                    <input
                      type="email"
                      value={personalDetails.personalEmail}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          personalEmail: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Parent Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={personalDetails.parentEmail}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          parentEmail: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.parentEmail ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.parentEmail && <p className="text-red-500 text-sm font-medium mt-1">{errors.parentEmail}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Aadhar Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalDetails.aadharNo}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          aadharNo: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.aadharNo ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.aadharNo && <p className="text-red-500 text-sm font-medium mt-1">{errors.aadharNo}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      LinkedIn Profile <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalDetails.linkedin}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          linkedin: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.linkedin ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="linkedin.com/in/yourprofile"
                    />
                    {errors.linkedin && <p className="text-red-500 text-sm font-medium mt-1">{errors.linkedin}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Past Qualifications */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold ${themeStyles.textPrimary} mb-3`}>
                    Past Qualifications
                  </h2>
                  <p className={`${themeStyles.textSecondary}`}>
                    Your educational background and achievements
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                    Admission Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={pastQualifications.admissionYear}
                    onChange={(e) =>
                      setPastQualifications({
                        ...pastQualifications,
                        admissionYear: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.admissionYear ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    placeholder="e.g., 2020"
                  />
                  {errors.admissionYear && <p className="text-red-500 text-sm font-medium mt-1">{errors.admissionYear}</p>}
                </div>

                {/* SSC Details */}
                <div className={`p-6 rounded-xl ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}>
                  <h3 className={`font-bold mb-4 text-lg ${themeStyles.textPrimary}`}>
                    SSC (10th Standard) Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                        Passing Year
                      </label>
                      <input
                        type="text"
                        value={pastQualifications.ssc.passingYear}
                        onChange={(e) =>
                          setPastQualifications({
                            ...pastQualifications,
                            ssc: {
                              ...pastQualifications.ssc,
                              passingYear: e.target.value,
                            },
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                        School Name
                      </label>
                      <input
                        type="text"
                        value={pastQualifications.ssc.schoolName}
                        onChange={(e) =>
                          setPastQualifications({
                            ...pastQualifications,
                            ssc: {
                              ...pastQualifications.ssc,
                              schoolName: e.target.value,
                            },
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                        Percentage
                      </label>
                      <input
                        type="text"
                        value={pastQualifications.ssc.percentage}
                        onChange={(e) =>
                          setPastQualifications({
                            ...pastQualifications,
                            ssc: {
                              ...pastQualifications.ssc,
                              percentage: e.target.value,
                            },
                          })
                        }
                        className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                        placeholder="e.g., 85.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Qualification Type Toggle */}
                <div>
                  <h3 className={`font-bold mb-4 text-lg ${themeStyles.textPrimary}`}>
                    Higher Secondary Education
                  </h3>
                  <div className="flex gap-4 mb-6">
                    <label className={`flex items-center gap-3 cursor-pointer px-6 py-3 rounded-xl border ${qualificationType === "hsc" ? "border-blue-500 bg-blue-500/10" : themeStyles.inputBorder} transition-all`}>
                      <input
                        type="radio"
                        value="hsc"
                        checked={qualificationType === "hsc"}
                        onChange={(e) => setQualificationType(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className={`font-semibold ${themeStyles.textPrimary}`}>HSC (12th)</span>
                    </label>
                    <label className={`flex items-center gap-3 cursor-pointer px-6 py-3 rounded-xl border ${qualificationType === "diploma" ? "border-blue-500 bg-blue-500/10" : themeStyles.inputBorder} transition-all`}>
                      <input
                        type="radio"
                        value="diploma"
                        checked={qualificationType === "diploma"}
                        onChange={(e) => setQualificationType(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className={`font-semibold ${themeStyles.textPrimary}`}>Diploma</span>
                    </label>
                  </div>

                  {qualificationType === "hsc" ? (
                    <div className={`p-6 rounded-xl ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}>
                      <h4 className={`font-semibold mb-4 ${themeStyles.textPrimary}`}>HSC Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                            Board <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={pastQualifications.hsc.board}
                            onChange={(e) =>
                              setPastQualifications({
                                ...pastQualifications,
                                hsc: {
                                  ...pastQualifications.hsc,
                                  board: e.target.value,
                                },
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${errors.board ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          />
                          {errors.board && <p className="text-red-500 text-sm font-medium mt-1">{errors.board}</p>}
                        </div>
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                            Passing Year <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={pastQualifications.hsc.passingYear}
                            onChange={(e) =>
                              setPastQualifications({
                                ...pastQualifications,
                                hsc: {
                                  ...pastQualifications.hsc,
                                  passingYear: e.target.value,
                                },
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${errors.passingYear ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          />
                          {errors.passingYear && <p className="text-red-500 text-sm font-medium mt-1">{errors.passingYear}</p>}
                        </div>
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                            College Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={pastQualifications.hsc.collegeName}
                            onChange={(e) =>
                              setPastQualifications({
                                ...pastQualifications,
                                hsc: {
                                  ...pastQualifications.hsc,
                                  collegeName: e.target.value,
                                },
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${errors.collegeName ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          />
                          {errors.collegeName && <p className="text-red-500 text-sm font-medium mt-1">{errors.collegeName}</p>}
                        </div>
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                            Percentage <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={pastQualifications.hsc.percentage}
                            onChange={(e) =>
                              setPastQualifications({
                                ...pastQualifications,
                                hsc: {
                                  ...pastQualifications.hsc,
                                  percentage: e.target.value,
                                },
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${errors.percentage ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          />
                          {errors.percentage && <p className="text-red-500 text-sm font-medium mt-1">{errors.percentage}</p>}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`p-6 rounded-xl ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}>
                      <h4 className={`font-semibold mb-4 ${themeStyles.textPrimary}`}>Diploma Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                            Board <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={pastQualifications.diploma.board}
                            onChange={(e) =>
                              setPastQualifications({
                                ...pastQualifications,
                                diploma: {
                                  ...pastQualifications.diploma,
                                  board: e.target.value,
                                },
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${errors.board ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          />
                          {errors.board && <p className="text-red-500 text-sm font-medium mt-1">{errors.board}</p>}
                        </div>
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                            Passing Year <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={pastQualifications.diploma.passingYear}
                            onChange={(e) =>
                              setPastQualifications({
                                ...pastQualifications,
                                diploma: {
                                  ...pastQualifications.diploma,
                                  passingYear: e.target.value,
                                },
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${errors.passingYear ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          />
                          {errors.passingYear && <p className="text-red-500 text-sm font-medium mt-1">{errors.passingYear}</p>}
                        </div>
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                            College Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={pastQualifications.diploma.collegeName}
                            onChange={(e) =>
                              setPastQualifications({
                                ...pastQualifications,
                                diploma: {
                                  ...pastQualifications.diploma,
                                  collegeName: e.target.value,
                                },
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${errors.collegeName ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          />
                          {errors.collegeName && <p className="text-red-500 text-sm font-medium mt-1">{errors.collegeName}</p>}
                        </div>
                        <div>
                          <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                            Percentage <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={pastQualifications.diploma.percentage}
                            onChange={(e) =>
                              setPastQualifications({
                                ...pastQualifications,
                                diploma: {
                                  ...pastQualifications.diploma,
                                  percentage: e.target.value,
                                },
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${errors.percentage ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          />
                          {errors.percentage && <p className="text-red-500 text-sm font-medium mt-1">{errors.percentage}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Academic Details */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold ${themeStyles.textPrimary} mb-3`}>
                    Academic Details
                  </h2>
                  <p className={`${themeStyles.textSecondary}`}>
                    Current course and semester performance
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Course Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={academicDetails.courseName}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          courseName: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.courseName ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="e.g., B.Tech Computer Science"
                    />
                    {errors.courseName && <p className="text-red-500 text-sm font-medium mt-1">{errors.courseName}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Branch <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={academicDetails.branch}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          branch: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.branch ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.branch && <p className="text-red-500 text-sm font-medium mt-1">{errors.branch}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      College Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={academicDetails.collegeName}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          collegeName: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.collegeName ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.collegeName && <p className="text-red-500 text-sm font-medium mt-1">{errors.collegeName}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Year of Completion <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={academicDetails.yearOfCompletion}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          yearOfCompletion: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.yearOfCompletion ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.yearOfCompletion && <p className="text-red-500 text-sm font-medium mt-1">{errors.yearOfCompletion}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      University Registration No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={academicDetails.universityRegNo}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          universityRegNo: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.universityRegNo ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.universityRegNo && <p className="text-red-500 text-sm font-medium mt-1">{errors.universityRegNo}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Roll No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={academicDetails.rollNo}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          rollNo: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.rollNo ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                    {errors.rollNo && <p className="text-red-500 text-sm font-medium mt-1">{errors.rollNo}</p>}
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Honours
                    </label>
                    <input
                      type="text"
                      value={academicDetails.honours}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          honours: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Division
                    </label>
                    <input
                      type="text"
                      value={academicDetails.division}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          division: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    />
                  </div>
                </div>

                {/* Semester SGPA */}
                <div className={`p-6 rounded-xl ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}>
                  <h3 className={`font-bold mb-6 text-lg ${themeStyles.textPrimary}`}>
                    Semester-wise SGPA
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "FE Sem 1", key: "feSem1" },
                      { label: "FE Sem 2", key: "feSem2" },
                      { label: "SE Sem 1", key: "seSem1" },
                      { label: "SE Sem 2", key: "seSem2" },
                      { label: "TE Sem 1", key: "teSem1" },
                      { label: "TE Sem 2", key: "teSem2" },
                      { label: "BE Sem 1", key: "beSem1" },
                      { label: "BE Sem 2", key: "beSem2" },
                    ].map((sem) => (
                      <div key={sem.key}>
                        <label className={`block text-xs font-semibold mb-2 ${themeStyles.textSecondary}`}>
                          {sem.label}
                        </label>
                        <input
                          type="text"
                          value={academicDetails[sem.key].sgpa}
                          onChange={(e) =>
                            setAcademicDetails({
                              ...academicDetails,
                              [sem.key]: { sgpa: e.target.value },
                            })
                          }
                          className={`w-full px-3 py-2 border rounded-lg ${themeStyles.cardBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          placeholder="0.00"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Backlogs & Years Down */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Live Backlogs
                    </label>
                    <input
                      type="text"
                      value={academicDetails.liveBacklogs}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          liveBacklogs: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Dead Backlogs
                    </label>
                    <input
                      type="text"
                      value={academicDetails.deadBacklogs}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          deadBacklogs: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                      Years Down
                    </label>
                    <input
                      type="text"
                      value={academicDetails.yearsDown}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          yearsDown: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Other Information */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className={`text-3xl font-bold ${themeStyles.textPrimary} mb-3`}>
                    Achievements & Skills
                  </h2>
                  <p className={`${themeStyles.textSecondary}`}>
                    Showcase your accomplishments and coding profiles
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                    Technical Achievements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={otherInfo.technicalAchievements}
                    onChange={(e) =>
                      setOtherInfo({
                        ...otherInfo,
                        technicalAchievements: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.technicalAchievements ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    rows={4}
                    placeholder="List your technical achievements, hackathons, competitions, certifications..."
                  />
                  {errors.technicalAchievements && <p className="text-red-500 text-sm font-medium mt-1">{errors.technicalAchievements}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                    Non-Technical Achievements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={otherInfo.nonTechnicalAchievements}
                    onChange={(e) =>
                      setOtherInfo({
                        ...otherInfo,
                        nonTechnicalAchievements: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${errors.nonTechnicalAchievements ? "border-red-500" : themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                    rows={4}
                    placeholder="Sports, cultural activities, leadership roles, volunteer work..."
                  />
                  {errors.nonTechnicalAchievements && <p className="text-red-500 text-sm font-medium mt-1">{errors.nonTechnicalAchievements}</p>}
                </div>

                {/* Coding Platforms */}
                <div className={`p-6 rounded-xl ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}>
                  <h3 className={`font-bold mb-6 text-lg ${themeStyles.textPrimary} flex items-center gap-2`}>
                    <Code className="w-5 h-5" />
                    Coding Platform Profiles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {Object.entries(otherInfo.codingPlatforms).map(
                      ([key, platform]) => (
                        <div key={key}>
                          <label className={`block text-sm font-semibold mb-2 capitalize ${themeStyles.textSecondary}`}>
                            {key === "gfg" ? "GeeksforGeeks" : key}
                          </label>
                          <input
                            type="text"
                            placeholder="Profile URL or Username"
                            value={platform.profile}
                            onChange={(e) =>
                              setOtherInfo({
                                ...otherInfo,
                                codingPlatforms: {
                                  ...otherInfo.codingPlatforms,
                                  [key]: { profile: e.target.value },
                                },
                              })
                            }
                            className={`w-full px-4 py-3 border rounded-xl ${themeStyles.cardBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Additional Platforms */}
                <div>
                  <h3 className={`font-bold mb-4 text-lg ${themeStyles.textPrimary}`}>
                    Additional Platforms
                  </h3>
                  {otherInfo.customPlatforms.map((platform, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                          Platform Name
                        </label>
                        <input
                          type="text"
                          value={platform.name}
                          onChange={(e) => {
                            const newPlatforms = [...otherInfo.customPlatforms];
                            newPlatforms[index].name = e.target.value;
                            setOtherInfo({
                              ...otherInfo,
                              customPlatforms: newPlatforms,
                            });
                          }}
                          className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          placeholder="e.g., Kaggle, Topcoder"
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${themeStyles.textSecondary}`}>
                          Platform Link
                        </label>
                        <input
                          type="text"
                          value={platform.link}
                          onChange={(e) => {
                            const newPlatforms = [...otherInfo.customPlatforms];
                            newPlatforms[index].link = e.target.value;
                            setOtherInfo({
                              ...otherInfo,
                              customPlatforms: newPlatforms,
                            });
                          }}
                          className={`w-full px-4 py-3 border rounded-xl ${themeStyles.inputBg} ${themeStyles.inputBorder} ${themeStyles.textPrimary} focus:outline-none focus:ring-2 ${themeStyles.inputFocus} transition-all`}
                          placeholder="Profile URL"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${currentStep === 1
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                  : `${themeStyles.buttonSecondary} border hover:scale-105 ${themeStyles.textPrimary}`
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className={`px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${themeStyles.buttonPrimary} text-white shadow-lg flex items-center gap-2`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              >
                Submit Profile
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeLogin;