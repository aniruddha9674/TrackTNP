import React, { useState, useMemo } from "react";
import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  FileText,
  Briefcase,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ChevronDown,
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
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-800",
    ghost:
      "text-slate-900 dark:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800",
  };

  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    icon: "p-2",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        sizes[size]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
};

// Custom Card Components
const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-lg border bg-white dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-600 text-white",
    secondary:
      "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

// Custom Select Component
const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative">
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { isOpen, setIsOpen });
        }
        if (child.type === SelectContent) {
          return isOpen
            ? React.cloneElement(child, { onValueChange, setIsOpen, value })
            : null;
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = ({ children, className = "", isOpen, setIsOpen }) => {
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50 transition-all ${className}`}
    >
      {children}
      <ChevronDown
        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
};

const SelectValue = ({ placeholder, children }) => {
  return <span className="text-left">{children || placeholder}</span>;
};

const SelectContent = ({
  children,
  className = "",
  onValueChange,
  setIsOpen,
  value,
}) => {
  return (
    <div
      className={`absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-auto ${className}`}
    >
      {React.Children.map(children, (child) => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, {
            onValueChange,
            setIsOpen,
            isSelected: child.props.value === value,
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectItem = ({
  value,
  children,
  onValueChange,
  setIsOpen,
  isSelected,
}) => {
  return (
    <div
      onClick={() => {
        onValueChange(value);
        setIsOpen(false);
      }}
      className={`px-4 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-50 ${
        isSelected ? "bg-slate-100 dark:bg-slate-800" : ""
      }`}
    >
      {children}
    </div>
  );
};

const OfferLetters = () => {
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalType, setModalType] = useState("offer");
  const [formData, setFormData] = useState({
    companyName: "",
    packageValue: "",
    companyType: "",
    offerLetterFile: null,
    joiningLetterFile: null,
  });

  const stats = useMemo(() => {
    const totalOffers = offers.filter((o) => o.status === "offer").length;
    const finalOffers = offers.filter((o) => o.status === "final").length;
    const avgPackage =
      offers.length > 0
        ? offers.reduce(
            (sum, offer) => sum + (parseFloat(offer.packageValue) || 0),
            0
          ) / offers.length
        : 0;
    const uniqueCompanies = new Set(offers.map((o) => o.companyName)).size;

    return { totalOffers, finalOffers, avgPackage, uniqueCompanies };
  }, [offers]);

  const resetForm = () => {
    setFormData({
      companyName: "",
      packageValue: "",
      companyType: "",
      offerLetterFile: null,
      joiningLetterFile: null,
    });
    setEditingId(null);
    setViewMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, companyType: value }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [fieldName]: file.name }));
    }
  };

  const handleSubmit = () => {
    if (editingId !== null) {
      setOffers((prev) =>
        prev.map((offer) =>
          offer.id === editingId
            ? {
                ...formData,
                id: editingId,
                status: modalType,
                createdAt: offer.createdAt,
              }
            : offer
        )
      );
    } else {
      const newOffer = {
        ...formData,
        id: Date.now(),
        status: modalType,
        createdAt: new Date(),
      };
      setOffers((prev) => [...prev, newOffer]);
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (offer) => {
    setFormData({
      companyName: offer.companyName,
      packageValue: offer.packageValue,
      companyType: offer.companyType,
      offerLetterFile: offer.offerLetterFile,
      joiningLetterFile: offer.joiningLetterFile || null,
    });
    setEditingId(offer.id);
    setModalType(offer.status);
    setViewMode(false);
    setShowModal(true);
  };

  const handleView = (offer) => {
    setFormData({
      companyName: offer.companyName,
      packageValue: offer.packageValue,
      companyType: offer.companyType,
      offerLetterFile: offer.offerLetterFile,
      joiningLetterFile: offer.joiningLetterFile || null,
    });
    setModalType(offer.status);
    setViewMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this offer letter?")) {
      setOffers((prev) => prev.filter((offer) => offer.id !== id));
    }
  };

  const handleConvertToFinal = (offer) => {
    setFormData({
      companyName: offer.companyName,
      packageValue: offer.packageValue,
      companyType: offer.companyType,
      offerLetterFile: offer.offerLetterFile,
      joiningLetterFile: null,
    });
    setEditingId(offer.id);
    setModalType("final");
    setViewMode(false);
    setShowModal(true);
  };

  const openAddModal = (type) => {
    resetForm();
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Offer Letter Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your job offers and final offer letters
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => openAddModal("offer")} className="shadow-lg">
              <Plus className="mr-2 h-4 w-4" />
              Add Offer Letter
            </Button>
            <Button
              onClick={() => openAddModal("final")}
              variant="outline"
              className="shadow-lg border-slate-300 dark:border-slate-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Final Offer
            </Button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Offer Letters
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                    {stats.totalOffers}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Final Offers
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                    {stats.finalOffers}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Avg Package
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                    {stats.avgPackage.toFixed(1)}
                    <span className="text-lg text-slate-600 dark:text-slate-400 ml-1">
                      LPA
                    </span>
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
                    Companies
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                    {stats.uniqueCompanies}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offer Letters */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">
            Your Offer Letters
          </h2>
          {offers.length === 0 ? (
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
                  No Offer Letters Yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Start tracking your job offers by adding your first offer
                  letter
                </p>
                <Button
                  onClick={() => openAddModal("offer")}
                  variant="outline"
                  className="border-slate-300 dark:border-slate-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Offer Letter
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <Card
                  key={offer.id}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div
                    className={`h-2 ${
                      offer.status === "final" ? "bg-green-500" : "bg-blue-600"
                    }`}
                  />

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex-1 pr-2 line-clamp-2">
                        {offer.companyName}
                      </h3>
                      <Badge
                        variant={
                          offer.status === "final" ? "default" : "secondary"
                        }
                        className={
                          offer.status === "final"
                            ? "bg-green-500 text-white"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        }
                      >
                        {offer.status === "final" ? "Final" : "Offer"}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Package
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-50">
                          {offer.packageValue} LPA
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Type
                        </span>
                        <span className="font-medium text-slate-900 dark:text-slate-50">
                          {offer.companyType}
                        </span>
                      </div>

                      {offer.offerLetterFile && (
                        <div className="flex items-center gap-2 text-sm pt-2">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            Offer letter attached
                          </span>
                        </div>
                      )}

                      {offer.joiningLetterFile && (
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            Joining letter attached
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleView(offer)}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-300 dark:border-slate-600"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleEdit(offer)}
                          variant="outline"
                          size="sm"
                          className="flex-1 border-slate-300 dark:border-slate-600"
                        >
                          <Edit2 className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(offer.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-600 hover:text-white border-slate-300 dark:border-slate-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {offer.status === "offer" && (
                        <Button
                          onClick={() => handleConvertToFinal(offer)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Convert to Final Offer
                        </Button>
                      )}
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
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200 bg-white dark:bg-slate-900">
              <div className="sticky top-0 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  {viewMode
                    ? `${
                        modalType === "final"
                          ? "Final Offer Letter"
                          : "Offer Letter"
                      } Details`
                    : editingId
                    ? `Edit ${
                        modalType === "final"
                          ? "Final Offer Letter"
                          : "Offer Letter"
                      }`
                    : `Add ${
                        modalType === "final"
                          ? "Final Offer Letter"
                          : "Offer Letter"
                      }`}
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
                    placeholder="Enter Company Name"
                    disabled={viewMode}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Company Package Value (In LPA){" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="packageValue"
                    value={formData.packageValue}
                    onChange={handleInputChange}
                    placeholder="Enter Package Value"
                    disabled={viewMode}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Company Type <span className="text-red-600">*</span>
                  </label>
                  {viewMode ? (
                    <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-slate-50">
                      {formData.companyType || "Not specified"}
                    </div>
                  ) : (
                    <Select
                      value={formData.companyType}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="w-full bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Select an option">
                          {formData.companyType || "Select an option"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Service">Service</SelectItem>
                        <SelectItem value="Startup">Startup</SelectItem>
                        <SelectItem value="MNC">MNC</SelectItem>
                        <SelectItem value="Government">Government</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Upload your Offer Letter
                  </label>
                  {viewMode ? (
                    <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-slate-50">
                      {formData.offerLetterFile || "No file uploaded"}
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, "offerLetterFile")}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer text-slate-900 dark:text-slate-50 transition-all"
                    />
                  )}
                  {formData.offerLetterFile && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                      Selected: {formData.offerLetterFile}
                    </p>
                  )}
                </div>

                {modalType === "final" && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                      Upload your Joining Letter
                    </label>
                    {viewMode ? (
                      <div className="px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-slate-50">
                        {formData.joiningLetterFile || "No file uploaded"}
                      </div>
                    ) : (
                      <input
                        type="file"
                        onChange={(e) =>
                          handleFileChange(e, "joiningLetterFile")
                        }
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer text-slate-900 dark:text-slate-50 transition-all"
                      />
                    )}
                    {formData.joiningLetterFile && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                        Selected: {formData.joiningLetterFile}
                      </p>
                    )}
                  </div>
                )}

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
                    <Button onClick={handleSubmit} className="flex-1">
                      {editingId ? "Update" : "Add"}{" "}
                      {modalType === "final" ? "Final Offer" : "Offer Letter"}
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

export default OfferLetters;
