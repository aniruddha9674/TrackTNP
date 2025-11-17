import React, { useState, useMemo } from "react";
import {
  Star,
  Building2,
  TrendingUp,
  Award,
  X,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
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
    ghost: "bg-transparent hover:bg-white/20 text-current",
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

const PlacementFeedbackSystem = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    companyName: "",
    packageValue: "",
    numberOfRounds: "",
    roundsInfo: "",
    jobProfile: "",
    preparation: "",
  });

  // Sample companies data with feedback status
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "Google",
      date: "2024-01-15",
      package: "45 LPA",
      role: "Software Engineer",
      feedbackCompleted: true,
    },
    {
      id: 2,
      name: "Microsoft",
      date: "2024-01-20",
      package: "42 LPA",
      role: "SDE-1",
      feedbackCompleted: false,
    },
    {
      id: 3,
      name: "Amazon",
      date: "2024-02-01",
      package: "38 LPA",
      role: "SDE",
      feedbackCompleted: true,
    },
    {
      id: 4,
      name: "Goldman Sachs",
      date: "2024-02-10",
      package: "35 LPA",
      role: "Analyst",
      feedbackCompleted: false,
    },
    {
      id: 5,
      name: "Adobe",
      date: "2024-01-25",
      package: "40 LPA",
      role: "Software Engineer",
      feedbackCompleted: false,
    },
    {
      id: 6,
      name: "Flipkart",
      date: "2024-01-18",
      package: "28 LPA",
      role: "SDE-1",
      feedbackCompleted: true,
    },
  ]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCompanies = companies.length;
    const feedbackCompleted = companies.filter(
      (c) => c.feedbackCompleted
    ).length;
    const feedbackIncomplete = companies.filter(
      (c) => !c.feedbackCompleted
    ).length;

    return { totalCompanies, feedbackCompleted, feedbackIncomplete };
  }, [companies]);

  const resetForm = () => {
    setFormData({
      companyName: "",
      packageValue: "",
      numberOfRounds: "",
      roundsInfo: "",
      jobProfile: "",
      preparation: "",
    });
    setRating(0);
    setSelectedCompany(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setFormData({
      companyName: company.name,
      packageValue: company.package,
      numberOfRounds: "",
      roundsInfo: "",
      jobProfile: company.role,
      preparation: "",
    });
    setShowFeedbackForm(true);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please provide a rating before submitting");
      return;
    }

    // Update feedback status
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === selectedCompany.id ? { ...c, feedbackCompleted: true } : c
      )
    );

    console.log("Feedback submitted:", { ...formData, rating });
    alert("Feedback submitted successfully!");
    setShowFeedbackForm(false);
    resetForm();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      style={{ fontFamily: "Urbanist, sans-serif" }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap');
        * {
          font-family: 'Urbanist', sans-serif;
        }
      `}</style>

      {!showFeedbackForm ? (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Placement Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Track placement drives and share your feedback
            </p>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Total Companies
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                      {stats.totalCompanies}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Feedback Completed
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                      {stats.feedbackCompleted}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-amber-50 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Feedback Incomplete
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mt-2">
                      {stats.feedbackIncomplete}
                    </h3>
                  </div>
                  <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company Table */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                        Sr No.
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                        Company Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">
                        Drive Date
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-slate-50">
                        Status
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900 dark:text-slate-50">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {companies.map((company, index) => (
                      <tr
                        key={company.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-50 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-slate-50 font-medium">
                          {company.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {formatDate(company.date)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {company.feedbackCompleted ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                              <AlertCircle className="h-3.5 w-3.5" />
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            onClick={() => handleCompanySelect(company)}
                            size="sm"
                            className={
                              company.feedbackCompleted
                                ? "bg-slate-600 hover:bg-slate-700 text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                            }
                          >
                            {company.feedbackCompleted
                              ? "View/Edit"
                              : "Feedback"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Feedback Form */
        <div className="min-h-screen flex items-center justify-center p-6">
          <Card className="w-full max-w-3xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => {
                    setShowFeedbackForm(false);
                    resetForm();
                  }}
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold text-white">
                  Placement Feedback Form
                </h2>
              </div>
              <Button
                onClick={() => {
                  setShowFeedbackForm(false);
                  resetForm();
                }}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <CardContent className="p-8 space-y-6">
              <div className="space-y-6">
                {/* Company Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Company Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                  />
                </div>

                {/* Package Value */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Company Package Value{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="packageValue"
                    value={formData.packageValue}
                    onChange={handleInputChange}
                    placeholder="e.g., 12 LPA"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                  />
                </div>

                {/* Number of Rounds */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Number of Rounds <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="numberOfRounds"
                    value={formData.numberOfRounds}
                    onChange={handleInputChange}
                    placeholder="Enter number of rounds"
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                  />
                </div>

                {/* Information of Rounds */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Information of Rounds{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="roundsInfo"
                    value={formData.roundsInfo}
                    onChange={handleInputChange}
                    placeholder="Describe each round (e.g., Round 1: Online test, Round 2: Technical interview...)"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all resize-none"
                  />
                </div>

                {/* Job Profile */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Job Profile <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobProfile"
                    value={formData.jobProfile}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer, Data Analyst"
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
                  />
                </div>

                {/* Preparation */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    How did you prepare for the interview?{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="preparation"
                    value={formData.preparation}
                    onChange={handleInputChange}
                    placeholder="Share your preparation strategy, resources used, topics covered..."
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all resize-none"
                  />
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                    Your Overall Rating <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={36}
                        className={`cursor-pointer transition-all hover:scale-110 ${
                          rating >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-slate-300 dark:text-slate-600 hover:text-yellow-300"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                    {rating > 0 && (
                      <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                        {rating} out of 5 stars
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => {
                      setShowFeedbackForm(false);
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
                    disabled={rating === 0}
                  >
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PlacementFeedbackSystem;
