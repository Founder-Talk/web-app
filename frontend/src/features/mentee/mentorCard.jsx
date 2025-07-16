"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Users } from "lucide-react"
import { motion } from "framer-motion"

const StarRating = ({ rating, isDarkMode }) => {
  return (
    <div className="flex space-x-1" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-[#ff9ec6] text-[#ff9ec6]" : isDarkMode ? "text-gray-600" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

function getInitials(name = "") {
  return name.charAt(0).toUpperCase()
}

function MentorCard({
  mentor,
  index,
  onSelect,
  isDarkMode,
  textClass,
  mutedTextClass,
  cardBgClass,
  borderClass,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`${cardBgClass} ${borderClass} rounded-2xl border transition-all duration-300 overflow-hidden group cursor-pointer hover:shadow-lg transform group-hover:scale-[1.02] ${
        isDarkMode ? "hover:shadow-gray-900/20" : "hover:shadow-gray-200/40"
      } backdrop-blur-xl`}
      onClick={() => onSelect(mentor)}
      role="button"
      aria-label={`View profile of ${mentor.name}`}
    >
      {/* Card Content */}
      <div className="p-4 sm:p-5">
        {/* Profile Section */}
        <div className="flex items-center space-x-3 mb-3">
          {mentor.image ? (
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#ff9ec6]/20 flex-shrink-0 object-cover"
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#ff9ec6]/20 border-2 border-[#ff9ec6]/20 text-[#ff9ec6] font-semibold text-sm sm:text-base">
              {getInitials(mentor.name)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base sm:text-lg truncate max-w-[80%]">{mentor.name}</h3>
            <p className="text-[#ff9ec6] text-sm font-medium truncate">{mentor.field}</p>
          </div>
        </div>

        {/* Caption */}
        <p className={`${mutedTextClass} text-sm mb-4 line-clamp-2 leading-relaxed`}>{mentor.caption}</p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <StarRating rating={mentor.rating} isDarkMode={isDarkMode} />
            <span className={`text-xs sm:text-sm ${mutedTextClass}`}>({mentor.totalSessions})</span>
          </div>
          <span className="font-bold text-[#ff9ec6] text-sm sm:text-base">₹{mentor.price}/hr</span>
        </div>

        {/* Quick Info */}
        <div className={`text-xs ${mutedTextClass} mb-4 space-y-1`}>
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3 text-[#ff9ec6] flex-shrink-0" />
            <span className="truncate">{mentor.location || "Not specified"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-[#ff9ec6] flex-shrink-0" />
            <span className="truncate">{mentor.responseTime || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3 text-[#ff9ec6] flex-shrink-0" />
            <span className="truncate">{mentor.companiesHelped || 0} mentees helped</span>
          </div>
        </div>

        {/* Contact Button */}
        <div className="flex justify-end">
          <Button
            size="sm"
            className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-full px-4 text-sm font-medium transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation()
              onSelect(mentor)
            }}
            aria-label={`View full profile of ${mentor.name}`}
          >
            View Profile
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(MentorCard) // Prevent unnecessary re-renders
