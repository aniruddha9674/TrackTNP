import { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  Heart,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

const VolunteerManager = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    volunteerName: "",
    email: "",
    phone: "",
    driveName: "",
    driveSpan: "",
    createdDate: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const stats = useMemo(() => {
    const total = volunteers.length;
    const today = new Date();

    const active = volunteers.filter((v) => {
      const created = new Date(v.createdDate);
      const spanDays = parseInt(v.driveSpan) || 0;
      const endDate = new Date(created);
      endDate.setDate(endDate.getDate() + spanDays);
      return today <= endDate;
    }).length;

    const totalDrives = new Set(volunteers.map((v) => v.driveName)).size;

    const avgSpan =
      volunteers.length > 0
        ? volunteers.reduce((sum, v) => sum + (parseInt(v.driveSpan) || 0), 0) /
          volunteers.length
        : 0;

    return { total, active, totalDrives, avgSpan };
  }, [volunteers]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setVolunteers((prev) =>
      prev.filter((volunteer) => volunteer.id !== deleteId)
    );
    setShowDeleteConfirm(false);
    setDeleteId(null);
  };

  const resetForm = () => {
    setFormData({
      volunteerName: "",
      email: "",
      phone: "",
      driveName: "",
      driveSpan: "",
      createdDate: "",
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
      setVolunteers((prev) =>
        prev.map((volunteer) =>
          volunteer.id === editingId
            ? { ...formData, id: editingId }
            : volunteer
        )
      );
    } else {
      const newVolunteer = {
        ...formData,
        id: Date.now(),
      };
      setVolunteers((prev) => [...prev, newVolunteer]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (volunteer) => {
    setFormData({
      volunteerName: volunteer.volunteerName,
      email: volunteer.email,
      phone: volunteer.phone,
      driveName: volunteer.driveName,
      driveSpan: volunteer.driveSpan,
      createdDate: volunteer.createdDate,
    });
    setEditingId(volunteer.id);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (volunteer) => {
    setFormData({
      volunteerName: volunteer.volunteerName,
      email: volunteer.email,
      phone: volunteer.phone,
      driveName: volunteer.driveName,
      driveSpan: volunteer.driveSpan,
      createdDate: volunteer.createdDate,
    });
    setViewMode(true);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatus = (createdDate, driveSpan) => {
    const today = new Date();
    const created = new Date(createdDate);
    const spanDays = parseInt(driveSpan) || 0;
    const endDate = new Date(created);
    endDate.setDate(endDate.getDate() + spanDays);

    if (today > endDate) return "Completed";
    return "Active";
  };

  const getDaysRemaining = (createdDate, driveSpan) => {
    const today = new Date();
    const created = new Date(createdDate);
    const spanDays = parseInt(driveSpan) || 0;
    const endDate = new Date(created);
    endDate.setDate(endDate.getDate() + spanDays);

    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
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
    inputDisabled: "disabled:bg-slate-100",
    inputText: "text-slate-900",
    inputPlaceholder: "placeholder:text-slate-400",
    modalOverlay: "bg-black/60",
    modalHeader: "bg-slate-100",
    modalHeaderBorder: "border-slate-200",
    emptyStateBg: "bg-slate-100",
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
    tableHeader: "bg-slate-50",
    tableRow: "hover:bg-slate-50",
    tableBorder: "border-slate-200",
    statusActiveBg: "bg-green-100",
    statusActiveText: "text-green-700",
    statusCompletedBg: "bg-slate-200",
    statusCompletedText: "text-slate-700",
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
    emptyStateBg: "bg-slate-800",
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
    tableHeader: "bg-slate-800",
    tableRow: "hover:bg-slate-800/50",
    tableBorder: "border-slate-700",
    statusActiveBg: "bg-green-900/30",
    statusActiveText: "text-green-400",
    statusCompletedBg: "bg-slate-700",
    statusCompletedText: "text-slate-300",
  });

  const themeStyles = theme === "dark" ? getDarkTheme() : getLightTheme();

  return (
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className={`min-h-screen ${themeStyles.background}`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Urbanist', sans-serif;
        }
      `}</style>

      <div className="max-w-full mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${themeStyles.textPrimary}`}>
              Volunteer Management
            </h1>
            <p className={`mt-1 ${themeStyles.textSecondary}`}>
              Manage volunteers and their drive assignments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Volunteer
            </button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard1Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    Total Volunteers
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.total}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon1Bg} rounded-full flex items-center justify-center`}
                >
                  <Users className={`h-6 w-6 ${themeStyles.statIcon1Text}`} />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard2Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    Active Now
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.active}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon2Bg} rounded-full flex items-center justify-center`}
                >
                  <TrendingUp
                    className={`h-6 w-6 ${themeStyles.statIcon2Text}`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard3Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    Total Drives
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.totalDrives}
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon3Bg} rounded-full flex items-center justify-center`}
                >
                  <Heart className={`h-6 w-6 ${themeStyles.statIcon3Text}`} />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl border ${themeStyles.cardBorder} ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} bg-gradient-to-br ${themeStyles.statCard4Gradient} transition-all`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${themeStyles.textSecondary}`}
                  >
                    Avg Drive Span
                  </p>
                  <h3
                    className={`text-3xl font-bold ${themeStyles.textPrimary} mt-2`}
                  >
                    {stats.avgSpan.toFixed(0)}
                    <span
                      className={`text-lg ${themeStyles.textSecondary} ml-1`}
                    >
                      days
                    </span>
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 ${themeStyles.statIcon4Bg} rounded-full flex items-center justify-center`}
                >
                  <Clock className={`h-6 w-6 ${themeStyles.statIcon4Text}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Volunteer Table */}
        <div>
          <h2
            className={`text-xl font-semibold ${themeStyles.textPrimary} mb-4`}
          >
            Your Volunteers
          </h2>
          {volunteers.length === 0 ? (
            <div
              className={`rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} shadow-sm`}
            >
              <div className="p-12 text-center">
                <div
                  className={`mx-auto w-24 h-24 ${themeStyles.emptyStateBg} rounded-full flex items-center justify-center mb-4`}
                >
                  <Users
                    className={`h-12 w-12 ${themeStyles.emptyStateIcon}`}
                  />
                </div>
                <h3
                  className={`text-xl font-semibold ${themeStyles.textPrimary} mb-2`}
                >
                  No Volunteers Yet
                </h3>
                <p className={`${themeStyles.textSecondary} mb-6`}>
                  Start by adding your first volunteer to manage drives
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className={`inline-flex items-center px-4 py-2 rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Volunteer
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} ${themeStyles.cardShadow} overflow-hidden`}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={themeStyles.tableHeader}>
                    <tr>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textPrimary} uppercase tracking-wider`}
                      >
                        Sr No
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textPrimary} uppercase tracking-wider`}
                      >
                        Name
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textPrimary} uppercase tracking-wider`}
                      >
                        Email
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textPrimary} uppercase tracking-wider`}
                      >
                        Phone
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textPrimary} uppercase tracking-wider`}
                      >
                        Drive Name
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textPrimary} uppercase tracking-wider`}
                      >
                        Status
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textPrimary} uppercase tracking-wider`}
                      >
                        Created Date
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textPrimary} uppercase tracking-wider`}
                      >
                        Drive Span
                      </th>
                      <th
                        className={`px-6 py-4 text-left text-xs font-semibold ${themeStyles.textPrimary} uppercase tracking-wider`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${themeStyles.tableBorder}`}>
                    {volunteers.map((volunteer, index) => {
                      const status = getStatus(
                        volunteer.createdDate,
                        volunteer.driveSpan
                      );
                      return (
                        <tr
                          key={volunteer.id}
                          className={`${themeStyles.tableRow} transition-colors`}
                        >
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeStyles.textPrimary}`}
                          >
                            {index + 1}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${themeStyles.textPrimary}`}
                          >
                            {volunteer.volunteerName}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary}`}
                          >
                            {volunteer.email}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary}`}
                          >
                            {volunteer.phone}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary}`}
                          >
                            {volunteer.driveName}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap`}>
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                status === "Active"
                                  ? `${themeStyles.statusActiveBg} ${themeStyles.statusActiveText}`
                                  : `${themeStyles.statusCompletedBg} ${themeStyles.statusCompletedText}`
                              }`}
                            >
                              {status}
                            </span>
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary}`}
                          >
                            {formatDate(volunteer.createdDate)}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm ${themeStyles.textSecondary}`}
                          >
                            {volunteer.driveSpan} days
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-center`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleView(volunteer)}
                                className={`p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-colors`}
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(volunteer)}
                                className={`p-2 rounded-lg ${themeStyles.buttonHover} ${themeStyles.textPrimary} transition-colors`}
                                title="Edit"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(volunteer.id)}
                                className={`p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors`}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div
            className={`fixed inset-0 ${themeStyles.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}
          >
            <div
              className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder}`}
            >
              <div
                className={`sticky top-0 ${themeStyles.modalHeader} ${themeStyles.modalHeaderBorder} border-b px-6 py-4 flex justify-between items-center`}
              >
                <h2 className={`text-2xl font-bold ${themeStyles.textPrimary}`}>
                  {viewMode
                    ? "Volunteer Details"
                    : editingId
                    ? "Edit Volunteer"
                    : "Add New Volunteer"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className={`p-2 rounded-lg ${themeStyles.buttonHover} transition-colors`}
                >
                  <X className={`h-5 w-5 ${themeStyles.textPrimary}`} />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Volunteer Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="volunteerName"
                    value={formData.volunteerName}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., john@example.com"
                      disabled={viewMode}
                      required
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g., +91 98765 43210"
                      disabled={viewMode}
                      required
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                  >
                    Drive Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="driveName"
                    value={formData.driveName}
                    onChange={handleInputChange}
                    placeholder="e.g., Blood Donation Drive, Food Distribution"
                    disabled={viewMode}
                    required
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      Drive Span (Days) <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="number"
                      name="driveSpan"
                      value={formData.driveSpan}
                      onChange={handleInputChange}
                      placeholder="e.g., 30"
                      disabled={viewMode}
                      required
                      min="1"
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} ${themeStyles.inputPlaceholder} transition-all`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className={`block text-sm font-medium ${themeStyles.textPrimary}`}
                    >
                      Created Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="createdDate"
                      value={formData.createdDate}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      required
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} border ${themeStyles.inputBorder} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${themeStyles.inputDisabled} disabled:cursor-not-allowed ${themeStyles.inputText} transition-all`}
                    />
                  </div>
                </div>

                {!viewMode && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className={`flex-1 px-4 py-2 rounded-lg border ${themeStyles.buttonBorder} ${themeStyles.buttonBg} ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-colors`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={
                        !formData.volunteerName ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.driveName ||
                        !formData.driveSpan ||
                        !formData.createdDate
                      }
                      className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {editingId ? "Update Volunteer" : "Add Volunteer"}
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
                Are you sure you want to delete this volunteer? This action
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

export default VolunteerManager;
