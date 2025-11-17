import React, { useState } from "react";
import { X, Edit2, Upload, User } from "lucide-react";

// Add Urbanist font
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  * {
    font-family: 'Urbanist', sans-serif;
  }
`;
document.head.appendChild(style);

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Section Card Component
const SectionCard = ({ title, onEdit, children }) => (
  <div className="bg-white rounded-lg border shadow-sm">
    <div className="px-6 py-4 border-b flex items-center justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button
        onClick={onEdit}
        className="flex items-center gap-2 px-4 py-2 text-sm border rounded hover:bg-gray-50 transition-colors"
      >
        <Edit2 className="w-4 h-4" />
        Edit
      </button>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

// Field Display Component
const FieldDisplay = ({ label, value }) => (
  <div className="mb-4">
    <label className="text-sm text-gray-600 block mb-1">{label}</label>
    <p className="text-base font-medium text-gray-900">
      {value || "Not provided"}
    </p>
  </div>
);

const Profile = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [qualificationType, setQualificationType] = useState("hsc"); // 'hsc' or 'diploma'

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
    temporaryAddress: "",
    permanentAddress: "",
    homeTown: "",
    homeDistrict: "",
    homeState: "",
    professionOfFather: "",
    designationOfFather: "",
    organizationOfWorking: "",
    aadharNo: "",
    panNo: "",
    passportNo: "",
    linkedin: "",
  });

  const [pastQualifications, setPastQualifications] = useState({
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
  });

  const [academicDetails, setAcademicDetails] = useState({
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
  });

  const [otherInfo, setOtherInfo] = useState({
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-gray-900">Profile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Profile Header */}
          <SectionCard
            title="Profile Header"
            onEdit={() => setActiveModal("profile")}
          >
            <div className="flex items-start gap-6">
              <div className="relative">
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
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4">
                <FieldDisplay label="Name" value={profileData.name} />
                <FieldDisplay label="Title" value={profileData.title} />
                <FieldDisplay label="Location" value={profileData.location} />
              </div>
            </div>
          </SectionCard>

          {/* Personal Info */}
          <SectionCard
            title="Personal Info"
            onEdit={() => setActiveModal("personalInfo")}
          >
            <div className="grid grid-cols-3 gap-4">
              <FieldDisplay label="First Name" value={personalInfo.firstName} />
              <FieldDisplay label="Last Name" value={personalInfo.lastName} />
              <FieldDisplay label="Email" value={personalInfo.email} />
              <FieldDisplay label="Phone" value={personalInfo.phone} />
              <FieldDisplay label="Bio" value={personalInfo.bio} />
            </div>
          </SectionCard>

          {/* Address */}
          <SectionCard title="Address" onEdit={() => setActiveModal("address")}>
            <div className="grid grid-cols-2 gap-4">
              <FieldDisplay label="Country" value={address.country} />
              <FieldDisplay label="City/State" value={address.cityState} />
              <FieldDisplay label="Postal Code" value={address.postalCode} />
              <FieldDisplay label="Tax ID" value={address.taxId} />
            </div>
          </SectionCard>

          {/* Personal Details */}
          <SectionCard
            title="Personal Details"
            onEdit={() => setActiveModal("personalDetails")}
          >
            <div className="grid grid-cols-3 gap-4">
              <FieldDisplay
                label="First Name"
                value={personalDetails.firstName}
              />
              <FieldDisplay
                label="Middle Name"
                value={personalDetails.middleName}
              />
              <FieldDisplay
                label="Last Name"
                value={personalDetails.lastName}
              />
              <FieldDisplay label="Gender" value={personalDetails.gender} />
              <FieldDisplay
                label="Date of Birth"
                value={personalDetails.dateOfBirth}
              />
              <FieldDisplay
                label="Student Mobile"
                value={personalDetails.studentMobNo}
              />
              <FieldDisplay
                label="Parent Mobile"
                value={personalDetails.parentMobNo}
              />
              <FieldDisplay
                label="Student Email"
                value={personalDetails.studentEmail}
              />
              <FieldDisplay
                label="Personal Email"
                value={personalDetails.personalEmail}
              />
              <FieldDisplay
                label="Parent Email"
                value={personalDetails.parentEmail}
              />
              <FieldDisplay label="LinkedIn" value={personalDetails.linkedin} />
              <FieldDisplay
                label="Aadhar No"
                value={personalDetails.aadharNo}
              />
            </div>
          </SectionCard>

          {/* Past Qualifications */}
          <SectionCard
            title="Past Qualifications"
            onEdit={() => setActiveModal("pastQualifications")}
          >
            <FieldDisplay
              label="Admission Year"
              value={pastQualifications.admissionYear}
            />

            <div className="mt-6">
              <h3 className="font-semibold mb-4">SSC Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <FieldDisplay
                  label="Board"
                  value={pastQualifications.ssc.board}
                />
                <FieldDisplay
                  label="Passing Year"
                  value={pastQualifications.ssc.passingYear}
                />
                <FieldDisplay
                  label="School Name"
                  value={pastQualifications.ssc.schoolName}
                />
                <FieldDisplay
                  label="Percentage"
                  value={pastQualifications.ssc.percentage}
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">
                {qualificationType === "hsc" ? "HSC" : "Diploma"} Details
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {qualificationType === "hsc" ? (
                  <>
                    <FieldDisplay
                      label="Board"
                      value={pastQualifications.hsc.board}
                    />
                    <FieldDisplay
                      label="Passing Year"
                      value={pastQualifications.hsc.passingYear}
                    />
                    <FieldDisplay
                      label="College Name"
                      value={pastQualifications.hsc.collegeName}
                    />
                    <FieldDisplay
                      label="Percentage"
                      value={pastQualifications.hsc.percentage}
                    />
                  </>
                ) : (
                  <>
                    <FieldDisplay
                      label="Board"
                      value={pastQualifications.diploma.board}
                    />
                    <FieldDisplay
                      label="Passing Year"
                      value={pastQualifications.diploma.passingYear}
                    />
                    <FieldDisplay
                      label="College Name"
                      value={pastQualifications.diploma.collegeName}
                    />
                    <FieldDisplay
                      label="Percentage"
                      value={pastQualifications.diploma.percentage}
                    />
                  </>
                )}
              </div>
            </div>
          </SectionCard>

          {/* Academic Details */}
          <SectionCard
            title="Academic Details"
            onEdit={() => setActiveModal("academicDetails")}
          >
            <div className="grid grid-cols-3 gap-4">
              <FieldDisplay
                label="Course Name"
                value={academicDetails.courseName}
              />
              <FieldDisplay label="Branch" value={academicDetails.branch} />
              <FieldDisplay
                label="College Name"
                value={academicDetails.collegeName}
              />
              <FieldDisplay
                label="Year of Completion"
                value={academicDetails.yearOfCompletion}
              />
              <FieldDisplay
                label="University Reg No"
                value={academicDetails.universityRegNo}
              />
              <FieldDisplay label="Roll No" value={academicDetails.rollNo} />
            </div>
          </SectionCard>

          {/* Other Information */}
          <SectionCard
            title="Other Information"
            onEdit={() => setActiveModal("otherInfo")}
          >
            <FieldDisplay
              label="Technical Achievements"
              value={otherInfo.technicalAchievements}
            />
            <FieldDisplay
              label="Non-Technical Achievements"
              value={otherInfo.nonTechnicalAchievements}
            />

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Coding Platforms</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(otherInfo.codingPlatforms).map(
                  ([key, platform]) => (
                    <FieldDisplay
                      key={key}
                      label={key.toUpperCase()}
                      value={platform.profile}
                    />
                  )
                )}
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Profile Modal */}
      <Modal
        isOpen={activeModal === "profile"}
        onClose={() => setActiveModal(null)}
        title="Edit Profile Header"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
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
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
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
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) =>
                setProfileData({ ...profileData, location: e.target.value })
              }
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Personal Info Modal */}
      <Modal
        isOpen={activeModal === "personalInfo"}
        onClose={() => setActiveModal(null)}
        title="Edit Personal Info"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, firstName: e.target.value })
              }
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              value={personalInfo.lastName}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, lastName: e.target.value })
              }
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, phone: e.target.value })
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
              rows={3}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Address Modal */}
      <Modal
        isOpen={activeModal === "address"}
        onClose={() => setActiveModal(null)}
        title="Edit Address"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
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
            <label className="block text-sm font-medium mb-2">City/State</label>
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
            <label className="block text-sm font-medium mb-2">Tax ID</label>
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
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Personal Details Modal */}
      <Modal
        isOpen={activeModal === "personalDetails"}
        onClose={() => setActiveModal(null)}
        title="Edit Personal Details"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
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
            <label className="block text-sm font-medium mb-2">Last Name</label>
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
            <label className="block text-sm font-medium mb-2">Gender</label>
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
            <label className="block text-sm font-medium mb-2">Aadhar No</label>
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
            <label className="block text-sm font-medium mb-2">LinkedIn</label>
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
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Past Qualifications Modal */}
      <Modal
        isOpen={activeModal === "pastQualifications"}
        onClose={() => setActiveModal(null)}
        title="Edit Past Qualifications"
      >
        <div className="space-y-6">
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
            <h3 className="font-semibold mb-4">SSC Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Board</label>
                <input
                  type="text"
                  value={pastQualifications.ssc.board}
                  onChange={(e) =>
                    setPastQualifications({
                      ...pastQualifications,
                      ssc: { ...pastQualifications.ssc, board: e.target.value },
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
            <h3 className="font-semibold mb-4">Qualification Type</h3>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="hsc"
                  checked={qualificationType === "hsc"}
                  onChange={(e) => setQualificationType(e.target.value)}
                  className="w-4 h-4"
                />
                <span>HSC</span>
              </label>
              <label className="flex items-center gap-2">
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
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Academic Details Modal */}
      <Modal
        isOpen={activeModal === "academicDetails"}
        onClose={() => setActiveModal(null)}
        title="Edit Academic Details"
      >
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
            <label className="block text-sm font-medium mb-2">Branch</label>
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
            <label className="block text-sm font-medium mb-2">Roll No</label>
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
            <label className="block text-sm font-medium mb-2">Honours</label>
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
            <label className="block text-sm font-medium mb-2">Division</label>
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

        <div className="mt-6">
          <h3 className="font-semibold mb-4">Semester SGPA</h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">FE Sem 1</label>
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
              <label className="block text-sm font-medium mb-2">FE Sem 2</label>
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
              <label className="block text-sm font-medium mb-2">SE Sem 1</label>
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
              <label className="block text-sm font-medium mb-2">SE Sem 2</label>
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
              <label className="block text-sm font-medium mb-2">TE Sem 1</label>
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
              <label className="block text-sm font-medium mb-2">TE Sem 2</label>
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
              <label className="block text-sm font-medium mb-2">BE Sem 1</label>
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
              <label className="block text-sm font-medium mb-2">BE Sem 2</label>
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

        <div className="mt-6 grid grid-cols-3 gap-4">
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
            <label className="block text-sm font-medium mb-2">Years Down</label>
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

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Other Info Modal */}
      <Modal
        isOpen={activeModal === "otherInfo"}
        onClose={() => setActiveModal(null)}
        title="Edit Other Information"
      >
        <div className="space-y-6">
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
            />
          </div>

          <div>
            <h3 className="font-semibold mb-4">Coding Platforms</h3>
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
                            [key]: { ...platform, profile: e.target.value },
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
            <h3 className="font-semibold mb-4">Additional Platforms</h3>
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
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
