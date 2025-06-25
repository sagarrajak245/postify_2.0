import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Calendar, 
  Award, 
  Eye, 
  Download,
  Trash2,
  Plus
} from 'lucide-react';

const Certificates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      name: 'AWS Solutions Architect Associate',
      issuer: 'Amazon Web Services',
      dateReceived: '2024-01-15',
      status: 'processed',
      imageUrl: 'https://images.pexels.com/photos/5474298/pexels-photo-5474298.jpeg?auto=compress&cs=tinysrgb&w=400',
      postsGenerated: 3,
      category: 'Cloud Computing'
    },
    {
      id: 2,
      name: 'Google Cloud Professional Data Engineer',
      issuer: 'Google Cloud',
      dateReceived: '2024-01-10',
      status: 'processed',
      imageUrl: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=400',
      postsGenerated: 2,
      category: 'Data Engineering'
    },
    {
      id: 3,
      name: 'Kubernetes Administrator',
      issuer: 'Cloud Native Computing Foundation',
      dateReceived: '2024-01-08',
      status: 'pending',
      imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
      postsGenerated: 0,
      category: 'DevOps'
    },
    {
      id: 4,
      name: 'Machine Learning Specialist',
      issuer: 'Microsoft Azure',
      dateReceived: '2024-01-05',
      status: 'processed',
      imageUrl: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=400',
      postsGenerated: 4,
      category: 'AI/ML'
    },
    {
      id: 5,
      name: 'React Developer Certification',
      issuer: 'Meta',
      dateReceived: '2024-01-02',
      status: 'processed',
      imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      postsGenerated: 2,
      category: 'Frontend Development'
    },
    {
      id: 6,
      name: 'Cybersecurity Analyst',
      issuer: 'CompTIA',
      dateReceived: '2023-12-28',
      status: 'archived',
      imageUrl: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400',
      postsGenerated: 1,
      category: 'Security'
    }
  ]);

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    return matchesSearch && cert.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'archived': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Certificates</h1>
          <p className="text-dark-300">Manage your professional certificates and generated content</p>
        </div>
        
        <button className="mt-4 sm:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-all duration-200">
          <Plus className="h-5 w-5" />
          <span>Upload Certificate</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
            <input
              type="text"
              placeholder="Search certificates, issuers, or categories..."
              className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
              <select
                className="pl-10 pr-8 py-3 bg-dark-800/50 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="processed">Processed</option>
                <option value="pending">Pending</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm font-medium">Total Certificates</p>
              <p className="text-2xl font-bold text-white">{certificates.length}</p>
            </div>
            <FileText className="h-8 w-8 text-primary-400" />
          </div>
        </div>

        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm font-medium">Processed</p>
              <p className="text-2xl font-bold text-white">
                {certificates.filter(c => c.status === 'processed').length}
              </p>
            </div>
            <Award className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm font-medium">Posts Generated</p>
              <p className="text-2xl font-bold text-white">
                {certificates.reduce((total, cert) => total + cert.postsGenerated, 0)}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-violet-400" />
          </div>
        </div>

        <div className="bg-gradient-card backdrop-blur-lg rounded-2xl p-6 border border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-300 text-sm font-medium">This Month</p>
              <p className="text-2xl font-bold text-white">
                {certificates.filter(c => new Date(c.dateReceived).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            <Upload className="h-8 w-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((certificate) => (
          <div key={certificate.id} className="bg-gradient-card backdrop-blur-lg rounded-2xl border border-dark-600 overflow-hidden hover:scale-105 transition-all duration-300">
            <div className="relative">
              <img
                src={certificate.imageUrl}
                alt={certificate.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                  {certificate.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-1">{certificate.name}</h3>
                <p className="text-dark-300 text-sm">{certificate.issuer}</p>
                <p className="text-dark-400 text-xs mt-1">{certificate.category}</p>
              </div>
              
              <div className="flex items-center justify-between text-sm text-dark-300 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(certificate.dateReceived).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="h-4 w-4" />
                  <span>{certificate.postsGenerated} posts</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200">
                    <Eye className="h-4 w-4 text-dark-300" />
                  </button>
                  <button className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200">
                    <Download className="h-4 w-4 text-dark-300" />
                  </button>
                </div>
                
                <button className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors duration-200">
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-dark-600 mx-auto mb-4" />
          <p className="text-xl text-dark-300 font-medium mb-2">No certificates found</p>
          <p className="text-dark-400">Try adjusting your search or upload a new certificate</p>
        </div>
      )}
    </div>
  );
};

export default Certificates;