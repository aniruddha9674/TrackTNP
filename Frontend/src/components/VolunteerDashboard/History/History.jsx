import React, { useState, useMemo } from "react";
import {
  Building2,
  Calendar,
  MapPin,
  Search,
  Globe,
  Clock,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext"; // ✅ SAME AS NOTIFICATIONS

// Add Urbanist font
const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700&display=swap');
  * {
    font-family: 'Urbanist', sans-serif;
  }
`;
document.head.appendChild(style);

const HistoryPageVolunteer = () => {
  const { theme: themeMode } = useTheme(); // ✅ GLOBAL THEME
  const isDarkTheme = themeMode === "dark";

  const theme = isDarkTheme
    ? {
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
        inputFocus: "focus:border-blue-400 focus:ring-2 focus:ring-blue-900/30",
        emptyStateBg: "bg-slate-800/50",
        emptyStateIcon: "text-slate-600",
      }
    : {
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
        inputFocus: "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
        emptyStateBg: "bg-slate-50",
        emptyStateIcon: "text-slate-400",
      };

  const [volunteerHistory] = useState([
    {
      id: 1,
      companyName: "Tech Corp Solutions",
      driveDate: "2024-09-15",
      venue: "Online",
      mode: "Online",
      myRole: "Registration Desk",
    },
    {
      id: 2,
      companyName: "Innovation Labs",
      driveDate: "2024-08-28",
      venue: "Auditorium Block A",
      mode: "Offline",
      myRole: "Student Coordination",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = useMemo(() => {
    return volunteerHistory.filter(drive =>
      drive.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [volunteerHistory, searchTerm]);

  return (
    <div className={`min-h-screen ${theme.background} p-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${theme.textPrimary} mb-2`}>
            My Volunteer History
          </h1>
          <p className={theme.textSecondary}>
            Drives you've volunteered for
          </p>
        </div>

        {/* Main Card */}
        <div className={`${theme.cardBg} rounded-xl border ${theme.cardBorder} ${theme.cardShadow} overflow-hidden`}>
          {/* Search */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textTertiary}`} size={20} />
              <input
                type="text"
                placeholder="Search by company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputFocus} rounded-lg ${theme.textPrimary} outline-none`}
              />
            </div>
          </div>

          {/* List */}
          <div className={`divide-y ${theme.cardBorder}`}>
            {filteredHistory.map(drive => (
              <div key={drive.id} className={`p-6 ${theme.cardHoverShadow}`}>
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>
                      {drive.companyName}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-500" />
                        <span className={`text-sm ${theme.textSecondary}`}>
                          {new Date(drive.driveDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {drive.mode === "Online" ? (
                          <Globe className="w-4 h-4 text-purple-500" />
                        ) : (
                          <MapPin className="w-4 h-4 text-purple-500" />
                        )}
                        <span className={`text-sm ${theme.textSecondary}`}>
                          {drive.venue}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className={`text-sm ${theme.textSecondary}`}>
                          {drive.myRole}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPageVolunteer;
