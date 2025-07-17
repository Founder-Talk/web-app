import { useState, useMemo } from "react"
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
    return mentorData.filter((mentor) => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      <Nav />

      {/* Welcome Section */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b ${borderClass}`}>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {profileData.name}! 👋</h1>
        <p className={`${mutedTextClass}`}>Find expert mentors and connect with the startup community</p>
      </div>

      {/* Main Content */}
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
