"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  User,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  Heart,
  MessageCircle,
  X,
  ImageIcon,
  Upload,
  Star,
  Briefcase,
  GraduationCap,
  DollarSign,
  Globe,
  Award,
  Clock,
  Calendar,
  CheckCircle,
  BookOpen,
  ArrowUpRight,
  Menu,
  Send,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import ScrollToTop from "@/components/common/scrollup"

export default function MentorDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showCreatePostModal, setShowCreatePostModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showProfileCompletionModal, setShowProfileCompletionModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [newComment, setNewComment] = useState("")
  const [profileCompletionStep, setProfileCompletionStep] = useState(1)
  const [activeTab, setActiveTab] = useState("analytics") // New state for mobile tab

  const [profileData, setProfileData] = useState({
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    bio: "",
    company: "",
    position: "",
    expertise: [],
    hourlyRate: "",
    experience: "",
    languages: [],
    backgroundImage: null,
    profilePicture: null,
    achievements: "",
    availability: "",
    responseTime: "Within 2 hours",
    linkedin: "",
    twitter: "",
    website: "",
  })

  // Mock mentor analytics data
  const mentorStats = {
    totalSessions: 127,
    completedSessions: 115,
    upcomingSessions: 8,
    totalEarnings: 45750,
    monthlyEarnings: 12500,
    rating: 4.9,
    totalReviews: 89,
    responseRate: 98,
    completionRate: 95,
    repeatClients: 67,
    thisMonthSessions: 23,
    lastMonthSessions: 19,
    earningsGrowth: 15.2,
    newMentees: 12,
  }

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      mentee: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32&text=AJ",
      topic: "Product Strategy Review",
      date: "Today",
      time: "2:00 PM",
      duration: "1 hour",
      type: "video",
    },
    {
      id: 2,
      mentee: "Maria Garcia",
      avatar: "/placeholder.svg?height=32&width=32&text=MG",
      topic: "Fundraising Preparation",
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "45 mins",
      type: "video",
    },
    {
      id: 3,
      mentee: "David Kim",
      avatar: "/placeholder.svg?height=32&width=32&text=DK",
      topic: "Team Building Discussion",
      date: "Dec 12",
      time: "3:30 PM",
      duration: "30 mins",
      type: "phone",
    },
  ]

  // Mock recent activity
  const recentActivity = [
    {
      id: 1,
      type: "session_completed",
      mentee: "Lisa Thompson",
      action: "completed a session on 'Go-to-Market Strategy'",
      time: "2 hours ago",
      rating: 5,
    },
    {
      id: 2,
      type: "new_booking",
      mentee: "James Wilson",
      action: "booked a session for 'Product Development'",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "review_received",
      mentee: "Emma Davis",
      action: "left a 5-star review",
      time: "1 day ago",
      rating: 5,
    },
  ]

  const [newPost, setNewPost] = useState({
    content: "",
    image: null,
  })

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40&text=SC",
        role: "Mentor",
        field: "Tech Startup",
      },
      content:
        "Just helped another startup raise their Series A! 🚀 Key lesson: Focus on your unit economics and show clear path to profitability. Investors want to see sustainable growth, not just hockey stick projections.",
      image: "/placeholder.svg?height=300&width=500&text=Series+A+Tips",
      likes: 24,
      comments: [
        {
          id: 1,
          author: "Alex Johnson",
          avatar: "/placeholder.svg?height=30&width=30&text=AJ",
          content: "This is so helpful! Thanks for sharing your insights.",
          timestamp: "1 hour ago",
        },
      ],
      timestamp: "2 hours ago",
      liked: false,
    },
    {
      id: 2,
      author: {
        name: "Marcus Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40&text=MR",
        role: "Mentor",
        field: "E-commerce",
      },
      content:
        "5 key metrics every e-commerce founder should track daily:\n\n1. Customer Acquisition Cost (CAC)\n2. Lifetime Value (LTV)\n3. Conversion Rate\n4. Average Order Value\n5. Return Rate\n\nMaster these and you'll have a clear picture of your business health.",
      likes: 42,
      comments: [],
      timestamp: "1 day ago",
      liked: false,
    },
    {
      id: 3,
      author: {
        name: "Jennifer Park",
        avatar: "/placeholder.svg?height=40&width=40&text=JP",
        role: "Mentor",
        field: "SaaS",
      },
      content:
        "Building a SaaS product? Here's my framework for pricing:\n\n1. Start with value-based pricing\n2. Offer 3 tiers (Good, Better, Best)\n3. Make the middle tier most attractive\n4. Include annual discounts\n5. Test and iterate based on data\n\nRemember: You can always lower prices, but raising them is much harder!",
      likes: 67,
      comments: [
        {
          id: 1,
          author: "Mike Chen",
          avatar: "/placeholder.svg?height=30&width=30&text=MC",
          content: "Great framework! We implemented this and saw 40% increase in conversions.",
          timestamp: "3 hours ago",
        },
        {
          id: 2,
          author: "Sarah Kim",
          avatar: "/placeholder.svg?height=30&width=30&text=SK",
          content: "The annual discount tip is gold. Thanks for sharing!",
          timestamp: "5 hours ago",
        },
      ],
      timestamp: "1 day ago",
      liked: true,
    },
    {
      id: 4,
      author: {
        name: "David Thompson",
        avatar: "/placeholder.svg?height=40&width=40&text=DT",
        role: "Mentor",
        field: "Fintech",
      },
      content:
        "Regulatory compliance in fintech doesn't have to be scary. Here's how we approached it:\n\n• Start compliance discussions early\n• Build relationships with regulators\n• Invest in legal counsel from day one\n• Document everything\n• Stay updated on regulatory changes\n\nCompliance is not a blocker - it's a competitive advantage when done right.",
      likes: 38,
      comments: [],
      timestamp: "2 days ago",
      liked: false,
    },
    {
      id: 5,
      author: {
        name: "Lisa Wang",
        avatar: "/placeholder.svg?height=40&width=40&text=LW",
        role: "Mentor",
        field: "AI/ML",
      },
      content:
        "AI implementation doesn't have to be overwhelming. Start small:\n\n1. Identify one specific problem AI can solve\n2. Use existing APIs before building custom models\n3. Focus on data quality over quantity\n4. Measure impact from day one\n5. Scale gradually\n\nMost successful AI projects start with simple automation, not complex algorithms.",
      likes: 89,
      comments: [
        {
          id: 1,
          author: "Tom Wilson",
          avatar: "/placeholder.svg?height=30&width=30&text=TW",
          content: "This is exactly what we needed to hear. Starting with APIs next week!",
          timestamp: "2 hours ago",
        },
      ],
      timestamp: "3 days ago",
      liked: false,
    },
  ])

  const bgClass = isDarkMode ? "bg-black" : "bg-white"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Options for dropdowns
  const expertiseOptions = [
    "Product Development",
    "Fundraising",
    "Team Building",
    "Go-to-Market Strategy",
    "Strategic Partnerships",
    "Operations & Scaling",
    "Marketing & Growth",
    "Sales Strategy",
    "Technology & Engineering",
    "Finance & Accounting",
    "Legal & Compliance",
    "HR & Talent",
    "Customer Success",
    "Data & Analytics",
    "Business Strategy",
    "Leadership & Management",
  ]

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
    "Korean",
    "Portuguese",
    "Italian",
    "Russian",
    "Arabic",
    "Hindi",
    "Dutch",
    "Swedish",
  ]

  // Handler functions
  const handleExpertiseToggle = (expertise) => {
    setProfileData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(expertise)
        ? prev.expertise.filter((e) => e !== expertise)
        : [...prev.expertise, expertise],
    }))
  }

  const handleLanguageToggle = (language) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const handleCreatePost = () => {
    if (newPost.content.trim()) {
      const post = {
        id: posts.length + 1,
        author: {
          name: profileData.name,
          avatar: "/placeholder.svg?height=40&width=40&text=SC",
          role: "Mentor",
          field: "Tech Startup",
        },
        content: newPost.content,
        image: newPost.image,
        likes: 0,
        comments: [],
        timestamp: "Just now",
        liked: false,
      }
      setPosts([post, ...posts])
      setNewPost({ content: "", image: null })
      setShowCreatePostModal(false)
    }
  }

  const handleLikePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleAddComment = () => {
    if (newComment.trim() && selectedPost) {
      const comment = {
        id: selectedPost.comments.length + 1,
        author: profileData.name,
        avatar: "/placeholder.svg?height=30&width=30&text=SC",
        content: newComment,
        timestamp: "Just now",
      }

      setPosts(
        posts.map((post) =>
          post.id === selectedPost.id
            ? {
                ...post,
                comments: [...post.comments, comment],
              }
            : post,
        ),
      )

      setNewComment("")
      setShowCommentModal(false)
      setSelectedPost(null)
    }
  }

  const handleLogout = () => {
    console.log("Logging out...")
    window.location.href = "/login"
  }

  const handleProfileCompletion = () => {
    console.log("Profile completed:", profileData)
    setShowProfileCompletionModal(false)
  }

  const nextStep = () => {
    if (profileCompletionStep < 3) {
      setProfileCompletionStep(profileCompletionStep + 1)
    }
  }

  const prevStep = () => {
    if (profileCompletionStep > 1) {
      setProfileCompletionStep(profileCompletionStep - 1)
    }
  }

  const getStepProgress = () => {
    return (profileCompletionStep / 3) * 100
  }

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl ${isDarkMode ? "bg-black/80 border-gray-900/50" : "bg-white/80 border-gray-200/50"} border-b`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl md:text-2xl font-bold text-[#ff9ec6] hover:text-[#ff9ec6]/80 transition-colors"
            >
              Foundertalk
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors`}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-gray-400 hover:text-white" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                )}
              </button>

              {/* Chat Button */}
              <Link href="/chats">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded-full p-2`}
                >
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className={`${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded-full p-2`}
                >
                  <User className="h-5 w-5" />
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>

                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute right-0 mt-2 w-56 backdrop-blur-xl ${isDarkMode ? "bg-gray-900/95 border-gray-700/60" : "bg-white/95 border-gray-300/60"} rounded-xl border shadow-xl`}
                    >
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setShowProfileCompletionModal(true)
                            setShowProfileDropdown(false)
                          }}
                          className={`w-full px-4 py-3 text-left ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"} transition-colors flex items-center space-x-3`}
                        >
                          <User className="h-4 w-4 text-[#ff9ec6]" />
                          <span>Complete Profile</span>
                        </button>
                        <div
                          className={`border-t ${isDarkMode ? "border-gray-800/50" : "border-gray-200/50"} my-2`}
                        ></div>
                        <button
                          onClick={handleLogout}
                          className={`w-full px-4 py-3 text-left ${isDarkMode ? "hover:bg-red-900/20 text-red-400" : "hover:bg-red-50 text-red-600"} transition-colors flex items-center space-x-3`}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className={`${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded-full p-2`}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pt-4 border-t border-gray-800/20"
              >
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors`}
                      >
                        {isDarkMode ? (
                          <Sun className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Moon className="h-5 w-5 text-gray-600" />
                        )}
                      </button>

                      <Link href="/chat">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded-full p-2`}
                        >
                          <MessageCircle className="h-5 w-5" />
                        </Button>
                      </Link>
                    </div>

                    <Button
                      onClick={() => {
                        setShowProfileCompletionModal(true)
                        setShowMobileMenu(false)
                      }}
                      variant="outline"
                      size="sm"
                      className="text-[#ff9ec6] border-[#ff9ec6]/30 hover:bg-[#ff9ec6]/10"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-b border-gray-800/20">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Welcome back, {profileData.name}! 👋</h1>
          <p className={`${mutedTextClass} text-base md:text-lg`}>
            Here's your mentoring overview and community activity
          </p>
        </div>
      </div>

      {/* Main Content - X.com Style Layout */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Tab Navigation */}
        <div className="lg:hidden flex justify-center space-x-4 py-4">
          <Button
            onClick={() => setActiveTab("analytics")}
            variant="ghost"
            className={`flex-1 rounded-full ${
              activeTab === "analytics"
                ? "bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90"
                : isDarkMode
                  ? "hover:bg-gray-800/50"
                  : "hover:bg-gray-100/50"
            }`}
          >
            Analytics
          </Button>
          <Button
            onClick={() => setActiveTab("community")}
            variant="ghost"
            className={`flex-1 rounded-full ${
              activeTab === "community"
                ? "bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90"
                : isDarkMode
                  ? "hover:bg-gray-800/50"
                  : "hover:bg-gray-100/50"
            }`}
          >
            Community Feed
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Right Column - Analytics Cards (X.com Sidebar Style) - Now first in source order for mobile */}

          <div
            className={`lg:col-span-4 xl:col-span-5 lg:order-2 ${activeTab === "analytics" ? "block" : "hidden"} lg:block`}
          >
            <div className="sticky top-24 py-6">
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-3 lg:gap-4">
                  {/* Total Earnings */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/60 border-gray-700/40" : "bg-white/80 border-gray-300/50"} col-span-2 rounded-xl lg:rounded-2xl border shadow-lg p-3 lg:p-4`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-green-900/20" : "bg-green-100/50"}`}>
                        <DollarSign className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs lg:text-sm ${mutedTextClass}`}>Total Earnings</p>
                        <p className="text-lg lg:text-xl font-bold">₹{mentorStats.totalEarnings.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-green-500">
                        <ArrowUpRight className="h-3 w-3 lg:h-4 lg:w-4" />
                        <span className="text-xs lg:text-sm font-medium">+{mentorStats.earningsGrowth}%</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Sessions Completed */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/60 border-gray-700/40" : "bg-white/80 border-gray-300/50"} rounded-xl lg:rounded-2xl border col-span-2 shadow-lg p-3 lg:p-4`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50"}`}>
                        <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs lg:text-sm ${mutedTextClass}`}>Sessions</p>
                        <p className="text-lg lg:text-xl font-bold">{mentorStats.completedSessions}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-blue-500">
                        <span className="text-xs lg:text-sm font-medium">{mentorStats.thisMonthSessions}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/60 border-gray-700/40" : "bg-white/80 border-gray-300/50"} rounded-xl lg:rounded-2xl border shadow-lg p-3 lg:p-4 col-span-2 lg:col-span-1`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? "bg-yellow-900/20" : "bg-yellow-100/50"}`}>
                        <Star className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-500 fill-current" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-xs lg:text-sm ${mutedTextClass}`}>Rating</p>
                        <p className="text-lg lg:text-xl font-bold">{mentorStats.rating}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs lg:text-sm font-medium ${mutedTextClass}`}>
                          {mentorStats.totalReviews} reviews
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Upcoming Sessions */}

                {/* Recent Activity */}
              </div>
            </div>
          </div>

          {/* Left Column - Community Feed (X.com Main Feed Style) - Now second in source order for mobile */}

          <div
            className={`lg:col-span-8 xl:col-span-7 lg:order-1 ${activeTab === "community" ? "block" : "hidden"} lg:block`}
          >
            <div className="py-6">
              {/* Community Feed Header */}
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-[#ff9ec6]" />
                  <span>Community Feed</span>
                  <span className="px-2 py-1 rounded-full bg-[#ff9ec6]/20 text-[#ff9ec6] text-xs font-medium">
                    Required
                  </span>
                </h2>
                <p className={`${mutedTextClass} text-sm md:text-base`}>
                  Share your expertise and engage with the community to build your reputation and attract more mentees.
                </p>
              </div>

              {/* Create Post Section */}
              <div
                className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/60 border-gray-700/40" : "bg-white/80 border-gray-300/50"} rounded-2xl border shadow-lg p-4 md:p-6 mb-6`}
              >
                <div className="flex space-x-3 md:space-x-4">
                  <img
                    src="/placeholder.svg?height=48&width=48&text=SC"
                    alt="Your avatar"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#ff9ec6]/20 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div
                      onClick={() => setShowCreatePostModal(true)}
                      className={`w-full p-3 md:p-4 rounded-xl cursor-text transition-all duration-200 ${
                        isDarkMode
                          ? "bg-transparent border border-gray-700/30 hover:border-gray-600/50"
                          : "bg-transparent border border-gray-300/30 hover:border-gray-400/50"
                      }`}
                    >
                      <p className={`${mutedTextClass} text-base md:text-lg`}>
                        Share your expertise, insights, or startup tips with the community...
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={() => setShowCreatePostModal(true)}
                          variant="ghost"
                          size="sm"
                          className={`${mutedTextClass} hover:${textClass} hover:bg-[#ff9ec6]/10 rounded-full p-2`}
                        >
                          <ImageIcon className="h-4 w-4 md:h-5 md:w-5" />
                        </Button>
                        <span className={`text-xs md:text-sm ${mutedTextClass} hidden sm:block`}>
                          💡 Tip: Regular posting increases your visibility by 3x
                        </span>
                      </div>

                      <Button
                        onClick={() => setShowCreatePostModal(true)}
                        className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-full px-4 md:px-6 py-2 font-semibold w-full sm:w-auto"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posts Feed */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/60 border-gray-700/40" : "bg-white/80 border-gray-300/50"} rounded-2xl border shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow`}
                  >
                    {/* Post Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#ff9ec6]/20"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-sm md:text-base">{post.author.name}</h4>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#ff9ec6]/20 text-[#ff9ec6]">
                            {post.author.role}
                          </span>
                        </div>
                        <p className={`text-xs md:text-sm ${mutedTextClass}`}>
                          {post.author.field} • {post.timestamp}
                        </p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="whitespace-pre-line mb-4 text-sm md:text-base">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full rounded-xl max-h-64 md:max-h-96 object-cover"
                        />
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800/20">
                      <div className="flex items-center space-x-4 md:space-x-6">
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            post.liked ? "text-red-500" : mutedTextClass
                          } hover:text-red-500`}
                        >
                          <Heart className={`h-4 w-4 md:h-5 md:w-5 ${post.liked ? "fill-current" : ""}`} />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPost(post)
                            setShowCommentModal(true)
                          }}
                          className={`flex items-center space-x-2 ${mutedTextClass} hover:${textClass} transition-colors`}
                        >
                          <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                          <span className="text-sm">{post.comments.length}</span>
                        </button>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {post.comments.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-800/20">
                        <div className="space-y-3">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex items-start space-x-3">
                              <img
                                src={comment.avatar || "/placeholder.svg"}
                                alt={comment.author}
                                className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#ff9ec6]/20"
                              />
                              <div className="flex-1">
                                <div
                                  className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-800/60" : "bg-gray-100/70"} shadow-sm`}
                                >
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-semibold text-xs md:text-sm">{comment.author}</span>
                                    <span className={`text-xs ${mutedTextClass}`}>{comment.timestamp}</span>
                                  </div>
                                  <p className="text-xs md:text-sm">{comment.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion Modal */}
      <AnimatePresence>
        {showProfileCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <ScrollToTop/>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-4xl backdrop-blur-xl ${isDarkMode ? "bg-gray-900/98 border-gray-700/60" : "bg-white/98 border-gray-300/60"} rounded-3xl border shadow-2xl max-h-[90vh] overflow-y-auto`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800/20">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 md:p-3 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"}`}>
                    <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-[#ff9ec6]" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold">Complete Your Mentor Profile</h3>
                    <p className={`text-xs md:text-sm ${mutedTextClass}`}>
                      Step {profileCompletionStep} of 3 - Build your professional presence
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfileCompletionModal(false)}
                  className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"} transition-colors`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="px-4 md:px-6 pt-4">
                <div className={`w-full h-2 rounded-full ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
                  <div
                    className="h-2 bg-gradient-to-r from-[#ff9ec6] to-[#ff9ec6]/80 rounded-full transition-all duration-500"
                    style={{ width: `${getStepProgress()}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Info & Images */}
                  {profileCompletionStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <div className="text-center mb-6 md:mb-8">
                        <h4 className="text-lg md:text-xl font-bold mb-2">Basic Information & Photos</h4>
                        <p className={mutedTextClass}>Let's start with your visual presence and basic details</p>
                      </div>

                      {/* Background Image Upload */}
                      <div>
                        <Label className="flex items-center space-x-2 mb-4">
                          <ImageIcon className="h-4 w-4 md:h-5 md:w-5 text-[#ff9ec6]" />
                          <span className="text-base md:text-lg font-semibold">Background Image</span>
                        </Label>
                        <div
                          className={`relative h-32 md:h-48 rounded-xl border-2 border-dashed ${isDarkMode ? "border-gray-700 bg-gray-800/30" : "border-gray-300 bg-gray-100/30"} flex items-center justify-center cursor-pointer hover:border-[#ff9ec6]/50 transition-colors`}
                        >
                          <div className="text-center">
                            <Upload className="h-8 w-8 md:h-12 md:w-12 text-[#ff9ec6] mx-auto mb-2" />
                            <p className={`${mutedTextClass} text-xs md:text-sm`}>Click to upload background image</p>
                            <p className={`${mutedTextClass} text-xs mt-1`}>Recommended: 1200x400px</p>
                          </div>
                        </div>
                      </div>

                      {/* Profile Picture Upload */}
                      <div>
                        <Label className="flex items-center space-x-2 mb-4">
                          <User className="h-4 w-4 md:h-5 md:w-5 text-[#ff9ec6]" />
                          <span className="text-base md:text-lg font-semibold">Profile Picture</span>
                        </Label>
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                          <div
                            className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-dashed ${isDarkMode ? "border-gray-700 bg-gray-800/30" : "border-gray-300 bg-gray-100/30"} flex items-center justify-center cursor-pointer hover:border-[#ff9ec6]/50 transition-colors`}
                          >
                            <Upload className="h-6 w-6 md:h-8 md:w-8 text-[#ff9ec6]" />
                          </div>
                          <div className="text-center md:text-left">
                            <p className="font-semibold mb-2">Upload your professional photo</p>
                            <p className={`${mutedTextClass} text-sm mb-3`}>
                              This will be your main profile image that mentees see
                            </p>
                            <Button className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl">
                              Choose Photo
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <Label className="flex items-center space-x-2 mb-2">
                            <Briefcase className="h-4 w-4 text-[#ff9ec6]" />
                            <span>Current Company</span>
                          </Label>
                          <Input
                            value={profileData.company}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, company: e.target.value }))}
                            placeholder="TechFlow Solutions"
                            className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
                          />
                        </div>
                        <div>
                          <Label className="flex items-center space-x-2 mb-2">
                            <GraduationCap className="h-4 w-4 text-[#ff9ec6]" />
                            <span>Position/Title</span>
                          </Label>
                          <Input
                            value={profileData.position}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, position: e.target.value }))}
                            placeholder="CEO & Founder"
                            className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
                          />
                        </div>
                        <div>
                          <Label className="flex items-center space-x-2 mb-2">
                            <DollarSign className="h-4 w-4 text-[#ff9ec6]" />
                            <span>Hourly Rate (₹)</span>
                          </Label>
                          <Input
                            type="number"
                            value={profileData.hourlyRate}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                            placeholder="150"
                            className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
                          />
                        </div>
                        <div>
                          <Label className="flex items-center space-x-2 mb-2">
                            <Clock className="h-4 w-4 text-[#ff9ec6]" />
                            <span>Years of Experience</span>
                          </Label>
                          <Input
                            value={profileData.experience}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, experience: e.target.value }))}
                            placeholder="10+ years"
                            className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: About & Expertise */}
                  {profileCompletionStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <ScrollToTop/>
                      <div className="text-center mb-6 md:mb-8">
                        <h4 className="text-lg md:text-xl font-bold mb-2">About You & Expertise</h4>
                        <p className={mutedTextClass}>Share your story and areas of expertise</p>
                      </div>

                      {/* About Section */}
                      <div>
                        <Label className="flex items-center space-x-2 mb-4">
                          <User className="h-4 w-4 md:h-5 md:w-5 text-[#ff9ec6]" />
                          <span className="text-base md:text-lg font-semibold">About You</span>
                        </Label>
                        <Textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                          placeholder="I'm a seasoned entrepreneur with over 10 years of experience in building and scaling startups. I've successfully founded 3 companies, with my latest venture being acquired by a Fortune 500 company for $50M.

My expertise spans across product development, go-to-market strategies, fundraising, and team building. I've helped over 200+ founders navigate the challenging startup journey, from ideation to IPO.

What I can help you with:
• Product-market fit validation
• Fundraising strategies and investor relations
• Scaling operations and team building
• Go-to-market planning and execution
• Strategic partnerships and business development"
                          rows={6}
                          className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl resize-none`}
                        />
                        <p className={`text-xs ${mutedTextClass} mt-2`}>
                          This will be the main description mentees see on your profile
                        </p>
                      </div>

                      {/* Expertise Selection */}
                      <div>
                        <Label className="flex items-center space-x-2 mb-4">
                          <Award className="h-4 w-4 md:h-5 md:w-5 text-[#ff9ec6]" />
                          <span className="text-base md:text-lg font-semibold">Areas of Expertise</span>
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {expertiseOptions.map((expertise) => (
                            <button
                              key={expertise}
                              onClick={() => handleExpertiseToggle(expertise)}
                              className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                profileData.expertise.includes(expertise)
                                  ? "bg-[#ff9ec6] text-black shadow-md"
                                  : isDarkMode
                                    ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
                                    : "bg-gray-100/50 hover:bg-gray-200/50 border border-gray-300/50"
                              }`}
                            >
                              {expertise}
                            </button>
                          ))}
                        </div>
                        <p className={`text-xs ${mutedTextClass} mt-2`}>
                          Select all areas where you can provide guidance (minimum 3 recommended)
                        </p>
                      </div>

                      {/* Achievements */}
                      <div>
                        <Label className="flex items-center space-x-2 mb-2">
                          <Award className="h-4 w-4 text-[#ff9ec6]" />
                          <span>Key Achievements</span>
                        </Label>
                        <Textarea
                          value={profileData.achievements}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, achievements: e.target.value }))}
                          placeholder="• Founded and scaled 3 successful startups
