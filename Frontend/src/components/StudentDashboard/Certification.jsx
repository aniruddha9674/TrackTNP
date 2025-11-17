import React, { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  Award,
  BookOpen,
  TrendingUp,
  Clock,
} from "lucide-react";

// Add Urbanist font
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  * {
    font-family: 'Urbanist', sans-serif;
  }
`;
document.head.appendChild(style);

// Custom Button Component
const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
    ghost: "text-slate-700 hover:bg-slate-100",
  };

  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    icon: "h-9 w-9",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Card Component
const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`rounded-lg border bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Custom CardContent Component
const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";

  const variants = {
    default: "bg-slate-900 text-slate-50",
    secondary: "bg-slate-100 text-slate-900",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

const CertificationManager = () => {
  const [certifications, setCertifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    certificationName: "",
    platform: "",
    duration: "",
    certificate: null,
  });

  // Calculate summary statistics
  const stats = useMemo(() => {
    const total = certifications.length;

    const totalWeeks = certifications.reduce(
      (sum, cert) => sum + (parseFloat(cert.duration) || 0),
      0
    );

    const platforms = new Set(certifications.map((c) => c.platform)).size;

    const avgDuration =
      certifications.length > 0 ? totalWeeks / certifications.length : 0;

    return { total, totalWeeks, platforms, avgDuration };
  }, [certifications]);

  const resetForm = () => {
    setFormData({
      certificationName: "",
      platform: "",
      duration: "",
      certificate: null,
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
      setFormData((prev) => ({ ...prev, certificate: file.name }));
    }
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      setCertifications((prev) =>
        prev.map((cert) =>
          cert.id === editingId ? { ...formData, id: editingId } : cert
        )
      );
    } else {
      const newCertification = {
        ...formData,
        id: Date.now(),
      };
      setCertifications((prev) => [...prev, newCertification]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (certification) => {
    setFormData({
      certificationName: certification.certificationName,
      platform: certification.platform,
      duration: certification.duration,
      certificate: certification.certificate,
    });
    setEditingId(certification.id);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (certification) => {
    setFormData({
      certificationName: certification.certificationName,
      platform: certification.platform,
      duration: certification.duration,
      certificate: certification.certificate,
    });
    setViewMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this certification?")) {
      setCertifications((prev) => prev.filter((cert) => cert.id !== id));
    }
  };

  const getPlatformColor = (platform) => {
    const colors = {
      coursera: "bg-blue-500",
      udemy: "bg-purple-500",
      edx: "bg-red-500",
      linkedin: "bg-blue-600",
      pluralsight: "bg-pink-500",
      udacity: "bg-cyan-500",
      default: "bg-blue-600",
    };

    const key = platform.toLowerCase();
    return colors[key] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Certification Dashboard
            </h1>
            <p className="text-slate-600 mt-1">
              Track your professional certifications and courses
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
            Add Certification
          </Button>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-white to-blue-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Certifications
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.total}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-green-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Learning Platforms
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.platforms}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-purple-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Learning Time
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.totalWeeks}
                    <span className="text-lg text-slate-600 ml-1">wks</span>
                  </h3>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-amber-50 border-slate-200 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Avg Duration
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2">
                    {stats.avgDuration.toFixed(1)}
                    <span className="text-lg text-slate-600 ml-1">wks</span>
                  </h3>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certification Cards */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Your Certifications
          </h2>
          {certifications.length === 0 ? (
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No Certifications Yet
                </h3>
                <p className="text-slate-600 mb-6">
                  Start building your professional portfolio by adding your
                  first certification
                </p>
                <Button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  variant="outline"
                  className="border-slate-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Certification
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((certification) => (
                <Card
                  key={certification.id}
                  className="bg-white border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div
                    className={`h-2 ${getPlatformColor(
                      certification.platform
                    )}`}
                  />

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900 flex-1 pr-2 line-clamp-2">
                        {certification.certificationName}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-600 whitespace-nowrap"
                      >
                        {certification.duration}w
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">Platform</span>
                        <span className="font-semibold text-slate-900">
                          {certification.platform}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <span className="text-slate-600">Duration:</span>
                        <span className="font-medium text-slate-900">
                          {certification.duration} weeks
                        </span>
                      </div>

                      {certification.certificate && (
                        <div className="flex items-center gap-2 text-sm pt-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-green-600 font-medium">
                            Certificate attached
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleView(certification)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-300"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleEdit(certification)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-300"
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(certification.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-600 hover:text-white border-slate-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200 bg-white">
              <div className="sticky top-0 bg-slate-100 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">
                  {viewMode
                    ? "Certification Details"
                    : editingId
                    ? "Edit Certification"
                    : "Add New Certification"}
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
                  <label className="block text-sm font-medium text-slate-900">
                    Certification Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="certificationName"
                    value={formData.certificationName}
                    onChange={handleInputChange}
                    placeholder="Enter Certification Name"
                    disabled={viewMode}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900">
                    Certification Platform{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    placeholder="Eg. Udemy, Coursera"
                    disabled={viewMode}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900">
                    Certificate Duration (In weeks){" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Enter Certification Duration in weeks"
                    disabled={viewMode}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900">
                    Upload Certificate
                  </label>
                  {viewMode ? (
                    <div className="px-4 py-3 bg-slate-100 rounded-lg text-slate-900">
                      {formData.certificate || "No file uploaded"}
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer text-slate-900 transition-all"
                    />
                  )}
                  {formData.certificate && (
                    <p className="text-sm text-slate-600 mt-2">
                      Selected: {formData.certificate}
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
                      className="flex-1 border-slate-300"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1">
                      {editingId ? "Update Certification" : "Add Certification"}
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

export default CertificationManager;
