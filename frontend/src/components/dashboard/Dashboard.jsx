import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  Star, 
  Clock, 
  TrendingUp,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SessionCard from './SessionCard';
import MentorCard from './MentorCard';
import StatsCard from './StatsCard';
import CreateSessionModal from './CreateSessionModal';
import CreateGroupSessionModal from './CreateGroupSessionModal';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const [showCreateGroupSession, setShowCreateGroupSession] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchUserData();
    fetchSessions();
    if (user?.role === 'mentee') {
      fetchMentors();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/session', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMentors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/user/mentors', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setMentors(data.mentors || []);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const getStats = () => {
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.status === 'completed').length;
    const pendingSessions = sessions.filter(s => s.status === 'pending').length;
    const activeSessions = sessions.filter(s => s.status === 'accepted').length;

    return {
      totalSessions,
      completedSessions,
      pendingSessions,
      activeSessions,
      rating: user?.rating || 0,
      totalSessionsCount: user?.totalSessions || 0
    };
  };

  const statsData = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.role === 'mentor' ? 'Manage your mentoring sessions' : 'Find mentors and schedule sessions'}
              </p>
            </div>
            <div className="flex space-x-3">
              {user?.role === 'mentor' && (
                <Button
                  onClick={() => setShowCreateGroupSession(true)}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Group Session
                </Button>
              )}
              {user?.role === 'mentee' && (
                <Button
                  onClick={() => setShowCreateSession(true)}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Request Session
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'sessions', 'mentors', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Sessions"
                value={statsData.totalSessions}
                icon={Calendar}
                color="blue"
              />
              <StatsCard
                title="Completed"
                value={statsData.completedSessions}
                icon={Star}
                color="green"
              />
              <StatsCard
                title="Pending"
                value={statsData.pendingSessions}
                icon={Clock}
                color="yellow"
              />
              <StatsCard
                title="Active"
                value={statsData.activeSessions}
                icon={TrendingUp}
                color="purple"
              />
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Sessions</h2>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('sessions')}
                >
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {sessions.slice(0, 3).map((session) => (
                  <SessionCard key={session._id} session={session} />
                ))}
                {sessions.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No sessions yet. {user?.role === 'mentee' ? 'Request your first session!' : 'Create your first session!'}
                  </p>
                )}
              </div>
            </div>

            {/* Recommended Mentors (for mentees) */}
            {user?.role === 'mentee' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Recommended Mentors</h2>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('mentors')}
                  >
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mentors.slice(0, 3).map((mentor) => (
                    <MentorCard key={mentor._id} mentor={mentor} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'sessions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">All Sessions</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search sessions..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                {sessions.map((session) => (
                  <SessionCard key={session._id} session={session} />
                ))}
                {sessions.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No sessions found.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'mentors' && user?.role === 'mentee' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Available Mentors</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search mentors..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                  <MentorCard key={mentor._id} mentor={mentor} />
                ))}
                {mentors.length === 0 && (
                  <p className="text-gray-500 text-center py-8 col-span-full">
                    No mentors available.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Messages</h2>
              <p className="text-gray-500 text-center py-8">
                Messages feature coming soon!
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      {showCreateSession && (
        <CreateSessionModal
          isOpen={showCreateSession}
          onClose={() => setShowCreateSession(false)}
          onSuccess={() => {
            setShowCreateSession(false);
            fetchSessions();
          }}
        />
      )}

      {showCreateGroupSession && (
        <CreateGroupSessionModal
          isOpen={showCreateGroupSession}
          onClose={() => setShowCreateGroupSession(false)}
          onSuccess={() => {
            setShowCreateGroupSession(false);
            fetchSessions();
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;