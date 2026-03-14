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

const VolunteerCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const months = [
    "January","February","March","April",
    "May","June","July","August",
    "September","October","November","December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Load Events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const result = await window.storage.get("calendar-events", true);
        if (result?.value) setEvents(JSON.parse(result.value));
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

  const getFirstDayOfMonth = (month, year) =>
    new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((p) => p - 1); }
    else setCurrentMonth((p) => p - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((p) => p + 1); }
    else setCurrentMonth((p) => p + 1);
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

  const t = {
    background:    isDark ? "from-slate-950 to-slate-900" : "from-slate-50 to-slate-100",
    cardBg:        isDark ? "bg-slate-900"    : "bg-white",
    cardBorder:    isDark ? "border-slate-700": "border-slate-200",
    textPrimary:   isDark ? "text-white"      : "text-slate-900",
    textSecondary: isDark ? "text-slate-400"  : "text-slate-600",
    dayBg:         isDark ? "bg-slate-800"    : "bg-slate-50",
    dayBorder:     isDark ? "border-slate-700": "border-slate-200",
    selectBg:      isDark
      ? "bg-slate-800 text-white border-slate-600"
      : "bg-white text-slate-900 border-slate-300",
    btnHover: isDark
      ? "hover:bg-slate-700 border-slate-600"
      : "hover:bg-slate-100 border-slate-300",
  };

  return (
    <div style={{ fontFamily: "Urbanist, sans-serif" }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap');`}
      </style>

      <div className={`min-h-screen bg-gradient-to-br ${t.background}`}>
        <div className="max-w-full mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">

          {/* Header */}
          <div>
            <h1 className={`text-xl sm:text-3xl font-bold ${t.textPrimary}`}>
              Volunteer Calendar
            </h1>
            <p className={`${t.textSecondary} text-xs sm:text-base mt-0.5`}>
              View your events and schedule
            </p>
          </div>

          {/* Controls
              Mobile:  [←] [month▾] [year▾] [→]  — one row, selects share space
                       [          Today          ]  — full-width second row
              Desktop: nav+selects left, Today right — single row
          */}
          <div className={`rounded-xl border ${t.cardBg} ${t.cardBorder} shadow-md p-3 sm:p-4`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              {/* Nav + selects */}
              <div className="flex items-center gap-1.5 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={handlePrevMonth}
                  className={`p-1.5 sm:p-2 rounded-lg border ${t.btnHover} transition shrink-0`}
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Month — flex-1 so it grows to fill available space on mobile */}
                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(Number(e.target.value))}
                  className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border text-sm font-semibold ${t.selectBg} transition`}
                >
                  {months.map((m, i) => (
                    <option key={m} value={i}>{m}</option>
                  ))}
                </select>

                {/* Year — fixed narrow width on mobile */}
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(Number(e.target.value))}
                  className={`w-20 sm:w-auto px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border text-sm font-semibold ${t.selectBg} transition`}
                >
                  {Array.from({ length: 20 }, (_, i) => currentYear - 10 + i).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <button
                  onClick={handleNextMonth}
                  className={`p-1.5 sm:p-2 rounded-lg border ${t.btnHover} transition shrink-0`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Today — full width on mobile, auto on desktop */}
              <button
                onClick={() => {
                  setCurrentMonth(new Date().getMonth());
                  setCurrentYear(new Date().getFullYear());
                }}
                className="w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-md transition"
              >
                Today
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className={`rounded-xl border ${t.cardBg} ${t.cardBorder} shadow-md overflow-hidden`}>
            <div className="p-2 sm:p-6">

              {/* Day-of-week header */}
              <div className="grid grid-cols-7 mb-1 sm:mb-3">
                {daysOfWeek.map((d) => (
                  <div
                    key={d}
                    className={`text-center font-semibold py-1 text-[10px] sm:text-sm ${t.textSecondary}`}
                  >
                    {/* Single letter on mobile, 3-letter on desktop */}
                    <span className="sm:hidden">{d[0]}</span>
                    <span className="hidden sm:inline">{d}</span>
                  </div>
                ))}
              </div>

              {/* Date cells
                  Mobile:  aspect-square so cells scale with column width (~50px on most phones)
                           dots shown instead of text pills
                  Desktop: min-h-24 tall cells with truncated title pills
              */}
              <div className="grid grid-cols-7 gap-[3px] sm:gap-3">
                {generateCalendarDays().map((day, i) => {
                  const isTodayDate = isToday(day);
                  const dayEvents = getEventsForDate(day);
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (!day) return;
                        const eventsForDay = getEventsForDate(day);
                        if (eventsForDay.length > 0) {
                          setSelectedDate(new Date(currentYear, currentMonth, day));
                          setSelectedDateEvents(eventsForDay);
                          setShowEventModal(true);
                        }
                      }}
                      className={[
                        "rounded-md sm:rounded-lg border transition-all cursor-pointer",
                        day ? `${t.dayBg} ${t.dayBorder}` : "border-transparent",
                        hasEvents ? "hover:shadow-md hover:scale-[1.03]" : "",
                        isTodayDate
                          ? "bg-gradient-to-br from-blue-500 to-blue-700 !border-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.7)] scale-[1.02]"
                          : "",
                        // aspect-square on mobile so cells are proportional to column width
                        // min-h-24 on desktop for roomy event pills
                        "aspect-square sm:aspect-auto sm:min-h-24",
                        "p-1 sm:p-3",
                      ].join(" ")}
                    >
                      {day && (
                        <>
                          {/* Day number */}
                          <div
                            className={[
                              "font-semibold text-right leading-none",
                              "text-[11px] sm:text-sm",
                              isTodayDate ? "text-white" : t.textPrimary,
                            ].join(" ")}
                          >
                            {day}
                          </div>

                          {/* MOBILE: colored dots — no text, cells too small */}
                          {hasEvents && (
                            <div className="flex sm:hidden justify-center gap-[2px] mt-1 flex-wrap">
                              {dayEvents.slice(0, 3).map((event) => (
                                <span
                                  key={event.id}
                                  className="w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: event.color }}
                                />
                              ))}
                              {dayEvents.length > 3 && (
                                <span
                                  className={[
                                    "text-[7px] leading-none self-center",
                                    isTodayDate ? "text-white/80" : t.textSecondary,
                                  ].join(" ")}
                                >
                                  +{dayEvents.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {/* DESKTOP: title pills */}
                          <div className="hidden sm:block mt-1 space-y-1">
                            {dayEvents.slice(0, 2).map((event, idx) => (
                              <div
                                key={event.id}
                                className="px-2 py-1 rounded text-white text-[10px] truncate"
                                style={{ backgroundColor: event.color }}
                              >
                                {idx === 0
                                  ? event.title.substring(0, 12) + (event.title.length > 12 ? "…" : "")
                                  : `+${dayEvents.length - 1} more`}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <p className={`text-[10px] ${isTodayDate ? "text-white/80" : t.textSecondary}`}>
                                +{dayEvents.length - 2} more
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

          {/* Mobile hint */}
          <p className={`sm:hidden text-center text-[10px] ${t.textSecondary}`}>
            Tap a date with dots to see events
          </p>

          {/* Event Detail Modal
              Mobile:  bottom sheet (items-end + rounded-t-2xl)
              Desktop: centered dialog (items-center + rounded-xl)
          */}
          {showEventModal && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
              onClick={() => setShowEventModal(false)}
            >
              <div
                className={[
                  "w-full sm:max-w-lg",
                  "rounded-t-2xl sm:rounded-xl",
                  `border ${t.cardBg} ${t.cardBorder}`,
                  "shadow-2xl",
                  "max-h-[85vh] sm:max-h-[90vh]",
                  "flex flex-col",
                ].join(" ")}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drag handle — mobile only */}
                <div className="w-10 h-1 bg-slate-300/50 rounded-full mx-auto mt-3 sm:hidden" />

                {/* Header */}
                <div className={`p-4 border-b ${t.cardBorder} shrink-0`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className={`text-base sm:text-xl font-bold ${t.textPrimary}`}>
                        {selectedDate?.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </h2>
                      <p className={`text-xs ${t.textSecondary} mt-0.5`}>
                        {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowEventModal(false)}
                      className={`p-1.5 rounded-lg ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"} transition`}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Event list — scrollable */}
                <div className="p-3 sm:p-4 overflow-y-auto flex-1 space-y-2 sm:space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 sm:p-4 rounded-lg border ${t.dayBorder} ${t.dayBg} flex gap-3`}
                    >
                      {/* Color bar */}
                      <div
                        className="w-1 rounded-full shrink-0 self-stretch"
                        style={{ backgroundColor: event.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm sm:text-lg ${t.textPrimary} truncate`}>
                          {event.title}
                        </h3>
                        <p className={`flex items-center gap-1.5 mt-1 text-xs sm:text-sm ${t.textSecondary}`}>
                          <Clock size={12} />
                          {event.startTime} – {event.endTime}
                        </p>
                        {event.description && (
                          <p className={`mt-1.5 text-xs sm:text-sm ${t.textSecondary} line-clamp-2`}>
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className={`p-3 sm:p-4 border-t ${t.cardBorder} shrink-0`}>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="w-full py-2.5 sm:py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 shadow-md transition"
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

export default VolunteerCalendar;