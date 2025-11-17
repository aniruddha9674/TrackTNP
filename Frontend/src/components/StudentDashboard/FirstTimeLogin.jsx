import React, { useState } from "react";
import { Upload, User } from "lucide-react";

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [qualificationType, setQualificationType] = useState("hsc");

  const totalSteps = 7;

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

  const [address, setAddress] = useState({
    country: "",
    cityState: "",
    postalCode: "",
    taxId: "",
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

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
    alert("Form submitted successfully!");
    console.log("Form Data:", {
      profileData,
      personalInfo,
      address,
      personalDetails,
      pastQualifications,
      academicDetails,
      otherInfo,
    });
  };

  const steps = [
    { number: 1, title: "Profile" },
    { number: 2, title: "Personal Info" },
    { number: 3, title: "Address" },
    { number: 4, title: "Details" },
    { number: 5, title: "Qualifications" },
    { number: 6, title: "Academics" },
    { number: 7, title: "Other" },
  ];

  return (
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className="min-h-screen bg-gray-50 pb-8"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Urbanist', sans-serif;
        }
      `}</style>

      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Complete Your Profile
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep > step.number
                        ? "bg-green-500 text-white"
                        : currentStep === step.number
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {currentStep > step.number ? "✓" : step.number}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center whitespace-nowrap ${
                      currentStep === step.number
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      currentStep > step.number ? "bg-green-500" : "bg-gray-200"
                    }`}
                    style={{ marginTop: "-20px" }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg border shadow-sm p-8 mb-6">
          {/* Step 1: Profile Header */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Profile Header
              </h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <label className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer hover:bg-gray-50">
                    <Upload className="w-4 h-4" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) =>
                    setProfileData({ ...profileData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) =>
                    setProfileData({ ...profileData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, Country"
                />
              </div>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Personal Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name *
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name *
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone *
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={personalInfo.bio}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, bio: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Tell us about yourself"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Address Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={address.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    City/State *
                  </label>
                  <input
                    type="text"
                    value={address.cityState}
                    onChange={(e) =>
                      setAddress({ ...address, cityState: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tax ID
                  </label>
                  <input
                    type="text"
                    value={address.taxId}
                    onChange={(e) =>
                      setAddress({ ...address, taxId: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Personal Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Personal Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Gender
                  </label>
                  <select
                    value={personalDetails.gender}
                    onChange={(e) =>
                      setPersonalDetails({
                        ...personalDetails,
                        gender: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Date of Birth
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Student Mobile
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Parent Mobile
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Student Email
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Parent Email
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Aadhar No
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    LinkedIn
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="LinkedIn profile URL"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Past Qualifications */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Past Qualifications
              </h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Admission Year
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
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">SSC Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Board
                    </label>
                    <input
                      type="text"
                      value={pastQualifications.ssc.board}
                      onChange={(e) =>
                        setPastQualifications({
                          ...pastQualifications,
                          ssc: {
                            ...pastQualifications.ssc,
                            board: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
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
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">
                  Qualification Type
                </h3>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="hsc"
                      checked={qualificationType === "hsc"}
                      onChange={(e) => setQualificationType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>HSC</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="diploma"
                      checked={qualificationType === "diploma"}
                      onChange={(e) => setQualificationType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>Diploma</span>
                  </label>
                </div>

                {qualificationType === "hsc" ? (
                  <div>
                    <h4 className="font-medium mb-4">HSC Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Board
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
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Passing Year
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
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          College Name
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
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Percentage
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
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium mb-4">Diploma Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Board
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
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Passing Year
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
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          College Name
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
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Percentage
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
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Academic Details */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Academic Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Course Name
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Branch
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    College Name
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Year of Completion
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    University Reg No
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Roll No
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">Semester SGPA</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      FE Sem 1
                    </label>
                    <input
                      type="text"
                      value={academicDetails.feSem1.sgpa}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          feSem1: { sgpa: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      FE Sem 2
                    </label>
                    <input
                      type="text"
                      value={academicDetails.feSem2.sgpa}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          feSem2: { sgpa: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      SE Sem 1
                    </label>
                    <input
                      type="text"
                      value={academicDetails.seSem1.sgpa}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          seSem1: { sgpa: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      SE Sem 2
                    </label>
                    <input
                      type="text"
                      value={academicDetails.seSem2.sgpa}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          seSem2: { sgpa: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      TE Sem 1
                    </label>
                    <input
                      type="text"
                      value={academicDetails.teSem1.sgpa}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          teSem1: { sgpa: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      TE Sem 2
                    </label>
                    <input
                      type="text"
                      value={academicDetails.teSem2.sgpa}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          teSem2: { sgpa: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      BE Sem 1
                    </label>
                    <input
                      type="text"
                      value={academicDetails.beSem1.sgpa}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          beSem1: { sgpa: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      BE Sem 2
                    </label>
                    <input
                      type="text"
                      value={academicDetails.beSem2.sgpa}
                      onChange={(e) =>
                        setAcademicDetails({
                          ...academicDetails,
                          beSem2: { sgpa: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Other Information */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Other Information
              </h2>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Technical Achievements
                </label>
                <textarea
                  value={otherInfo.technicalAchievements}
                  onChange={(e) =>
                    setOtherInfo({
                      ...otherInfo,
                      technicalAchievements: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="List your technical achievements, hackathons, competitions, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Non-Technical Achievements
                </label>
                <textarea
                  value={otherInfo.nonTechnicalAchievements}
                  onChange={(e) =>
                    setOtherInfo({
                      ...otherInfo,
                      nonTechnicalAchievements: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="List your non-technical achievements, sports, cultural activities, etc."
                />
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">Coding Platforms</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(otherInfo.codingPlatforms).map(
                    ([key, platform]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium mb-2 capitalize">
                          {key}
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
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">
                  Additional Platforms
                </h3>
                {otherInfo.customPlatforms.map((platform, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
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
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Kaggle"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
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
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 border rounded font-medium transition-colors ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
