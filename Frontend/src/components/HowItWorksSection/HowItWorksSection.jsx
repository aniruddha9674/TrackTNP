import { UserPlus, Building2, FileCheck, Award } from "lucide-react";

function HowItWorksSection({ themeStyles }) {
  const steps = [
    {
      icon: UserPlus,
      title: "Register Students",
      description:
        "Add student profiles with academic details, skills, and career preferences.",
      step: "01",
    },
    {
      icon: Building2,
      title: "Connect Companies",
      description:
        "Partner companies post job requirements and access qualified candidate pools.",
      step: "02",
    },
    {
      icon: FileCheck,
      title: "Manage Process",
      description:
        "Schedule interviews, track applications, and coordinate placement drives.",
      step: "03",
    },
    {
      icon: Award,
      title: "Secure Offers",
      description:
        "Generate offer letters, collect acceptances, and celebrate placements.",
      step: "04",
    },
  ];

  return (
    <section
      id="how-it-works"
      className={`py-20 px-6 ${themeStyles.emptyStateBg}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-block mb-4"></div>
          <h2
            className={`text-4xl md:text-5xl font-bold ${themeStyles.textPrimary} mb-6`}
          >
            Simple 4-Step
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Placement Process
            </span>
          </h2>
          <p
            className={`text-lg ${themeStyles.textSecondary} max-w-2xl mx-auto`}
          >
            From registration to offer letters, manage everything seamlessly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-600 to-transparent -translate-x-1/2 z-0"></div>
                )}

                <div
                  className={`relative ${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl p-8 ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 hover:-translate-y-2 z-10`}
                >
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">
                        {step.step}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`mt-8 w-14 h-14 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <Icon className={`h-7 w-7 ${themeStyles.statIcon1Text}`} />
                  </div>

                  <h3
                    className={`text-xl font-bold ${themeStyles.textPrimary} mb-3`}
                  >
                    {step.title}
                  </h3>

                  <p className={`${themeStyles.textSecondary} leading-relaxed`}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
