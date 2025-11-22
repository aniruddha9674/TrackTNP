import React, { useState, useMemo } from "react";
import {
  Shield,
  Users,
  Building2,
  Lock,
  X,
  CheckCircle2,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

const StaffPermissionsManager = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const [colleges, setColleges] = useState([
    {
      id: 1,
      name: "Engineering College",
      staffCount: 12,
      activePermissions: 0,
    },
    {
      id: 2,
      name: "Arts & Science College",
      staffCount: 8,
      activePermissions: 0,
    },
    { id: 3, name: "Commerce College", staffCount: 10, activePermissions: 0 },
  ]);

  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const [staffPermissions, setStaffPermissions] = useState([
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      permissions: {
        studentDetails: { view: false, add: false, delete: false },
        company: { view: false, add: false, delete: false },
        certification: { view: false, add: false, delete: false },
        internships: { view: false, add: false, delete: false },
        offerLetter: { view: false, add: false, delete: false },
        finalOfferLetter: { view: false, add: false, delete: false },
        feedbackForm: { view: false, add: false, delete: false },
        otherInformation: { view: false, add: false, delete: false },
        codingPlatformLinks: { view: false, add: false, delete: false },
      },
    },
    {
      id: 2,
      name: "Prof. Priya Sharma",
      permissions: {
        studentDetails: { view: false, add: false, delete: false },
        company: { view: false, add: false, delete: false },
        certification: { view: false, add: false, delete: false },
        internships: { view: false, add: false, delete: false },
        offerLetter: { view: false, add: false, delete: false },
        finalOfferLetter: { view: false, add: false, delete: false },
        feedbackForm: { view: false, add: false, delete: false },
        otherInformation: { view: false, add: false, delete: false },
        codingPlatformLinks: { view: false, add: false, delete: false },
      },
    },
    {
      id: 3,
      name: "Mr. Amit Patel",
      permissions: {
        studentDetails: { view: false, add: false, delete: false },
        company: { view: false, add: false, delete: false },
        certification: { view: false, add: false, delete: false },
        internships: { view: false, add: false, delete: false },
        offerLetter: { view: false, add: false, delete: false },
        finalOfferLetter: { view: false, add: false, delete: false },
        feedbackForm: { view: false, add: false, delete: false },
        otherInformation: { view: false, add: false, delete: false },
        codingPlatformLinks: { view: false, add: false, delete: false },
      },
    },
    {
      id: 4,
      name: "Dr. Sneha Desai",
      permissions: {
        studentDetails: { view: false, add: false, delete: false },
        company: { view: false, add: false, delete: false },
        certification: { view: false, add: false, delete: false },
        internships: { view: false, add: false, delete: false },
        offerLetter: { view: false, add: false, delete: false },
        finalOfferLetter: { view: false, add: false, delete: false },
        feedbackForm: { view: false, add: false, delete: false },
        otherInformation: { view: false, add: false, delete: false },
        codingPlatformLinks: { view: false, add: false, delete: false },
      },
    },
  ]);

  const permissionFields = [
    { key: "studentDetails", label: "Student Details" },
    { key: "company", label: "Company" },
    { key: "certification", label: "Certification" },
    { key: "internships", label: "Internships" },
    { key: "offerLetter", label: "Offer Letter" },
    { key: "finalOfferLetter", label: "Final Offer Letter" },
    { key: "feedbackForm", label: "Feedback Form" },
    { key: "otherInformation", label: "Other Information" },
    { key: "codingPlatformLinks", label: "Coding Platform Links" },
  ];

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getLightTheme = () => ({
    background: "bg-gradient-to-br from-slate-50 to-slate-100",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    cardShadow: "shadow-md",
    cardHoverShadow: "hover:shadow-xl",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    textTertiary: "text-slate-400",
    inputBg: "bg-white",
    inputBorder: "border-slate-300",
    modalOverlay: "bg-black/60",
    modalBg: "bg-slate-50",
    modalHeader: "bg-white",
    modalHeaderBorder: "border-slate-200",
    statCard1Gradient: "from-white to-blue-50",
    statCard2Gradient: "from-white to-green-50",
    statCard3Gradient: "from-white to-purple-50",
    statCard4Gradient: "from-white to-amber-50",
    statIcon1Bg: "bg-blue-100",
    statIcon1Text: "text-blue-600",
    statIcon2Bg: "bg-green-100",
    statIcon2Text: "text-green-600",
    statIcon3Bg: "bg-purple-100",
    statIcon3Text: "text-purple-600",
    statIcon4Bg: "bg-amber-100",
    statIcon4Text: "text-amber-600",
    dividerBorder: "border-slate-200",
    buttonBg: "bg-white",
    buttonBorder: "border-slate-300",
    buttonHover: "hover:bg-slate-50",
    tableBg: "bg-white",
    tableHeaderBg: "bg-slate-100",
    tableRowHover: "hover:bg-slate-50",
    checkboxBorder: "border-slate-300",
    scrollbar: "scrollbar-light",
  });

  const getDarkTheme = () => ({
    background: "bg-gradient-to-br from-slate-950 to-slate-900",
    cardBg: "bg-slate-900",
    cardBorder: "border-slate-700",
    cardShadow: "shadow-lg shadow-black/20",
    cardHoverShadow: "hover:shadow-2xl hover:shadow-black/40",
    textPrimary: "text-slate-50",
    textSecondary: "text-slate-400",
    textTertiary: "text-slate-500",
    inputBg: "bg-slate-950",
    inputBorder: "border-slate-600",
    modalOverlay: "bg-black/80",
    modalBg: "bg-slate-950",
    modalHeader: "bg-slate-900",
    modalHeaderBorder: "border-slate-700",
    statCard1Gradient: "from-slate-800 to-blue-900/30",
    statCard2Gradient: "from-slate-800 to-green-900/30",
    statCard3Gradient: "from-slate-800 to-purple-900/30",
    statCard4Gradient: "from-slate-800 to-amber-900/30",
    statIcon1Bg: "bg-blue-900/30",
    statIcon1Text: "text-blue-400",
    statIcon2Bg: "bg-green-900/30",
    statIcon2Text: "text-green-400",
    statIcon3Bg: "bg-purple-900/30",
    statIcon3Text: "text-purple-400",
    statIcon4Bg: "bg-amber-900/30",
    statIcon4Text: "text-amber-400",
    dividerBorder: "border-slate-700",
    buttonBg: "bg-slate-700",
    buttonBorder: "border-slate-600",
    buttonHover: "hover:bg-slate-600",
    tableBg: "bg-slate-900",
    tableHeaderBg: "bg-slate-800",
    tableRowHover: "hover:bg-slate-800/50",
    checkboxBorder: "border-slate-600",
    scrollbar: "scrollbar-dark",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  const stats = useMemo(() => {
    const totalColleges = colleges.length;
    const totalStaff = colleges.reduce(
      (sum, college) => sum + college.staffCount,
      0
    );
    const activePermissions = colleges.reduce(
      (sum, college) => sum + college.activePermissions,
      0
    );
    const avgPermissions =
      totalColleges > 0 ? (activePermissions / totalStaff).toFixed(1) : 0;

    return { totalColleges, totalStaff, activePermissions, avgPermissions };
  }, [colleges]);

  const handlePermissionToggle = (staffId, field, permissionType) => {
    setStaffPermissions((prev) =>
      prev.map((staff) =>
        staff.id === staffId
          ? {
              ...staff,
              permissions: {
                ...staff.permissions,
                [field]: {
                  ...staff.permissions[field],
                  [permissionType]: !staff.permissions[field][permissionType],
                },
              },
            }
          : staff
      )
    );
  };

  const handleSelectAll = (field, permissionType) => {
    const allChecked = staffPermissions.every(
      (staff) => staff.permissions[field][permissionType]
    );

    setStaffPermissions((prev) =>
      prev.map((staff) => ({
        ...staff,
        permissions: {
          ...staff.permissions,
          [field]: {
            ...staff.permissions[field],
            [permissionType]: !allChecked,
          },
        },
      }))
    );
  };

  const isAllSelected = (field, permissionType) => {
    return staffPermissions.every(
      (staff) => staff.permissions[field][permissionType]
    );
  };

  const handleGrantPermissions = (college) => {
    setSelectedCollege(college);
    setShowPermissionsModal(true);
  };

  const handleSavePermissions = () => {
    setShowPermissionsModal(false);
    setSelectedCollege(null);
  };

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <style>{`
        .scrollbar-light::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-light::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .scrollbar-light::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .scrollbar-light::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        .scrollbar-dark::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-dark::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 4px;
        }
        .scrollbar-dark::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }
        .scrollbar-dark::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>

      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Staff Permissions Management
            </h1>
            <p className={`text-sm ${themeStyles.textSecondary} mt-1`}>
              Manage access controls for staff members across different modules
            </p>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              icon: Building2,
              label: "Total Colleges",
              value: stats.totalColleges,
              subtitle: "institutes registered",
              bgColor: themeStyles.statCard1Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon1Bg,
              iconColor: themeStyles.statIcon1Text,
            },
            {
              icon: Users,
              label: "Total Staff",
              value: stats.totalStaff,
              subtitle: "staff members",
              bgColor: themeStyles.statCard2Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon2Bg,
              iconColor: themeStyles.statIcon2Text,
            },
            {
              icon: Shield,
              label: "Active Permissions",
              value: stats.activePermissions,
              subtitle: "permissions granted",
              bgColor: themeStyles.statCard3Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon3Bg,
              iconColor: themeStyles.statIcon3Text,
            },
            {
              icon: Lock,
              label: "Avg Permissions",
              value: stats.avgPermissions,
              subtitle: "per staff member",
              bgColor: themeStyles.statCard4Gradient,
              borderColor: themeStyles.dividerBorder,
              iconBg: themeStyles.statIcon4Bg,
              iconColor: themeStyles.statIcon4Text,
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border ${stat.borderColor} p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br ${stat.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    {stat.label}
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stat.value}
                  </h3>
                  <p className={`text-sm ${themeStyles.textTertiary} mt-1`}>
                    {stat.subtitle}
                  </p>
                </div>
                <div
                  className={`h-12 w-12 ${stat.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* College Cards */}
        <div>
          <h2
            className={`text-xl font-semibold ${themeStyles.textPrimary} mb-4`}
          >
            Colleges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <div
                key={college.id}
                className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 overflow-hidden ${themeStyles.cardBg}`}
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`h-14 w-14 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <Building2
                        className={`h-7 w-7 ${themeStyles.statIcon1Text}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-lg font-bold ${themeStyles.textPrimary} mb-1`}
                      >
                        {college.name}
                      </h3>
                      <p className={`text-sm ${themeStyles.textSecondary}`}>
                        College ID: {college.id}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div
                      className={`flex items-center justify-between py-3 border-b ${themeStyles.dividerBorder}`}
                    >
                      <span className={`text-sm ${themeStyles.textSecondary}`}>
                        Staff Members
                      </span>
                      <span
                        className={`text-lg font-bold ${themeStyles.textPrimary}`}
                      >
                        {college.staffCount}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between py-3`}>
                      <span className={`text-sm ${themeStyles.textSecondary}`}>
                        Active Permissions
                      </span>
                      <span
                        className={`text-lg font-bold ${themeStyles.textPrimary}`}
                      >
                        {college.activePermissions}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleGrantPermissions(college)}
                    className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-md hover:shadow-lg"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Grant Permissions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Modal */}
        {showPermissionsModal && selectedCollege && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-[95vw] max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border ${themeStyles.cardBorder} ${themeStyles.modalBg}`}
            >
              {/* Header */}
              <div
                className={`${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <div>
                  <h2
                    className={`text-2xl font-bold ${themeStyles.textPrimary}`}
                  >
                    {selectedCollege.name} - Staff Permissions
                  </h2>
                  <p className={`text-sm ${themeStyles.textSecondary} mt-1`}>
                    Manage view, add, and delete permissions for each module
                  </p>
                </div>
                <button
                  onClick={() => setShowPermissionsModal(false)}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body - Scrollable Table */}
              <div
                className={`overflow-auto max-h-[calc(90vh-200px)] ${themeStyles.scrollbar}`}
              >
                <table className={`w-full ${themeStyles.tableBg}`}>
                  <thead
                    className={`${themeStyles.tableHeaderBg} sticky top-0 z-10`}
                  >
                    <tr>
                      <th
                        className={`px-4 py-4 text-left text-sm font-semibold ${themeStyles.textPrimary} border-b ${themeStyles.dividerBorder} sticky left-0 ${themeStyles.tableHeaderBg} z-20`}
                      >
                        Sr No
                      </th>
                      <th
                        className={`px-4 py-4 text-left text-sm font-semibold ${themeStyles.textPrimary} border-b ${themeStyles.dividerBorder} sticky left-[72px] ${themeStyles.tableHeaderBg} z-20 min-w-[180px]`}
                      >
                        Staff Name
                      </th>
                      {permissionFields.map((field) => (
                        <th
                          key={field.key}
                          className={`px-4 py-3 text-center text-sm font-semibold ${themeStyles.textPrimary} border-b ${themeStyles.dividerBorder} min-w-[200px]`}
                        >
                          <div className="mb-2">{field.label}</div>
                          <div className="flex items-center justify-center gap-6">
                            <label className="flex flex-col items-center gap-1 cursor-pointer">
                              <span
                                className={`text-xs ${themeStyles.textSecondary}`}
                              >
                                View
                              </span>
                              <input
                                type="checkbox"
                                checked={isAllSelected(field.key, "view")}
                                onChange={() =>
                                  handleSelectAll(field.key, "view")
                                }
                                className="h-4 w-4 rounded border-2 border-blue-500 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                              />
                            </label>
                            <label className="flex flex-col items-center gap-1 cursor-pointer">
                              <span
                                className={`text-xs ${themeStyles.textSecondary}`}
                              >
                                Add
                              </span>
                              <input
                                type="checkbox"
                                checked={isAllSelected(field.key, "add")}
                                onChange={() =>
                                  handleSelectAll(field.key, "add")
                                }
                                className="h-4 w-4 rounded border-2 border-green-500 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
                              />
                            </label>
                            <label className="flex flex-col items-center gap-1 cursor-pointer">
                              <span
                                className={`text-xs ${themeStyles.textSecondary}`}
                              >
                                Delete
                              </span>
                              <input
                                type="checkbox"
                                checked={isAllSelected(field.key, "delete")}
                                onChange={() =>
                                  handleSelectAll(field.key, "delete")
                                }
                                className="h-4 w-4 rounded border-2 border-red-500 text-red-600 focus:ring-2 focus:ring-red-500 cursor-pointer"
                              />
                            </label>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {staffPermissions.map((staff, index) => (
                      <tr
                        key={staff.id}
                        className={`${themeStyles.tableRowHover} border-b ${themeStyles.dividerBorder} transition-colors`}
                      >
                        <td
                          className={`px-4 py-4 text-sm font-medium ${themeStyles.textPrimary} sticky left-0 ${themeStyles.tableBg}`}
                        >
                          {index + 1}
                        </td>
                        <td
                          className={`px-4 py-4 text-sm font-medium ${themeStyles.textPrimary} sticky left-[72px] ${themeStyles.tableBg}`}
                        >
                          {staff.name}
                        </td>
                        {permissionFields.map((field) => (
                          <td key={field.key} className="px-4 py-4">
                            <div className="flex items-center justify-center gap-8">
                              <input
                                type="checkbox"
                                checked={staff.permissions[field.key].view}
                                onChange={() =>
                                  handlePermissionToggle(
                                    staff.id,
                                    field.key,
                                    "view"
                                  )
                                }
                                className="h-4 w-4 rounded border-2 border-blue-500 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                              />
                              <input
                                type="checkbox"
                                checked={staff.permissions[field.key].add}
                                onChange={() =>
                                  handlePermissionToggle(
                                    staff.id,
                                    field.key,
                                    "add"
                                  )
                                }
                                className="h-4 w-4 rounded border-2 border-green-500 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
                              />
                              <input
                                type="checkbox"
                                checked={staff.permissions[field.key].delete}
                                onChange={() =>
                                  handlePermissionToggle(
                                    staff.id,
                                    field.key,
                                    "delete"
                                  )
                                }
                                className="h-4 w-4 rounded border-2 border-red-500 text-red-600 focus:ring-2 focus:ring-red-500 cursor-pointer"
                              />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div
                className={`${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-t px-6 py-4 flex justify-end gap-3`}
              >
                <button
                  onClick={() => setShowPermissionsModal(false)}
                  className={`inline-flex items-center justify-center px-6 py-2.5 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePermissions}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Save Permissions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffPermissionsManager;
