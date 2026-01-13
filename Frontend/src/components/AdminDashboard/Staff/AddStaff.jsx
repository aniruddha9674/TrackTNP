import React, { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  Users,
  Building2,
  UserCheck,
  UserX,
  ChevronRight,
  ArrowLeft,
  Phone,
  Mail,
  Search,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

const StaffDetailsManager = () => {
  const { theme } = useTheme();
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "PATEL",
      email: "imrankpatel7861@gmail.com",
      collegeName: "Pimpri Chinchwad College of Engineering PCCOE",
      department: "",
      phoneNumber: "1234567890",
      status: "Active",
      role: "CollegeCoordinator",
    },
    {
      id: 2,
      name: "PATEL",
      email: "imrankpatel7861@gmail.com",
      collegeName: "Pimpri Chinchwad College of Engineering PCCOE",
      department: "",
      phoneNumber: "1234567890",
      status: "Active",
      role: "CollegeCoordinator",
    },
    {
      id: 3,
      name: "PATEL",
      email: "imrankpatel7861@gmail.com",
      collegeName: "Pimpri Chinchwad College of Engineering PCCOE",
      department: "",
      phoneNumber: "1234567890",
      status: "Active",
      role: "CollegeCoordinator",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showCollegeDetails, setShowCollegeDetails] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    collegeName: "",
    department: "",
    phoneNumber: "",
    status: "Active",
    role: "CollegeCoordinator",
  });

  const isDarkTheme = theme === "dark";

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
    inputDisabled: "disabled:bg-slate-100",
    inputText: "text-slate-900",
    inputPlaceholder: "placeholder:text-slate-400",
    modalOverlay: "bg-black/60",
    modalHeader: "bg-slate-100",
    modalHeaderBorder: "border-slate-200",
    emptyStateBg: "bg-white",
    emptyStateIcon: "text-slate-400",
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
    tableBorder: "border-slate-200",
    tableHeader: "bg-slate-50",
    tableRow: "hover:bg-slate-50",
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
    inputDisabled: "disabled:bg-slate-800",
    inputText: "text-slate-50",
    inputPlaceholder: "placeholder:text-slate-500",
    modalOverlay: "bg-black/80",
    modalHeader: "bg-slate-800",
    modalHeaderBorder: "border-slate-700",
    emptyStateBg: "bg-slate-900",
    emptyStateIcon: "text-slate-500",
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
    tableBorder: "border-slate-700",
    tableHeader: "bg-slate-800",
    tableRow: "hover:bg-slate-800",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  const stats = useMemo(() => {
    const uniqueColleges = new Set(staff.map((s) => s.collegeName)).size;
    const totalStaff = staff.length;
    const activeStaff = staff.filter((s) => s.status === "Active").length;
    const inactiveStaff = staff.filter((s) => s.status === "Inactive").length;
    return { uniqueColleges, totalStaff, activeStaff, inactiveStaff };
  }, [staff]);

  const collegeGroups = useMemo(() => {
    const groups = {};
    staff.forEach((member) => {
      if (!groups[member.collegeName]) {
        groups[member.collegeName] = [];
      }
      groups[member.collegeName].push(member);
    });
    return groups;
  }, [staff]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      collegeName: "",
      department: "",
      phoneNumber: "",
      status: "Active",
      role: "CollegeCoordinator",
    });
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      setStaff((prev) =>
        prev.map((member) =>
          member.id === editingId ? { ...formData, id: editingId } : member
        )
      );
    } else {
      const newStaff = {
        ...formData,
        id: Date.now(),
      };
      setStaff((prev) => [...prev, newStaff]);
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      email: member.email,
      collegeName: member.collegeName,
      department: member.department || "",
      phoneNumber: member.phoneNumber,
      status: member.status,
      role: member.role,
    });
    setEditingId(member.id);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (member) => {
    setFormData({
      name: member.name,
      email: member.email,
      collegeName: member.collegeName,
      department: member.department || "",
      phoneNumber: member.phoneNumber,
      status: member.status,
      role: member.role,
    });
    setViewMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setStaff((prev) => prev.filter((member) => member.id !== deleteId));
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const handleSeeDetails = (collegeName) => {
    setSelectedCollege(collegeName);
    setShowCollegeDetails(true);
    setSearchQuery("");
  };

  const filteredStaff = selectedCollege
    ? collegeGroups[selectedCollege]?.filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.phoneNumber.includes(searchQuery)
      ) || []
    : [];

  return (
    <div className={`min-h-screen ${themeStyles.background} p-6`}>
      <div className="max-w-full mx-auto">
        {/* Header */}
        {!showCollegeDetails && (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
              <div>
                <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
                  Staff Details
                </h1>
                <p className={`${themeStyles.textSecondary} mt-1`}>
                  Manage your college staff members
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all shadow-lg"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Staff
                </button>
              </div>
            </div>
            {/* Summary Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                {
                  icon: Building2,
                  label: "Total Colleges",
                  value: stats.uniqueColleges,
                  subtitle: "unique institutions",
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
                  icon: UserCheck,
                  label: "Active Staff",
                  value: stats.activeStaff,
                  subtitle: "currently active",
                  bgColor: themeStyles.statCard3Gradient,
                  borderColor: themeStyles.dividerBorder,
                  iconBg: themeStyles.statIcon3Bg,
                  iconColor: themeStyles.statIcon3Text,
                },
                {
                  icon: UserX,
                  label: "Inactive Staff",
                  value: stats.inactiveStaff,
                  subtitle: "currently inactive",
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
              {Object.keys(collegeGroups).length === 0 ? (
                <div
                  className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.emptyStateBg}`}
                >
                  <div className="p-12 text-center">
                    <div
                      className={`mx-auto w-24 h-24 ${themeStyles.emptyStateBg} rounded-full flex items-center justify-center mb-4`}
                    >
                      <Building2
                        className={`h-12 w-12 ${themeStyles.emptyStateIcon}`}
                      />
                    </div>
                    <h3
                      className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}
                    >
                      No Staff Added Yet
                    </h3>
                    <p className={`${themeStyles.textSecondary} mb-6`}>
                      Start by adding your first staff member
                    </p>
                    <button
                      onClick={() => {
                        resetForm();
                        setShowModal(true);
                      }}
                      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Staff Member
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(collegeGroups).map(
                    ([collegeName, members]) => (
                      <div
                        key={collegeName}
                        className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 overflow-hidden group ${themeStyles.cardBg}`}
                      >
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600" />
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h3
                                  className={`text-xl font-bold ${themeStyles.textPrimary} line-clamp-2`}
                                >
                                  {collegeName}
                                </h3>
                                <p
                                  className={`text-sm ${themeStyles.textSecondary} mt-1`}
                                >
                                  {members.length} staff member
                                  {members.length !== 1 ? "s" : ""}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3 mb-6">
                            <div
                              className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}
                            >
                              <span
                                className={`text-sm ${themeStyles.textSecondary}`}
                              >
                                Active Staff
                              </span>
                              <span
                                className={`font-semibold text-emerald-600 dark:text-emerald-400`}
                              >
                                {
                                  members.filter((m) => m.status === "Active")
                                    .length
                                }
                              </span>
                            </div>
                            <div
                              className={`flex items-center justify-between py-2 border-b ${themeStyles.dividerBorder}`}
                            >
                              <span
                                className={`text-sm ${themeStyles.textSecondary}`}
                              >
                                Inactive Staff
                              </span>
                              <span
                                className={`font-semibold text-red-600 dark:text-red-400`}
                              >
                                {
                                  members.filter((m) => m.status === "Inactive")
                                    .length
                                }
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleSeeDetails(collegeName)}
                            className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                          >
                            See Details
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </>
        )}
        {/* College Details View */}
        {showCollegeDetails && selectedCollege && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setShowCollegeDetails(false)}
                className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
                  {selectedCollege}
                </h1>
                <p className={`${themeStyles.textSecondary} mt-1`}>
                  {collegeGroups[selectedCollege]?.length || 0} staff member
                  {collegeGroups[selectedCollege]?.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-3 pl-12 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <Search className="h-5 w-5" />
                </div>
              </div>
            </div>
            {/* Table */}
            <div
              className={`rounded-2xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} overflow-hidden ${themeStyles.cardBg}`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${themeStyles.tableHeader}`}>
                    <tr>
                      {["Role", "Sr No", "Name", "Email"].map(
                        (header, index) => (
                          <th
                            key={index}
                            className={`px-6 py-4 text-left text-xs font-medium ${themeStyles.textSecondary} uppercase tracking-wider`}
                          >
                            {header}
                          </th>
                        )
                      )}
                      <th
                        className={`px-6 py-4 text-right text-xs font-medium ${themeStyles.textSecondary} uppercase tracking-wider`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${themeStyles.dividerBorder}`}>
                    {filteredStaff.map((member, index) => (
                      <tr
                        key={member.id}
                        className={`${themeStyles.tableRow} transition-colors`}
                      >
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textPrimary}`}
                        >
                          {member.role === "CollegeCoordinator"
                            ? "College Coordinator"
                            : member.role === "DepartmentCoordinator"
                            ? "Department Coordinator"
                            : member.role}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textPrimary}`}
                        >
                          {index + 1}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeStyles.textPrimary}`}
                        >
                          {member.name}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary}`}
                        >
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {member.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleView(member)}
                              className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(member)}
                              className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-all`}
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(member.id)}
                              className="p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* Modal */}
        {showModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder}`}
            >
              {/* HEADER */}
              <div
                className={`${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <h2 className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
                  {viewMode
                    ? "Staff Details"
                    : editingId
                    ? "Edit Staff Member"
                    : "Add New Staff Member"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* BODY */}
              <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter staff name"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                {/* Role */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} transition-all`}
                  >
                    <option value="CollegeCoordinator">
                      College Coordinator
                    </option>
                    <option value="DepartmentCoordinator">
                      Department Coordinator
                    </option>
                  </select>
                </div>
                {/* College Name - Always show for both roles */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    College Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} transition-all`}
                  >
                    <option value="">Select a college</option>
                    <option value="Pimpri Chinchwad College of Engineering PCCOE">
                      Pimpri Chinchwad College of Engineering PCCOE
                    </option>
                    <option value="Pimpri Chinchwad College of Engineering & Research PCCOER">
                      Pimpri Chinchwad College of Engineering & Research PCCOER
                    </option>
                    <option value="Nutan Maharashtra Institute of Engineering and Technology NMIET">
                      Nutan Maharashtra Institute of Engineering and Technology
                      NMIET
                    </option>
                  </select>
                </div>
                {/* Department - Show only for Department Coordinators */}
                {formData.role === "DepartmentCoordinator" && (
                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      required
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} transition-all`}
                    >
                      <option value="">Select a department</option>
                      <option value="Computer">Computer</option>
                      <option value="IT">IT</option>
                      <option value="ENTC">ENTC</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                    </select>
                  </div>
                )}
                {/* Phone Number */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>
                {/* Status */}
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeStyles.inputDisabled} ${themeStyles.inputText} transition-all`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                {/* Buttons */}
                {!viewMode && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className={`flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium transition-all"
                    >
                      {editingId ? "Update Staff" : "Add Staff"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-md rounded-2xl shadow-2xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} p-6`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${themeStyles.textPrimary}`}>
                  Confirm Deletion
                </h2>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteId(null);
                  }}
                  className={`inline-flex items-center justify-center p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary}`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className={`${themeStyles.textSecondary} mb-6`}>
                Are you sure you want to delete this staff member? This action
                cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteId(null);
                  }}
                  className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.buttonHover} ${themeStyles.textPrimary} font-medium transition-all`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffDetailsManager;
