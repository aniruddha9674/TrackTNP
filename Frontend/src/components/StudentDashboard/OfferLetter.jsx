import React, { useState, useMemo, useEffect } from "react";
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
  Moon,
  Sun,
} from "lucide-react";

// Add Urbanist font and CSS variables
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  :root {
    --color-white: #ffffff;
    --color-black: #101828;
    --color-gray-50: #f9fafb;
    --color-gray-100: #f2f4f7;
    --color-gray-400: #98a2b3;
    --color-gray-500: #667085;
    --color-gray-800: #1d2939;
    --color-gray-900: #101828;
    --color-gray-950: #0c111d;
    --color-brand-400: #7592ff;
    --color-brand-500: #465fff;
    --color-brand-600: #1d41f5;
    --color-blue-light-300: #84caff;
    --color-blue-light-500: #0ba5ec;
    --color-success-400: #16c784;
    --color-success-500: #12b268;
    --color-error-400: #f97066;
    --color-error-500: #f04438;
  }
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
    default:
      "bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-brand-600)] text-white hover:from-[var(--color-brand-600)] hover:to-[var(--color-brand-700)] focus:ring-[var(--color-brand-500)] shadow-md hover:shadow-lg",
    outline:
      "border border-gray-300 dark:border-gray-700 bg-white dark:bg-[var(--color-gray-950)] text-[var(--color-gray-900)] dark:text-[var(--color-gray-50)] hover:bg-gray-50 dark:hover:bg-gray-800",
    ghost:
      "text-[var(--color-gray-900)] dark:text-[var(--color-gray-50)] hover:bg-[var(--color-gray-100)] dark:hover:bg-[var(--color-gray-800)]",
  };
  const sizes = {
    default: "px-5 py-2.5",
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
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[var(--color-gray-950)] ${className}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default:
      "bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)] text-white",
    secondary:
      "bg-[var(--color-gray-100)] dark:bg-[var(--color-gray-800)] text-[var(--color-gray-900)] dark:text-[var(--color-gray-50)]",
    success:
      "bg-[var(--color-success-500)] dark:bg-[var(--color-success-400)] text-white",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
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
    <div ref={selectRef} className="relative w-full">
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { isOpen, setIsOpen });
        }
        if (child.type === SelectContent) {
          return isOpen
            ? React.cloneElement(child, {
                onValueChange,
                setIsOpen,
                value,
              })
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
      className={`w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-[var(--color-gray-950)] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent text-[var(--color-gray-900)] dark:text-[var(--color-gray-50)] transition-all ${className}`}
    >
      {children}
      <ChevronDown
        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
};

const SelectValue = ({ placeholder, children }) => {
  return (
    <span className="text-left text-[var(--color-gray-900)] dark:text-[var(--color-gray-50)]">
      {children || placeholder}
    </span>
  );
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
      className={`absolute z-50 w-full mt-2 bg-white dark:bg-[var(--color-gray-800)] border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl max-h-60 overflow-auto ${className}`}
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
      className={`px-4 py-2 cursor-pointer hover:bg-[var(--color-gray-100)] dark:hover:bg-[var(--color-gray-950)] text-[var(--color-gray-900)] dark:text-[var(--color-gray-50)] ${
        isSelected
          ? "bg-[var(--color-gray-100)] dark:bg-[var(--color-gray-950)]"
          : ""
      }`}
    >
      {children}
    </div>
  );
};

