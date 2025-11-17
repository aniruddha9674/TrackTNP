import React, { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  Briefcase,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";

// Custom Button Component
const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    outline:
      "border-2 border-slate-300 dark:border-slate-600 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-50",
    ghost:
      "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-50",
  };

  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-sm",
    icon: "p-2",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

// Custom Card Components
const Card = ({ children, className = "" }) => {
  return <div className={`rounded-xl border ${className}`}>{children}</div>;
};

const CardContent = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "" }) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  return <span className={`${baseStyles} ${className}`}>{children}</span>;
};

const InternshipManager = () => {
  const [internships, setInternships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    stipend: "",
    startDate: "",
    endDate: "",
    offerLetter: null,
  });

  // Calculate summary statistics
  const stats = useMemo(() => {
    const total = internships.length;
    const today = new Date();

    const active = internships.filter((i) => {
      const start = new Date(i.startDate);
      const end = new Date(i.endDate);
      return start <= today && end >= today;
    }).length;

    const totalStipend = internships.reduce(
      (sum, i) => sum + (parseFloat(i.stipend) || 0),
      0
    );

    const avgDuration =
      internships.length > 0
        ? internships.reduce((sum, i) => {
            const start = new Date(i.startDate);
            const end = new Date(i.endDate);
            const months =
              (end.getFullYear() - start.getFullYear()) * 12 +
              (end.getMonth() - start.getMonth());
            return sum + months;
          }, 0) / internships.length
        : 0;

    return { total, active, totalStipend, avgDuration };
  }, [internships]);

  const resetForm = () => {
    setFormData({
      companyName: "",
      stipend: "",
      startDate: "",
      endDate: "",
      offerLetter: null,
    });
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, offerLetter: file.name }));
    }
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      setInternships((prev) =>
        prev.map((intern) =>
          intern.id === editingId ? { ...formData, id: editingId } : intern
        )
      );
    } else {
      const newInternship = {
        ...formData,
        id: Date.now(),
      };
      setInternships((prev) => [...prev, newInternship]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (internship) => {
    setFormData({
      companyName: internship.companyName,
      stipend: internship.stipend,
      startDate: internship.startDate,
      endDate: internship.endDate,
      offerLetter: internship.offerLetter,
    });
    setEditingId(internship.id);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (internship) => {
    setFormData({
      companyName: internship.companyName,
      stipend: internship.stipend,
      startDate: internship.startDate,
      endDate: internship.endDate,
      offerLetter: internship.offerLetter,
    });
    setViewMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      setInternships((prev) => prev.filter((intern) => intern.id !== id));
    }
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

  const getStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) return "upcoming";
    if (today > end) return "completed";
    return "active";
  };

  return (
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Urbanist', sans-serif;
        }
      `}</style>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Internship Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage and track your internship experiences
            </p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Internship
          </Button>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Total Internships
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                    {stats.total}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Active Now
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                    {stats.active}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Total Stipend
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                    ₹{stats.totalStipend.toLocaleString()}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-amber-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Avg Duration
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                    {stats.avgDuration.toFixed(1)}
                    <span className="text-lg text-slate-600 dark:text-slate-400 ml-1">
                      mo
                    </span>
                  </h3>
                </div>
                <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Internship Cards */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
            Your Internships
          </h2>
          {internships.length === 0 ? (
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  No Internships Yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Start building your portfolio by adding your first internship
                </p>
                <Button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  variant="outline"
                  className="border-slate-300 dark:border-slate-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Internship
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internships.map((internship) => {
                const status = getStatus(
                  internship.startDate,
                  internship.endDate
                );
                return (
                  <Card
                    key={internship.id}
                    className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400" />

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 truncate flex-1 pr-2">
                          {internship.companyName}
                        </h3>
                        <Badge
                          variant={
                            status === "active"
                              ? "default"
                              : status === "upcoming"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            status === "active"
                              ? "bg-green-500 text-white dark:bg-green-600"
                              : status === "upcoming"
                              ? "bg-blue-500 text-white dark:bg-blue-600"
                              : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                          }
                        >
                          {status}
                        </Badge>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            Stipend
                          </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-50">
                            ₹{parseFloat(internship.stipend).toLocaleString()}
                            /mo
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">
                            Start:
                          </span>
                          <span className="font-medium text-slate-900 dark:text-slate-50">
                            {formatDate(internship.startDate)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-400">
                            End:
                          </span>
                          <span className="font-medium text-slate-900 dark:text-slate-50">
                            {formatDate(internship.endDate)}
                          </span>
                        </div>

                        {internship.offerLetter && (
                          <div className="flex items-center gap-2 text-sm pt-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-green-600 dark:text-green-400 font-medium">
                              Offer letter attached
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleView(internship)}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-300 dark:border-slate-600"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleEdit(internship)}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-300 dark:border-slate-600"
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(internship.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-600 hover:text-white border-slate-300 dark:border-slate-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
              <div className="sticky top-0 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  {viewMode
                    ? "Internship Details"
                    : editingId
                    ? "Edit Internship"
                    : "Add New Internship"}
                </h2>
                <Button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <CardContent className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Company Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g., Google, Microsoft, Meta"
                    disabled={viewMode}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Monthly Stipend (₹) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleInputChange}
                    placeholder="e.g., 25000"
                    disabled={viewMode}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                      Start Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-900 dark:text-slate-50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                      End Date <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      disabled={viewMode}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-900 dark:text-slate-50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Offer Letter
                  </label>
                  {viewMode ? (
                    <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-slate-50">
                      {formData.offerLetter || "No file uploaded"}
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer text-slate-900 dark:text-slate-50 transition-all"
                    />
                  )}
                  {formData.offerLetter && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                      Selected: {formData.offerLetter}
                    </p>
                  )}
                </div>

                {!viewMode && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      variant="outline"
                      className="flex-1 border-slate-300 dark:border-slate-600"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {editingId ? "Update Internship" : "Add Internship"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternshipManager;
