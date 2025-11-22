import React, { useState } from "react";
import { useTheme } from "../../Utils/context/ThemeContext";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  Building2,
  CheckCircle2,
  User,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Moon,
  Sun,
} from "lucide-react";

// Mock Footer component
const Footer = ({ themeStyles }) => (
  <footer
    className={`${themeStyles.cardBg} py-8 px-6 border-t ${themeStyles.cardBorder}`}
  >
    <div className="max-w-7xl mx-auto text-center">
      <p className={themeStyles.textSecondary}>
        © 2024 TRACKTNP. All rights reserved.
      </p>
    </div>
  </footer>
);

// Mock useTheme hook for demo
const useThemeMock = () => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  return { theme, toggleTheme };
};

const ContactUsPage = () => {
  const { theme, toggleTheme } =
    typeof useTheme === "function" ? useTheme() : useThemeMock();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessEmail: "",
    company: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Theme styles function
  const getThemeStyles = () => {
    if (theme === "dark") {
      return {
        background: "bg-slate-950",
        textPrimary: "text-slate-50",
        textSecondary: "text-slate-400",
        textTertiary: "text-slate-500",
        cardBg: "bg-slate-900",
        cardBorder: "border-slate-800",
        cardShadow: "shadow-lg shadow-slate-900/50",
        cardHoverShadow: "hover:shadow-2xl hover:shadow-slate-900/50",
        buttonBg: "bg-slate-800",
        buttonBorder: "border-slate-700",
        buttonHover: "hover:bg-slate-700",
        emptyStateBg: "bg-slate-900/50",
      };
    }
    return {
      background: "bg-slate-50",
      textPrimary: "text-slate-900",
      textSecondary: "text-slate-600",
      textTertiary: "text-slate-400",
      cardBg: "bg-white",
      cardBorder: "border-slate-200",
      cardShadow: "shadow-lg",
      cardHoverShadow: "hover:shadow-2xl",
      buttonBg: "bg-white",
      buttonBorder: "border-slate-200",
      buttonHover: "hover:bg-slate-50",
      emptyStateBg: "bg-slate-100",
    };
  };

  const themeStyles = getThemeStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      newErrors.businessEmail = "Please enter a valid email";
    }
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        businessEmail: "",
        company: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "contact@tracktnp.com",
      description: "Send us an email anytime",
      link: "mailto:contact@tracktnp.com",
      gradient: "from-blue-600 to-blue-400",
      iconBg: "bg-blue-100",
      darkIconBg: "bg-blue-900/30",
      iconText: "text-blue-600",
      darkIconText: "text-blue-400",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon - Fri: 9:00 AM - 5:00 PM",
      description: "Weekend: Closed",
      gradient: "from-orange-600 to-orange-400",
      iconBg: "bg-orange-100",
      darkIconBg: "bg-orange-900/30",
      iconText: "text-orange-600",
      darkIconText: "text-orange-400",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/incorbis",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 1.8-2.2 4-2.2 4.3 0 5.1 2.8 5.1 6.5V24h-4v-8c0-1.9 0-4.3-2.7-4.3-2.7 0-3.1 2.1-3.1 4.2V24h-4V8z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://x.com/incorbis?t=yRcNnKknmtATHWpOXWnA6w&s=09",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 4.6c-.9.4-1.8.7-2.8.8A4.8 4.8 0 0023.3 3c-1 .6-2.1 1-3.3 1.2A4.8 4.8 0 0016.6 3c-2.7 0-4.9 2.2-4.9 5 0 .4 0 .8.1 1.1C7.7 8.9 4.1 7 1.7 4.1c-.4.8-.6 1.6-.6 2.6 0 1.8.9 3.4 2.3 4.3-.8 0-1.6-.3-2.3-.7v.1c0 2.4 1.7 4.4 3.9 4.8-.4.1-.9.2-1.4.2-.3 0-.6 0-.9-.1.6 2 2.6 3.4 4.8 3.4A9.7 9.7 0 010 20.4 13.7 13.7 0 007.5 22c9 0 13.9-7.6 13.9-14.2v-.7c.9-.7 1.7-1.6 2.3-2.5z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61570261174985&mibextid=ZbWKwL",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/incorbis.official?igsh=OTlyb2VmZWVpdWly",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm11 1a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2c1.7 0 3 1.3 3 3s-1.3 3-3 3a3 3 0 110-6z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@incorbis?si=vAdigR3lav8NpXFB",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M23.5 6.2c-.3-1.2-1.2-2.1-2.4-2.4C19 3.3 12 3.3 12 3.3s-7 0-9.1.5C1.7 4.1.8 5 .5 6.2A25 25 0 000 12a25 25 0 00.5 5.8c.3 1.2 1.2 2.1 2.4 2.4 2.1.5 9.1.5 9.1.5s7 0 9.1-.5c1.2-.3 2.1-1.2 2.4-2.4A25 25 0 0024 12a25 25 0 00-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z" />
        </svg>
      ),
    },
  ];

  const isDark = themeStyles.background.includes("slate-950") ?? false;

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      {/* Back & Theme Toggle */}
      <div className="hidden md:flex fixed top-6 left-6 right-6 z-50 justify-between">
        <button
          onClick={() => window.history.back()}
          className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} transition-all`}
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} transition-all`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Header Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold ${themeStyles.textPrimary} mb-4 sm:mb-6 leading-tight px-4`}
            >
              Get In Touch
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                We're Here to Help
              </span>
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl ${themeStyles.textSecondary} max-w-3xl mx-auto leading-relaxed px-4`}
            >
              Have questions about our placement platform? We'd love to hear
              from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const iconBg = isDark ? info.darkIconBg : info.iconBg;
              const iconText = isDark ? info.darkIconText : info.iconText;

              return (
                <div
                  key={index}
                  className={`group ${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl p-6 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 hover:-translate-y-2`}
                >
                  <div
                    className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-6 w-6 ${iconText}`} />
                  </div>

                  <h3
                    className={`text-lg font-bold ${themeStyles.textPrimary} mb-2`}
                  >
                    {info.title}
                  </h3>

                  {info.link ? (
                    <a
                      href={info.link}
                      className={`${themeStyles.textPrimary} hover:text-blue-600 font-medium transition-colors block mb-1 break-words`}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p
                      className={`${themeStyles.textPrimary} font-medium mb-1`}
                    >
                      {info.value}
                    </p>
                  )}

                  <p className={`${themeStyles.textSecondary} text-sm`}>
                    {info.description}
                  </p>

                  <div
                    className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${info.gradient} rounded-full transition-all duration-500`}
                  ></div>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div
              className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl p-6 sm:p-8 ${themeStyles.cardShadow}`}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                    <CheckCircle2 className="text-green-600" size={48} />
                  </div>
                  <h2
                    className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary} mb-4`}
                  >
                    Message Sent Successfully!
                  </h2>
                  <p
                    className={`${themeStyles.textSecondary} text-base sm:text-lg mb-6`}
                  >
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 sm:mb-8">
                    <h3
                      className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary} mb-2`}
                    >
                      Send Us a Message
                    </h3>
                    <p
                      className={`${themeStyles.textSecondary} text-sm sm:text-base`}
                    >
                      Fill out the form below and we'll get back to you within
                      24 hours
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label
                          className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                        >
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User
                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${themeStyles.textSecondary}`}
                            size={20}
                          />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                              themeStyles.cardBorder
                            } ${themeStyles.cardBg} ${
                              themeStyles.textPrimary
                            } placeholder:${
                              themeStyles.textSecondary
                            } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${
                              errors.firstName ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                        >
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User
                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${themeStyles.textSecondary}`}
                            size={20}
                          />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                              themeStyles.cardBorder
                            } ${themeStyles.cardBg} ${
                              themeStyles.textPrimary
                            } placeholder:${
                              themeStyles.textSecondary
                            } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${
                              errors.lastName ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label
                          className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                        >
                          Business Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail
                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${themeStyles.textSecondary}`}
                            size={20}
                          />
                          <input
                            type="email"
                            name="businessEmail"
                            value={formData.businessEmail}
                            onChange={handleInputChange}
                            placeholder="john@company.com"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                              themeStyles.cardBorder
                            } ${themeStyles.cardBg} ${
                              themeStyles.textPrimary
                            } placeholder:${
                              themeStyles.textSecondary
                            } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${
                              errors.businessEmail ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {errors.businessEmail && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.businessEmail}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                        >
                          Company <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Briefcase
                            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${themeStyles.textSecondary}`}
                            size={20}
                          />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            placeholder="Your Company"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                              themeStyles.cardBorder
                            } ${themeStyles.cardBg} ${
                              themeStyles.textPrimary
                            } placeholder:${
                              themeStyles.textSecondary
                            } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${
                              errors.company ? "border-red-500" : ""
                            }`}
                          />
                        </div>
                        {errors.company && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.company}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className={`block text-sm font-semibold ${themeStyles.textPrimary} mb-2`}
                      >
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="6"
                        placeholder="Tell us about your requirements, questions, or how we can help you..."
                        className={`w-full px-4 py-3 rounded-xl border ${
                          themeStyles.cardBorder
                        } ${themeStyles.cardBg} ${
                          themeStyles.textPrimary
                        } placeholder:${
                          themeStyles.textSecondary
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none ${
                          errors.message ? "border-red-500" : ""
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center space-x-2 font-semibold text-base sm:text-lg"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Additional Info & Social Links */}
            <div className="space-y-6 sm:space-y-8">
              <div
                className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl p-6 sm:p-8 ${themeStyles.cardShadow}`}
              >
                <h3
                  className={`text-xl sm:text-2xl font-bold ${themeStyles.textPrimary} mb-4 sm:mb-6`}
                >
                  Why Choose TRACKTNP?
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Streamlined placement process for students and companies",
                    "Real-time tracking and analytics",
                    "Dedicated support team",
                    "Proven success with top institutions",
                    "Customizable solutions for your needs",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                      </div>
                      <span
                        className={`${themeStyles.textSecondary} leading-relaxed text-sm sm:text-base`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl p-6 sm:p-8 ${themeStyles.cardShadow}`}
              >
                <h3
                  className={`text-xl sm:text-2xl font-bold ${themeStyles.textPrimary} mb-4 sm:mb-6`}
                >
                  Connect With Us
                </h3>
                <p
                  className={`${themeStyles.textSecondary} mb-4 sm:mb-6 text-sm sm:text-base`}
                >
                  Follow us on social media to stay updated with the latest
                  news, features, and placement opportunities.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl ${themeStyles.cardBg} ${themeStyles.cardBorder} border ${themeStyles.textSecondary} hover:text-blue-600 hover:border-blue-600 transition-all`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer themeStyles={themeStyles} />
    </div>
  );
};

export default ContactUsPage;
