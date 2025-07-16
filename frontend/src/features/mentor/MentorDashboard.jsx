"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { User, Moon, Sun, ChevronDown, LogOut, MessageCircle, Menu, DollarSign, CheckCircle, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import MentorProfile from "./MentorProfile"
import CommunityFeed from "../community/CommunityFeed"
import { useDispatch, useSelector } from "react-redux"
import { clearUser } from "@/redux/slice/userslice"
import Nav from "@/components/common/nav/nav"
import Analytics from "./Analytics"

export default function MentorDashboard() {
 const isDarkMode = useSelector((state) => state.theme.mode === "light");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showProfileCompletionModal, setShowProfileCompletionModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeTab, setActiveTab] = useState("community")
  const dispatch=useDispatch()

  const profileData =useSelector((state) => state.user.user);


  // Mock mentor analytics data
  const mentorStats = {
    totalEarnings: 45750,
    monthlyEarnings: 12500,
    completedSessions: 115,
    thisMonthSessions: 23,
    rating: 4.9,
    totalReviews: 89,
    earningsGrowth: 15.2,
  }

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
        name: "Marcus Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40&text=MR",
        role: "Mentor",
        field: "E-commerce",
      },
      content:
        "5 key metrics every e-commerce founder should track daily:\n\n1. Customer Acquisition Cost (CAC)\n2. Lifetime Value (LTV)\n3. Conversion Rate\n4. Average Order Value\n5. Return Rate\n\nMaster these and you'll have a clear picture of your business health.",
      likes: 42,
      comments: [
        {
          id: 1,
          author: "David Kim",
          avatar: "/placeholder.svg?height=30&width=30&text=DK",
          content: "Great breakdown! How do you calculate LTV for early-stage startups?",
          timestamp: "3 hours ago",
        },
      ],
      timestamp: "1 day ago",
      liked: false,
    },
    {
      id: 3,
      author: {
        name: "Emily Watson",
        avatar: "/placeholder.svg?height=40&width=40&text=EW",
        role: "Mentor",
        field: "SaaS",
      },
      content:
        "The biggest mistake I see early-stage founders make? Trying to build everything at once. Start with ONE core feature that solves a real problem. Get that right, then expand. Focus beats features every time.",
      likes: 38,
      comments: [],
      timestamp: "3 days ago",
      liked: false,
    },
  ])

  const bgClass = isDarkMode ? "bg-black" : "bg-white"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"


  const handleProfileComplete = (data) => {
    console.log("Profile completed:", data)
    setProfileData(data)
  }

  // Current user data for community feed
  const currentUser = {
    name: profileData.name,
    avatar: "/placeholder.svg?height=48&width=48&text=SC",
    role: "Mentor",
    field: "Tech Startup",
  }
  
  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      {/* Header */}
      <Nav/>

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-b border-gray-800/20">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Welcome back, {profileData.name}! 👋</h1>
          <p className={`${mutedTextClass} text-base md:text-lg`}>
            Here's your mentoring overview and community activity
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Tab Navigation */}
        <div className="lg:hidden flex justify-center space-x-4 py-4">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6">
          {/* Community Feed - LEFT SIDE - Desktop Always Visible, Mobile Conditional */}
          <div className={`lg:col-span-8 xl:col-span-9 ${activeTab === "community" ? "block" : "hidden lg:block"}`}>
            <CommunityFeed
              posts={posts}
              setPosts={setPosts}
              currentUser={currentUser}
              isDarkMode={isDarkMode}
              textClass={textClass}
              mutedTextClass={mutedTextClass}
            />
          </div>

          {/* Analytics Sidebar - RIGHT SIDE - Desktop Always Visible, Mobile Conditional */}
          <div
            className={`lg:col-span-4 xl:col-span-3 ${
              activeTab === "analytics" ? "block" : "hidden lg:block"
            } space-y-6`}
          >
           <Analytics />

            {/* Quick Actions */}
            

            {/* Performance Tips */}
            
          </div>
        </div>
      </div>

      {/* Profile Completion Modal */}
      <MentorProfile
        showModal={showProfileCompletionModal}
        setShowModal={setShowProfileCompletionModal}
        profileData={profileData}
        
        isDarkMode={isDarkMode}
        mutedTextClass={mutedTextClass}
        onProfileComplete={handleProfileComplete}
      />

      {/* Footer */}
      <footer className={`py-12 border-t ${isDarkMode ? "border-gray-900/50" : "border-gray-200/50"} mt-16`}>
        <div className="max-w-7xl mx-auto px-4">
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
