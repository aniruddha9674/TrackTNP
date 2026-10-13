import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  X,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";
import { fetchEvents } from "../../Utils/api/calenderApi";

const DEV_HARDCODED_STUDENT_COLLEGE_ID = 4;

const mapFromApi = (e) => ({
  id: e.id,
  date: new Date(e.start_date).toDateString(),
  title: e.title,
  description: e.description,
  startTime: new Date(e.start_date).toTimeString().slice(0, 5),
  endTime: new Date(e.end_date).toTimeString().slice(0, 5),
  color: e.color,
  target_colleges: e.target_colleges || [],
});

const StudentCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Load events from the real API, filtered to this student's college
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEvents();
        const mapped = data.map(mapFromApi);

        // Only show events targeting this student's college.
        // An event with an empty target_colleges list is treated as "everyone".
        const filtered = mapped.filter(
          (e) =>
            e.target_colleges.length === 0 ||
            e.target_colleges.includes(DEV_HARDCODED_STUDENT_COLLEGE_ID)
        );

        setEvents(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to load events.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
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
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
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
    background: isDark ? "from-slate-950 to-slate-900" : "from-slate-50 to-slate-100",
    cardBg: isDark ? "bg-slate-900" : "bg-white",
    cardBorder: isDark ? "border-slate-700" : "border-slate-200",
    textPrimary: isDark ? "text-white" : "text-slate-900",
    textSecondary: isDark ? "text-slate-400" : "text-slate-600",
    dayBg: isDark ? "bg-slate-800" : "bg-slate-50",
    dayBorder: isDark ? "border-slate-700" : "border-slate-200",
    selectBg: isDark ? "bg-slate-800 text-white border-slate-600" : "bg-white text-slate-900 border-slate-300",
    btnHover: isDark ? "hover:bg-slate-700 border-slate-600" : "hover:bg-slate-100 border-slate-300",
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
              Student Calendar
            </h1>
            <p className={`${t.textSecondary} text-xs sm:text-base mt-0.5`}>
              View your events and schedule
            </p>
          </div>

          {/* Controls */}
          <div className={`rounded-xl border ${t.cardBg} ${t.cardBorder} shadow-md p-3 sm:p-4`}>
            {/* 
              Mobile layout:  [← ] [month▾] [year▾] [ →]   ← all on one row, tight
                              [         Today         ]      ← full-width row below
              Desktop layout: [← month year →]              [Today] — side by side
            */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              {/* Nav + selects */}
              <div className="flex items-center gap-1.5 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={handlePrevMonth}
                  className={`p-1.5 sm:p-2 rounded-lg border ${t.btnHover} transition shrink-0`}
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Month select — shrinks gracefully on mobile */}
                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(Number(e.target.value))}
                  className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border text-sm font-semibold ${t.selectBg} transition`}
                >
                  {months.map((m, i) => (
                    <option key={m} value={i}>
                      {/* Mobile: 3-letter abbr  /  No easy way in HTML — show full on both */}
                      {m}
                    </option>
                  ))}
                </select>

                {/* Year select */}
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

              {/* Today button — full width on mobile, auto on desktop */}
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
              <div className="grid grid-cols-7 mb-2 sm:mb-3">
                {daysOfWeek.map((d) => (
                  <div
                    key={d}
                    className={`text-center font-semibold py-1 text-[10px] sm:text-sm ${t.textSecondary}`}
                  >
                    {/* Mobile: 1 letter, Desktop: 3 letters */}
                    <span className="sm:hidden">{d[0]}</span>
                    <span className="hidden sm:inline">{d}</span>
                  </div>
                ))}
              </div>

              {/* Date cells */}
              <div className="grid grid-cols-7 gap-[2px] sm:gap-2">
                {generateCalendarDays().map((day, i) => {
                  const isTodayDate = isToday(day);
                  const dayEvents = getEventsForDate(day);
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (!day || !hasEvents) return;
                        setSelectedDate(new Date(currentYear, currentMonth, day));
                        setSelectedDateEvents(dayEvents);
                        setShowEventModal(true);
                      }}
                      className={`
                        relative rounded-md sm:rounded-lg border transition-all
                        ${day ? "" : "border-transparent"}
                        ${day ? `${t.dayBg} ${t.dayBorder}` : ""}
                        ${hasEvents ? "cursor-pointer hover:shadow-md hover:scale-[1.03]" : day ? "cursor-default" : ""}
                        ${isTodayDate
                          ? "bg-gradient-to-br from-blue-500 to-blue-700 !border-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-[1.02]"
                          : ""}
                        /* 
                          Mobile: fixed small height, no aspect-square to avoid overflow
                          Desktop: taller cells with min-height
                        */
                        h-9 sm:min-h-[90px] sm:h-auto p-1 sm:p-2
                      `}
                    >
                      {day && (
                        <>
                          {/* Day number */}
                          <div
                            className={`text-right leading-none font-semibold
                              text-[10px] sm:text-sm
                              ${isTodayDate ? "text-white" : t.textPrimary}
                            `}
                          >
                            {day}
                          </div>

                          {/* 
                            MOBILE: show up to 3 colored dots (no text — too small)
                            DESKTOP: show event title pills (up to 2) + overflow count
                          */}

                          {/* Mobile dots */}
                          {hasEvents && (
                            <div className="flex sm:hidden gap-[2px] mt-0.5 justify-center flex-wrap">
                              {dayEvents.slice(0, 3).map((event) => (
                                <span
                                  key={event.id}
                                  className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
                                  style={{ backgroundColor: event.color }}
                                />
                              ))}
                              {dayEvents.length > 3 && (
                                <span className={`text-[8px] ${isTodayDate ? "text-white/80" : t.textSecondary} leading-none`}>
                                  +{dayEvents.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Desktop pills */}
                          <div className="hidden sm:block mt-1 space-y-1">
                            {dayEvents.slice(0, 2).map((event, idx) => (
                              <div
                                key={event.id}
                                className="px-1.5 py-0.5 rounded text-white text-[10px] truncate"
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

          {/* Legend hint on mobile */}
          <p className={`sm:hidden text-center text-[10px] ${t.textSecondary}`}>
            Tap a date with dots to see events
          </p>

          {/* Event Detail Modal */}
          {showEventModal && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50"
              onClick={() => setShowEventModal(false)}
            >
              {/* 
                Mobile: sheet slides up from bottom (items-end + rounded-t-2xl)
                Desktop: centered dialog (items-center + rounded-xl)
              */}
              <div
                className={`
                  w-full sm:max-w-lg
                  rounded-t-2xl sm:rounded-xl
                  border ${t.cardBg} ${t.cardBorder}
                  shadow-2xl
                  max-h-[85vh] sm:max-h-[90vh]
                  flex flex-col
                `}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal header */}
                <div className={`p-4 border-b ${t.cardBorder} shrink-0`}>
                  {/* Drag handle on mobile */}
                  <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-3 sm:hidden" />
                  <div className="flex justify-between items-center">
                    <h2 className={`text-base sm:text-xl font-bold ${t.textPrimary}`}>
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </h2>
                    <button
                      onClick={() => setShowEventModal(false)}
                      className={`p-1.5 rounded-lg ${isDark ? "hover:bg-slate-700" : "hover:bg-slate-100"} transition`}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className={`text-xs ${t.textSecondary} mt-0.5`}>
                    {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Event list */}
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
                        <h3 className={`font-semibold text-sm sm:text-base ${t.textPrimary} truncate`}>
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

export default StudentCalendar;