import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  MessageCircle,
  Calendar,
  Star,
  MapPin,
  Clock,
  Users,
  Award,
  Globe,
  Heart,
  MessageSquare,
  X,
  Send,
  Video,
  Phone,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const StarRating = ({ rating, isDarkMode }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 sm:h-5 sm:w-5 ${
            star <= rating ? "fill-[#ff9ec6] text-[#ff9ec6]" : isDarkMode ? "text-gray-600" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

export default function MentorProfile({
  mentor,
  onBack,
  isDarkMode,
  textClass,
  mutedTextClass,
  cardBgClass,
  borderClass,
}) {
  const [activeTab, setActiveTab] = useState("about")
  const [showChatModal, setShowChatModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [bookingForm, setBookingForm] = useState({
    sessionType: "video",
    duration: 60,
    topic: "",
    description: "",
    date: "",
    time: "",
  })

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (chatMessage.trim()) {
      console.log("Sending message:", chatMessage)
      setChatMessage("")
      setShowChatModal(false)
    }
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    console.log("Booking session:", bookingForm)
    setShowBookingModal(false)
  }

  const calculatePrice = () => {
    const basePrice = mentor.price
    const durationMultiplier = bookingForm.duration / 60
    return Math.round(basePrice * durationMultiplier)
  }

  return (
    <div className="py-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className={`mb-6 ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"} rounded-xl transition-colors`}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Mentors
      </Button>

      {/* Profile Header */}
      <div className={`${cardBgClass} ${borderClass} rounded-2xl border p-6 sm:p-8 mb-8`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src={mentor.profilePic || "/placeholder.svg"}
            alt={mentor.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{mentor.name}</h1>
            <p className="text-[#ff9ec6] font-medium text-lg mb-3">{mentor.field}</p>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-1">
                <StarRating rating={mentor.rating} isDarkMode={isDarkMode} />
                <span className={`text-sm ${mutedTextClass}`}>({mentor.totalSessions} sessions)</span>
              </div>
              <span className="text-xl font-bold text-[#ff9ec6]">₹{mentor.price}/hr</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <Button
              onClick={() => setShowChatModal(true)}
              className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
            <Button onClick={() => setShowBookingModal(true)} variant="outline" className={`${borderClass} rounded-xl`}>
              <Calendar className="h-4 w-4 mr-2" />
              Book Session
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className={`${cardBgClass} ${borderClass} p-4 rounded-xl border`}>
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-[#ff9ec6]" />
            <span className={`text-sm ${mutedTextClass}`}>Mentees</span>
          </div>
          <p className="text-xl font-bold">{mentor.companiesHelped}</p>
        </div>

        <div className={`${cardBgClass} ${borderClass} p-4 rounded-xl border`}>
          <div className="flex items-center space-x-2 mb-2">
            <Award className="h-5 w-5 text-[#ff9ec6]" />
            <span className={`text-sm ${mutedTextClass}`}>Success Rate</span>
          </div>
          <p className="text-xl font-bold">{mentor.successRate}</p>
        </div>

        <div className={`${cardBgClass} ${borderClass} p-4 rounded-xl border`}>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-[#ff9ec6]" />
            <span className={`text-sm ${mutedTextClass}`}>Response</span>
          </div>
          <p className="text-sm font-medium">
            {mentor.responseTime.split(" ")[3]} {mentor.responseTime.split(" ")[4]}
          </p>
        </div>

        <div className={`${cardBgClass} ${borderClass} p-4 rounded-xl border`}>
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="h-5 w-5 text-[#ff9ec6]" />
            <span className={`text-sm ${mutedTextClass}`}>Location</span>
          </div>
          <p className="text-sm font-medium">{mentor.location}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className={`flex space-x-1 p-1 ${cardBgClass} rounded-lg border ${borderClass} w-fit`}>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "about" ? "bg-[#ff9ec6] text-black shadow-sm" : `${mutedTextClass} hover:${textClass}`
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === "posts" ? "bg-[#ff9ec6] text-black shadow-sm" : `${mutedTextClass} hover:${textClass}`
            }`}
          >
            Posts
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "about" && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* About Section */}
            <div className={`${cardBgClass} ${borderClass} p-6 rounded-xl border`}>
              <h3 className="text-xl font-bold mb-4">About {mentor.name}</h3>
              <div className="prose prose-gray max-w-none">
                {mentor.fullDescription.split("\n").map((paragraph, index) => (
                  <p key={index} className={`${mutedTextClass} mb-4 leading-relaxed`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div className={`${cardBgClass} ${borderClass} p-6 rounded-xl border`}>
              <h3 className="text-xl font-bold mb-4">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#ff9ec6]/10 text-[#ff9ec6] rounded-full text-sm font-medium border border-[#ff9ec6]/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className={`${cardBgClass} ${borderClass} p-6 rounded-xl border`}>
              <h3 className="text-xl font-bold mb-4">Languages</h3>
              <div className="flex flex-wrap gap-4">
                {mentor.languages.map((language, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-[#ff9ec6]" />
                    <span className={`${mutedTextClass}`}>{language}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "posts" && (
          <motion.div
            key="posts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {mentor.posts.map((post) => (
              <div key={post.id} className={`${cardBgClass} ${borderClass} p-6 rounded-xl border`}>
                <div className="flex items-start space-x-4">
                  <img
                    src={mentor.profilePic || "/placeholder.svg"}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold">{mentor.name}</h4>
                      <span className={`text-sm ${mutedTextClass}`}>{post.timestamp}</span>
                    </div>
                    <p className={`${mutedTextClass} mb-4 leading-relaxed`}>{post.content}</p>
                    <div className="flex items-center space-x-6">
                      <button
                        className={`flex items-center space-x-2 ${mutedTextClass} hover:text-[#ff9ec6] transition-colors`}
                      >
                        <Heart className="h-5 w-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button
                        className={`flex items-center space-x-2 ${mutedTextClass} hover:text-[#ff9ec6] transition-colors`}
                      >
                        <MessageSquare className="h-5 w-5" />
                        <span>{post.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowChatModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-md ${cardBgClass} ${borderClass} rounded-2xl border shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Start Chat with {mentor.name}</h3>
                  <button
                    onClick={() => setShowChatModal(false)}
                    className={`p-2 rounded-full ${
                      isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
                    } transition-colors`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleChatSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${mutedTextClass}`}>Your message</label>
                    <Textarea
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Hi! I'd like to discuss..."
                      className={`min-h-[100px] resize-none ${cardBgClass} ${borderClass}`}
                      required
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowChatModal(false)}
                      className={`flex-1 ${borderClass}`}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-lg ${cardBgClass} ${borderClass} rounded-2xl border shadow-2xl max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Book Session with {mentor.name}</h3>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className={`p-2 rounded-full ${
                      isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
                    } transition-colors`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {/* Session Type */}
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${mutedTextClass}`}>Session Type</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, sessionType: "video" })}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          bookingForm.sessionType === "video"
                            ? "border-[#ff9ec6] bg-[#ff9ec6]/10"
                            : `${borderClass} ${isDarkMode ? "hover:border-gray-600" : "hover:border-gray-400"}`
                        }`}
                      >
                        <Video className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-[#ff9ec6]" />
                        <span className="text-xs sm:text-sm font-medium">Video Call</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setBookingForm({ ...bookingForm, sessionType: "phone" })}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          bookingForm.sessionType === "phone"
                            ? "border-[#ff9ec6] bg-[#ff9ec6]/10"
                            : `${borderClass} ${isDarkMode ? "hover:border-gray-600" : "hover:border-gray-400"}`
                        }`}
                      >
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-[#ff9ec6]" />
                        <span className="text-xs sm:text-sm font-medium">Phone Call</span>
                      </button>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${mutedTextClass}`}>Duration</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[30, 60, 90].map((duration) => (
                        <button
                          key={duration}
                          type="button"
                          onClick={() => setBookingForm({ ...bookingForm, duration })}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                            bookingForm.duration === duration
                              ? "border-[#ff9ec6] bg-[#ff9ec6]/10"
                              : `${borderClass} ${isDarkMode ? "hover:border-gray-600" : "hover:border-gray-400"}`
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-medium">{duration} min</span>
                          <div className="text-xs text-[#ff9ec6] mt-1">
                            ₹{Math.round((mentor.price * duration) / 60)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Topic */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${mutedTextClass}`}>Session Topic</label>
                    <Input
                      value={bookingForm.topic}
                      onChange={(e) => setBookingForm({ ...bookingForm, topic: e.target.value })}
                      placeholder="e.g., Product-market fit, Fundraising strategy"
                      className={`${cardBgClass} ${borderClass}`}
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${mutedTextClass}`}>Description (Optional)</label>
                    <Textarea
                      value={bookingForm.description}
                      onChange={(e) => setBookingForm({ ...bookingForm, description: e.target.value })}
                      placeholder="Provide more details about what you'd like to discuss..."
                      className={`min-h-[80px] resize-none ${cardBgClass} ${borderClass}`}
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${mutedTextClass}`}>Date</label>
                      <Input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                        className={`${cardBgClass} ${borderClass}`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${mutedTextClass}`}>Time</label>
                      <Input
                        type="time"
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                        className={`${cardBgClass} ${borderClass}`}
                        required
                      />
                    </div>
                  </div>

                  {/* Total Cost */}
                  <div
                    className={`p-4 rounded-xl ${
                      isDarkMode ? "bg-gray-800/20" : "bg-gray-100/50"
                    } border ${borderClass}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Cost:</span>
                      <span className="text-xl font-bold text-[#ff9ec6]">₹{calculatePrice()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowBookingModal(false)}
                      className={`flex-1 ${borderClass}`}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
