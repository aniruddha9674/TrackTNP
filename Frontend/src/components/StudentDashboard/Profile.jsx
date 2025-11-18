import React, { useState } from "react";
import { X, Edit2, Upload, User } from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

// Add Urbanist font
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  * { font-family: 'Urbanist', sans-serif; }
`;
document.head.appendChild(style);

// Reusable FieldDisplay Component
const FieldDisplay = ({ label, value, isDark }) => (
  <div className="mb-4">
    <label
      className={`text-sm block mb-1 ${
        isDark ? "text-slate-400" : "text-slate-600"
      }`}
    >
      {label}
    </label>
    <p
      className={`text-base font-medium ${
        isDark ? "text-slate-50" : "text-slate-900"
      }`}
    >
      {value || "Not provided"}
    </p>
  </div>
);

// Reusable Modal Component
const Modal = ({ isOpen, onClose, title, children, isDark }) => {
  if (!isOpen) return null;
  return (
    <div
      className={`fixed inset-0 ${
        isDark ? "bg-black/80" : "bg-black/60"
      } backdrop-blur-sm flex items-center justify-center z-50 p-4`}
    >
      <div
        className={`${
          isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
        } border rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden`}
      >
        <div
          className={`sticky top-0 ${
            isDark
              ? "bg-slate-800 border-slate-700"
              : "bg-slate-100 border-slate-200"
          } border-b px-6 py-4 flex items-center justify-between`}
        >
          <h2
            className={`text-2xl font-bold ${
              isDark ? "text-slate-50" : "text-slate-900"
            }`}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-slate-700 text-slate-400"
                : "hover:bg-slate-50 text-slate-600"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Reusable SectionCard Component
const SectionCard = ({ title, onEdit, children, isDark }) => (
  <div
    className={`${
      isDark
        ? "bg-slate-900 border-slate-700 shadow-lg shadow-black/20"
        : "bg-white border-slate-200 shadow-md"
    } rounded-xl border transition-all hover:shadow-xl ${
      isDark ? "hover:shadow-black/40" : ""
    }`}
  >
    <div
      className={`px-6 py-4 ${
        isDark ? "border-slate-700" : "border-slate-200"
      } border-b flex items-center justify-between`}
    >
      <h2
        className={`text-lg font-semibold ${
          isDark ? "text-slate-50" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      <button
        onClick={onEdit}
        className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-colors ${
          isDark
            ? "border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-50"
            : "border-slate-300 bg-white hover:bg-slate-50 text-slate-900"
        }`}
      >
        <Edit2 className="w-4 h-4" /> Edit
      </button>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// Reusable Input Component
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  isDark,
  placeholder = "",
}) => (
  <div>
    <label
      className={`block text-sm font-medium mb-2 ${
        isDark ? "text-slate-200" : "text-slate-700"
      }`}
    >
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
        isDark
          ? "bg-slate-950 border border-slate-600 text-slate-50 placeholder:text-slate-500"
          : "bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400"
      }`}
    />
  </div>
);