// Main Component
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
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Apply theme to the HTML element
  useEffect(() => {
    const html = document.querySelector("html");
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Offer Letter Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your job offers and final offer letters
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <Button
            onClick={() => openAddModal("offer")}
            className="bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-brand-600)] hover:from-[var(--color-brand-600)] hover:to-[var(--color-brand-700)] text-white shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Offer Letter
          </Button>
          <Button
            onClick={() => openAddModal("final")}
            variant="outline"
            className="border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Final Offer
          </Button>
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Offer Letters
                </p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.totalOffers}
                </h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Final Offers
                </p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.finalOffers}
                </h3>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Avg Package
                </p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.avgPackage.toFixed(1)}
                  <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">
                    LPA
                  </span>
                </h3>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-500 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Companies
                </p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stats.uniqueCompanies}
                </h3>
              </div>
              <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Offer Letters */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Your Offer Letters
        </h2>
        {offers.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-12 w-12 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Offer Letters Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start tracking your job offers by adding your first offer letter
              </p>
              <Button
                onClick={() => openAddModal("offer")}
                variant="outline"
                className="border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
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
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className={`h-2 rounded-t-2xl ${
                    offer.status === "final"
                      ? "bg-[var(--color-success-500)] dark:bg-[var(--color-success-400)]"
                      : "bg-[var(--color-brand-500)] dark:bg-[var(--color-brand-400)]"
                  }`}
                />
                <CardContent>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex-1 pr-2 line-clamp-2">
                      {offer.companyName}
                    </h3>
                    <Badge
                      variant={offer.status === "final" ? "success" : "default"}
                    >
                      {offer.status === "final" ? "Final" : "Offer"}
                    </Badge>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Package
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {offer.packageValue} LPA
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Type
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {offer.companyType}
                      </span>
                    </div>
                    {offer.offerLetterFile && (
                      <div className="flex items-center gap-2 text-sm pt-2">
                        <div className="h-2 w-2 rounded-full bg-[var(--color-success-500)] dark:bg-[var(--color-success-400)]" />
                        <span className="text-[var(--color-success-500)] dark:text-[var(--color-success-400)] font-medium">
                          Offer letter attached
                        </span>
                      </div>
                    )}
                    {offer.joiningLetterFile && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 rounded-full bg-[var(--color-success-500)] dark:bg-[var(--color-success-400)]" />
                        <span className="text-[var(--color-success-500)] dark:text-[var(--color-success-400)] font-medium">
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
                        className="flex-1 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleEdit(offer)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(offer.id)}
                        variant="outline"
                        size="sm"
                        className="text-[var(--color-error-500)] dark:text-[var(--color-error-400)] hover:bg-[var(--color-error-50)] dark:hover:bg-[var(--color-error-900)] border-[var(--color-error-500)] dark:border-[var(--color-error-400)]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {offer.status === "offer" && (
                      <Button
                        onClick={() => handleConvertToFinal(offer)}
                        className="w-full bg-[var(--color-success-500)] hover:bg-[var(--color-success-600)] dark:bg-[var(--color-success-400)] dark:hover:bg-[var(--color-success-500)] text-white shadow-md hover:shadow-lg transition-all"
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100000] animate-in fade-in duration-300">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300 relative z-[100001]">
            <div className="sticky top-0 bg-gray-100 dark:bg-[var(--color-gray-950)] border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
                className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <CardContent className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Name{" "}
                  <span className="text-[var(--color-error-500)] dark:text-[var(--color-error-400)]">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter Company Name"
                  disabled={viewMode}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-[var(--color-gray-950)] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-[var(--color-gray-800)] disabled:cursor-not-allowed text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Package Value (In LPA){" "}
                  <span className="text-[var(--color-error-500)] dark:text-[var(--color-error-400)]">
                    *
                  </span>
                </label>
                <input
                  type="text"
                  name="packageValue"
                  value={formData.packageValue}
                  onChange={handleInputChange}
                  placeholder="Enter Package Value"
                  disabled={viewMode}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-[var(--color-gray-950)] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-[var(--color-gray-800)] disabled:cursor-not-allowed text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Company Type{" "}
                  <span className="text-[var(--color-error-500)] dark:text-[var(--color-error-400)]">
                    *
                  </span>
                </label>
                {viewMode ? (
                  <div className="px-4 py-3 bg-gray-100 dark:bg-[var(--color-gray-800)] rounded-lg text-gray-900 dark:text-white">
                    {formData.companyType || "Not specified"}
                  </div>
                ) : (
                  <Select
                    value={formData.companyType}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an option">
                        {formData.companyType || "Select an option"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Upload your Offer Letter
                </label>
                {viewMode ? (
                  <div className="px-4 py-3 bg-gray-100 dark:bg-[var(--color-gray-800)] rounded-lg text-gray-900 dark:text-white">
                    {formData.offerLetterFile || "No file uploaded"}
                  </div>
                ) : (
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "offerLetterFile")}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="w-full px-4 py-3 bg-white dark:bg-[var(--color-gray-950)] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[var(--color-brand-500)] file:text-white hover:file:bg-[var(--color-brand-600)] dark:file:bg-[var(--color-brand-400)] dark:hover:file:bg-[var(--color-brand-500)] file:cursor-pointer cursor-pointer text-gray-900 dark:text-white transition-all"
                  />
                )}
                {formData.offerLetterFile && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Selected: {formData.offerLetterFile}
                  </p>
                )}
              </div>
              {modalType === "final" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Upload your Joining Letter
                  </label>
                  {viewMode ? (
                    <div className="px-4 py-3 bg-gray-100 dark:bg-[var(--color-gray-800)] rounded-lg text-gray-900 dark:text-white">
                      {formData.joiningLetterFile || "No file uploaded"}
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, "joiningLetterFile")}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="w-full px-4 py-3 bg-white dark:bg-[var(--color-gray-950)] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[var(--color-brand-500)] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[var(--color-brand-500)] file:text-white hover:file:bg-[var(--color-brand-600)] dark:file:bg-[var(--color-brand-400)] dark:hover:file:bg-[var(--color-brand-500)] file:cursor-pointer cursor-pointer text-gray-900 dark:text-white transition-all"
                    />
                  )}
                  {formData.joiningLetterFile && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
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
                    className="flex-1 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-[var(--color-brand-500)] to-[var(--color-brand-600)] hover:from-[var(--color-brand-600)] hover:to-[var(--color-brand-700)] text-white shadow-md hover:shadow-lg transition-all"
                  >
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
  );
};

export default OfferLetters;
