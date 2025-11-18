import { useState, useEffect } from "react";
import { ChevronLeft, Eye, EyeOff, Moon, Sun } from "lucide-react";

function ThemeToggleButton({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-white dark:bg-gray-800 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      style={{
        color: "var(--text-primary)",
      }}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}

export default function AuthApp() {
  const [currentPage, setCurrentPage] = useState("signin");
  const [theme, setTheme] = useState("light");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState("student");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    const root = window.document.documentElement;
    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    const root = window.document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navigate = (page) => {
    setCurrentPage(page);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `${
        currentPage === "signin" ? "Sign In" : "Sign Up"
      } as ${role} successful!`
    );
  };

  const renderSignInForm = () => (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center text-sm transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1
              className="mb-2 font-semibold text-3xl sm:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              Sign In
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <a href="/studentdashboard">
              <button
                className="inline-flex items-center justify-center w-full gap-3 py-3 text-sm font-normal transition-colors rounded-lg px-7"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--text-primary)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                    fill="#EB4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </a>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="w-full border-t"
                  style={{ borderColor: "var(--surface)" }}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="p-2 sm:px-5 sm:py-2"
                  style={{
                    backgroundColor: "var(--bg)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Or
                </span>
              </div>
            </div>
            <div className="flex items-center w-full mb-6 bg-[var(--surface)] rounded-lg p-2">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 py-2 rounded-lg transition text-sm ${
                  role === "student"
                    ? "bg-[var(--brand)] text-white"
                    : "text-[var(--text-primary)]"
                }`}
              >
                Student
              </button>

              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-2 rounded-lg transition text-sm ${
                  role === "admin"
                    ? "bg-[var(--brand)] text-white"
                    : "text-[var(--text-primary)]"
                }`}
              >
                Admin
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Email <span style={{ color: "var(--error)" }}>*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: "var(--surface)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="info@gmail.com"
                    type="email"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Password <span style={{ color: "var(--error)" }}>*</span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--surface)",
                        color: "var(--text-primary)",
                      }}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <Eye
                          className="w-5 h-5"
                          style={{ color: "var(--text-secondary)" }}
                        />
                      ) : (
                        <EyeOff
                          className="w-5 h-5"
                          style={{ color: "var(--text-secondary)" }}
                        />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: "var(--brand)" }}
                    />
                    <span
                      className="block text-sm font-normal"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Keep me logged in
                    </span>
                  </div>
                  <button
                    type="button"
                    className="text-sm"
                    style={{ color: "var(--brand)" }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-5 py-3.5 text-base font-medium text-white transition rounded-lg shadow-lg"
                    style={{
                      backgroundColor: "var(--brand)",
                    }}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p
                className="text-sm font-normal text-center sm:text-start"
                style={{ color: "var(--text-primary)" }}
              >
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("signup")}
                  className="hover:underline"
                  style={{ color: "var(--brand)" }}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSignUpForm = () => (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center text-sm transition-colors"
          style={{ color: "var(--text-secondary)" }}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1
              className="mb-2 font-semibold text-3xl sm:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              Sign Up
            </h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <button
              className="inline-flex items-center justify-center w-full gap-3 py-3 text-sm font-normal transition-colors rounded-lg px-7"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--text-primary)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                  fill="#4285F4"
                />
                <path
                  d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                  fill="#34A853"
                />
                <path
                  d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                  fill="#EB4335"
                />
              </svg>
              Sign up with Google
            </button>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div
                  className="w-full border-t"
                  style={{ borderColor: "var(--surface)" }}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="p-2 sm:px-5 sm:py-2"
                  style={{
                    backgroundColor: "var(--bg)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Or
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label
                      className="block mb-2 text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      First Name<span style={{ color: "var(--error)" }}>*</span>
                    </label>
                    <input
                      className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--surface)",
                        color: "var(--text-primary)",
                      }}
                      type="text"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      className="block mb-2 text-sm font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Last Name<span style={{ color: "var(--error)" }}>*</span>
                    </label>
                    <input
                      className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--surface)",
                        color: "var(--text-primary)",
                      }}
                      type="text"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Email<span style={{ color: "var(--error)" }}>*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: "var(--surface)",
                      color: "var(--text-primary)",
                    }}
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Password<span style={{ color: "var(--error)" }}>*</span>
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--surface)",
                        color: "var(--text-primary)",
                      }}
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <Eye
                          className="w-5 h-5"
                          style={{ color: "var(--text-secondary)" }}
                        />
                      ) : (
                        <EyeOff
                          className="w-5 h-5"
                          style={{ color: "var(--text-secondary)" }}
                        />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-5 h-5 rounded cursor-pointer"
                    style={{ accentColor: "var(--brand)" }}
                  />
                  <p
                    className="inline-block text-sm font-normal"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    By creating an account means you agree to the{" "}
                    <span style={{ color: "var(--text-primary)" }}>
                      Terms and Conditions,
                    </span>{" "}
                    and our{" "}
                    <span style={{ color: "var(--text-primary)" }}>
                      Privacy Policy
                    </span>
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-lg"
                    style={{
                      backgroundColor: "var(--brand)",
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p
                className="text-sm font-normal text-center sm:text-start"
                style={{ color: "var(--text-primary)" }}
              >
                Already have an account?{" "}
                <button
                  onClick={() => navigate("signin")}
                  className="hover:underline"
                  style={{ color: "var(--brand)" }}
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="relative p-6 sm:p-0"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <style>{`
        @layer base {
          :root {
            --bg: #ffffff;
            --text-primary: #101828;
            --text-secondary: #667085;
            --surface: #f2f4f7;
            --brand: #465fff;
            --brand-hover: #3641f5;
            --info: #0ba5ec;
            --success: #32d583;
            --error: #f04438;
          }

          .dark {
            --bg: #0c111d;
            --text-primary: #f9fafb;
            --text-secondary: #98a2b3;
            --surface: #1d2939;
            --brand: #7592ff;
            --brand-hover: #465fff;
            --info: #36bffa;
            --success: #6ce9a6;
            --error: #f97066;
          }
        }
        
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div
        className="relative flex flex-col justify-center w-full h-screen lg:flex-row sm:p-0"
        style={{ backgroundColor: "var(--bg)" }}
      >
        {currentPage === "signin" && renderSignInForm()}
        {currentPage === "signup" && renderSignUpForm()}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900 lg:grid">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
            <div className="flex flex-col items-center max-w-xs">
              <div className="mb-6">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg">
                  <svg
                    className="w-10 h-10 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
              </div>
              <h2 className="mb-3 text-2xl font-bold text-white">
                Welcome Back
              </h2>
              <p className="text-center text-blue-100">
                Secure authentication for your application
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  );
}
