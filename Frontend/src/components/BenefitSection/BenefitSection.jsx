import { Clock, Target, TrendingUp, Lock } from "lucide-react";

function BenefitsSection({ themeStyles }) {
  const benefits = [
    {
      icon: Clock,
      title: "Save 70% Time",
      description: "Automate repetitive tasks and focus on what matters most.",
      stat: "70%",
    },
    {
      icon: Target,
      title: "Improve Accuracy",
      description: "Eliminate manual errors with intelligent automation.",
      stat: "99.9%",
    },
    {
      icon: TrendingUp,
      title: "Boost Placements",
      description: "Increase placement rates with better coordination.",
      stat: "+45%",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-grade security for all your sensitive data.",
      stat: "100%",
    },
  ];

  return (
    <section id="benefits" className="py-20 px-6">
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
            Join hundreds of institutions transforming their placement process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={index}
                className={`group ${themeStyles.cardBg} ${themeStyles.cardBorder} border rounded-2xl overflow-hidden ${themeStyles.cardShadow} ${themeStyles.cardHoverShadow} transition-all duration-300 hover:-translate-y-2 animate-fadeInUp`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>

                <div className="p-8">
                  <div
                    className={`w-14 h-14 ${themeStyles.statIcon1Bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-7 w-7 ${themeStyles.statIcon1Text}`} />
                  </div>

                  <div
                    className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3`}
                  >
                    {benefit.stat}
                  </div>

                  <h3
                    className={`text-xl font-bold ${themeStyles.textPrimary} mb-3`}
                  >
                    {benefit.title}
                  </h3>

                  <p className={`${themeStyles.textSecondary}`}>
                    {benefit.description}
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

export default BenefitsSection;
