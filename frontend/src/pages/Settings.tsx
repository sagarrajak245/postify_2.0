import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Key, 
  Palette, 
  Bell, 
  Globe, 
  Shield, 
  Zap,
  Save,
  Eye,
  EyeOff,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    email: {
      scanFrequency: 'hourly',
      emailAddress: 'john.doe@gmail.com',
      includeAttachments: true,
      keywordFilters: 'certificate, certification, diploma, achievement'
    },
    social: {
      linkedin: { connected: true, username: '@johndoe', autoPost: true },
      twitter: { connected: true, username: '@john_doe', autoPost: false },
      instagram: { connected: false, username: '', autoPost: false }
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      certificateFound: true,
      postPublished: true,
      scanCompleted: false,
      weeklyReport: true
    },
    ai: {
      tone: 'professional',
      postLength: 'medium',
      includeHashtags: true,
      includeEmojis: true,
      customPrompt: ''
    }
  });

  const handleSave = (section: string) => {
    // Simulate API call
    console.log(`Saving ${section} settings:`, settings[section as keyof typeof settings]);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'email', label: 'Email Scanning', icon: Mail },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'ai', label: 'AI Settings', icon: Zap },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-dark-300">Manage your account preferences and automation settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600 sticky top-24">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-primary text-white'
                        : 'text-dark-300 hover:text-white hover:bg-dark-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-8 border border-dark-600">
            
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                    <p className="text-dark-300">Update your personal information</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={settings.profile.name}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, name: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={settings.profile.email}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, email: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="border-t border-dark-600 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Current Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">New Password</label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="flex items-center space-x-2 text-primary-400 hover:text-primary-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span>{showPassword ? 'Hide' : 'Show'} passwords</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleSave('profile')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-200"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Email Scanning Settings */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Email Scanning</h2>
                    <p className="text-dark-300">Configure how Postify scans your emails for certificates</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Gmail Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      value={settings.email.emailAddress}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, emailAddress: e.target.value }
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Scan Frequency</label>
                    <select className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="realtime">Real-time</option>
                      <option value="hourly">Every Hour</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Keyword Filters</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter keywords separated by commas"
                      value={settings.email.keywordFilters}
                      onChange={(e) => setSettings({
                        ...settings,
                        email: { ...settings.email, keywordFilters: e.target.value }
                      })}
                    />
                    <p className="text-dark-400 text-sm mt-1">These keywords will be used to identify certificate-related emails</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Include Attachments</h4>
                      <p className="text-dark-400 text-sm">Scan email attachments for certificate files</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={settings.email.includeAttachments}
                        onChange={(e) => setSettings({
                          ...settings,
                          email: { ...settings.email, includeAttachments: e.target.checked }
                        })}
                      />
                      <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleSave('email')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-200"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Social Media Settings */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Social Media</h2>
                    <p className="text-dark-300">Connect and manage your social media accounts</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* LinkedIn */}
                  <div className="p-6 bg-dark-800/30 rounded-lg border border-dark-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                          <Linkedin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">LinkedIn</h3>
                          <p className="text-dark-400 text-sm">Professional networking platform</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {settings.social.linkedin.connected ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                        <span className={`text-sm ${settings.social.linkedin.connected ? 'text-green-400' : 'text-red-400'}`}>
                          {settings.social.linkedin.connected ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>
                    
                    {settings.social.linkedin.connected ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-dark-300">Username: {settings.social.linkedin.username}</span>
                          <button className="text-red-400 hover:text-red-300 text-sm">Disconnect</button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-white font-medium">Auto-post</span>
                            <p className="text-dark-400 text-sm">Automatically publish generated posts</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={settings.social.linkedin.autoPost} />
                            <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      </div>
                    ) : (
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                        <Plus className="h-4 w-4" />
                        <span>Connect LinkedIn</span>
                      </button>
                    )}
                  </div>

                  {/* Twitter */}
                  <div className="p-6 bg-dark-800/30 rounded-lg border border-dark-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-sky-500 rounded-lg">
                          <Twitter className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">Twitter</h3>
                          <p className="text-dark-400 text-sm">Microblogging and social networking</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {settings.social.twitter.connected ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                        <span className={`text-sm ${settings.social.twitter.connected ? 'text-green-400' : 'text-red-400'}`}>
                          {settings.social.twitter.connected ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                    </div>
                    
                    {settings.social.twitter.connected ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-dark-300">Username: {settings.social.twitter.username}</span>
                          <button className="text-red-400 hover:text-red-300 text-sm">Disconnect</button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-white font-medium">Auto-post</span>
                            <p className="text-dark-400 text-sm">Automatically publish generated posts</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={settings.social.twitter.autoPost} />
                            <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      </div>
                    ) : (
                      <button className="flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors duration-200">
                        <Plus className="h-4 w-4" />
                        <span>Connect Twitter</span>
                      </button>
                    )}
                  </div>

                  {/* Instagram */}
                  <div className="p-6 bg-dark-800/30 rounded-lg border border-dark-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-pink-500 rounded-lg">
                          <Instagram className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">Instagram</h3>
                          <p className="text-dark-400 text-sm">Photo and video sharing platform</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <XCircle className="h-5 w-5 text-red-400" />
                        <span className="text-sm text-red-400">Disconnected</span>
                      </div>
                    </div>
                    
                    <button className="flex items-center space-x-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors duration-200">
                      <Plus className="h-4 w-4" />
                      <span>Connect Instagram</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleSave('social')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-200"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* AI Settings */}
            {activeTab === 'ai' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">AI Settings</h2>
                    <p className="text-dark-300">Customize how AI generates your social media posts</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Post Tone</label>
                      <select className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option value="professional">Professional</option>
                        <option value="casual">Casual</option>
                        <option value="excited">Excited</option>
                        <option value="humble">Humble</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Post Length</label>
                      <select className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option value="short">Short (50-100 words)</option>
                        <option value="medium">Medium (100-200 words)</option>
                        <option value="long">Long (200+ words)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Include Hashtags</h4>
                        <p className="text-dark-400 text-sm">Add relevant hashtags to posts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.ai.includeHashtags} />
                        <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">Include Emojis</h4>
                        <p className="text-dark-400 text-sm">Add emojis to make posts engaging</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.ai.includeEmojis} />
                        <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Custom Prompt (Optional)</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Add custom instructions for AI post generation..."
                      value={settings.ai.customPrompt}
                      onChange={(e) => setSettings({
                        ...settings,
                        ai: { ...settings.ai, customPrompt: e.target.value }
                      })}
                    />
                    <p className="text-dark-400 text-sm mt-1">This will be added to the AI prompt when generating posts</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleSave('ai')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-200"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bell className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Notifications</h2>
                    <p className="text-dark-300">Choose how you want to be notified about activity</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Email Notifications</h4>
                      <p className="text-dark-400 text-sm">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.notifications.emailNotifications} />
                      <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Push Notifications</h4>
                      <p className="text-dark-400 text-sm">Receive push notifications in browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.notifications.pushNotifications} />
                      <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Certificate Found</h4>
                      <p className="text-dark-400 text-sm">Notify when new certificates are detected</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.notifications.certificateFound} />
                      <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Post Published</h4>
                      <p className="text-dark-400 text-sm">Notify when posts are successfully published</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.notifications.postPublished} />
                      <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
                    <div>
                      <h4 className="font-medium text-white">Weekly Report</h4>
                      <p className="text-dark-400 text-sm">Receive weekly activity summary</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={settings.notifications.weeklyReport} />
                      <div className="w-11 h-6 bg-dark-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleSave('notifications')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-200"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Security</h2>
                    <p className="text-dark-300">Manage your account security and API access</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-dark-800/30 rounded-lg border border-dark-600">
                    <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">OpenAI API Key</label>
                        <div className="flex space-x-2">
                          <input
                            type="password"
                            className="flex-1 px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="sk-..."
                            value="••••••••••••••••••••••••••••••••"
                          />
                          <button className="px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200">
                            Update
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Gmail API Credentials</label>
                        <div className="flex space-x-2">
                          <input
                            type="password"
                            className="flex-1 px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="credentials.json"
                            value="••••••••••••••••••••••••••••••••"
                          />
                          <button className="px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200">
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-dark-800/30 rounded-lg border border-dark-600">
                    <h3 className="text-lg font-semibold text-white mb-4">Session Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Current Session</h4>
                          <p className="text-dark-400 text-sm">Chrome on MacOS • Active now</p>
                        </div>
                        <span className="text-green-400 text-sm">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Mobile Session</h4>
                          <p className="text-dark-400 text-sm">Safari on iPhone • 2 hours ago</p>
                        </div>
                        <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
                    <div className="space-y-4">
                      <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
                        Delete Account
                      </button>
                      <p className="text-red-300 text-sm">
                        This action cannot be undone. This will permanently delete your account and remove all your data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleSave('security')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-200"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;