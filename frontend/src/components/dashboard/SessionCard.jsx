import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Video, MessageSquare, CheckCircle, XCircle, Clock as ClockIcon, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SessionCard = ({ session }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'rejected':
        return 'bg-gray-100 text-gray-800';
      case 'open':
        return 'bg-purple-100 text-purple-800';
      case 'full':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'open':
        return <ClockIcon className="w-4 h-4" />;
      case 'full':
        return <XCircle className="w-4 h-4" />;
      default:
        return <ClockIcon className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSessionTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'chat':
        return <MessageSquare className="w-4 h-4" />;
      case 'async':
        return <Clock className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const handleAction = (action) => {
    // Handle session actions (accept, reject, complete, etc.)
    console.log(`${action} session:`, session._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {session.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {session.description || 'No description provided'}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(session.scheduledDate)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {session.duration} minutes
            </div>
            <div className="flex items-center">
              {getSessionTypeIcon(session.sessionType)}
              <span className="ml-1 capitalize">{session.sessionType}</span>
            </div>
          </div>

          {/* Session Mode Badge */}
          {session.sessionMode && (
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-4">
              {session.sessionMode === 'one-on-one' ? '1-on-1' : 'Group'} Session
            </div>
          )}

          {/* Participants for Group Sessions */}
          {session.sessionMode === 'group' && session.participants && (
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Users className="w-4 h-4 mr-1" />
              {session.participants.length} / {session.maxParticipants} participants
            </div>
          )}

          {/* Mentor/Mentee Info */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <User className="w-4 h-4 mr-1" />
            {session.sessionMode === 'one-on-one' ? (
              <>
                {session.mentor?.name || 'Mentor'} 
                {session.mentee && ` & ${session.mentee.name}`}
              </>
            ) : (
              `Hosted by ${session.mentor?.name || 'Mentor'}`
            )}
          </div>

          {/* Amount */}
          {session.amount > 0 && (
            <div className="text-sm font-medium text-gray-900 mb-4">
              ${session.amount}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end space-y-2">
          {/* Status Badge */}
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
            {getStatusIcon(session.status)}
            <span className="ml-1 capitalize">{session.status}</span>
          </div>

          {/* Rating */}
          {session.rating && (
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{session.rating}/5</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
        {session.status === 'pending' && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAction('reject')}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Reject
            </Button>
            <Button
              size="sm"
              onClick={() => handleAction('accept')}
              className="bg-green-600 hover:bg-green-700"
            >
              Accept
            </Button>
          </>
        )}

        {session.status === 'accepted' && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAction('cancel')}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => handleAction('complete')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Complete
            </Button>
          </>
        )}

        {session.status === 'completed' && !session.rating && (
          <Button
            size="sm"
            onClick={() => handleAction('feedback')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Add Feedback
          </Button>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAction('view')}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default SessionCard;