import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"

// Import components
import MentorCard from "./mentorCard"
import MentorProfile from "./MentorProfile"
import CommunityFeed from "../community/CommunityFeed"
import SearchAndFilter from "./SearchAndFilter"
import Nav from "@/components/common/nav/nav"
import Footer from '@/components/common/foot/foot'
export default function MenteeDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState("mentors") // "mentors" or "feed"
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const profileData = useSelector((state) => state.user.user);
  const [filters, setFilters] = useState({
    rating: 0,
    priceRange: [0, 100000],
    field: "",
    experience: "",
    availability: "",
  })



  // Mock mentor data
  const mentorData = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    name: `Mentor ${i + 1}`,
    field: ["Tech Startup", "E-commerce", "SaaS", "FinTech", "HealthTech"][i % 5],
    caption: "Helping founders scale their startups with proven strategies and insights.",
    fullDescription: `I'm a seasoned entrepreneur with over ${5 + (i % 10)} years of experience in building and scaling startups. I've successfully founded ${1 + (i % 3)} companies, with my latest venture being acquired by a Fortune 500 company.

My expertise spans across product development, go-to-market strategies, fundraising, and team building. I've helped over ${50 + i * 10}+ founders navigate the challenging startup journey, from ideation to IPO.

What I can help you with:
• Product-market fit validation
• Fundraising strategies and investor relations
• Scaling operations and team building
• Go-to-market planning and execution
• Strategic partnerships and business development
• Exit strategies and M&A preparation`,
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
    price: Math.floor(Math.random() * 500) + 100, // $100-600
    image: null,
    profilePic: `/placeholder.svg?height=100&width=100&text=${String.fromCharCode(65 + (i % 26))}`,
    experience: `${Math.floor(Math.random() * 10) + 5}+ years`,
    companiesHelped: `${Math.floor(Math.random() * 200) + 50}+`,
    successRate: `${Math.floor(Math.random() * 10) + 90}%`,
    location: ["San Francisco, CA", "New York, NY", "London, UK", "Berlin, Germany", "Singapore"][i % 5],
    languages: ["English", "Spanish", "French", "German", "Mandarin"].slice(0, Math.floor(Math.random() * 3) + 1),
    responseTime: ["Within 1 hour", "Within 2 hours", "Within 4 hours"][i % 3],
    totalSessions: Math.floor(Math.random() * 500) + 100,
    expertise: ["Product Development", "Fundraising", "Team Building", "Go-to-Market", "Strategic Partnerships"].slice(
      0,
      Math.floor(Math.random() * 3) + 2,
    ),
    availability: ["Available now", "Available this week", "Booking 1 week ahead"][i % 3],
    posts: [
      {
        id: 1,
        content: `Just helped another startup raise their Series A! 🚀 Key lesson: Focus on your unit economics and show clear path to profitability.`,
        likes: Math.floor(Math.random() * 50) + 10,
        comments: [],
        timestamp: "2 hours ago",
      },
    ],
  }))

  // Mock community posts
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
        name: "Emily Watson",
        avatar: "/placeholder.svg?height=40&width=40&text=EW",
        role: "Mentee",
        field: "SaaS Startup",
      },
      content:
        "Finally launched our MVP! 🎉 Thanks to all the mentors who helped guide us through the product development process. The feedback has been incredible so far. Next milestone: 1000 users!",
      likes: 67,
      comments: [
        {
          id: 1,
          author: "Sarah Chen",
          avatar: "/placeholder.svg?height=30&width=30&text=SC",
          content: "Congratulations! What's your user acquisition strategy?",
          timestamp: "2 hours ago",
        },
      ],
      timestamp: "4 hours ago",
      liked: true,
    },
  ])

  const bgClass = isDarkMode ? "bg-gray-950" : "bg-gray-50"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"
  const cardBgClass = isDarkMode ? "bg-gray-900/50" : "bg-white/80"
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200/50"

  // Filter mentors based on search query and filters
  const filteredMentors = useMemo(() => {
    return mentorData.filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.field.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRating = filters.rating === 0 || mentor.rating >= filters.rating
      const matchesPrice = mentor.price >= filters.priceRange[0] && mentor.price <= filters.priceRange[1]
      const matchesField = !filters.field || mentor.field === filters.field
      const matchesExperience = !filters.experience || mentor.experience.includes(filters.experience)
      const matchesAvailability = !filters.availability || mentor.availability === filters.availability

      return matchesSearch && matchesRating && matchesPrice && matchesField && matchesExperience && matchesAvailability
    })
  }, [searchQuery, filters, mentorData])

  const postsPerPage = 12
  const totalPages = Math.ceil(filteredMentors.length / postsPerPage)
  const currentMentors = filteredMentors.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor)
  }

  const handleBackToMentors = () => {
    setSelectedMentor(null)
  }

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (

    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      <Nav />

      {/* Welcome Section */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b ${borderClass}`}>
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Welcome back, {profileData.name}! 👋</h1>
          <p className={`${mutedTextClass} text-base md:text-lg`}>
            Find expert mentors and connect with the startup community
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Show mentor profile if selected */}
        {selectedMentor ? (
          <MentorProfile
            mentor={selectedMentor}
            onBack={handleBackToMentors}
            isDarkMode={isDarkMode}
            textClass={textClass}
            mutedTextClass={mutedTextClass}
            cardBgClass={cardBgClass}
            borderClass={borderClass}
          />
        ) : (
          <>
            {/* Section Navigation */}
            <div className="py-6">
              <div
                className={`inline-flex items-center p-1 ${cardBgClass} rounded-lg backdrop-blur-xl border ${borderClass}`}
              >
                <button
                  onClick={() => setActiveSection("mentors")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeSection === "mentors"
                    ? "bg-[#ff9ec6] text-black shadow-sm"
                    : `${mutedTextClass} hover:${textClass}`
                    }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Find Mentors</span>
                </button>
                <button
                  onClick={() => setActiveSection("feed")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeSection === "feed"
                    ? "bg-[#ff9ec6] text-black shadow-sm"
                    : `${mutedTextClass} hover:${textClass}`
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
                  {/* Search and Filter */}
                  <SearchAndFilter
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    filters={filters}
                    onFilterApply={handleFilterApply}
                    isDarkMode={isDarkMode}
                    textClass={textClass}
                    mutedTextClass={mutedTextClass}
                    cardBgClass={cardBgClass}
                    borderClass={borderClass}
                  />

                  {/* Results count */}
                  <div className="mb-6">
                    <p className={`${mutedTextClass} text-sm`}>
                      Showing {currentMentors.length} of {filteredMentors.length} mentors
                      {searchQuery && ` for "${searchQuery}"`}
                    </p>
                  </div>

                  {/* Mentor Grid */}
                  {filteredMentors.length === 0 ? (
                    <div className="text-center py-16">
                      <div className={`text-6xl mb-4 ${mutedTextClass}`}>🔍</div>
                      <h3 className="text-2xl font-bold mb-2">No mentors found</h3>
                      <p className={`${mutedTextClass} mb-6`}>Try adjusting your search or filter criteria</p>
                      <Button
                        onClick={() => {
                          setSearchQuery("")
                          setFilters({
                            rating: 0,
                            priceRange: [0, 100000],
                            field: "",
                            experience: "",
                            availability: "",
                          })
                        }}
                        className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {currentMentors.map((mentor, index) => (
                        <MentorCard
                          key={mentor.id}
                          mentor={mentor}
                          index={index}
                          onSelect={handleMentorSelect}
                          isDarkMode={isDarkMode}
                          textClass={textClass}
                          mutedTextClass={mutedTextClass}
                          cardBgClass={cardBgClass}
                          borderClass={borderClass}
                        />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-12">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`${isDarkMode
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
                              className={`w-10 h-10 rounded-xl transition-all duration-200 ${currentPage === pageNum
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
                        className={`${isDarkMode
                          ? "border-[#ff9ec6]/30 hover:bg-[#ff9ec6]/10 hover:border-[#ff9ec6]/50 text-[#ff9ec6] disabled:border-gray-700/50 disabled:text-gray-500"
                          : "border-[#ff9ec6]/40 hover:bg-[#ff9ec6]/10 hover:border-[#ff9ec6]/60 text-[#ff9ec6] disabled:border-gray-300/50 disabled:text-gray-400"
                          } rounded-xl transition-all duration-200 disabled:hover:bg-transparent`}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

              {activeSection === "feed" && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <CommunityFeed posts={posts}
                    setPosts={setPosts}
                    profileData={profileData}
                    isDarkMode={isDarkMode}
                    textClass={textClass}
                    mutedTextClass={mutedTextClass}
                    cardBgClass={cardBgClass}
                    borderClass={borderClass}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
