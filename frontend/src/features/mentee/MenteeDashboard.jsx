import { useState, useMemo, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"

// Components
import MentorCard from "./mentorCard"
import MentorProfile from "./MentorProfile"
import CommunityFeed from "../community/CommunityFeed"
import SearchAndFilter from "./SearchAndFilter"
import Nav from "@/components/common/nav/nav"
import Footer from '@/components/common/foot/foot'

export default function MenteeDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeSection, setActiveSection] = useState("mentors")
  const [selectedMentor, setSelectedMentor] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const profileData = useSelector((state) => state.user.user)
  const [filters, setFilters] = useState({
    rating: 0,
    priceRange: [0, 100000],
    field: "",
    experience: "",
    availability: "",
  })
  const [mentors, setMentors] = useState([])
  const [loadingMentors, setLoadingMentors] = useState(true)
  const [mentorError, setMentorError] = useState("")

<<<<<<< HEAD
  useEffect(() => {
    const fetchMentors = async () => {
      setLoadingMentors(true)
      setMentorError("")
      try {
        const res = await axios.get("http://localhost:3000/user/mentors", { params: { limit: 100 } })
        console.log(res.data);
        
        setMentors(res.data.mentors)
      } catch (err) {
        setMentorError("Failed to load mentors.")
      } finally {
        setLoadingMentors(false)
      }
    }
    fetchMentors()
  }, [])

  // Mock community posts
=======
  const mentorData = useMemo(() =>
    Array.from({ length: 36 }, (_, i) => ({
      id: i + 1,
      name: `Mentor ${i + 1}`,
      field: ["Tech Startup", "E-commerce", "SaaS", "FinTech", "HealthTech"][i % 5],
      caption: "Helping founders scale their startups with proven strategies and insights.",
      fullDescription: `I'm a seasoned entrepreneur with over ${5 + (i % 10)} years of experience...`,
      rating: Math.floor(Math.random() * 2) + 4,
      price: Math.floor(Math.random() * 500) + 100,
      image: null,
      profilePic: `/placeholder.svg?height=100&width=100&text=${String.fromCharCode(65 + (i % 26))}`,
      experience: `${Math.floor(Math.random() * 10) + 5}+ years`,
      companiesHelped: `${Math.floor(Math.random() * 200) + 50}+`,
      successRate: `${Math.floor(Math.random() * 10) + 90}%`,
      location: ["San Francisco", "NYC", "London", "Berlin", "Singapore"][i % 5],
      languages: ["English", "Spanish", "French"].slice(0, Math.floor(Math.random() * 3) + 1),
      responseTime: ["Within 1 hour", "Within 2 hours", "Within 4 hours"][i % 3],
      totalSessions: Math.floor(Math.random() * 500) + 100,
      expertise: ["Product Dev", "Fundraising", "Go-to-Market", "Team Building", "Partnerships"].slice(0, Math.floor(Math.random() * 3) + 2),
      availability: ["Available now", "Available this week", "Booking 1 week ahead"][i % 3],
      posts: []
    })), [])

