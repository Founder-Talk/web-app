import { useState, useMemo, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, BookOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

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
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState("")
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      setLoadingMentors(true)
      setMentorError("")
      try {
        const res = await axios.get("http://localhost:3000/user/mentors", { params: { limit: 100 } })
        setMentors(res.data.mentors)
      } catch (err) {
        setMentorError("Failed to load mentors.")
      } finally {
        setLoadingMentors(false)
      }
    }
    fetchMentors()
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true)
      setPostsError("")
      try {
        const res = await axios.get("http://localhost:3000/posts")
        // Transform posts here:
        const mappedPosts = (res.data || []).map(post => ({
          id: post._id,
          author: {
            name: post.user?.name || "Unknown",
            avatar: post.user?.profilePic || "/placeholder.svg",
            role: post.user?.role || "Mentee",
            field: post.user?.field || "",
          },
          content: post.content,
          image: post.post,
          likes: post.likes?.length || 0,
          liked: false, // You can set this based on current user
          comments: (post.comments || []).map((c, i) => ({
            id: i + 1,
            author: c.name,
            avatar: c.profilePic || "/placeholder.svg",
            content: c.text,
            timestamp: c.createdAt ? new Date(c.createdAt).toLocaleString() : "",
          })),
          timestamp: post.createdAt ? new Date(post.createdAt).toLocaleString() : "",
        }))
        setPosts(mappedPosts)
      } catch (err) {
        setPostsError("Failed to load community posts.")
      } finally {
        setLoadingPosts(false)
      }
    }
    fetchPosts()
  }, [])

  const bgClass = isDarkMode ? "bg-gray-950" : "bg-gray-50"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"
  const cardBgClass = isDarkMode ? "bg-gray-900/50" : "bg-white/80"
  const borderClass = isDarkMode ? "border-gray-800/50" : "border-gray-200/50"

  const filteredMentors = useMemo(() => {
    return (mentors || []).filter((mentor) => {
      const matchesSearch =
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (mentor.bio || "").toLowerCase().includes(searchQuery.toLowerCase())

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
                        {currentMentors.map((mentor, index) => (
                          <MentorCard
                            key={mentor._id || mentor.id || index}
                            mentor={mentor}
                            index={index}
                            onSelect={() => setSelectedMentor(mentor)}
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
                  {loadingPosts ? (
                    <div className="text-center py-8">Loading community posts...</div>
                  ) : postsError ? (
                    <div className="text-center py-8 text-red-500">{postsError}</div>
                  ) : (
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
                  )}
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
