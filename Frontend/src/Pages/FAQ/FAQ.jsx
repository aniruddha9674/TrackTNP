import React, { useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const FAQ = () => {
  const { theme, toggleTheme } = useTheme();

  const isDarkTheme = theme === "dark";
  const [openIndex, setOpenIndex] = useState(0);

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
    calendarIcon: "text-slate-500",
    offerLetterText: "text-green-600",
    statusActiveBg: "bg-green-500",
    statusUpcomingBg: "bg-blue-500",
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
    modalHeader: "border-slate-200",
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
    calendarIcon: "text-slate-400",
    offerLetterText: "text-green-400",
    statusActiveBg: "bg-green-600",
    statusUpcomingBg: "bg-blue-600",
    statusCompletedBg: "bg-slate-700",
    statusCompletedText: "text-slate-300",
  });

  const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

  const faqData = [
    {
      question: "How do I register for campus placements?",
      answer:
        "Students can register for campus placements through the student portal. Navigate to the Placements section, complete your profile with academic details, upload your resume, and submit the registration form. Ensure all information is accurate as it will be shared with recruiting companies.",
    },
    {
      question: "What is the eligibility criteria for placements?",
      answer:
        "Eligibility criteria vary by company and role. Generally, students must maintain a minimum CGPA (usually 6.0 or above), have no active backlogs, and meet any specific requirements set by recruiting companies such as technical skills, branch restrictions, or year of study requirements.",
    },
    {
      question: "How can I track my placement application status?",
      answer:
        "You can track your application status in real-time through the Track and Placement dashboard. The system displays all your applications, interview schedules, results, and offer letters in one centralized location. You'll also receive email notifications for any status updates.",
    },
    {
      question: "What companies participate in campus recruitment?",
      answer:
        "We host a diverse range of companies from various sectors including IT services, product-based companies, consulting firms, core engineering companies, and startups. The complete list of participating companies is updated each recruitment season and available on the placement portal.",
    },
    {
      question: "How are interview schedules communicated?",
      answer:
        "Interview schedules are posted on your dashboard and you'll receive email notifications at least 24-48 hours in advance. The schedule includes date, time, venue, interview format, and any preparation materials. Make sure to check your dashboard regularly during placement season.",
    },
    {
      question: "Can I apply to multiple companies?",
      answer:
        "Yes, students can apply to multiple companies simultaneously. However, once you accept an offer, you may be restricted from participating in further placement drives based on the placement policy. Review the placement guidelines for specific rules regarding multiple offers.",
    },
    {
      question: "What happens after I receive an offer letter?",
      answer:
        "After receiving an offer letter, you'll need to review the terms, accept or decline the offer through the portal within the specified timeframe, and complete any required documentation. The placement cell will guide you through the joining formalities and coordinate with the company.",
    },
    {
      question: "How can I prepare for placement interviews?",
      answer:
        "The placement cell organizes regular training sessions, mock interviews, aptitude tests, and soft skills workshops. Additionally, you can access preparation resources, previous interview experiences, and company-specific materials through the resource section of the portal.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className={`min-h-screen ${themeStyles.background} py-12 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with Back and Theme buttons */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => window.history.back()}
            className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} transition-all ${themeStyles.textPrimary}`}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex-1 text-center px-4">
            <h1
              className={`text-4xl font-bold ${themeStyles.textPrimary} mb-4`}
            >
              Frequently Asked Questions
            </h1>
            <p className={`text-lg ${themeStyles.textSecondary}`}>
              Find answers to common questions about Track and Placement
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} transition-all ${themeStyles.textPrimary}`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} rounded-xl transition-all duration-300`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-start justify-between text-left focus:outline-none"
              >
                <span
                  className={`text-base font-semibold ${themeStyles.textPrimary} pr-4 leading-relaxed`}
                >
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 ${themeStyles.textSecondary} mt-1`}
                >
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className={`px-6 pb-5 ${themeStyles.textSecondary} leading-relaxed`}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div
          className={`mt-12 ${themeStyles.cardBg} ${themeStyles.cardBorder} border ${themeStyles.cardShadow} rounded-xl p-8 text-center`}
        >
          <h2 className={`text-2xl font-bold ${themeStyles.textPrimary} mb-3`}>
            Still have questions?
          </h2>
          <p className={`${themeStyles.textSecondary} mb-6`}>
            Can't find the answer you're looking for? Please reach out to our
            placement cell team.
          </p>
          <a
            href="/contactus"
            className={`inline-block ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} ${themeStyles.textPrimary} px-8 py-3 rounded-lg font-medium transition-colors duration-200`}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
