import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
    Menu,
    X,
    User,
    Moon,
    Sun,
    Home,
    Building,
    FileText,
    Briefcase,
    Award,
    Folder,
    MessageSquare,
    Calendar,
    Settings,
    LogOut,
    ChevronDown,
    Bell,
    NotebookPen,
    TrendingUp,
    History,
} from "lucide-react";
import { useTheme } from "../../Utils/context/ThemeContext";

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const isDarkTheme = theme === "dark";

    // Import your logos
    const DarkLogo = "/src/assets/DarkLogo.png";
    const LightLogo = "/src/assets/LightLogo.png";

    const getLightTheme = () => ({
        background: "bg-gradient-to-br from-slate-50 to-slate-100",
        surface: "bg-white",
        border: "border-gray-200",
        textPrimary: "text-slate-900",
        textSecondary: "text-slate-600",
        textTertiary: "text-slate-400",
        hoverSurface: "hover:bg-gray-100",
        hoverText: "hover:text-slate-900",
        activeBg: "bg-blue-500",
        activeText: "text-white",
        activeBorder: "border-blue-500",
        activeShadow: "shadow-lg shadow-blue-500/30",
        modalBg: "bg-white",
        modalBorder: "border-gray-200",
        modalText: "text-slate-900",
        modalTextSecondary: "text-slate-600",
        errorBg: "bg-red-500",
        errorHover: "hover:bg-red-600",
        errorText: "text-white",
        iconColor: "text-slate-900",
        iconHover: "hover:text-slate-900",
        sidebarWidth: "w-62",
        modalOverlay: "bg-black/60",
        sidebarCollapsedWidth: "w-20",
        sidebarTranslate: "translate-x-0",
        sidebarHidden: "-translate-x-full",
        sidebarExpanded: "lg:translate-x-0",
        sidebarBorder: "border-r border-gray-200",
        sidebarLogoText: "bg-gradient-to-r from-brand-500 to-blue-light-500 ",
        sidebarLogoTextCollapsed:
            "bg-gradient-to-r from-brand-500 to-blue-light-500 ",
        sidebarNavItem: "text-slate-600 hover:text-slate-900",
        sidebarNavItemActive:
            "bg-blue-500 text-white shadow-lg shadow-blue-500/30 border-blue-500 hover:bg-blue-600 hover:border-blue-600",
        sidebarNavItemInactive: "border-transparent",
        sidebarNavItemCollapsed: "justify-center",
        sidebarNavItemIcon: "text-slate-600 hover:text-slate-900",
        sidebarNavItemIconActive: "text-white",
        sidebarNavItemIconCollapsed: "scale-80",
        sidebarNavItemIconExpanded: "scale-90",
        sidebarLogout: "text-slate-600 hover:text-slate-900",
        topBarBg: "bg-white/80 backdrop-blur-xl",
        topBarBorder: "border-b border-gray-200",
        topBarIcon: "text-slate-600 hover:text-slate-900",
        topBarUserText: "text-slate-900",
        topBarUserTextSecondary: "text-slate-600",
        topBarUserBg: "bg-gradient-to-br from-blue-400 to-blue-500",
        topBarUserHover: "hover:shadow-lg hover:shadow-blue-500/30",
    });

    const getDarkTheme = () => ({
        background: "bg-gradient-to-br from-slate-950 to-slate-900",
        surface: "bg-slate-900",
        border: "border-gray-700",
        textPrimary: "text-slate-50",
        textSecondary: "text-slate-400",
        textTertiary: "text-slate-500",
        hoverSurface: "hover:bg-gray-800",
        hoverText: "hover:text-slate-50",
        activeBg: "bg-slate-800",
        activeText: "text-white",
        activeBorder: "border-blue-400",
        activeShadow: "shadow-none",
        modalBg: "bg-slate-800",
        modalBorder: "border-gray-700",
        modalText: "text-slate-50",
        modalTextSecondary: "text-slate-400",
        errorBg: "bg-red-600",
        errorHover: "hover:bg-red-700",
        errorText: "text-white",
        iconColor: "text-slate-50",
        iconHover: "hover:text-slate-50",
        sidebarWidth: "w-62",
        modalOverlay: "bg-black/80",
        sidebarCollapsedWidth: "w-20",
        sidebarTranslate: "translate-x-0",
        sidebarHidden: "-translate-x-full",
        sidebarExpanded: "lg:translate-x-0",
        sidebarBorder: "border-r border-gray-700",
        sidebarLogoText: "bg-gradient-to-r from-brand-400 to-blue-light-300 ",
        sidebarLogoTextCollapsed:
            "bg-gradient-to-r from-brand-400 to-blue-light-300  ",
        sidebarNavItem: "text-slate-400 hover:text-slate-50",
        sidebarNavItemActive:
            "bg-slate-800 text-white border-l-4 border-blue-400 hover:bg-slate-700",
        sidebarNavItemInactive: "border-transparent",
        sidebarNavItemCollapsed: "justify-center",
        sidebarNavItemIcon: "text-slate-400 hover:text-slate-50",
        sidebarNavItemIconActive: "text-white",
        sidebarNavItemIconCollapsed: "scale-80",
        sidebarNavItemIconExpanded: "scale-90",
        sidebarLogout: "text-slate-400 hover:text-slate-50",
        topBarBg: "bg-slate-900/80 backdrop-blur-xl",
        topBarBorder: "border-b border-gray-700",
        topBarIcon: "text-slate-400 hover:text-slate-50",
        topBarUserText: "text-slate-50",
        topBarUserTextSecondary: "text-slate-400",
        topBarUserBg: "bg-gradient-to-br from-blue-500 to-blue-600",
        topBarUserHover: "hover:shadow-lg hover:shadow-blue-500/30",
    });

    const themeStyles = isDarkTheme ? getDarkTheme() : getLightTheme();

    const navItems = [
        {
            icon: <Home className="w-6 h-6" />,
            name: "Overview",
            path: "/volunteerdashboard",
        },
        {
            icon: <Building className="w-6 h-6" />,
            name: "Company",
            path: "/volunteerdashboard/company",
        },
        {
            icon: <History className="w-6 h-6" />,
            name: "History",
            path: "/volunteerdashboard/history",
        },
        {
            icon: <Bell className="w-6 h-6" />,
            name: "Notifications",
            path: "/volunteerdashboard/notification",
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            name: "Calendar",
            path: "/volunteerdashboard/calender",
        },
        {
            icon: <Settings className="w-6 h-6" />,
            name: "Settings",
            path: "/volunteerdashboard/settings",
        },
    ];

    const isActive = (path) => {
        if (path === "/volunteerdashboard") {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    const handleLogout = () => {
        setShowLogoutModal(false);
        navigate("/login");
    };

    const SubMenu = ({ item, sidebarExpanded, themeStyles }) => {
        const [open, setOpen] = useState(false);
        const location = useLocation();

        const activeChild = item.children.some((c) =>
            location.pathname.startsWith(c.path)
        );

        return (
            <div>
                {/* Parent Button — looks exactly like your normal menu item */}
                <button
                    onClick={() => setOpen(!open)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-base
            ${activeChild
                            ? themeStyles.sidebarNavItemActive
                            : themeStyles.sidebarNavItem
                        }
            ${!sidebarExpanded && themeStyles.sidebarNavItemCollapsed}`}
                >
                    {/* Icon */}
                    <div
                        className={`transition-transform duration-300
              ${sidebarExpanded
                                ? themeStyles.sidebarNavItemIconExpanded
                                : themeStyles.sidebarNavItemIconCollapsed
                            }
              ${activeChild
                                ? themeStyles.sidebarNavItemIconActive
                                : themeStyles.sidebarNavItemIcon
                            }`}
                    >
                        {item.icon}
                    </div>

                    {/* Name */}
                    {sidebarExpanded && (
                        <span
                            className={`font-medium ${activeChild ? themeStyles.activeText : themeStyles.textPrimary
                                }`}
                        >
                            {item.name}
                        </span>
                    )}

                    {/* Arrow */}
                    {sidebarExpanded && (
                        <ChevronDown
                            className={`ml-auto w-4 h-4 transition-transform ${open ? "rotate-180" : ""
                                }`}
                        />
                    )}
                </button>

                {/* Submenu Items */}
                {open && sidebarExpanded && (
                    <div className="mt-1 ml-12 flex flex-col gap-1">
                        {item.children.map((child) => (
                            <Link
                                key={child.name}
                                to={child.path}
                                className={`px-2 py-2 text-sm rounded-lg transition-all
                ${location.pathname === child.path
                                        ? "text-blue-500 font-semibold"
                                        : themeStyles.textSecondary
                                    }
                hover:text-blue-500`}
                            >
                                {child.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={`min-h-screen ${themeStyles.background}`}>
            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div
                    className={`fixed inset-0 z-50 flex items-center justify-center  ${themeStyles.modalOverlay}  bg-opacity-50 backdrop-blur-sm`}
                >
                    <div
                        className={`rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl border ${themeStyles.modalBorder} ${themeStyles.modalBg}`}
                    >
                        <div className="text-center">
                            <div
                                className={`mx-auto flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full mb-4`}
                            >
                                <LogOut className="w-6 h-6 text-red-500 dark:text-red-400" />
                            </div>
                            <h3
                                className={`text-lg font-semibold ${themeStyles.modalText} mb-2`}
                            >
                                Confirm Logout
                            </h3>
                            <p className={`${themeStyles.modalTextSecondary} mb-6`}>
                                Are you sure you want to logout from your account?
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className={`px-4 py-2 text-sm font-medium ${themeStyles.modalText} ${themeStyles.surface} rounded-lg ${themeStyles.hoverSurface} transition-colors border ${themeStyles.border}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className={`px-4 py-2 text-sm font-medium ${themeStyles.errorText} ${themeStyles.errorBg} rounded-lg ${themeStyles.errorHover} transition-colors`}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen ${themeStyles.surface} ${themeStyles.sidebarBorder
                    } transition-all duration-300
        ${sidebarExpanded
                        ? themeStyles.sidebarWidth
                        : themeStyles.sidebarCollapsedWidth
                    }
        ${sidebarOpen ? themeStyles.sidebarTranslate : themeStyles.sidebarHidden
                    }
        ${themeStyles.sidebarExpanded} group`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div
                        className={`flex items-center h-16 px-6 border-b ${themeStyles.border
                            } ${!sidebarExpanded && "justify-center"}`}
                    >
                        <img
                            src={isDarkTheme ? DarkLogo : LightLogo}
                            alt="Logo"
                            className={`w-8 h-8 ${!sidebarExpanded ? "block" : "hidden lg:block"
                                }`}
                        />
                        <div
                            className={`text-2xl font-bold pl-1 ${sidebarExpanded
                                ? themeStyles.sidebarLogoText
                                : themeStyles.sidebarLogoTextCollapsed
                                } ${!sidebarExpanded && "hidden"}`}
                        >
                            TRACKTNP
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 overflow-y-auto">
                        <div className="mb-2">
                            <ul className="space-y-1">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        {item.children ? (
                                            <SubMenu
                                                item={item}
                                                sidebarExpanded={sidebarExpanded}
                                                themeStyles={themeStyles}
                                            />
                                        ) : (
                                            <Link
                                                to={item.path}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-base 
          ${isActive(item.path)
                                                        ? themeStyles.sidebarNavItemActive
                                                        : themeStyles.sidebarNavItem
                                                    }
          ${!sidebarExpanded && themeStyles.sidebarNavItemCollapsed}`}
                                            >
                                                <div
                                                    className={`transition-transform duration-300
              ${sidebarExpanded
                                                            ? themeStyles.sidebarNavItemIconExpanded
                                                            : themeStyles.sidebarNavItemIconCollapsed
                                                        }
              ${isActive(item.path)
                                                            ? themeStyles.sidebarNavItemIconActive
                                                            : themeStyles.sidebarNavItemIcon
                                                        }`}
                                                >
                                                    {item.icon}
                                                </div>

                                                {sidebarExpanded && (
                                                    <span
                                                        className={`font-medium ${isActive(item.path)
                                                            ? themeStyles.activeText
                                                            : themeStyles.textPrimary
                                                            }`}
                                                    >
                                                        {item.name}
                                                    </span>
                                                )}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* Logout Button */}
                    <div className={`p-4 border-t ${themeStyles.border}`}>
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${themeStyles.sidebarLogout
                                } ${themeStyles.sidebarNavItemInactive} border-transparent ${!sidebarExpanded && themeStyles.sidebarNavItemCollapsed
                                }`}
                        >
                            <div
                                className={`transition-transform duration-300 ${sidebarExpanded
                                    ? themeStyles.sidebarNavItemIconExpanded
                                    : themeStyles.sidebarNavItemIconCollapsed
                                    } ${themeStyles.sidebarNavItemIcon}`}
                            >
                                <LogOut className="w-6 h-6" />
                            </div>
                            {sidebarExpanded && (
                                <span className="font-medium text-base transition-opacity duration-200">
                                    Logout
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ${sidebarExpanded ? "lg:ml-62" : "lg:ml-20"
                    }`}
            >
                {/* Top Bar */}
                <header
                    className={`sticky top-0 z-20 ${themeStyles.topBarBg} ${themeStyles.topBarBorder}`}
                >
                    <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className={`p-2 ${themeStyles.topBarIcon} rounded-lg ${themeStyles.hoverSurface} transition-colors lg:hidden`}
                            >
                                {sidebarOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                            <button
                                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                                className="hidden p-2 rounded-lg transition-colors lg:block"
                            >
                                <Menu className={`w-6 h-6 ${themeStyles.topBarIcon}`} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className={`flex items-center justify-center w-10 h-10 rounded-lg ${themeStyles.topBarIcon} ${themeStyles.hoverSurface} transition-colors border-2 border-transparent`}
                            >
                                {isDarkTheme ? (
                                    <Sun className="w-6 h-6" />
                                ) : (
                                    <Moon className="w-6 h-6" />
                                )}
                            </button>
                            <div className="hidden ml-2 sm:flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                                <div className="text-right">
                                    <p
                                        className={`text-sm font-medium ${themeStyles.topBarUserText}`}
                                    >
                                        User Name
                                    </p>
                                    <p
                                        className={`text-xs ${themeStyles.topBarUserTextSecondary}`}
                                    >
                                        user@internhub.com
                                    </p>
                                </div>
                                <button
                                    className={`flex items-center justify-center w-10 h-10 text-white rounded-full ${themeStyles.topBarUserBg} ${themeStyles.topBarUserHover} transition-shadow border-2 border-transparent`}
                                >
                                    <User className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className={`max-w-[1600px] mx-auto  ${themeStyles.textPrimary}`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
