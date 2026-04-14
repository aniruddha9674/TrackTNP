import { useState } from 'react';
import { Bell, Calendar, User, Users, UserCheck, CheckCircle } from 'lucide-react';
import { useTheme } from '../../Utils/context/ThemeContext'; // Adjust the path based on your structure

export default function VolunteerNotifications({ userType = 'student' }) {
  const { theme: themeMode } = useTheme();
  const isDarkTheme = themeMode === 'dark';

  // Define complete theme styles
  const theme = isDarkTheme ? {
    background: "bg-gradient-to-br from-slate-950 to-slate-900",
    cardBg: "bg-slate-900",
    cardBorder: "border-slate-700",
    cardShadow: "shadow-lg shadow-black/20",
    cardHoverShadow: "hover:shadow-2xl hover:shadow-black/40",
    textPrimary: "text-slate-50",
    textSecondary: "text-slate-400",
    textTertiary: "text-slate-500",
    modalHeader: "bg-slate-800",
    modalHeaderBorder: "border-slate-700",
    emptyStateBg: "bg-slate-800/50",
    emptyStateIcon: "text-slate-600",
  } : {
    background: "bg-gradient-to-br ",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    cardShadow: "shadow-md",
    cardHoverShadow: "hover:shadow-xl",
    textPrimary: "text-slate-900",
    textSecondary: "text-slate-600",
    textTertiary: "text-slate-400",
    modalHeader: "bg-slate-50",
    modalHeaderBorder: "border-slate-200",
    emptyStateBg: "bg-slate-50",
    emptyStateIcon: "text-slate-400",
  };

  const [notifications] = useState([
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
    {
      id: '4',
      title: 'Resume Workshop',
      message: 'Join our resume building workshop this Thursday at 3 PM. Learn from industry experts and get your resume reviewed.',
      recipient_type: 'students',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      created_by: 'coordinator',
    },
    {
      id: '5',
      title: 'Task Assignment Update',
      message: 'New task assignments have been posted. Please check your dashboard and complete them before the deadline.',
      recipient_type: 'volunteers',
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      created_by: 'coordinator',
    },
  ]);

  const [readNotifications, setReadNotifications] = useState(new Set());

  const filteredNotifications = notifications.filter(notification => {
    if (userType === 'student') {
      if (notification.recipient_type === 'volunteers') return false;
    } else if (userType === 'volunteer') {
      if (notification.recipient_type === 'students') return false;
    }
    return true;
  });

  const unreadCount = filteredNotifications.filter(n => !readNotifications.has(n.id)).length;

  const markAsRead = (id) => {
    setReadNotifications(prev => new Set(prev).add(id));
  };

  const markAllAsRead = () => {
    const allIds = filteredNotifications.map(n => n.id);
    setReadNotifications(new Set(allIds));
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
        return { icon: User, label: 'Students', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' };
      case 'volunteers':
        return { icon: UserCheck, label: 'Volunteers', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
      case 'both':
        return { icon: Users, label: 'All', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' };
      default:
        return { icon: Bell, label: 'General', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400' };
    }
  };

  return (
    <div className={`min-h-screen ${theme.background} p-6`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className={`text-3xl font-bold ${theme.textPrimary} mb-2`}>
                Notifications
              </h1>
              <p className={theme.textSecondary}>
                Stay updated with latest announcements and updates
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>
        </div>

        <div className={`${theme.cardBg} rounded-xl border ${theme.cardBorder} ${theme.cardShadow} overflow-hidden`}>
          <div className={`p-6 ${theme.modalHeader} border-b ${theme.modalHeaderBorder}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg relative">
                  <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className={`text-xl font-semibold ${theme.textPrimary}`}>
                    Your Notifications
                  </h2>
                  <p className={`text-sm ${theme.textSecondary}`}>
                    {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`divide-y ${theme.cardBorder}`}>
            {filteredNotifications.length === 0 ? (
              <div className={`p-12 text-center ${theme.emptyStateBg}`}>
                <Bell className={`w-16 h-16 mx-auto mb-4 ${theme.emptyStateIcon}`} />
                <p className={`text-lg ${theme.textSecondary}`}>
                  No notifications yet
                </p>
                <p className={`text-sm ${theme.textTertiary} mt-2`}>
                  You'll see notifications here when coordinators send updates
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => {
                const recipientInfo = getRecipientBadge(notification.recipient_type);
                const RecipientIcon = recipientInfo.icon;
                const isRead = readNotifications.has(notification.id);

                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-6 transition-all duration-200 cursor-pointer ${
                      !isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    } ${theme.cardHoverShadow}`}
                  >
                    <div className="flex gap-4">
                      <div className={`p-2 rounded-lg h-fit ${!isRead ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <Bell className={`w-5 h-5 ${!isRead ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className={`text-lg font-semibold ${theme.textPrimary} ${!isRead ? 'font-bold' : ''}`}>
                            {notification.title}
                          </h3>
                          {!isRead && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                          )}
                        </div>

                        <p className={`${theme.textSecondary} leading-relaxed mb-3`}>
                          {notification.message}
                        </p>

                        <div className="flex items-center gap-4 flex-wrap">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${recipientInfo.color}`}>
                            <RecipientIcon className="w-3.5 h-3.5" />
                            {recipientInfo.label}
                          </div>
                          <div className={`flex items-center gap-1.5 text-sm ${theme.textTertiary}`}>
                            <Calendar className="w-4 h-4" />
                            {formatDate(notification.created_at)}
                          </div>
                          {isRead && (
                            <div className={`flex items-center gap-1.5 text-xs ${theme.textTertiary}`}>
                              <CheckCircle className="w-3.5 h-3.5" />
                              Read
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}