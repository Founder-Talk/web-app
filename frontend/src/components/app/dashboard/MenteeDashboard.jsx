import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageCircle,
  User,
  Filter,
  Search,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  X,
  LogOut,
  Edit3,
  DollarSign,
  Briefcase,
  Mail,
  Heart,
  Plus,
  Users,
  BookOpen,
  ImageIcon,
  Send,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showCreatePostModal, setShowCreatePostModal] = useState(false)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("mentors") // "mentors" or "feed"
  const [newComment, setNewComment] = useState("")
  const [filters, setFilters] = useState({
    rating: 0,
    priceRange: [0, 100000],
    field: "",
  })
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate entrepreneur looking to scale my startup with expert guidance.",
    company: "TechStart Inc.",
  })
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
        {
          id: 2,
          author: "Maria Garcia",
          avatar: "/placeholder.svg?height=30&width=30&text=MG",
          content: "Could you elaborate on the unit economics part?",
          timestamp: "30 minutes ago",
        },
      ],
      timestamp: "2 hours ago",
      liked: false,
    },
    {
      id: 2,
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=AJ",
        role: "Mentee",
        field: "E-commerce",
      },
      content:
        "Finally launched our MVP! 🎉 Thanks to all the mentors who helped guide us through the product development process. The feedback has been incredible so far.",
      likes: 15,
      comments: [
        {
          id: 1,
          author: "Sarah Chen",
          avatar: "/placeholder.svg?height=30&width=30&text=SC",
          content: "Congratulations! What's your next milestone?",
          timestamp: "2 hours ago",
        },
      ],
      timestamp: "4 hours ago",
      liked: true,
    },
    {
      id: 3,
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
  ])

  const bgClass = isDarkMode ? "bg-black" : "bg-white"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"

  // Mock data for mentor posts
  const mentorPosts = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    name: `Mentor ${i + 1}`,
    field: ["Tech Startup", "E-commerce", "SaaS", "FinTech", "HealthTech"][i % 5],
    caption: "Helping founders scale their startups with proven strategies and insights.",
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
    price: Math.floor(Math.random() * 500) + 100, // $100-600
    image: `/placeholder.svg?height=200&width=300&text=Mentor${i + 1}`,
    profilePic: `/placeholder.svg?height=60&width=60&text=${String.fromCharCode(65 + (i % 26))}`,
    experience: `${Math.floor(Math.random() * 10) + 5}+ years`,
    companiesHelped: `${Math.floor(Math.random() * 200) + 50}+`,
    successRate: `${Math.floor(Math.random() * 10) + 90}%`,
  }))

  // Filter mentors based on search query and filters
  const filteredMentors = useMemo(() => {
    return mentorPosts.filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.field.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRating = filters.rating === 0 || mentor.rating >= filters.rating
      const matchesPrice = mentor.price >= filters.priceRange[0] && mentor.price <= filters.priceRange[1]
      const matchesField = !filters.field || mentor.field === filters.field

      return matchesSearch && matchesRating && matchesPrice && matchesField
    })
  }, [searchQuery, filters, mentorPosts])

  const postsPerPage = 12
  const totalPages = Math.ceil(filteredMentors.length / postsPerPage)
  const currentPosts = filteredMentors.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleFilterApply = () => {
    setShowFilterModal(false)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleFilterReset = () => {
    setFilters({
      rating: 0,
      priceRange: [0, 100000],
      field: "",
    })
  }

  const handleProfileSave = () => {
    setShowProfileModal(false)
    console.log("Profile saved:", profileData)
  }

 const handleLogout = () => {
  localStorage.removeItem("token") 
  console.log("Logging out...")
  window.location.href = "/login"
}


  const handleCreatePost = () => {
    if (newPost.content.trim()) {
      const post = {
        id: posts.length + 1,
        author: {
          name: profileData.name,
          avatar: "/placeholder.svg?height=40&width=40&text=JD",
          role: "Mentee",
          field: "Startup",
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
        avatar: "/placeholder.svg?height=30&width=30&text=JD",
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

  const StarRating = ({ rating, onRatingChange, interactive = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRatingChange(star)}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating ? "fill-[#ff9ec6] text-[#ff9ec6]" : isDarkMode ? "text-gray-600" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const fields = ["Tech Startup", "E-commerce", "SaaS", "FinTech", "HealthTech"]

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl ${isDarkMode ? "bg-black/80 border-gray-900/50" : "bg-white/80 border-gray-200/50"} border-b`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-[#ff9ec6] hover:text-[#ff9ec6]/80 transition-colors">
              Foundertalk
            </Link>

            {/* Right side navigation */}
            <div className="flex items-center space-x-4">
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
                      className={`absolute right-0 mt-2 w-56 backdrop-blur-xl ${isDarkMode ? "bg-gray-900/90 border-gray-800/50" : "bg-white/90 border-gray-200/50"} rounded-xl border shadow-lg`}
                    >
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setShowProfileModal(true)
                            setShowProfileDropdown(false)
                          }}
                          className={`w-full px-4 py-3 text-left ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"} transition-colors flex items-center space-x-3`}
                        >
                          <User className="h-4 w-4 text-[#ff9ec6]" />
                          <span>Edit Profile</span>
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
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {profileData.name}! 👋</h1>
          <p className={`${mutedTextClass} text-lg`}>Connect with mentors and share your startup journey</p>
        </div>

        {/* Section Navigation - Smaller and cleaner */}
        <div className="mb-8">
          <div className="inline-flex items-center p-1 bg-gray-900/10 rounded-lg backdrop-blur-xl border border-gray-800/10">
            <button
              onClick={() => setActiveSection("mentors")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeSection === "mentors"
                  ? "bg-[#ff9ec6] text-black shadow-sm"
                  : `${mutedTextClass} hover:${textClass}`
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Find Mentors</span>
            </button>
            <button
              onClick={() => setActiveSection("feed")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeSection === "feed" ? "bg-[#ff9ec6] text-black shadow-sm" : `${mutedTextClass} hover:${textClass}`
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Community Feed</span>
            </button>
          </div>
        </div>

        {/* Section Content */}
        <AnimatePresence mode="wait">
          {activeSection === "mentors" && (
            <motion.div
              key="mentors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Search and Filter Section */}
              <section className="py-8 bg-transparent">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <Search
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${mutedTextClass}`}
                    />
                    <Input
                      type="text"
                      placeholder="Search by name or field..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 ${isDarkMode ? "bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400" : "bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500"} backdrop-blur-sm h-12 rounded-xl`}
                    />
                  </div>

                  {/* Filter Button */}
                  <Button
                    onClick={() => setShowFilterModal(true)}
                    variant="outline"
                    className={`${
                      isDarkMode
                        ? "border-[#ff9ec6]/30 hover:bg-[#ff9ec6]/10 hover:border-[#ff9ec6]/50 text-[#ff9ec6]"
                        : "border-[#ff9ec6]/40 hover:bg-[#ff9ec6]/10 hover:border-[#ff9ec6]/60 text-[#ff9ec6]"
                    } rounded-xl px-6 h-12 font-medium transition-all duration-200`}
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filter
                    {(filters.rating > 0 ||
                      filters.priceRange[0] > 0 ||
                      filters.priceRange[1] < 100000 ||
                      filters.field) && (
                      <span className="ml-2 bg-[#ff9ec6] text-black text-xs rounded-full px-2 py-1 font-semibold">
                        {
                          [
                            filters.rating > 0,
                            filters.priceRange[0] > 0 || filters.priceRange[1] < 100000,
                            filters.field,
                          ].filter(Boolean).length
                        }
                      </span>
                    )}
                  </Button>
                </div>

                {/* Results count */}
                <div className="mb-6">
                  <p className={`${mutedTextClass} text-sm`}>
                    Showing {currentPosts.length} of {filteredMentors.length} mentors
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                {filteredMentors.length === 0 ? (
                  <div className="text-center py-16">
                    <div className={`text-6xl mb-4 ${mutedTextClass}`}>🔍</div>
                    <h3 className="text-2xl font-bold mb-2">No mentors found</h3>
                    <p className={`${mutedTextClass} mb-6`}>Try adjusting your search or filter criteria</p>
                    <Button
                      onClick={() => {
                        setSearchQuery("")
                        handleFilterReset()
                      }}
                      className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map((mentor, index) => (
                      <motion.div
                        key={mentor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20 hover:bg-gray-900/30" : "bg-white/40 border-gray-200/30 hover:bg-white/60"} rounded-2xl border transition-all duration-300 overflow-hidden group`}
                      >
                        {/* Mentor Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={mentor.image || "/placeholder.svg"}
                            alt={mentor.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Card Content */}
                        <div className="p-4">
                          {/* Profile Section */}
                          <div className="flex items-center space-x-3 mb-3">
                            <img
                              src={mentor.profilePic || "/placeholder.svg"}
                              alt={mentor.name}
                              className="w-12 h-12 rounded-full border-2 border-[#ff9ec6]/20"
                            />
                            <div>
                              <h3 className="font-semibold text-lg">{mentor.name}</h3>
                              <p className="text-[#ff9ec6] text-sm font-medium">{mentor.field}</p>
                            </div>
                          </div>

                          {/* Caption */}
                          <p className={`${mutedTextClass} text-sm mb-4 line-clamp-2`}>{mentor.caption}</p>

                          {/* Rating and Price */}
                          <div className="flex items-center justify-between mb-4">
                            <StarRating rating={mentor.rating} />
                            <span className="font-bold text-[#ff9ec6]">₹{mentor.price}/hr</span>
                          </div>

                          {/* Contact Button */}
                          <div className="flex justify-end">
                            <Link href={`/mentor/${mentor.id}`}>
                              <Button
                                size="sm"
                                className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-full px-4"
                              >
                                View Profile
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-4 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`${
                        isDarkMode
                          ? "border-[#ff9ec6]/30 hover:bg-[#ff9ec6]/10 hover:border-[#ff9ec6]/50 text-[#ff9ec6] disabled:border-gray-700/50 disabled:text-gray-500"
                          : "border-[#ff9ec6]/40 hover:bg-[#ff9ec6]/10 hover:border-[#ff9ec6]/60 text-[#ff9ec6] disabled:border-gray-300/50 disabled:text-gray-400"
                      } rounded-xl transition-all duration-200 disabled:hover:bg-transparent`}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex items-center space-x-2">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-xl transition-all duration-200 ${
                              currentPage === pageNum
                                ? "bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 shadow-md"
                                : isDarkMode
                                  ? "border-[#ff9ec6]/30 hover:bg-[#ff9ec6]/10 hover:border-[#ff9ec6]/50 text-[#ff9ec6]"
                                  : "border-[#ff9ec6]/40 hover:bg-[#ff9ec6]/10 hover:border-[#ff9ec6]/60 text-[#ff9ec6]"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`${
                        isDarkMode
                          ? "border-[#ff9ec6]/30 hover:bg-[#ff9ec6]/10 hover:border-[#ff9ec6]/50 text-[#ff9ec6] disabled:border-gray-700/50 disabled:text-gray-500"
                          : "border-[#ff9ec6]/40 hover:bg-[#ff9ec6]/10 hover:border-[#ff9ec6]/60 text-[#ff9ec6] disabled:border-gray-300/50 disabled:text-gray-400"
                      } rounded-xl transition-all duration-200 disabled:hover:bg-transparent`}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}
              </section>
            </motion.div>
          )}

          {activeSection === "feed" && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              {/* Create Post Section - X-inspired design */}
              <div
                className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20" : "bg-white/40 border-gray-200/30"} rounded-2xl border p-6 mb-6`}
              >
                <div className="flex space-x-4">
                  <img
                    src="/placeholder.svg?height=48&width=48&text=JD"
                    alt="Your avatar"
                    className="w-12 h-12 rounded-full border-2 border-[#ff9ec6]/20 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div
                      onClick={() => setShowCreatePostModal(true)}
                      className={`w-full p-4 rounded-xl cursor-text transition-all duration-200 ${
                        isDarkMode
                          ? "bg-transparent border border-gray-700/30 hover:border-gray-600/50 focus-within:border-[#ff9ec6]/50"
                          : "bg-transparent border border-gray-300/30 hover:border-gray-400/50 focus-within:border-[#ff9ec6]/50"
                      }`}
                    >
                      <p className={`${mutedTextClass} text-lg`}>What's happening in your startup journey?</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <Button
                          onClick={() => setShowCreatePostModal(true)}
                          variant="ghost"
                          size="sm"
                          className={`${mutedTextClass} hover:${textClass} hover:bg-[#ff9ec6]/10 rounded-full p-2 transition-colors`}
                        >
                          <ImageIcon className="h-5 w-5" />
                        </Button>
                        <Button
                          onClick={() => setShowCreatePostModal(true)}
                          variant="ghost"
                          size="sm"
                          className={`${mutedTextClass} hover:${textClass} hover:bg-[#ff9ec6]/10 rounded-full p-2 transition-colors`}
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>

                      <Button
                        onClick={() => setShowCreatePostModal(true)}
                        disabled={false}
                        className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-full px-6 py-2 font-semibold transition-all duration-200 disabled:opacity-50"
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
                    className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20" : "bg-white/40 border-gray-200/30"} rounded-2xl border p-6`}
                  >
                    {/* Post Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full border-2 border-[#ff9ec6]/20"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{post.author.name}</h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              post.author.role === "Mentor"
                                ? "bg-[#ff9ec6]/20 text-[#ff9ec6]"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {post.author.role}
                          </span>
                        </div>
                        <p className={`text-sm ${mutedTextClass}`}>
                          {post.author.field} • {post.timestamp}
                        </p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="whitespace-pre-line mb-4">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full rounded-xl max-h-96 object-cover"
                        />
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800/20">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLikePost(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            post.liked ? "text-red-500" : mutedTextClass
                          } hover:text-red-500`}
                        >
                          <Heart className={`h-5 w-5 ${post.liked ? "fill-current" : ""}`} />
                          <span>{post.likes}</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPost(post)
                            setShowCommentModal(true)
                          }}
                          className={`flex items-center space-x-2 ${mutedTextClass} hover:${textClass} transition-colors`}
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments.length}</span>
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
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
                    src="/placeholder.svg?height=32&width=32&text=JD"
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
                      src="/placeholder.svg?height=40&width=40&text=JD"
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full border-2 border-[#ff9ec6]/20"
                    />
                    <div>
                      <h4 className="font-semibold">{profileData.name}</h4>
                      <p className={`text-sm ${mutedTextClass}`}>Mentee</p>
                    </div>
                  </div>

                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="What's on your mind? Share your startup journey, ask questions, or celebrate wins!"
                    rows={6}
                    className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl resize-none border-0 focus:ring-2 focus:ring-[#ff9ec6]/20`}
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

      {/* Filter Modal and Profile Modal remain the same as before */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFilterModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg backdrop-blur-xl ${isDarkMode ? "bg-gray-900/95 border-gray-800/50" : "bg-white/95 border-gray-200/50"} rounded-3xl border shadow-2xl`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800/20">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"}`}>
                    <Filter className="h-5 w-5 text-[#ff9ec6]" />
                  </div>
                  <h3 className="text-2xl font-bold">Filter Mentors</h3>
                </div>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"} transition-colors`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Rating Filter */}
                <div>
                  <label className=" text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Star className="h-5 w-5 text-[#ff9ec6]" />
                    <span>Minimum Rating</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <StarRating
                      rating={filters.rating}
                      onRatingChange={(rating) =>
                        setFilters((prev) => ({ ...prev, rating: rating === prev.rating ? 0 : rating }))
                      }
                      interactive={true}
                    />
                    <span className={`text-sm ${mutedTextClass}`}>
                      {filters.rating > 0 ? `${filters.rating}+ stars` : "Any rating"}
                    </span>
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className=" text-lg font-semibold mb-4 flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-[#ff9ec6]" />
                    <span>Price Range (per hour)</span>
                  </label>
                  <div className="space-y-6">
                    {/* Range Slider */}
                    <div className="relative px-2">
                      <div className="relative h-2">
                        {/* Track */}
                        <div
                          className={`absolute w-full h-2 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                        ></div>

                        {/* Active range */}
                        <div
                          className="absolute h-2 bg-gradient-to-r from-[#ff9ec6] to-[#ff9ec6]/80 rounded-lg transition-all duration-200"
                          style={{
                            left: `${(filters.priceRange[0] / 100000) * 100}%`,
                            width: `${((filters.priceRange[1] - filters.priceRange[0]) / 100000) * 100}%`,
                          }}
                        ></div>

                        {/* Min slider - invisible but functional */}
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="250"
                          value={filters.priceRange[0]}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: [value, Math.max(value, prev.priceRange[1])],
                            }))
                          }}
                          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10 opacity-0"
                        />

                        {/* Max slider - invisible but functional */}
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="250"
                          value={filters.priceRange[1]}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: [Math.min(prev.priceRange[0], value), value],
                            }))
                          }}
                          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-20 opacity-0"
                        />

                        {/* Min thumb - draggable */}
                        <div
                          className="absolute w-6 h-6 bg-[#ff9ec6] border-3 border-white rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 z-30 hover:scale-110 transition-all duration-200 active:scale-125"
                          style={{
                            left: `${(filters.priceRange[0] / 100000) * 100}%`,
                            top: "50%",
                          }}
                        >
                          {/* Inner dot for better visual feedback */}
                          <div className="absolute inset-1 bg-white rounded-full opacity-80"></div>
                        </div>

                        {/* Max thumb - draggable */}
                        <div
                          className="absolute w-6 h-6 bg-[#ff9ec6] border-3 border-white rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 z-30 hover:scale-110 transition-all duration-200 active:scale-125"
                          style={{
                            left: `${(filters.priceRange[1] / 100000) * 100}%`,
                            top: "50%",
                          }}
                        >
                          {/* Inner dot for better visual feedback */}
                          <div className="absolute inset-1 bg-white rounded-full opacity-80"></div>
                        </div>
                      </div>

                      {/* Input Fields with Price Display */}
                      <div className="grid grid-cols-2 gap-4 leading-8 my-5 mb-0">
                        <div>
                          <Label className={`text-sm ${mutedTextClass} mb-2 block`}>Minimum</Label>
                          <div className="relative">
                            <span
                              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ff9ec6] font-semibold`}
                            >
                              ₹
                            </span>
                            <Input
                              type="number"
                              placeholder="0"
                              value={filters.priceRange[0]}
                              onChange={(e) =>
                                setFilters((prev) => ({
                                  ...prev,
                                  priceRange: [
                                    Number.parseInt(e.target.value) || 0,
                                    Math.max(Number.parseInt(e.target.value) || 0, prev.priceRange[1]),
                                  ],
                                }))
                              }
                              className={`pl-8 ${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
                            />
                          </div>
                        </div>
                        <div>
                          <Label className={`text-sm ${mutedTextClass} mb-2 block`}>Maximum</Label>
                          <div className="relative">
                            <span
                              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ff9ec6] font-semibold`}
                            >
                              ₹
                            </span>
                            <Input
                              type="number"
                              placeholder="100000"
                              value={filters.priceRange[1]}
                              onChange={(e) =>
                                setFilters((prev) => ({
                                  ...prev,
                                  priceRange: [
                                    Math.min(prev.priceRange[0], Number.parseInt(e.target.value) || 100000),
                                    Number.parseInt(e.target.value) || 100000,
                                  ],
                                }))
                              }
                              className={`pl-8 ${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between p-6 border-t border-gray-800/20">
                <Button
                  onClick={handleFilterReset}
                  variant="outline"
                  className={`${isDarkMode ? "border-gray-700/50 hover:bg-gray-800/50" : "border-gray-300/50 hover:bg-gray-100/50"} rounded-xl px-6 text-black`}
                >
                  Reset
                </Button>
                <Button
                  onClick={handleFilterApply}
                  className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-8"
                >
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Edit Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl backdrop-blur-xl ${isDarkMode ? "bg-gray-900/95 border-gray-800/50" : "bg-white/95 border-gray-200/50"} rounded-3xl border shadow-2xl max-h-[90vh] overflow-y-auto`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800/20">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"}`}>
                    <Edit3 className="h-5 w-5 text-[#ff9ec6]" />
                  </div>
                  <h3 className="text-2xl font-bold">Edit Profile</h3>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"} transition-colors`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Picture */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src="/placeholder.svg?height=100&width=100&text=JD"
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-[#ff9ec6]/20"
                    />
                    <button className="absolute bottom-0 right-0 bg-[#ff9ec6] text-black p-2 rounded-full hover:bg-[#ff9ec6]/90 transition-colors">
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-[#ff9ec6]" />
                      <span>Full Name</span>
                    </Label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                      className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
                    />
                  </div>

                  <div>
                    <Label className="flex items-center space-x-2 mb-2">
                      <Mail className="h-4 w-4 text-[#ff9ec6]" />
                      <span>Email</span>
                    </Label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                      className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
                    />
                  </div>

                  <div>
                    <Label className="flex items-center space-x-2 mb-2">
                      <Briefcase className="h-4 w-4 text-[#ff9ec6]" />
                      <span>Company</span>
                    </Label>
                    <Input
                      value={profileData.company}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, company: e.target.value }))}
                      className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
                    />
                  </div>
                </div>

                <div>
                  <Label className="flex items-center space-x-2 mb-2">
                    <Edit3 className="h-4 w-4 text-[#ff9ec6]" />
                    <span>Bio</span>
                  </Label>
                  <Textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl resize-none`}
                    placeholder="Tell us about yourself and your goals..."
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-4 p-6 border-t border-gray-800/20">
                <Button
                  onClick={() => setShowProfileModal(false)}
                  variant="outline"
                  className={`${isDarkMode ? "border-gray-700/50 hover:bg-gray-800/50" : "border-gray-300/50 hover:bg-gray-100/50"} rounded-xl px-6`}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleProfileSave}
                  className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-8"
                >
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className={`py-12 border-t ${isDarkMode ? "border-gray-900/50" : "border-gray-200/50"} mt-16`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-[#ff9ec6] mb-4 md:mb-0 hover:text-[#ff9ec6]/80 transition-colors"
            >
              Foundertalk
            </Link>

            <div className={`text-center md:text-right ${mutedTextClass} text-sm`}>
              <p>© {new Date().getFullYear()} Foundertalk. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
