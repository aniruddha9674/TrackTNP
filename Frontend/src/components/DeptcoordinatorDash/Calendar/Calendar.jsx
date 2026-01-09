import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Eye,
  Clock,
  X,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

const DepartmentCoordinatorCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Load Events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const result = await window.storage.get("calendar-events", true);
        if (result?.value) {
          setEvents(JSON.parse(result.value));
        }
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
    const interval = setInterval(loadEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);

    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else setCurrentMonth((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else setCurrentMonth((prev) => prev + 1);
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = new Date(currentYear, currentMonth, day).toDateString();
    return events.filter((e) => e.date === dateStr);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isDark = theme === "dark";

  const themeStyles = {
    background: isDark
      ? "from-slate-950 to-slate-900"
      : "from-slate-50 to-slate-100",
    cardBg: isDark ? "bg-slate-900" : "bg-white",
    cardBorder: isDark ? "border-slate-700" : "border-slate-200",
    textPrimary: isDark ? "text-white" : "text-slate-900",
    textSecondary: isDark ? "text-slate-400" : "text-slate-600",
    dayBg: isDark ? "bg-slate-800" : "bg-white",
  };

  return (
    <div style={{ fontFamily: "Urbanist, sans-serif" }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap');`}
      </style>

      <div
        className={`min-h-screen bg-gradient-to-br ${themeStyles.background} overflow-x-hidden`}
      >
        <div className="max-w-full mx-auto p-4 sm:p-6 space-y-6">
          {/* Header */}
          <h1
            className={`text-2xl sm:text-3xl font-bold ${themeStyles.textPrimary}`}
          >
            Department Coordinator Calendar
          </h1>
          <p className={`${themeStyles.textSecondary} text-sm sm:text-base`}>
            View your events and schedule
          </p>

          {/* Controls */}
          <div
            className={`rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} shadow-md p-4`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-400 transition"
                >
                  <ChevronLeft size={18} />
                </button>

                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg border bg-transparent font-semibold"
                >
                  {months.map((m, i) => (
                    <option key={m} value={i}>
                      {m.substring(0, 3)}
                    </option>
                  ))}
                </select>

                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg border bg-transparent font-semibold"
                >
                  {Array.from(
                    { length: 20 },
                    (_, i) => currentYear - 10 + i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-400 transition"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <button
                onClick={() => {
                  setCurrentMonth(new Date().getMonth());
                  setCurrentYear(new Date().getFullYear());
                }}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
              >
                Today
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div
            className={`rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} shadow-md overflow-hidden`}
          >
            <div className="p-3 sm:p-6 overflow-x-hidden">
              {/* Days Row */}
              <div className="grid grid-cols-7 gap-[2px] sm:gap-3 mb-3">
                {daysOfWeek.map((d) => (
                  <div
                    key={d}
                    className={`text-center font-semibold text-xs sm:text-sm ${themeStyles.textSecondary}`}
                  >
                    {d[0]}
                  </div>
                ))}
              </div>

              {/* Dates Grid */}
              <div className="grid grid-cols-7 gap-[2px] sm:gap-3 overflow-x-hidden">
                {generateCalendarDays().map((day, i) => {
                  const isTodayDate = isToday(day);
                  const dayEvents = getEventsForDate(day);

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (!day) return;
                        const eventsForDay = getEventsForDate(day);
                        if (eventsForDay.length > 0) {
                          setSelectedDate(
                            new Date(currentYear, currentMonth, day)
                          );
                          setSelectedDateEvents(eventsForDay);
                          setShowEventModal(true);
                        }
                      }}
                      className={`
                        aspect-square min-h-12 sm:min-h-24 p-1 sm:p-3 rounded-lg border 
                        transition-all cursor-pointer 
                        ${day ? themeStyles.dayBg : "border-transparent"}
                        ${
                          dayEvents.length > 0
                            ? "hover:shadow-md hover:scale-[1.03]"
                            : ""
                        }
                        ${
                          isTodayDate
                            ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white border-blue-700 shadow-[0_0_10px_rgba(59,130,246,0.7)] scale-[1.02]"
                            : ""
                        }
                      `}
                    >
                      {day && (
                        <>
                          <div
                            className={`font-semibold text-right ${
                              isTodayDate
                                ? "text-white"
                                : themeStyles.textPrimary
                            }`}
                          >
                            {day}
                          </div>

                          <div className="mt-1 space-y-1">
                            {dayEvents.slice(0, 2).map((event, idx) => (
                              <div
                                key={event.id}
                                className="px-2 py-1 rounded text-white text-[9px] sm:text-xs truncate"
                                style={{ backgroundColor: event.color }}
                              >
                                {idx === 0
                                  ? event.title.substring(0, 10) +
                                    (event.title.length > 10 ? "..." : "")
                                  : "..."}
                              </div>
                            ))}

                            {dayEvents.length > 2 && (
                              <p className="text-[9px] sm:text-xs text-center text-slate-400">
                                +{dayEvents.length - 2}
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modal */}
          {showEventModal && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowEventModal(false)}
            >
              <div
                className={`w-full max-w-lg rounded-xl border ${themeStyles.cardBg} ${themeStyles.cardBorder} shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`p-4 border-b ${themeStyles.cardBorder}`}>
                  <div className="flex justify-between items-center">
                    <h2
                      className={`text-xl font-bold ${themeStyles.textPrimary}`}
                    >
                      Events on{" "}
                      {selectedDate?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </h2>

                    <button
                      onClick={() => setShowEventModal(false)}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-4 max-h-96 overflow-y-auto space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg border ${themeStyles.cardBorder} ${themeStyles.dayBg}`}
                    >
                      <h3
                        className={`font-semibold text-lg ${themeStyles.textPrimary}`}
                      >
                        {event.title}
                      </h3>

                      <p
                        className={`flex items-center gap-2 mt-2 ${themeStyles.textSecondary}`}
                      >
                        <Clock size={14} />
                        {event.startTime} - {event.endTime}
                      </p>

                      {event.description && (
                        <p
                          className={`mt-2 text-sm ${themeStyles.textSecondary}`}
                        >
                          {event.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className={`p-4 border-t ${themeStyles.cardBorder}`}>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentCoordinatorCalendar;
