import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Clock, Trash2, BookMarkedIcon as MarkAsUnreadIcon, Filter, Search } from 'lucide-react';

const Notifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Post Published Successfully',
      message: 'Your LinkedIn post about AWS Solutions Architect certification has been published and is performing well.',
      timestamp: '2024-01-15T10:30:00',
      read: false,
      action: 'View Post'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Certificate Detected',
      message: 'Found a new certificate in your email: Google Cloud Professional Data Engineer. Post generation has started.',
      timestamp: '2024-01-15T09:15:00',
      read: false,
      action: 'View Certificate'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Post Scheduling Failed',
      message: 'Unable to schedule your Twitter post due to API rate limits. Please try again in 15 minutes.',
      timestamp: '2024-01-15T08:45:00',
      read: true,
      action: 'Retry'
    },
    {
      id: 4,
      type: 'success',
      title: 'Email Scan Completed',
      message: 'Scanned 25 emails and found 3 new certificates. AI processing has begun for content generation.',
      timestamp: '2024-01-15T08:00:00',
      read: true,
      action: 'View Results'
    },
    {
      id: 5,
      type: 'info',
      title: 'Weekly Report Ready',
      message: 'Your weekly activity report is ready. You generated 12 posts and gained 347 engagements this week.',
      timestamp: '2024-01-14T09:00:00',
      read: false,
      action: 'View Report'
    },
    {
      id: 6,
      type: 'error',
      title: 'LinkedIn Connection Error',
      message: 'Your LinkedIn connection has expired. Please reconnect your account to continue posting.',
      timestamp: '2024-01-14T16:30:00',
      read: true,
      action: 'Reconnect'
    },
    {
      id: 7,
      type: 'success',
      title: 'AI Post Generated',
      message: 'Successfully generated 3 post variations for your Kubernetes Administrator certification.',
      timestamp: '2024-01-14T14:20:00',
      read: true,
      action: 'Review Posts'
    },
    {
      id: 8,
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 2-4 AM EST. Email scanning will be temporarily paused.',
      timestamp: '2024-01-14T12:00:00',
      read: true,
      action: null
    }
  ]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'unread') return matchesSearch && !notification.read;
    if (activeFilter === 'read') return matchesSearch && notification.read;
    return matchesSearch && notification.type === activeFilter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-400" />;
      case 'info': return <Info className="h-5 w-5 text-blue-400" />;
      default: return <Bell className="h-5 w-5 text-dark-400" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500 bg-green-500/5';
      case 'warning': return 'border-l-yellow-500 bg-yellow-500/5';
      case 'error': return 'border-l-red-500 bg-red-500/5';
      case 'info': return 'border-l-blue-500 bg-blue-500/5';
      default: return 'border-l-dark-600 bg-dark-800/30';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'success', label: 'Success', count: notifications.filter(n => n.type === 'success').length },
    { id: 'warning', label: 'Warning', count: notifications.filter(n => n.type === 'warning').length },
    { id: 'error', label: 'Error', count: notifications.filter(n => n.type === 'error').length },
    { id: 'info', label: 'Info', count: notifications.filter(n => n.type === 'info').length },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications</h1>
          <p className="text-dark-300">
            Stay updated with your certificate scanning and posting activity
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg transition-all duration-200"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-primary text-white'
                    : 'bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600'
                }`}
              >
                <span>{filter.label}</span>
                <span className="text-xs bg-dark-600 px-2 py-1 rounded-full">{filter.count}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`border-l-4 rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${getNotificationColor(notification.type)} ${
              !notification.read ? 'bg-gradient-card border-dark-500' : 'bg-dark-800/30 border-dark-600'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0 p-2 bg-dark-700 rounded-lg">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-semibold ${!notification.read ? 'text-white' : 'text-dark-200'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <p className={`text-sm leading-relaxed mb-3 ${!notification.read ? 'text-dark-200' : 'text-dark-300'}`}>
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-dark-400 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(notification.timestamp).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {notification.action && (
                        <button className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors duration-200">
                          {notification.action}
                        </button>
                      )}
                      
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-dark-400 hover:text-white text-sm transition-colors duration-200"
                          title="Mark as read"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => deleteNotification(notification.id)}
                className="flex-shrink-0 p-2 text-dark-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                title="Delete notification"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-16 w-16 text-dark-600 mx-auto mb-4" />
          <p className="text-xl text-dark-300 font-medium mb-2">No notifications found</p>
          <p className="text-dark-400">
            {searchTerm ? 'Try adjusting your search terms' : 'You\'re all caught up!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;