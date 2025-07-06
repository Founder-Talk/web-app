import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, DollarSign, MapPin, Briefcase, ExternalLink, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MentorCard = ({ mentor, onRequestSession }) => {
  const handleRequestSession = () => {
    if (onRequestSession) {
      onRequestSession(mentor);
    }
  };

  const handleViewProfile = () => {
    // Navigate to mentor's detailed profile
    console.log('View mentor profile:', mentor._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {mentor.name?.charAt(0)?.toUpperCase() || 'M'}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-gray-600">{mentor.company || 'Independent Mentor'}</p>
          </div>
        </div>
        
        {/* Verification Badge */}
        {mentor.isVerified && (
          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            Verified
          </div>
        )}
      </div>

      {/* Bio */}
      {mentor.bio && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {mentor.bio}
        </p>
      )}

      {/* Expertise */}
      {mentor.domainExpertise && mentor.domainExpertise.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
            <Briefcase className="w-4 h-4 mr-1" />
            Expertise
          </h4>
          <div className="flex flex-wrap gap-1">
            {mentor.domainExpertise.slice(0, 3).map((expertise, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
              >
                {expertise}
              </span>
            ))}
            {mentor.domainExpertise.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{mentor.domainExpertise.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Star className="w-4 h-4 mr-1 text-yellow-500" />
          <span className="font-medium">{mentor.rating || 0}</span>
          <span className="ml-1">({mentor.totalSessions || 0} sessions)</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>{mentor.experience || 0} years</span>
        </div>
      </div>

      {/* Hourly Rate */}
      {mentor.hourlyRate && (
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <DollarSign className="w-4 h-4 mr-1" />
          <span className="font-medium">${mentor.hourlyRate}/hour</span>
        </div>
      )}

      {/* Education */}
      {mentor.education && (
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Education:</span> {mentor.education}
        </div>
      )}

      {/* LinkedIn Profile */}
      {mentor.linkedinProfile && (
        <div className="mb-4">
          <a
            href={mentor.linkedinProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            LinkedIn Profile
          </a>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-4 border-t border-gray-100">
        <Button
          size="sm"
          onClick={handleRequestSession}
          className="flex-1 bg-pink-500 hover:bg-pink-600"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          Request Session
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
      </div>
    </motion.div>
  );
};

export default MentorCard; 