import { useState } from 'react';
import { Bell, Send, Users, User, UserCheck, Calendar, X } from 'lucide-react';
import { useTheme } from '../../../Utils/context/ThemeContext'; // Adjust path as needed



export default function CoordinatorNotifications() {
    const { theme: themeMode } = useTheme();
    const isDarkTheme = themeMode === 'dark';

    // Define theme styles inside the component
    const theme = isDarkTheme ? {
        background: "bg-gradient-to-br from-slate-950 to-slate-900",
        cardBg: "bg-slate-900",
        cardBorder: "border-slate-700",
        cardShadow: "shadow-lg",
        cardHoverShadow: "hover:shadow-xl",
        textPrimary: "text-slate-50",
        textSecondary: "text-slate-400",
        textTertiary: "text-slate-500",
        modalHeader: "bg-slate-800",
        modalHeaderBorder: "border-slate-700",
        modalOverlay: "bg-black/80",
        buttonBg: "bg-slate-800",
        buttonHover: "hover:bg-slate-700",
        buttonBorder: "border-slate-700",
        inputBg: "bg-slate-800",
        inputBorder: "border-slate-700",
        inputText: "text-slate-50",
        inputPlaceholder: "placeholder:text-slate-500",
    } : {
        background: "bg-gradient-to-br from-slate-50 to-slate-100",
        cardBg: "bg-white",
        cardBorder: "border-slate-200",
        cardShadow: "shadow-md",
        cardHoverShadow: "hover:shadow-xl",
        textPrimary: "text-slate-900",
        textSecondary: "text-slate-600",
        textTertiary: "text-slate-400",
        modalHeader: "bg-slate-50",
        modalHeaderBorder: "border-slate-200",
        modalOverlay: "bg-black/50",
        buttonBg: "bg-slate-100",
        buttonHover: "hover:bg-slate-200",
        buttonBorder: "border-slate-200",
        inputBg: "bg-white",
        inputBorder: "border-slate-300",
        inputText: "text-slate-900",
        inputPlaceholder: "placeholder:text-slate-400",
    };
    const [notifications, setNotifications] = useState([
        {
            id: '1',
            title: 'Campus Drive - TechCorp',
            message: 'TechCorp campus drive scheduled for next week. Please prepare your resumes and register by Friday.',
            recipient_type: 'students',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'coordinator',
        },
        {
            id: '2',
            title: 'Volunteer Meeting',
            message: 'Monthly volunteer coordination meeting on Saturday at 10 AM in Conference Room A.',
            recipient_type: 'volunteers',
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'coordinator',
        },
        {
            id: '3',
            title: 'Important: Document Submission',
            message: 'All students and volunteers must submit updated documents by end of this month.',
            recipient_type: 'both',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_by: 'coordinator',
        },
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        recipientType: 'students',
    });

    const handleCreateNotification = (e) => {
        e.preventDefault();

        const newNotification = {
            id: Date.now().toString(),
            title: formData.title,
            message: formData.message,
            recipient_type: formData.recipientType,
            created_at: new Date().toISOString(),
            created_by: 'coordinator',
        };

        setNotifications([newNotification, ...notifications]);
        setFormData({ title: '', message: '', recipientType: 'students' });
        setShowCreateModal(false);
    };

    const handleDeleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Today';
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getRecipientBadge = (type) => {
        switch (type) {
            case 'students':
                return { icon: User, label: 'Students', color: 'bg-blue-100 text-blue-700' };
            case 'volunteers':
                return { icon: UserCheck, label: 'Volunteers', color: 'bg-green-100 text-green-700' };
            case 'both':
                return { icon: Users, label: 'All', color: 'bg-purple-100 text-purple-700' };
        }
    };

    return (
        <div className={`min-h-screen ${theme.background} p-6`}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className={`text-3xl font-bold ${theme.textPrimary} mb-2`}>
                            Notification Management
                        </h1>
                        <p className={theme.textSecondary}>
                            Create and manage notifications for students and volunteers
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
                    >
                        <Send className="w-5 h-5" />
                        Create Notification
                    </button>
                </div>

                <div className={`${theme.cardBg} rounded-xl border ${theme.cardBorder} ${theme.cardShadow} overflow-hidden`}>
                    <div className={`p-6 ${theme.modalHeader} border-b ${theme.modalHeaderBorder}`}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Bell className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className={`text-xl font-semibold ${theme.textPrimary}`}>
                                    Sent Notifications
                                </h2>
                                <p className={`text-sm ${theme.textSecondary}`}>
                                    {notifications.length} notification{notifications.length !== 1 ? 's' : ''} sent
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="divide-y divide-opacity-10">
                        {notifications.length === 0 ? (
                            <div className="p-12 text-center">
                                <Bell className={`w-16 h-16 mx-auto mb-4 ${theme.textTertiary}`} />
                                <p className={`text-lg ${theme.textSecondary}`}>
                                    No notifications sent yet
                                </p>
                                <p className={`text-sm ${theme.textTertiary} mt-2`}>
                                    Create your first notification to get started
                                </p>
                            </div>
                        ) : (
                            notifications.map((notification) => {
                                const recipientInfo = getRecipientBadge(notification.recipient_type);
                                const RecipientIcon = recipientInfo.icon;

                                return (
                                    <div
                                        key={notification.id}
                                        className={`p-6 ${theme.cardHoverShadow} transition-all duration-200 hover:bg-opacity-50`}
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-start gap-3 mb-3">
                                                    <div className="p-2 bg-blue-100 rounded-lg">
                                                        <Bell className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className={`text-lg font-semibold ${theme.textPrimary} mb-1`}>
                                                            {notification.title}
                                                        </h3>
                                                        <p className={`${theme.textSecondary} leading-relaxed`}>
                                                            {notification.message}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 ml-14">
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${recipientInfo.color}`}>
                                                        <RecipientIcon className="w-4 h-4" />
                                                        {recipientInfo.label}
                                                    </div>
                                                    <div className={`flex items-center gap-1.5 text-sm ${theme.textTertiary}`}>
                                                        <Calendar className="w-4 h-4" />
                                                        {formatDate(notification.created_at)}
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDeleteNotification(notification.id)}
                                                className={`p-2 rounded-lg ${theme.buttonBg} ${theme.buttonHover} border ${theme.buttonBorder} transition-colors`}
                                                title="Delete notification"
                                            >
                                                <X className={`w-5 h-5 ${theme.textSecondary}`} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {showCreateModal && (
                <div className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-sm flex items-center justify-center p-4 z-50`}>
                    <div className={`${theme.cardBg} rounded-2xl ${theme.cardShadow} max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
                        <div className={`p-6 ${theme.modalHeader} border-b ${theme.modalHeaderBorder} flex justify-between items-center`}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Send className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>
                                        Create Notification
                                    </h2>
                                    <p className={`text-sm ${theme.textSecondary}`}>
                                        Send a notification to students, volunteers, or both
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className={`p-2 rounded-lg ${theme.buttonHover} transition-colors`}
                            >
                                <X className={`w-6 h-6 ${theme.textSecondary}`} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateNotification} className="p-6 space-y-6">
                            <div>
                                <label className={`block text-sm font-medium ${theme.textPrimary} mb-2`}>
                                    Notification Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={`w-full px-4 py-3 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${theme.inputPlaceholder}`}
                                    placeholder="Enter notification title"
                                    required
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium ${theme.textPrimary} mb-2`}>
                                    Message
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className={`w-full px-4 py-3 ${theme.inputBg} border ${theme.inputBorder} ${theme.inputText} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${theme.inputPlaceholder} resize-none`}
                                    placeholder="Enter notification message"
                                    rows={5}
                                    required
                                />
                            </div>

                            <div>
                                <label className={`block text-sm font-medium ${theme.textPrimary} mb-3`}>
                                    Send To
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, recipientType: 'students' })}
                                        className={`p-4 rounded-lg border-2 transition-all ${formData.recipientType === 'students'
                                                ? 'border-blue-500 bg-blue-50'
                                                : `border-transparent ${theme.buttonBg} ${theme.buttonHover}`
                                            }`}
                                    >
                                        <User className={`w-6 h-6 mx-auto mb-2 ${formData.recipientType === 'students' ? 'text-blue-600' : theme.textSecondary}`} />
                                        <p className={`text-sm font-medium ${formData.recipientType === 'students' ? 'text-blue-700' : theme.textPrimary}`}>
                                            Students
                                        </p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, recipientType: 'volunteers' })}
                                        className={`p-4 rounded-lg border-2 transition-all ${formData.recipientType === 'volunteers'
                                                ? 'border-green-500 bg-green-50'
                                                : `border-transparent ${theme.buttonBg} ${theme.buttonHover}`
                                            }`}
                                    >
                                        <UserCheck className={`w-6 h-6 mx-auto mb-2 ${formData.recipientType === 'volunteers' ? 'text-green-600' : theme.textSecondary}`} />
                                        <p className={`text-sm font-medium ${formData.recipientType === 'volunteers' ? 'text-green-700' : theme.textPrimary}`}>
                                            Volunteers
                                        </p>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, recipientType: 'both' })}
                                        className={`p-4 rounded-lg border-2 transition-all ${formData.recipientType === 'both'
                                                ? 'border-purple-500 bg-purple-50'
                                                : `border-transparent ${theme.buttonBg} ${theme.buttonHover}`
                                            }`}
                                    >
                                        <Users className={`w-6 h-6 mx-auto mb-2 ${formData.recipientType === 'both' ? 'text-purple-600' : theme.textSecondary}`} />
                                        <p className={`text-sm font-medium ${formData.recipientType === 'both' ? 'text-purple-700' : theme.textPrimary}`}>
                                            Both
                                        </p>
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className={`flex-1 px-6 py-3 ${theme.buttonBg} border ${theme.buttonBorder} ${theme.textPrimary} rounded-lg font-medium ${theme.buttonHover} transition-colors`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Send Notification
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}