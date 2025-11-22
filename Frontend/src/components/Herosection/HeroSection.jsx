import { ArrowRight, Play } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function HeroSection({ themeStyles }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
      <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="animate-fadeInUp">
          <div className="inline-block mb-6"></div>

          <h1
            className={`text-5xl md:text-7xl font-bold ${themeStyles.textPrimary} mb-6 leading-tight`}
          >
            Manage Training &<br />
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Placements Effortlessly
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl ${themeStyles.textSecondary} mb-12 max-w-3xl mx-auto leading-relaxed`}
          >
            Streamline your college's placement process with our comprehensive
            platform. Track students, manage companies, and automate offer
            letters all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <button className="group px-8 py-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2 font-medium">
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <a href="#demo">
              <button
                className={`px-8 py-4 rounded-lg ${themeStyles.buttonBg} ${themeStyles.buttonBorder} border ${themeStyles.textPrimary} ${themeStyles.buttonHover} transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 font-medium`}
              >
                <Play className="h-5 w-5" />
                <span>View Demo</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