// Reusable Textarea Component
const TextareaField = ({ label, value, onChange, isDark, rows = 3 }) => (
  <div>
    <label
      className={`block text-sm font-medium mb-2 ${
        isDark ? "text-slate-200" : "text-slate-700"
      }`}
    >
      {label}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
        isDark
          ? "bg-slate-950 border border-slate-600 text-slate-50 placeholder:text-slate-500"
          : "bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400"
      }`}
    />
  </div>
);

// Main Profile Component
const Profile = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeModal, setActiveModal] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [qualificationType, setQualificationType] = useState("hsc");

  // State for all profile data
  const [profileData, setProfileData] = useState({
    name: "",
    title: "",
    location: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
    },
    personalDetails: {
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
      linkedin: "",
      aadharNo: "",
      panNo: "",
      passportNo: "",
      temporaryAddress: "",
      permanentAddress: "",
      homeTown: "",
      homeDistrict: "",
      homeState: "",
      professionOfFather: "",
      designationOfFather: "",
      organizationOfWorking: "",
    },
    pastQualifications: {
      admissionYear: "",
      ssc: {
        board: "",
        passingYear: "",
        schoolName: "",
        city: "",
        district: "",
        state: "",
        percentage: "",
      },
      hsc: {
        board: "",
        passingYear: "",
        collegeName: "",
        city: "",
        district: "",
        state: "",
        percentage: "",
      },
      diploma: {
        board: "",
        passingYear: "",
        collegeName: "",
        city: "",
        district: "",
        state: "",
        percentage: "",
      },
    },
    academicDetails: {
      courseName: "",
      yearOfCompletion: "",
      collegeName: "",
      branch: "",
      universityRegNo: "",
      honours: "",
      rollNo: "",
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
    },
    otherInfo: {
      technicalAchievements: "",
      nonTechnicalAchievements: "",
      codingPlatforms: {
        codebes: { profile: "", rating: "" },
        github: { profile: "", rating: "" },
        leetcode: { profile: "", rating: "" },
        codechef: { profile: "", rating: "" },
        hackerrank: { profile: "", rating: "" },
        gfg: { profile: "", rating: "" },
        codeforces: { profile: "", rating: "" },
        hackerearth: { profile: "", rating: "" },
      },
      customPlatforms: [
        { name: "", link: "" },
        { name: "", link: "" },
        { name: "", link: "" },
      ],
    },
  });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Render modal content based on activeModal
  const renderModalContent = () => {
    switch (activeModal) {
      case "profile":
        return (
          <div className="space-y-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-20 h-20 p-4 rounded-full bg-slate-100" />
                )}
                <label
                  className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${
                    isDark
                      ? "border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-50"
                      : "border-slate-300 bg-white hover:bg-slate-50 text-slate-900"
                  }`}
                >
                  <Upload className="w-4 h-4" /> Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            {["name", "title", "location"].map((field) => (
              <InputField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={profileData[field]}
                onChange={(e) =>
                  setProfileData({ ...profileData, [field]: e.target.value })
                }
                isDark={isDark}
              />
            ))}
          </div>
        );
      case "personalInfo":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["firstName", "lastName", "email", "phone"].map((field) => (
              <InputField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={profileData.personalInfo[field]}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    personalInfo: {
                      ...profileData.personalInfo,
                      [field]: e.target.value,
                    },
                  })
                }
                isDark={isDark}
              />
            ))}
            <div className="md:col-span-2">
              <TextareaField
                label="Bio"
                value={profileData.personalInfo.bio}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    personalInfo: {
                      ...profileData.personalInfo,
                      bio: e.target.value,
                    },
                  })
                }
                isDark={isDark}
              />
            </div>
          </div>
        );

      case "personalDetails":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { field: "firstName", label: "First Name" },
              { field: "middleName", label: "Middle Name" },
              { field: "lastName", label: "Last Name" },
              {
                field: "gender",
                label: "Gender",
                type: "select",
                options: ["", "Male", "Female", "Other"],
              },
              { field: "dateOfBirth", label: "Date of Birth", type: "date" },
              { field: "studentMobNo", label: "Student Mobile" },
              { field: "parentMobNo", label: "Parent Mobile" },
              { field: "studentEmail", label: "Student Email", type: "email" },
              {
                field: "personalEmail",
                label: "Personal Email",
                type: "email",
              },
              { field: "parentEmail", label: "Parent Email", type: "email" },
              { field: "linkedin", label: "LinkedIn" },
              { field: "aadharNo", label: "Aadhar No" },
            ].map(({ field, label, type = "text", options }) =>
              type === "select" ? (
                <div key={field}>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    {label}
                  </label>
                  <select
                    value={profileData.personalDetails[field]}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        personalDetails: {
                          ...profileData.personalDetails,
                          [field]: e.target.value,
                        },
                      })
                    }
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      isDark
                        ? "bg-slate-950 border border-slate-600 text-slate-50"
                        : "bg-white border border-slate-300 text-slate-900"
                    }`}
                  >
                    {options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt || "Select"}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <InputField
                  key={field}
                  label={label}
                  type={type}
                  value={profileData.personalDetails[field]}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      personalDetails: {
                        ...profileData.personalDetails,
                        [field]: e.target.value,
                      },
                    })
                  }
                  isDark={isDark}
                />
              )
            )}
          </div>
        );
      case "pastQualifications":
        return (
          <div className="space-y-6">
            <InputField
              label="Admission Year"
              value={profileData.pastQualifications.admissionYear}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  pastQualifications: {
                    ...profileData.pastQualifications,
                    admissionYear: e.target.value,
                  },
                })
              }
              isDark={isDark}
            />
            <div>
              <h3
                className={`font-semibold mb-4 ${
                  isDark ? "text-slate-50" : "text-slate-900"
                }`}
              >
                SSC Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["board", "passingYear", "schoolName", "percentage"].map(
                  (field) => (
                    <InputField
                      key={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={profileData.pastQualifications.ssc[field]}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          pastQualifications: {
                            ...profileData.pastQualifications,
                            ssc: {
                              ...profileData.pastQualifications.ssc,
                              [field]: e.target.value,
                            },
                          },
                        })
                      }
                      isDark={isDark}
                    />
                  )
                )}
              </div>
            </div>
            <div>
              <h3
                className={`font-semibold mb-4 ${
                  isDark ? "text-slate-50" : "text-slate-900"
                }`}
              >
                Qualification Type
              </h3>
              <div className="flex gap-4 mb-4">
                {["hsc", "diploma"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={type}
                      checked={qualificationType === type}
                      onChange={(e) => setQualificationType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span
                      className={isDark ? "text-slate-200" : "text-slate-900"}
                    >
                      {type.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
              {qualificationType === "hsc" ? (
                <div>
                  <h4
                    className={`font-medium mb-4 ${
                      isDark ? "text-slate-50" : "text-slate-900"
                    }`}
                  >
                    HSC Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["board", "passingYear", "collegeName", "percentage"].map(
                      (field) => (
                        <InputField
                          key={field}
                          label={field.charAt(0).toUpperCase() + field.slice(1)}
                          value={profileData.pastQualifications.hsc[field]}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              pastQualifications: {
                                ...profileData.pastQualifications,
                                hsc: {
                                  ...profileData.pastQualifications.hsc,
                                  [field]: e.target.value,
                                },
                              },
                            })
                          }
                          isDark={isDark}
                        />
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h4
                    className={`font-medium mb-4 ${
                      isDark ? "text-slate-50" : "text-slate-900"
                    }`}
                  >
                    Diploma Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["board", "passingYear", "collegeName", "percentage"].map(
                      (field) => (
                        <InputField
                          key={field}
                          label={field.charAt(0).toUpperCase() + field.slice(1)}
                          value={profileData.pastQualifications.diploma[field]}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              pastQualifications: {
                                ...profileData.pastQualifications,
                                diploma: {
                                  ...profileData.pastQualifications.diploma,
                                  [field]: e.target.value,
                                },
                              },
                            })
                          }
                          isDark={isDark}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case "academicDetails":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "courseName",
                "yearOfCompletion",
                "collegeName",
                "branch",
                "universityRegNo",
                "honours",
                "rollNo",
                "division",
              ].map((field) => (
                <InputField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={profileData.academicDetails[field]}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      academicDetails: {
                        ...profileData.academicDetails,
                        [field]: e.target.value,
                      },
                    })
                  }
                  isDark={isDark}
                />
              ))}
            </div>
            <div>
              <h3
                className={`font-semibold mb-4 ${
                  isDark ? "text-slate-50" : "text-slate-900"
                }`}
              >
                Semester SGPA
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "feSem1",
                  "feSem2",
                  "seSem1",
                  "seSem2",
                  "teSem1",
                  "teSem2",
                  "beSem1",
                  "beSem2",
                ].map((sem) => (
                  <InputField
                    key={sem}
                    label={sem.replace("Sem", " Sem ").toUpperCase()}
                    value={profileData.academicDetails[sem].sgpa}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        academicDetails: {
                          ...profileData.academicDetails,
                          [sem]: { sgpa: e.target.value },
                        },
                      })
                    }
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["liveBacklogs", "deadBacklogs", "yearsDown"].map((field) => (
                <InputField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={profileData.academicDetails[field]}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      academicDetails: {
                        ...profileData.academicDetails,
                        [field]: e.target.value,
                      },
                    })
                  }
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        );
      case "otherInfo":
        return (
          <div className="space-y-6">
            <TextareaField
              label="Technical Achievements"
              value={profileData.otherInfo.technicalAchievements}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  otherInfo: {
                    ...profileData.otherInfo,
                    technicalAchievements: e.target.value,
                  },
                })
              }
              isDark={isDark}
            />
            <TextareaField
              label="Non-Technical Achievements"
              value={profileData.otherInfo.nonTechnicalAchievements}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  otherInfo: {
                    ...profileData.otherInfo,
                    nonTechnicalAchievements: e.target.value,
                  },
                })
              }
              isDark={isDark}
            />
            <div>
              <h3
                className={`font-semibold mb-4 ${
                  isDark ? "text-slate-50" : "text-slate-900"
                }`}
              >
                Coding Platforms
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(profileData.otherInfo.codingPlatforms).map(
                  ([key, platform]) => (
                    <InputField
                      key={key}
                      label={key.toUpperCase()}
                      value={platform.profile}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          otherInfo: {
                            ...profileData.otherInfo,
                            codingPlatforms: {
                              ...profileData.otherInfo.codingPlatforms,
                              [key]: { ...platform, profile: e.target.value },
                            },
                          },
                        })
                      }
                      isDark={isDark}
                    />
                  )
                )}
              </div>
            </div>
            <div>
              <h3
                className={`font-semibold mb-4 ${
                  isDark ? "text-slate-50" : "text-slate-900"
                }`}
              >
                Additional Platforms
              </h3>
              {profileData.otherInfo.customPlatforms.map((platform, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                >
                  <InputField
                    label="Platform Name"
                    value={platform.name}
                    onChange={(e) => {
                      const newPlatforms = [
                        ...profileData.otherInfo.customPlatforms,
                      ];
                      newPlatforms[index].name = e.target.value;
                      setProfileData({
                        ...profileData,
                        otherInfo: {
                          ...profileData.otherInfo,
                          customPlatforms: newPlatforms,
                        },
                      });
                    }}
                    isDark={isDark}
                  />
                  <InputField
                    label="Platform Link"
                    value={platform.link}
                    onChange={(e) => {
                      const newPlatforms = [
                        ...profileData.otherInfo.customPlatforms,
                      ];
                      newPlatforms[index].link = e.target.value;
                      setProfileData({
                        ...profileData,
                        otherInfo: {
                          ...profileData.otherInfo,
                          customPlatforms: newPlatforms,
                        },
                      });
                    }}
                    isDark={isDark}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gradient-to-br from-slate-950 to-slate-900"
          : "bg-gradient-to-br from-slate-50 to-slate-100"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-slate-50" : "text-slate-900"
            }`}
          >
            Profile
          </h1>
          <p className={`mt-1 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Manage your profile information
          </p>
        </div>
        <div className="space-y-6">
          {/* Profile Header */}
          <SectionCard
            title="Profile Header"
            onEdit={() => setActiveModal("profile")}
            isDark={isDark}
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-24 h-24 p-6 rounded-full bg-slate-100" />
                )}
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {["name", "title", "location"].map((field) => (
                  <FieldDisplay
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={profileData[field]}
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
          </SectionCard>
          {/* Personal Info */}
          <SectionCard
            title="Personal Info"
            onEdit={() => setActiveModal("personalInfo")}
            isDark={isDark}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {["firstName", "lastName", "email", "phone"].map((field) => (
                <FieldDisplay
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={profileData.personalInfo[field]}
                  isDark={isDark}
                />
              ))}
              <div className="md:col-span-3">
                <FieldDisplay
                  label="Bio"
                  value={profileData.personalInfo.bio}
                  isDark={isDark}
                />
              </div>
            </div>
          </SectionCard>

          {/* Personal Details */}
          <SectionCard
            title="Personal Details"
            onEdit={() => setActiveModal("personalDetails")}
            isDark={isDark}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "firstName",
                "middleName",
                "lastName",
                "gender",
                "dateOfBirth",
                "studentMobNo",
                "parentMobNo",
                "studentEmail",
                "personalEmail",
                "parentEmail",
                "linkedin",
                "aadharNo",
              ].map((field) => (
                <FieldDisplay
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={profileData.personalDetails[field]}
                  isDark={isDark}
                />
              ))}
            </div>
          </SectionCard>
          {/* Past Qualifications */}
          <SectionCard
            title="Past Qualifications"
            onEdit={() => setActiveModal("pastQualifications")}
            isDark={isDark}
          >
            <FieldDisplay
              label="Admission Year"
              value={profileData.pastQualifications.admissionYear}
              isDark={isDark}
            />
            <div className="mt-6">
              <h3
                className={`font-semibold mb-4 ${
                  isDark ? "text-slate-50" : "text-slate-900"
                }`}
              >
                SSC Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {["board", "passingYear", "schoolName", "percentage"].map(
                  (field) => (
                    <FieldDisplay
                      key={field}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={profileData.pastQualifications.ssc[field]}
                      isDark={isDark}
                    />
                  )
                )}
              </div>
            </div>
            <div className="mt-6">
              <h3
                className={`font-semibold mb-4 ${
                  isDark ? "text-slate-50" : "text-slate-900"
                }`}
              >
                {qualificationType === "hsc" ? "HSC" : "Diploma"} Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "board",
                  "passingYear",
                  qualificationType === "hsc" ? "collegeName" : "collegeName",
                  "percentage",
                ].map((field) => (
                  <FieldDisplay
                    key={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={
                      profileData.pastQualifications[qualificationType][field]
                    }
                    isDark={isDark}
                  />
                ))}
              </div>
            </div>
          </SectionCard>
          {/* Academic Details */}
          <SectionCard
            title="Academic Details"
            onEdit={() => setActiveModal("academicDetails")}
            isDark={isDark}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "courseName",
                "yearOfCompletion",
                "collegeName",
                "branch",
                "universityRegNo",
                "honours",
                "rollNo",
                "division",
              ].map((field) => (
                <FieldDisplay
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={profileData.academicDetails[field]}
                  isDark={isDark}
                />
              ))}
            </div>
          </SectionCard>
          {/* Other Information */}
          <SectionCard
            title="Other Information"
            onEdit={() => setActiveModal("otherInfo")}
            isDark={isDark}
          >
            <FieldDisplay
              label="Technical Achievements"
              value={profileData.otherInfo.technicalAchievements}
              isDark={isDark}
            />
            <FieldDisplay
              label="Non-Technical Achievements"
              value={profileData.otherInfo.nonTechnicalAchievements}
              isDark={isDark}
            />
            <div className="mt-6">
              <h3
                className={`font-semibold mb-4 ${
                  isDark ? "text-slate-50" : "text-slate-900"
                }`}
              >
                Coding Platforms
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(profileData.otherInfo.codingPlatforms).map(
                  ([key]) => (
                    <FieldDisplay
                      key={key}
                      label={key.toUpperCase()}
                      value={profileData.otherInfo.codingPlatforms[key].profile}
                      isDark={isDark}
                    />
                  )
                )}
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
      {/* Modal */}
      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={`${
          activeModal
            ? `Edit ${activeModal
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}`
            : ""
        }`}
        isDark={isDark}
      >
        {renderModalContent()}
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setActiveModal(null)}
            className={`px-4 py-2 border rounded-lg transition-colors ${
              isDark
                ? "border-slate-600 bg-slate-700 hover:bg-slate-600 text-slate-50"
                : "border-slate-300 bg-white hover:bg-slate-50 text-slate-900"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
