import React, { useState, useEffect } from "react";
import { Check, ArrowRight, Moon, Sun, ArrowLeft } from "lucide-react";
import Footer from "../../components/Footer/Footer";
import { useTheme } from "../../Utils/context/ThemeContext";
const Pricing = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [billingCycle, setBillingCycle] = useState("monthly");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");a
    }
  }, [theme]);

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
        toggleBg: "bg-white text-black",
        toggleInactive: "text-slate-400",
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
      toggleBg: "bg-black text-white",
      toggleInactive: "text-slate-600",
    };
  };

  const themeStyles = getThemeStyles();

  const plans = [
    {
      id: "basic",
      name: "Basic",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "For students starting their placement journey",
      features: [
        "Profile creation and management",
        "View available opportunities",
        "Application tracking",
        "Basic interview resources",
        "Email notifications",
        "Community access",
      ],
      popular: false,
      gradient: "from-blue-500 to-blue-400",
    },
    {
      id: "pro",
      name: "Professional",
      monthlyPrice: 99,
      yearlyPrice: 990,
      description: "For serious placement seekers",
      features: [
        "All Basic features",
        "Priority company matching",
        "1-on-1 interview coaching sessions",
        "Advanced resume builder",
        "Mock interview recordings",
        "Company insights and analytics",
        "24/7 priority support",
        "Personalized learning path",
        "Salary negotiation guide",
      ],
      popular: true,
      gradient: "from-purple-600 to-blue-600",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      description: "For institutions and team programs",
      features: [
        "All Professional features",
        "Unlimited profile reviews",
        "Dedicated placement advisor",
        "Custom training modules",
        "Group interview coordination",
        "Real-time analytics dashboard",
        "API access for integration",
        "White-label customization",
        "Priority company relationships",
        "Custom reporting and insights",
      ],
      popular: false,
      gradient: "from-cyan-600 to-purple-600",
    },
  ];

  const [displayPrices, setDisplayPrices] = useState({
    basic: "$0",
    pro: "$99",
    enterprise: "$299",
  });

  useEffect(() => {
    setDisplayPrices({
      basic: `$${
        billingCycle === "monthly"
          ? plans[0].monthlyPrice
          : plans[0].yearlyPrice
      }`,
      pro: `$${
        billingCycle === "monthly"
          ? plans[1].monthlyPrice
          : plans[1].yearlyPrice
      }`,
      enterprise: `$${
        billingCycle === "monthly"
          ? plans[2].monthlyPrice
          : plans[2].yearlyPrice
      }`,
    });
  }, [billingCycle]);

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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient"></div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16 animate-fadeInUp">
            <h1
              className={`text-5xl md:text-7xl font-bold ${themeStyles.textPrimary} mb-6 leading-tight`}
            >
              Flexible Plans
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tailored For You
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl ${themeStyles.textSecondary} mb-12 max-w-3xl mx-auto leading-relaxed`}
            >
              Choose the perfect plan to accelerate your placement journey and
              achieve career success
            </p>

            {/* Billing Toggle */}
            <div
              className={`inline-flex ${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-full p-1 shadow-lg`}
            >
              {["monthly", "yearly"].map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`px-8 py-3 font-semibold rounded-full transition-all ${
                    billingCycle === cycle
                      ? `${themeStyles.toggleBg}`
                      : `${themeStyles.toggleInactive} bg-transparent`
                  }`}
                >
                  {cycle === "monthly" ? "Monthly" : "Annually"}
                  {cycle === "yearly" && (
                    <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                      Save 17%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative group ${themeStyles.cardBg} ${
                  themeStyles.cardBorder
                } border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
                  selectedPlan === plan.id
                    ? `${themeStyles.cardHoverShadow} -translate-y-2`
                    : themeStyles.cardShadow
                } hover:-translate-y-2 animate-fadeInUp`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient}`}
                  />
                )}

                <div className="p-8">
                  {plan.popular && (
                    <div className="inline-block mb-4 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </div>
                  )}

                  <h3
                    className={`text-2xl font-bold ${themeStyles.textPrimary} mb-2`}
                  >
                    {plan.name}
                  </h3>

                  <p
                    className={`${themeStyles.textSecondary} text-sm mb-6 leading-relaxed`}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-5xl font-bold ${themeStyles.textPrimary}`}
                      >
                        {displayPrices[plan.id]}
                      </span>
                      <span className={`${themeStyles.textSecondary} text-sm`}>
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                    {billingCycle === "yearly" && plan.monthlyPrice > 0 && (
                      <p className={`text-sm ${themeStyles.textTertiary} mt-2`}>
                        ${Math.round((plan.yearlyPrice / 12) * 100) / 100}
                        /month billed annually
                      </p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all mb-8 flex items-center justify-center gap-2 group ${
                      selectedPlan === plan.id || plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                        : `${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.buttonHover} ${themeStyles.textPrimary}`
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Features List */}
                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                        <span
                          className={`text-sm ${themeStyles.textSecondary} leading-relaxed`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Border */}
                {selectedPlan === plan.id && (
                  <div
                    className={`absolute inset-0 border-2 border-blue-600 pointer-events-none rounded-2xl`}
                  />
                )}

                {/* Gradient Bar on Hover */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${plan.gradient} transition-all duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ or Additional Info Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2
              className={`text-4xl md:text-5xl font-bold ${themeStyles.textPrimary} mb-6`}
            >
              Why Choose
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TRACKTNP?
              </span>
            </h2>
            <p
              className={`text-lg ${themeStyles.textSecondary} max-w-2xl mx-auto`}
            >
              Join thousands of students and institutions already transforming
              their placement journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "No Hidden Fees",
                description:
                  "Transparent pricing with no surprises. What you see is what you pay.",
              },
              {
                title: "Cancel Anytime",
                description:
                  "Flexible subscriptions with no long-term commitments. Cancel whenever you need.",
              },
              {
                title: "Money-Back Guarantee",
                description:
                  "Not satisfied? Get a full refund within 30 days, no questions asked.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl p-8 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 hover:-translate-y-2 text-center`}
              >
                <div
                  className={`w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-6`}
                >
                  <Check className="h-6 w-6 text-blue-600" />
                </div>
                <h3
                  className={`text-xl font-bold ${themeStyles.textPrimary} mb-3`}
                >
                  {item.title}
                </h3>
                <p
                  className={`${themeStyles.textSecondary} leading-relaxed text-sm`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer themeStyles={themeStyles} />
    </div>
  );
};

export default Pricing;
