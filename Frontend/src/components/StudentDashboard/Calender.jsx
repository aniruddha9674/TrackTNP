import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Moon, Sun, Clock, Eye } from "lucide-react";

const StudentCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

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
  const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

  // Load events from storage
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const result = await window.storage.get("calendar-events", true);
        if (result && result.value) {
          const parsedEvents = JSON.parse(result.value);
          setEvents(parsedEvents);
        }
      } catch (error) {
        console.log("No events found or error loading events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();

    // Poll for updates every 5 seconds
    const interval = setInterval(loadEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    if (day) {
      const date = new Date(currentYear, currentMonth, day);
      const dateEvents = getEventsForDate(day);
      if (dateEvents.length > 0) {
        setSelectedDate(date);
        setSelectedDateEvents(dateEvents);
        setShowEventModal(true);
      }
    }
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateStr = new Date(currentYear, currentMonth, day).toDateString();
    return events.filter((event) => event.date === dateStr);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const calendarDays = generateCalendarDays();

  return (
    <div style={{ fontFamily: "Urbanist, sans-serif" }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap');`}
      </style>

      <div
        className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: isDark ? "#101828" : "#ffffff" }}
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div
            className="rounded-xl shadow-sm border p-6 mb-6"
            style={{
              backgroundColor: isDark ? "#1D2939" : "#ffffff",
              borderColor: isDark ? "#1D2939" : "#e5e7eb",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "#465FFF" }}
                >
                  <svg
                    className="text-white"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <h1
                    className="text-3xl font-bold"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    Student Calendar
                  </h1>
                  <p
                    className="text-sm"
                    style={{ color: isDark ? "#98A2B3" : "#667085" }}
                  >
                    View your events and schedule
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-3 rounded-lg transition-all"
                style={{
                  backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                  color: isDark ? "#fbbf24" : "#101828",
                }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-lg transition-all hover:scale-105"
                  style={{
                    backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                    color: isDark ? "#F9FAFB" : "#101828",
                  }}
                >
                  <ChevronLeft size={20} />
                </button>

                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                  className="px-4 py-2 rounded-lg border font-medium transition-colors cursor-pointer"
                  style={{
                    backgroundColor: isDark ? "#1D2939" : "#ffffff",
                    borderColor: isDark ? "#344054" : "#E4E7EC",
                    color: isDark ? "#F9FAFB" : "#101828",
                  }}
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                  className="px-4 py-2 rounded-lg border font-medium transition-colors cursor-pointer"
                  style={{
                    backgroundColor: isDark ? "#1D2939" : "#ffffff",
                    borderColor: isDark ? "#344054" : "#E4E7EC",
                    color: isDark ? "#F9FAFB" : "#101828",
                  }}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-lg transition-all hover:scale-105"
                  style={{
                    backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                    color: isDark ? "#F9FAFB" : "#101828",
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <button
                onClick={() => {
                  setCurrentMonth(new Date().getMonth());
                  setCurrentYear(new Date().getFullYear());
                }}
                className="px-5 py-2 rounded-lg font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: "#465FFF",
                  color: "#ffffff",
                }}
              >
                Today
              </button>
            </div>
          </div>

          {loading ? (
            <div
              className="rounded-xl shadow-sm border p-12 text-center"
              style={{
                backgroundColor: isDark ? "#1D2939" : "#ffffff",
                borderColor: isDark ? "#1D2939" : "#e5e7eb",
              }}
            >
              <div
                className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
                style={{ borderColor: "#465FFF" }}
              ></div>
              <p
                className="mt-4"
                style={{ color: isDark ? "#98A2B3" : "#667085" }}
              >
                Loading events...
              </p>
            </div>
          ) : (
            <div
              className="rounded-xl shadow-sm border overflow-hidden"
              style={{
                backgroundColor: isDark ? "#1D2939" : "#ffffff",
                borderColor: isDark ? "#1D2939" : "#e5e7eb",
              }}
            >
              <div className="p-6">
                <div className="grid grid-cols-7 gap-3">
                  {daysOfWeek.map((day) => (
                    <div
                      key={day}
                      className="text-center font-semibold py-3 text-sm"
                      style={{ color: isDark ? "#98A2B3" : "#667085" }}
                    >
                      {day}
                    </div>
                  ))}

                  {calendarDays.map((day, index) => {
                    const dayEvents = getEventsForDate(day);
                    const isTodayDate = isToday(day);

                    return (
                      <div
                        key={index}
                        onClick={() => handleDateClick(day)}
                        className="min-h-28 p-2 rounded-lg transition-all border"
                        style={{
                          backgroundColor: day
                            ? isDark
                              ? "#1D2939"
                              : "#F2F4F7"
                            : "transparent",
                          borderColor: isTodayDate
                            ? "#465FFF"
                            : day
                            ? isDark
                              ? "#344054"
                              : "#E4E7EC"
                            : "transparent",
                          borderWidth: isTodayDate ? "2px" : "1px",
                          cursor: dayEvents.length > 0 ? "pointer" : "default",
                        }}
                        onMouseEnter={(e) => {
                          if (dayEvents.length > 0) {
                            e.currentTarget.style.transform = "scale(1.05)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      >
                        {day && (
                          <>
                            <div
                              className="text-sm font-semibold mb-1.5"
                              style={{
                                color: isTodayDate
                                  ? "#465FFF"
                                  : isDark
                                  ? "#F9FAFB"
                                  : "#101828",
                              }}
                            >
                              {day}
                            </div>
                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div
                                  key={event.id}
                                  className="text-xs px-2 py-1 rounded truncate text-white font-medium"
                                  style={{ backgroundColor: event.color }}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 && (
                                <div
                                  className="text-xs font-medium"
                                  style={{
                                    color: isDark ? "#98A2B3" : "#667085",
                                  }}
                                >
                                  +{dayEvents.length - 2} more
                                </div>
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
          )}

          {events.length > 0 && (
            <div
              className="rounded-xl shadow-sm border p-6 mt-6"
              style={{
                backgroundColor: isDark ? "#1D2939" : "#ffffff",
                borderColor: isDark ? "#1D2939" : "#e5e7eb",
              }}
            >
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: isDark ? "#F9FAFB" : "#101828" }}
              >
                Upcoming Events
              </h2>
              <div className="space-y-3">
                {events
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-lg border transition-all"
                      style={{
                        backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                        borderColor: isDark ? "#344054" : "#E4E7EC",
                      }}
                    >
                      <div className="flex gap-3">
                        <div
                          className="w-1 rounded-full"
                          style={{ backgroundColor: event.color }}
                        />
                        <div className="flex-1">
                          <h3
                            className="font-semibold"
                            style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                          >
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <p
                              className="text-sm flex items-center gap-1"
                              style={{ color: isDark ? "#98A2B3" : "#667085" }}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="4"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                              {event.date}
                            </p>
                            <p
                              className="text-sm flex items-center gap-1"
                              style={{ color: isDark ? "#98A2B3" : "#667085" }}
                            >
                              <Clock size={14} />
                              {event.startTime} - {event.endTime}
                            </p>
                          </div>
                          {event.description && (
                            <p
                              className="text-sm mt-2"
                              style={{ color: isDark ? "#98A2B3" : "#667085" }}
                            >
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {!loading && events.length === 0 && (
            <div
              className="rounded-xl shadow-sm border p-12 text-center mt-6"
              style={{
                backgroundColor: isDark ? "#1D2939" : "#ffffff",
                borderColor: isDark ? "#1D2939" : "#e5e7eb",
              }}
            >
              <div
                className="p-4 rounded-full inline-block mb-4"
                style={{ backgroundColor: isDark ? "#344054" : "#F2F4F7" }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isDark ? "#98A2B3" : "#667085"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: isDark ? "#F9FAFB" : "#101828" }}
              >
                No Events Yet
              </h3>
              <p style={{ color: isDark ? "#98A2B3" : "#667085" }}>
                There are no events scheduled at this time.
              </p>
            </div>
          )}
        </div>

        {showEventModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            onClick={() => setShowEventModal(false)}
          >
            <div
              className="rounded-xl shadow-2xl max-w-lg w-full border transform transition-all"
              style={{
                backgroundColor: isDark ? "#1D2939" : "#ffffff",
                borderColor: isDark ? "#344054" : "#e5e7eb",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="p-6 border-b"
                style={{ borderColor: isDark ? "#344054" : "#E4E7EC" }}
              >
                <div className="flex justify-between items-center">
                  <h2
                    className="text-2xl font-bold flex items-center gap-2"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    <Eye size={24} />
                    Events on{" "}
                    {selectedDate?.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h2>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{
                      color: isDark ? "#98A2B3" : "#667085",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDark
                        ? "#344054"
                        : "#F2F4F7";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: isDark ? "#101828" : "#F2F4F7",
                      borderColor: isDark ? "#344054" : "#E4E7EC",
                    }}
                  >
                    <div className="flex gap-3">
                      <div
                        className="w-1 rounded-full"
                        style={{ backgroundColor: event.color }}
                      />
                      <div className="flex-1">
                        <h3
                          className="font-semibold text-lg mb-2"
                          style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                        >
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock
                            size={16}
                            style={{ color: isDark ? "#98A2B3" : "#667085" }}
                          />
                          <p
                            className="text-sm"
                            style={{ color: isDark ? "#98A2B3" : "#667085" }}
                          >
                            {event.startTime} - {event.endTime}
                          </p>
                        </div>
                        {event.description && (
                          <p
                            className="text-sm"
                            style={{ color: isDark ? "#98A2B3" : "#667085" }}
                          >
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="p-6 border-t"
                style={{ borderColor: isDark ? "#344054" : "#E4E7EC" }}
              >
                <button
                  onClick={() => setShowEventModal(false)}
                  className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                  style={{
                    backgroundColor: "#465FFF",
                    color: "#ffffff",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCalendar;
