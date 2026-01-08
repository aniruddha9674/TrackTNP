import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Moon,
  Sun,
  Clock,
  AlignLeft,
} from "lucide-react";
import { useTheme } from "../../../Utils/context/ThemeContext";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [eventColor, setEventColor] = useState("#465FFF");
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

  const eventColors = [
    { color: "#465FFF", name: "Brand" },
    { color: "#3641F5", name: "Hover" },
    { color: "#0BA5EC", name: "Blue Light" },
    { color: "#32D583", name: "Success" },
    { color: "#F04438", name: "Error" },
    { color: "#F97066", name: "Error Light" },
  ];

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
      setSelectedDate(new Date(currentYear, currentMonth, day));
      setShowModal(true);
      setEventTitle("");
      setEventDescription("");
      setStartTime("09:00");
      setEndTime("10:00");
      setEventColor("#465FFF");
    }
  };

  const handleAddEvent = () => {
    if (eventTitle && selectedDate) {
      const newEvent = {
        id: Date.now(),
        date: selectedDate.toDateString(),
        title: eventTitle,
        description: eventDescription,
        startTime,
        endTime,
        color: eventColor,
      };
      setEvents([...events, newEvent]);
      setShowModal(false);
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
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
        style={{ backgroundColor: isDark ? "#020617" : "#ffffff" }}
      >
        <div className="max-w-full mx-auto p-4 sm:p-6 lg:p-8">
          <div
            className="rounded-xl shadow-sm  p-6 mb-6"
            style={{
              backgroundColor: isDark ? "#020617" : "#ffffff",
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
                    Calendar
                  </h1>
                  <p
                    className="text-sm"
                    style={{ color: isDark ? "#98A2B3" : "#667085" }}
                  >
                    Manage your events and schedule
                  </p>
                </div>
              </div>
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
                      className="min-h-28 p-2 rounded-lg cursor-pointer transition-all border hover:scale-105"
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
                      className="p-4 rounded-lg border flex justify-between items-start transition-all hover:scale-102"
                      style={{
                        backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                        borderColor: isDark ? "#344054" : "#E4E7EC",
                      }}
                    >
                      <div className="flex gap-3 flex-1">
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
                          <div className="flex items-center gap-3 mt-1">
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
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 rounded-lg transition-all hover:scale-110"
                        style={{
                          color: isDark ? "#98A2B3" : "#667085",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#F04438";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = isDark
                            ? "#98A2B3"
                            : "#667085";
                        }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div
              className="rounded-xl shadow-2xl max-w-lg w-full border transform transition-all"
              style={{
                backgroundColor: isDark ? "#1D2939" : "#ffffff",
                borderColor: isDark ? "#344054" : "#e5e7eb",
              }}
            >
              <div
                className="p-6 border-b"
                style={{ borderColor: isDark ? "#344054" : "#E4E7EC" }}
              >
                <div className="flex justify-between items-center">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    Add Event
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
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
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Enter event title"
                    className="w-full px-4 py-3 rounded-lg border transition-all"
                    style={{
                      backgroundColor: isDark ? "#1D2939" : "#ffffff",
                      borderColor: isDark ? "#344054" : "#E4E7EC",
                      color: isDark ? "#F9FAFB" : "#101828",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    Description
                  </label>
                  <textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Enter event description"
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border transition-all"
                    style={{
                      backgroundColor: isDark ? "#1D2939" : "#ffffff",
                      borderColor: isDark ? "#344054" : "#E4E7EC",
                      color: isDark ? "#F9FAFB" : "#101828",
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                    >
                      Start Date *
                    </label>
                    <div
                      className="px-4 py-3 rounded-lg border"
                      style={{
                        backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                        borderColor: isDark ? "#344054" : "#E4E7EC",
                        color: isDark ? "#F9FAFB" : "#101828",
                      }}
                    >
                      {selectedDate?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                    >
                      End Date *
                    </label>
                    <div
                      className="px-4 py-3 rounded-lg border"
                      style={{
                        backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                        borderColor: isDark ? "#344054" : "#E4E7EC",
                        color: isDark ? "#F9FAFB" : "#101828",
                      }}
                    >
                      {selectedDate?.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                    >
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border transition-all"
                      style={{
                        backgroundColor: isDark ? "#1D2939" : "#ffffff",
                        borderColor: isDark ? "#344054" : "#E4E7EC",
                        color: isDark ? "#F9FAFB" : "#101828",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2"
                      style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                    >
                      End Time
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border transition-all"
                      style={{
                        backgroundColor: isDark ? "#1D2939" : "#ffffff",
                        borderColor: isDark ? "#344054" : "#E4E7EC",
                        color: isDark ? "#F9FAFB" : "#101828",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-3"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    Event Color
                  </label>
                  <div className="flex gap-3">
                    {eventColors.map((color) => (
                      <button
                        key={color.color}
                        onClick={() => setEventColor(color.color)}
                        className="w-10 h-10 rounded-lg transition-all hover:scale-110"
                        style={{
                          backgroundColor: color.color,
                          border:
                            eventColor === color.color
                              ? "2px solid #465FFF"
                              : "none",
                          transform:
                            eventColor === color.color
                              ? "scale(1.1)"
                              : "scale(1)",
                        }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="p-6 border-t flex gap-3"
                style={{ borderColor: isDark ? "#344054" : "#E4E7EC" }}
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                  style={{
                    backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                    color: isDark ? "#F9FAFB" : "#101828",
                    border: isDark ? "1px solid #344054" : "none",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  disabled={!eventTitle}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold transition-all"
                  style={{
                    backgroundColor: eventTitle ? "#465FFF" : "#E4E7EC",
                    color: eventTitle ? "#ffffff" : "#98A2B3",
                    cursor: eventTitle ? "pointer" : "not-allowed",
                    transform: eventTitle ? "scale(1)" : "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    if (eventTitle)
                      e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
