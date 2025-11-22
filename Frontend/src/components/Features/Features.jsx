import {
  Users,
  Briefcase,
  FileText,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";

function FeaturesSection({ themeStyles }) {
  const features = [
    {
      icon: Users,
      title: "Student Management",
      description:
        "Comprehensive student profiles with academic records, skills, and placement preferences. Track progress and performance effortlessly.",
      lightIconBg: "bg-blue-100",
      darkIconBg: "bg-blue-900/30",
      lightIconText: "text-blue-600",
      darkIconText: "text-blue-400",
      gradient: "from-blue-600 to-blue-400",
    },
    {
      icon: Briefcase,
      title: "Placement Tracking",
      description:
        "Real-time tracking of placement drives, company visits, and interview schedules. Never miss an opportunity.",
      lightIconBg: "bg-green-100",
      darkIconBg: "bg-green-900/30",
      lightIconText: "text-green-600",
      darkIconText: "text-green-400",
      gradient: "from-green-600 to-green-400",
    },
    {
      icon: FileText,
      title: "Offer Letter Automation",
      description:
        "Generate, manage, and distribute offer letters automatically. Digital signatures and instant notifications included.",
      lightIconBg: "bg-purple-100",
      darkIconBg: "bg-purple-900/30",
      lightIconText: "text-purple-600",
      darkIconText: "text-purple-400",
      gradient: "from-purple-600 to-purple-400",
    },
    {
      icon: BarChart3,
      title: "Company Dashboard",
      description:
        "Dedicated portal for companies to post requirements, view candidates, and schedule interviews seamlessly.",
      lightIconBg: "bg-amber-100",
      darkIconBg: "bg-amber-900/30",
      lightIconText: "text-amber-600",
      darkIconText: "text-amber-400",
      gradient: "from-amber-600 to-amber-400",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with role-based access control. Your data is encrypted and protected.",
      lightIconBg: "bg-red-100",
      darkIconBg: "bg-red-900/30",
      lightIconText: "text-red-600",
      darkIconText: "text-red-400",
      gradient: "from-red-600 to-red-400",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Built for speed and efficiency. Process thousands of applications without any lag or downtime.",
      lightIconBg: "bg-cyan-100",
      darkIconBg: "bg-cyan-900/30",
      lightIconText: "text-cyan-600",
      darkIconText: "text-cyan-400",
      gradient: "from-cyan-600 to-cyan-400",
    },
  ];

  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-block mb-4"></div>
          <h2
            className={`text-4xl md:text-5xl font-bold ${themeStyles.textPrimary} mb-6`}
          >
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Manage Placements
            </span>
          </h2>
          <p
            className={`text-lg ${themeStyles.textSecondary} max-w-2xl mx-auto`}
          >
            Powerful features designed to simplify every aspect of your
            placement process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isDark = themeStyles.background.includes("slate-950");
            const iconBg = isDark ? feature.darkIconBg : feature.lightIconBg;
            const iconText = isDark
              ? feature.darkIconText
              : feature.lightIconText;

            return (
              <div
                key={index}
                className={`group ${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl p-8 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 hover:-translate-y-2 animate-fadeInUp`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`h-7 w-7 ${iconText}`} />
                </div>

                <h3
                  className={`text-xl font-bold ${themeStyles.textPrimary} mb-3`}
                >
                  {feature.title}
                </h3>

                <p className={`${themeStyles.textSecondary} leading-relaxed`}>
                  {feature.description}
                </p>

                <div
                  className={`mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-500`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