• Raised over $25M in funding across multiple rounds
• Led team of 100+ employees
• Achieved successful exit with $50M acquisition
• Mentored 200+ founders with 95% success rate"
                          rows={5}
                          className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl resize-none`}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Final Details & Review */}
                  {profileCompletionStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4 md:space-y-6"
                    >
                      <ScrollToTop/>
                      

                      <div className="text-center mb-6 md:mb-8">
                        <h4 className="text-lg md:text-xl font-bold mb-2">Final Details & Review</h4>
                        <p className={mutedTextClass}>Complete your profile and review everything</p>
                      </div>

                      {/* Languages */}
                      <div>
                        <Label className="flex items-center space-x-2 mb-4">
                          <Globe className="h-4 w-4 md:h-5 md:w-5 text-[#ff9ec6]" />
                          <span className="text-base md:text-lg font-semibold">Languages</span>
                        </Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {languageOptions.map((language) => (
                            <button
                              key={language}
                              onClick={() => handleLanguageToggle(language)}
                              className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                profileData.languages.includes(language)
                                  ? "bg-[#ff9ec6] text-black shadow-md"
                                  : isDarkMode
                                    ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
                                    : "bg-gray-100/50 hover:bg-gray-200/50 border border-gray-300/50"
                              }`}
                            >
                              {language}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Availability */}
                      <div>
                        <Label className="flex items-center space-x-2 mb-2">
                          <Calendar className="h-4 w-4 text-[#ff9ec6]" />
                          <span>Availability</span>
                        </Label>
                        <Textarea
                          value={profileData.availability}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, availability: e.target.value }))}
                          placeholder="Available weekdays 9 AM - 6 PM PST. Weekend sessions by appointment. I typically respond within 2 hours during business hours."
                          rows={3}
                          className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl resize-none`}
                        />
                      </div>

                      {/* Profile Preview */}
                      <div
                        className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-800/60 border-gray-600/50" : "bg-gray-100/70 border-gray-400/50"} rounded-2xl border shadow-md p-4 md:p-6`}
                      >
                        <h4 className="font-bold mb-4">Profile Preview</h4>

                        {/* Profile Info */}
                        <div className="flex items-start space-x-4 mb-6">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#ff9ec6]/20 border-4 border-[#ff9ec6]/30 flex items-center justify-center">
                            <User className="h-6 w-6 md:h-8 md:w-8 text-[#ff9ec6]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-bold mb-1">{profileData.name}</h3>
                            <p className="text-[#ff9ec6] font-semibold mb-1">
                              {profileData.position} at {profileData.company}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm mb-2 space-y-1 sm:space-y-0">
                              <span className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>₹{profileData.hourlyRate || "0"}/hr</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{profileData.experience || "Experience not set"}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bio Preview */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">About</h4>
                          <p className={`${mutedTextClass} text-sm leading-relaxed line-clamp-4`}>
                            {profileData.bio || "No bio added yet"}
                          </p>
                        </div>

                        {/* Expertise Preview */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Expertise ({profileData.expertise.length})</h4>
                          <div className="flex flex-wrap gap-2">
                            {profileData.expertise.length > 0 ? (
                              profileData.expertise.slice(0, 6).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 rounded-full bg-[#ff9ec6]/20 text-[#ff9ec6] text-sm font-medium"
                                >
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <span className={`${mutedTextClass} text-sm`}>No expertise areas selected</span>
                            )}
                            {profileData.expertise.length > 6 && (
                              <span
                                className={`px-3 py-1 rounded-full ${isDarkMode ? "bg-gray-700/50" : "bg-gray-200/50"} text-sm`}
                              >
                                +{profileData.expertise.length - 6} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Languages */}
                        <div>
                          <h4 className="font-semibold mb-3">Languages</h4>
                          <div className="flex flex-wrap gap-2">
                            {profileData.languages.length > 0 ? (
                              profileData.languages.slice(0, 4).map((language) => (
                                <span
                                  key={language}
                                  className={`px-3 py-1 rounded-full ${
                                    isDarkMode ? "bg-gray-700/50" : "bg-gray-200/50"
                                  } text-sm font-medium`}
                                >
                                  {language}
                                </span>
                              ))
                            ) : (
                              <span className={`${mutedTextClass} text-sm`}>No languages selected</span>
                            )}
                            {profileData.languages.length > 4 && (
                              <span
                                className={`px-3 py-1 rounded-full ${
                                  isDarkMode ? "bg-gray-700/50" : "bg-gray-200/50"
                                } text-sm`}
                              >
                                +{profileData.languages.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-800/20 space-y-4 sm:space-y-0">
                  <Button
                    onClick={prevStep}
                    disabled={profileCompletionStep === 1}
                    variant="outline"
                    className={`${
                      isDarkMode ? "border-gray-700/50 hover:bg-gray-800/50" : "border-gray-300/50 hover:bg-gray-100/50"
                    } rounded-xl px-4 md:px-6 disabled:opacity-50 w-full sm:w-auto`}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center justify-center space-x-2">
                    {[1, 2, 3].map((step) => (
                      <span
                        key={step}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          step <= profileCompletionStep ? "bg-[#ff9ec6]" : isDarkMode ? "bg-gray-700" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {profileCompletionStep < 3 ? (
                    <Button
                      onClick={nextStep}
                      className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-4 md:px-6 w-full sm:w-auto"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleProfileCompletion}
                      className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-6 md:px-8 w-full sm:w-auto"
                    >
                      Complete Profile
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comment Modal */}
      <AnimatePresence>
        {showCommentModal && selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCommentModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg backdrop-blur-xl ${isDarkMode ? "bg-gray-900/95 border-gray-800/50" : "bg-white/95 border-gray-200/50"} rounded-3xl border shadow-2xl max-h-[80vh] overflow-y-auto`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Comments</h3>
                  <Button
                    onClick={() => setShowCommentModal(false)}
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Post Preview */}
                <div className={`p-4 rounded-xl ${isDarkMode ? "bg-gray-800/30" : "bg-gray-100/30"} mb-6`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={selectedPost.author.avatar || "/placeholder.svg"}
                      alt={selectedPost.author.name}
                      className="w-10 h-10 rounded-full border-2 border-[#ff9ec6]/20"
                    />
                    <div>
                      <h4 className="font-semibold">{selectedPost.author.name}</h4>
                      <p className={`text-sm ${mutedTextClass}`}>{selectedPost.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-3">{selectedPost.content}</p>
                </div>

                {/* Comments List */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {selectedPost.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <img
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                        className="w-8 h-8 rounded-full border border-[#ff9ec6]/20"
                      />
                      <div className="flex-1">
                        <div className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-800/30" : "bg-gray-100/30"}`}>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm">{comment.author}</span>
                            <span className={`text-xs ${mutedTextClass}`}>{comment.timestamp}</span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex items-center space-x-3">
                  <img
                    src="/placeholder.svg?height=32&width=32&text=SC"
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full border border-[#ff9ec6]/20"
                  />
                  <div className="flex-1 flex items-center space-x-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className={`flex-1 ${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment()
                        }
                      }}
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-4 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreatePostModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg backdrop-blur-xl ${isDarkMode ? "bg-gray-900/95 border-gray-800/50" : "bg-white/95 border-gray-200/50"} rounded-3xl border shadow-2xl`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Create Post</h3>
                  <Button
                    onClick={() => setShowCreatePostModal(false)}
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src="/placeholder.svg?height=40&width=40&text=SC"
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full border-2 border-[#ff9ec6]/20"
                    />
                    <div>
                      <h4 className="font-semibold">{profileData.name}</h4>
                      <p className={`text-sm ${mutedTextClass}`}>Mentor</p>
                    </div>
                  </div>

                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="What's on your mind? Share your expertise, insights, or startup tips with the community!"
                    rows={6}
                    className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl resize-none border-0 focus:ring-2 focus: : "bg-white/50 border-gray-300/50"} rounded-xl resize-none border-0 focus:ring-2 focus-[#ff9ec6]/20`}
                  />

                  <div className="flex items-center justify-between">
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <ImageIcon className="h-5 w-5" />
                      <span>Add Image</span>
                    </Button>

                    <Button
                      onClick={handleCreatePost}
                      disabled={!newPost.content.trim()}
                      className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-6 disabled:opacity-50"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
