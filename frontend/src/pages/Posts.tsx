import React, { useState } from 'react';
import { 
  MessageSquare, 
  Calendar, 
  Share2, 
  Edit, 
  Trash2, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  Filter,
  Search
} from 'lucide-react';

const Posts: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "🎉 Excited to share that I've just earned my AWS Solutions Architect Associate certification! This journey has deepened my understanding of cloud architecture and best practices. Looking forward to applying these skills in upcoming projects. #AWS #CloudComputing #Certification",
      platform: 'LinkedIn',
      status: 'published',
      scheduledDate: '2024-01-15T10:00:00',
      publishedDate: '2024-01-15T10:00:00',
      engagement: { likes: 45, comments: 8, shares: 12 },
      certificateName: 'AWS Solutions Architect Associate'
    },
    {
      id: 2,
      content: "Just achieved my Google Cloud Professional Data Engineer certification! 📊 Excited to dive deeper into data pipelines and ML workflows. The cloud native approach to data engineering is truly transformative. #GoogleCloud #DataEngineering #BigData",
      platform: 'Twitter',
      status: 'published',
      scheduledDate: '2024-01-12T14:30:00',
      publishedDate: '2024-01-12T14:30:00',
      engagement: { likes: 23, comments: 5, shares: 8 },
      certificateName: 'Google Cloud Professional Data Engineer'
    },
    {
      id: 3,
      content: "🚀 Thrilled to announce my new Kubernetes Administrator certification! Container orchestration has become such a crucial skill in modern DevOps. Ready to tackle complex distributed systems with confidence. #Kubernetes #DevOps #CNCF",
      platform: 'LinkedIn',
      status: 'scheduled',
      scheduledDate: '2024-01-20T09:00:00',
      publishedDate: null,
      engagement: { likes: 0, comments: 0, shares: 0 },
      certificateName: 'Kubernetes Administrator'
    },
    {
      id: 4,
      content: "Machine Learning Specialist certification achieved! 🤖 The intersection of AI and cloud computing continues to amaze me. Excited to build more intelligent applications using Azure ML services. #MachineLearning #Azure #AI",
      platform: 'Twitter',
      status: 'draft',
      scheduledDate: null,
      publishedDate: null,
      engagement: { likes: 0, comments: 0, shares: 0 },
      certificateName: 'Machine Learning Specialist'
    },
    {
      id: 5,
      content: "🎯 Just completed my React Developer Certification from Meta! Frontend development keeps evolving, and staying current with these skills is essential. Excited to build more dynamic user experiences. #React #Frontend #Meta",
      platform: 'LinkedIn',
      status: 'failed',
      scheduledDate: '2024-01-10T16:00:00',
      publishedDate: null,
      engagement: { likes: 0, comments: 0, shares: 0 },
      certificateName: 'React Developer Certification'
    }
  ]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.certificateName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && post.status === activeTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400';
      case 'draft': return 'bg-yellow-500/20 text-yellow-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return 'bg-blue-600';
      case 'Twitter': return 'bg-sky-500';
      case 'Instagram': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const tabs = [
    { id: 'all', label: 'All Posts', count: posts.length },
    { id: 'published', label: 'Published', count: posts.filter(p => p.status === 'published').length },
    { id: 'scheduled', label: 'Scheduled', count: posts.filter(p => p.status === 'scheduled').length },
    { id: 'draft', label: 'Drafts', count: posts.filter(p => p.status === 'draft').length },
    { id: 'failed', label: 'Failed', count: posts.filter(p => p.status === 'failed').length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Posts</h1>
          <p className="text-dark-300">Manage your AI-generated social media posts</p>
        </div>
        
        <button className="mt-4 sm:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-200">
          <Plus className="h-5 w-5" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600 mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-primary text-white'
                  : 'bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-xs bg-dark-600 px-2 py-1 rounded-full">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search posts or certificates..."
            className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(post.status)}`}>
                  {getStatusIcon(post.status)}
                  <span>{post.status}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getPlatformColor(post.platform)}`}>
                  {post.platform}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200">
                  <Eye className="h-4 w-4 text-dark-300" />
                </button>
                <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200">
                  <Edit className="h-4 w-4 text-dark-300" />
                </button>
                <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-200">
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-white leading-relaxed">{post.content}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-dark-300 mb-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">From: {post.certificateName}</span>
                {post.scheduledDate && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {post.status === 'published' && post.publishedDate
                        ? `Published ${new Date(post.publishedDate).toLocaleDateString()}`
                        : `Scheduled ${new Date(post.scheduledDate).toLocaleDateString()}`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {post.status === 'published' && (
              <div className="flex items-center space-x-6 pt-4 border-t border-dark-600">
                <div className="flex items-center space-x-1 text-dark-300">
                  <span className="text-pink-400">❤️</span>
                  <span>{post.engagement.likes}</span>
                </div>
                <div className="flex items-center space-x-1 text-dark-300">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.engagement.comments}</span>
                </div>
                <div className="flex items-center space-x-1 text-dark-300">
                  <Share2 className="h-4 w-4" />
                  <span>{post.engagement.shares}</span>
                </div>
              </div>
            )}

            {post.status === 'scheduled' && (
              <div className="flex items-center justify-between pt-4 border-t border-dark-600">
                <span className="text-dark-300 text-sm">
                  Will be published on {new Date(post.scheduledDate!).toLocaleString()}
                </span>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200">
                  Publish Now
                </button>
              </div>
            )}

            {post.status === 'draft' && (
              <div className="flex items-center justify-between pt-4 border-t border-dark-600">
                <span className="text-dark-300 text-sm">Draft saved automatically</span>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-sm transition-colors duration-200">
                    Schedule
                  </button>
                  <button className="px-4 py-2 bg-gradient-primary text-white rounded-lg text-sm hover:opacity-90 transition-all duration-200">
                    Publish
                  </button>
                </div>
              </div>
            )}

            {post.status === 'failed' && (
              <div className="flex items-center justify-between pt-4 border-t border-dark-600">
                <span className="text-red-400 text-sm">Failed to publish - API error</span>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors duration-200">
                  Retry
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-dark-600 mx-auto mb-4" />
          <p className="text-xl text-dark-300 font-medium mb-2">No posts found</p>
          <p className="text-dark-400">Try adjusting your filters or create a new post</p>
        </div>
      )}
    </div>
  );
};

export default Posts;