import React, { useState,useEffect } from "react";
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
import { useTheme } from "../../Utils/context/ThemeContext";
import { fetchEvents, createEvent, deleteEvent } from "../../Utils/api/calenderApi"; 
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [eventColor, setEventColor] = useState("#465FFF");
  const [selectedColleges, setSelectedColleges] = useState([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

const collegeOptions = [
  { id: 2, name: "Pimpri Chinchwad College of Engineering PCCOE" },
  { id: 3, name: "Pimpri Chinchwad College of Engineering & Research PCCOER" },
  { id: 4, name: "Nutan Maharashtra Institute of Engineering and Technology NMIET" },
];


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

  const combineDateAndTime = (date, time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0, 0);
  return combined.toISOString();
};

  const mapFromApi = (e) => ({
  id: e.id,
  date: new Date(e.start_date).toDateString(), // matches your existing getEventsForDate() comparison
  title: e.title,
  description: e.description,
  startTime: new Date(e.start_date).toTimeString().slice(0, 5), // "HH:MM"
  endTime: new Date(e.end_date).toTimeString().slice(0, 5),
  color: e.color,
});

  useEffect(() => {
  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents();
      setEvents(data.map(mapFromApi));
    } catch (err) {
      console.error(err);
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };
  loadEvents();
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
  
  const toggleCollege = (college) => {
  setSelectedColleges((prev) =>
    prev.includes(college)
      ? prev.filter((c) => c !== college)
      : [...prev, college]
  );
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

  const handleAddEvent = async () => {
  if (!eventTitle || !selectedDate) return;

  const payload = {
    title: eventTitle,
    description: eventDescription,
    event_type: "other", // no dropdown in the form yet, backend defaults to this anyway
    color: eventColor,
    start_date: combineDateAndTime(selectedDate, startTime),
    end_date: combineDateAndTime(selectedDate, endTime),
    target_colleges: selectedColleges,
  };

  try {
    const created = await createEvent(payload);
    setEvents((prev) => [...prev, mapFromApi(created)]);
    setShowModal(false);
    setSelectedColleges([]);
  } catch (err) {
    console.error(err.response?.data || err);
    setError("Failed to create event. Check the form and try again.");
  }
};

  const handleDeleteEvent = async (id) => {
  try {
    await deleteEvent(id);
    setEvents((prev) => prev.filter((event) => event.id !== id));
  } catch (err) {
    console.error(err);
    setError("Failed to delete event.");
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
        style={{ backgroundColor: isDark ? "#020617" : "#ffffff" }}
      >
        <div className="max-w-full mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
          <div
            className="rounded-xl shadow-sm  p-4 sm:p-5 md:p-6 mb-4 sm:mb-6"
            style={{
              backgroundColor: isDark ? "#020617" : "#ffffff",
              borderColor: isDark ? "#1D2939" : "#e5e7eb",
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <div className="flex items-start sm:items-center gap-2 sm:gap-3 w-full">
                <div
                  className="p-2 sm:p-3 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: "#465FFF" }}
                >
                  <svg
                    className="text-white"
                    width="18"
                    height="18"
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
                    className="text-xl sm:text-2xl md:text-3xl font-bold"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    Calendar
                  </h1>
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: isDark ? "#98A2B3" : "#667085" }}
                  >
                    Manage your events and schedule
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto overflow-x-auto">
                <button
                  onClick={handlePrevMonth}
                  className="p-1.5 sm:p-2 rounded-lg transition-all hover:scale-105 flex-shrink-0"
                  style={{
                    backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                    color: isDark ? "#F9FAFB" : "#101828",
                  }}
                >
                  <ChevronLeft size={18} />
                </button>

                <select
                  value={currentMonth}
                  onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                  className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border font-medium transition-colors cursor-pointer text-xs sm:text-sm"
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
                  className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border font-medium transition-colors cursor-pointer text-xs sm:text-sm"
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
                  className="p-1.5 sm:p-2 rounded-lg transition-all hover:scale-105 flex-shrink-0"
                  style={{
                    backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                    color: isDark ? "#F9FAFB" : "#101828",
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <button
                onClick={() => {
                  setCurrentMonth(new Date().getMonth());
                  setCurrentYear(new Date().getFullYear());
                }}
                className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg font-semibold transition-all hover:scale-105 text-sm w-full sm:w-auto"
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
            <div className="p-3 sm:p-4 md:p-6">
              <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-center font-semibold py-2 text-xs sm:text-sm"
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
                      className="min-h-20 sm:min-h-24 md:min-h-28 p-1.5 sm:p-2 md:p-2 rounded-lg cursor-pointer transition-all border hover:scale-105"
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
                            className="text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1.5"
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
                          <div className="space-y-0.5">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className="text-xs px-1.5 py-0.5 rounded truncate text-white font-medium"
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
              className="rounded-xl shadow-sm border p-4 sm:p-5 md:p-6 mt-4 sm:mt-6"
              style={{
                backgroundColor: isDark ? "#1D2939" : "#ffffff",
                borderColor: isDark ? "#1D2939" : "#e5e7eb",
              }}
            >
              <h2
                className="text-lg sm:text-xl font-bold mb-3 sm:mb-4"
                style={{ color: isDark ? "#F9FAFB" : "#101828" }}
              >
                Upcoming Events
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {events
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((event) => (
                    <div
                      key={event.id}
                      className="p-3 sm:p-4 rounded-lg border flex flex-col sm:flex-row justify-between sm:items-start gap-2 sm:gap-3 transition-all hover:scale-102"
                      style={{
                        backgroundColor: isDark ? "#1D2939" : "#F2F4F7",
                        borderColor: isDark ? "#344054" : "#E4E7EC",
                      }}
                    >
                      <div className="flex gap-2 sm:gap-3 flex-1 min-w-0">
                        <div
                          className="w-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: event.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <h3
                            className="font-semibold text-sm sm:text-base truncate"
                            style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                          >
                            {event.title}
                          </h3>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 mt-1">
                            <p
                              className="text-xs sm:text-sm flex items-center gap-1"
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
                              className="text-xs sm:text-sm flex items-center gap-1"
                              style={{ color: isDark ? "#98A2B3" : "#667085" }}
                            >
                              <Clock size={14} />
                              {event.startTime} - {event.endTime}
                            </p>
                          </div>
                          {event.description && (
                            <p
                              className="text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2"
                              style={{ color: isDark ? "#98A2B3" : "#667085" }}
                            >
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-1.5 sm:p-2 rounded-lg transition-all hover:scale-110 flex-shrink-0"
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
                        <X size={16} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 backdrop-blur-sm">
            <div
              className="rounded-xl shadow-2xl max-w-2xl w-full border transform transition-all max-h-screen overflow-y-auto"
              style={{
                backgroundColor: isDark ? "#1D2939" : "#ffffff",
                borderColor: isDark ? "#344054" : "#e5e7eb",
              }}
            >
              <div
                className="p-4 sm:p-6 border-b sticky top-0"
                style={{ borderColor: isDark ? "#344054" : "#E4E7EC" }}
              >
                <div className="flex justify-between items-center gap-3">
                  <h2
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    Add Event
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1.5 sm:p-2 rounded-lg transition-all hover:scale-110 flex-shrink-0"
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

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold mb-2"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Enter event title"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all text-sm"
                    style={{
                      backgroundColor: isDark ? "#1D2939" : "#ffffff",
                      borderColor: isDark ? "#344054" : "#E4E7EC",
                      color: isDark ? "#F9FAFB" : "#101828",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold mb-2"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    Description
                  </label>
                  <textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Enter event description"
                    rows="3"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all text-sm"
                    style={{
                      backgroundColor: isDark ? "#1D2939" : "#ffffff",
                      borderColor: isDark ? "#344054" : "#E4E7EC",
                      color: isDark ? "#F9FAFB" : "#101828",
                    }}
                  />
                </div>

                <div>
  <label
    className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-3"
    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
  >
    Target Colleges
  </label>
  <div className="flex flex-col gap-2">
  {collegeOptions.map((college) => (
    <label
      key={college.id}
      className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all text-sm"
      style={{
        backgroundColor: selectedColleges.includes(college.id)
          ? isDark
            ? "#344054"
            : "#EEF2FF"
          : isDark
          ? "#1D2939"
          : "#ffffff",
        borderColor: selectedColleges.includes(college.id)
          ? "#465FFF"
          : isDark
          ? "#344054"
          : "#E4E7EC",
        color: isDark ? "#F9FAFB" : "#101828",
      }}
    >
      <input
        type="checkbox"
        checked={selectedColleges.includes(college.id)}
        onChange={() => toggleCollege(college.id)}
        className="w-4 h-4 accent-[#465FFF]"
      />
      {college.name}
    </label>
  ))}
</div>
</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label
                      className="block text-xs sm:text-sm font-semibold mb-2"
                      style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                    >
                      Start Date *
                    </label>
                    <div
                      className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm"
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
                      className="block text-xs sm:text-sm font-semibold mb-2"
                      style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                    >
                      End Date *
                    </label>
                    <div
                      className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label
                      className="block text-xs sm:text-sm font-semibold mb-2"
                      style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                    >
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all text-sm"
                      style={{
                        backgroundColor: isDark ? "#1D2939" : "#ffffff",
                        borderColor: isDark ? "#344054" : "#E4E7EC",
                        color: isDark ? "#F9FAFB" : "#101828",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs sm:text-sm font-semibold mb-2"
                      style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                    >
                      End Time
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all text-sm"
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
                    className="block text-xs sm:text-sm font-semibold mb-2 sm:mb-3"
                    style={{ color: isDark ? "#F9FAFB" : "#101828" }}
                  >
                    Event Color
                  </label>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {eventColors.map((color) => (
                      <button
                        key={color.color}
                        onClick={() => setEventColor(color.color)}
                        className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg transition-all hover:scale-110"
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
                className="p-4 sm:p-6 border-t flex flex-col sm:flex-row gap-2 sm:gap-3"
                style={{ borderColor: isDark ? "#344054" : "#E4E7EC" }}
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all hover:scale-105 text-sm"
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
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm"
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
