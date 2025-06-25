import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Brain, 
  Share2, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Zap,
  Activity,
  Users,
  Calendar
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    emailsScanned: 12,
    certificatesFound: 8,
    postsGenerated: 15,
    postsPublished: 12,
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'certificate', message: 'New certificate found: AWS Solutions Architect', time: '2 minutes ago', status: 'processing' },
    { id: 2, type: 'post', message: 'LinkedIn post published successfully', time: '15 minutes ago', status: 'success' },
    { id: 3, type: 'email', message: 'Email scan completed - 3 new certificates', time: '1 hour ago', status: 'success' },
    { id: 4, type: 'post', message: 'Twitter post scheduled for tomorrow', time: '2 hours ago', status: 'scheduled' },
  ]);

  const [isScanning, setIsScanning] = useState(false);

  const startEmailScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStats(prev => ({
        ...prev,
        emailsScanned: prev.emailsScanned + 1,
        certificatesFound: prev.certificatesFound + Math.floor(Math.random() * 3)
      }));
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-dark-300">Monitor your certificate scanning and social media automation</p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={startEmailScan}
              disabled={isScanning}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Mail className="h-5 w-5" />
              <span>{isScanning ? 'Scanning...' : 'Scan Emails'}</span>
              {isScanning && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>}
            </button>
            
            <button className="flex items-center space-x-2 px-6 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-all duration-200">
              <Brain className="h-5 w-5" />
              <span>Generate Posts</span>
            </button>
            
            <button className="flex items-center space-x-2 px-6 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-all duration-200">
              <Share2 className="h-5 w-5" />
              <span>Publish Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm font-medium">Emails Scanned</p>
              <p className="text-2xl font-bold text-white">{stats.emailsScanned}</p>
              <p className="text-green-400 text-sm">+2 today</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Mail className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm font-medium">Certificates Found</p>
              <p className="text-2xl font-bold text-white">{stats.certificatesFound}</p>
              <p className="text-green-400 text-sm">+1 today</p>
            </div>
            <div className="p-3 bg-violet-500/20 rounded-lg">
              <FileText className="h-6 w-6 text-violet-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm font-medium">Posts Generated</p>
              <p className="text-2xl font-bold text-white">{stats.postsGenerated}</p>
              <p className="text-green-400 text-sm">+3 today</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Brain className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm font-medium">Posts Published</p>
              <p className="text-2xl font-bold text-white">{stats.postsPublished}</p>
              <p className="text-green-400 text-sm">+2 today</p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-lg">
              <Share2 className="h-6 w-6 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <Activity className="h-5 w-5 text-dark-400" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-3 bg-dark-800/30 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  item.status === 'success' ? 'bg-green-500/20' :
                  item.status === 'processing' ? 'bg-yellow-500/20' :
                  item.status === 'scheduled' ? 'bg-blue-500/20' :
                  'bg-red-500/20'
                }`}>
                  {item.status === 'success' ? <CheckCircle className="h-4 w-4 text-green-400" /> :
                   item.status === 'processing' ? <Clock className="h-4 w-4 text-yellow-400" /> :
                   item.status === 'scheduled' ? <Calendar className="h-4 w-4 text-blue-400" /> :
                   <AlertCircle className="h-4 w-4 text-red-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{item.message}</p>
                  <p className="text-dark-400 text-xs">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">System Status</h2>
            <Zap className="h-5 w-5 text-green-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-dark-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white font-medium">Email Scanner</span>
              </div>
              <span className="text-green-400 text-sm">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-dark-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white font-medium">AI Post Generator</span>
              </div>
              <span className="text-green-400 text-sm">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-dark-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white font-medium">Social Media APIs</span>
              </div>
              <span className="text-green-400 text-sm">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-dark-800/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Redis Queue</span>
              </div>
              <span className="text-yellow-400 text-sm">Processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;