>>>>>>> b40448bbde93a46d9ae64347523755cd6cacd8d4
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { name: "Sarah Chen", avatar: "/placeholder.svg?text=SC", role: "Mentor", field: "Tech Startup" },
      content: "Just helped another startup raise their Series A!",
      image: "/placeholder.svg?text=Series+A+Tips",
      likes: 24,
      comments: [],
      timestamp: "2 hours ago",
      liked: false,
    },
    {
      id: 2,
      author: { name: "Marcus R.", avatar: "/placeholder.svg?text=MR", role: "Mentor", field: "E-commerce" },
      content: "5 key metrics every e-commerce founder should track...",
      likes: 42,
      comments: [],
      timestamp: "1 day ago",
      liked: false,
    }
  ])

  const bgClass = isDarkMode ? "bg-gray-950" : "bg-gray-50"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"
  const cardBgClass = isDarkMode ? "bg-gray-900/50" : "bg-white/80"
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200/50"

  const filteredMentors = useMemo(() => {
<<<<<<< HEAD
    return (mentors || []).filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (mentor.bio || "").toLowerCase().includes(searchQuery.toLowerCase())

=======
    return mentorData.filter((mentor) => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.field.toLowerCase().includes(searchQuery.toLowerCase())
>>>>>>> b40448bbde93a46d9ae64347523755cd6cacd8d4
      const matchesRating = filters.rating === 0 || mentor.rating >= filters.rating
      const matchesPrice = (!mentor.hourlyRate || (mentor.hourlyRate >= filters.priceRange[0] && mentor.hourlyRate <= filters.priceRange[1]))
      const matchesField = !filters.field || (mentor.domainExpertise && mentor.domainExpertise.includes(filters.field))
      const matchesExperience = !filters.experience || (mentor.experience && mentor.experience.toString().includes(filters.experience))
      // Availability filter can be customized if backend provides it
      return matchesSearch && matchesRating && matchesPrice && matchesField && matchesExperience
    })
  }, [searchQuery, filters, mentors])

  const postsPerPage = 12
  const totalPages = Math.ceil(filteredMentors.length / postsPerPage)
  const currentMentors = filteredMentors.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      <Nav />

      {/* Welcome Section */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b ${borderClass}`}>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {profileData.name}! 👋</h1>
        <p className={`${mutedTextClass}`}>Find expert mentors and connect with the startup community</p>
      </div>

      {/* Main Content */}
<<<<<<< HEAD
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loadingMentors ? (
          <div className="text-center py-8">Loading mentors...</div>
        ) : mentorError ? (
          <div className="text-center py-8 text-red-500">{mentorError}</div>
=======
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {selectedMentor ? (
          <MentorProfile
            mentor={selectedMentor}
            onBack={() => setSelectedMentor(null)}
            isDarkMode={isDarkMode}
            textClass={textClass}
            mutedTextClass={mutedTextClass}
            cardBgClass={cardBgClass}
            borderClass={borderClass}
          />
>>>>>>> b40448bbde93a46d9ae64347523755cd6cacd8d4
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="py-6">
              <div className={`inline-flex items-center p-1 ${cardBgClass} rounded-lg border ${borderClass}`}>
                <button
                  onClick={() => setActiveSection("mentors")}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${activeSection === "mentors"
                    ? "bg-[#ff9ec6] text-black shadow"
                    : `${mutedTextClass} hover:${textClass}`}`}>
                  <Users className="h-4 w-4 mr-2" />
                  Find Mentors
                </button>
                <button
                  onClick={() => setActiveSection("feed")}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${activeSection === "feed"
                    ? "bg-[#ff9ec6] text-black shadow"
                    : `${mutedTextClass} hover:${textClass}`}`}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Community Feed
                </button>
              </div>
            </div>

            {/* Section Content */}
            <AnimatePresence mode="wait">
              {activeSection === "mentors" && (
                <motion.div key="mentors" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <SearchAndFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    filters={filters}
                    onFilterApply={(f) => {
                      setFilters(f)
                      setCurrentPage(1)
                    }}
                    isDarkMode={isDarkMode}
                    textClass={textClass}
                    mutedTextClass={mutedTextClass}
                    cardBgClass={cardBgClass}
                    borderClass={borderClass}
                  />

                  {filteredMentors.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-2xl font-semibold mb-2">No mentors found</p>
                      <p className={`${mutedTextClass} mb-4`}>Try changing your search or filter</p>
                      <Button
                        className="bg-[#ff9ec6] text-black rounded-xl"
                        onClick={() => {
                          setSearchQuery("")
                          setFilters({
                            rating: 0,
                            priceRange: [0, 100000],
                            field: "",
                            experience: "",
                            availability: "",
                          })
                        }}>
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
<<<<<<< HEAD
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                      {currentMentors.map((mentor, index) => (
                        <MentorCard
                          key={mentor._id || mentor.id || index}
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
=======
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {currentMentors.map((mentor) => (
                          <MentorCard
                            key={mentor.id}
                            mentor={mentor}
                            onSelect={setSelectedMentor}
                            isDarkMode={isDarkMode}
                            textClass={textClass}
                            mutedTextClass={mutedTextClass}
                            cardBgClass={cardBgClass}
                            borderClass={borderClass}
                          />
                        ))}
>>>>>>> b40448bbde93a46d9ae64347523755cd6cacd8d4
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-6">
                          <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <Button
                              key={i}
                              variant={currentPage === i + 1 ? "default" : "outline"}
                              onClick={() => setCurrentPage(i + 1)}
                            >
                              {i + 1}
                            </Button>
                          ))}
                          <Button
                            variant="outline"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}

              {activeSection === "feed" && (
                <motion.div key="feed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <CommunityFeed
                    posts={posts}
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
