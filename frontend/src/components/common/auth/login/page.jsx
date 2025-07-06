"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Users, GraduationCap, LogIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../../../contexts/AuthContext"

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedRole, setSelectedRole] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const bgClass = isDarkMode ? "bg-black" : "bg-white"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (error) setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Navigate to the intended page or dashboard
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} relative overflow-hidden transition-colors duration-300`}>
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 -left-4 w-96 h-96 bg-[#ff9ec6] rounded-full mix-blend-multiply filter blur-3xl ${isDarkMode ? "opacity-5" : "opacity-10"} animate-blob`}
        ></div>
        <div
          className={`absolute top-0 -right-4 w-96 h-96 bg-[#ff9ec6] rounded-full mix-blend-multiply filter blur-3xl ${isDarkMode ? "opacity-5" : "opacity-10"} animate-blob animation-delay-2000`}
        ></div>
        <div
          className={`absolute -bottom-8 left-20 w-96 h-96 bg-[#ff9ec6] rounded-full mix-blend-multiply filter blur-3xl ${isDarkMode ? "opacity-5" : "opacity-10"} animate-blob animation-delay-4000`}
        ></div>
        <div
          className={`absolute inset-0 bg-[linear-gradient(rgba(255,158,198,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,158,198,0.02)_1px,transparent_1px)] bg-[size:60px_60px]`}
        ></div>
        <div
          className={`absolute inset-0 ${isDarkMode ? "bg-gradient-radial from-transparent via-black/50 to-black" : "bg-gradient-radial from-transparent via-white/50 to-white"}`}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-50 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link  to ="/" className="flex items-center space-x-3 group">
            <motion.div whileHover={{ x: -4 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <ArrowLeft className="h-5 w-5 text-[#ff9ec6]" />
            </motion.div>
            <span className="text-2xl font-bold text-[#ff9ec6] hover:text-[#ff9ec6]/80 transition-colors">
              Foundertalk
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Role Selection */}
          {!selectedRole && (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-2xl"
            >
              <div
                className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20" : "bg-white/40 border-gray-200/30"} rounded-3xl p-8 md:p-12 border shadow-2xl`}
              >
                <div className="text-center mb-12">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[#ff9ec6] to-white bg-clip-text text-transparent"
                  >
                    Welcome Back
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`text-xl ${mutedTextClass}`}
                  >
                    Select your role to continue your journey
                  </motion.p>
                </div>

                <div className="space-y-6">
                  {/* Mentor Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole("mentor")}
                    className={`w-full backdrop-blur-xl ${isDarkMode ? "bg-gradient-to-r from-gray-800/40 to-gray-900/40 border-gray-700/30 hover:border-[#ff9ec6]/40" : "bg-gradient-to-r from-white/60 to-gray-50/60 border-gray-300/40 hover:border-[#ff9ec6]/40"} rounded-2xl p-6 border transition-all duration-500 text-left group relative overflow-hidden`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff9ec6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"} group-hover:bg-[#ff9ec6]/20 transition-all duration-300 group-hover:scale-110`}
                        >
                          <GraduationCap className="h-6 w-6 text-[#ff9ec6]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">Continue as Mentor</h3>
                          <p className={`${mutedTextClass} text-sm`}>Access your mentor dashboard and sessions</p>
                        </div>
                      </div>
                    </div>
                  </motion.button>

                  {/* Mentee Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole("mentee")}
                    className={`w-full backdrop-blur-xl ${isDarkMode ? "bg-gradient-to-r from-gray-800/40 to-gray-900/40 border-gray-700/30 hover:border-[#ff9ec6]/40" : "bg-gradient-to-r from-white/60 to-gray-50/60 border-gray-300/40 hover:border-[#ff9ec6]/40"} rounded-2xl p-6 border transition-all duration-500 text-left group relative overflow-hidden`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ff9ec6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"} group-hover:bg-[#ff9ec6]/20 transition-all duration-300 group-hover:scale-110`}
                        >
                          <Users className="h-6 w-6 text-[#ff9ec6]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">Continue as Mentee</h3>
                          <p className={`${mutedTextClass} text-sm`}>Find mentors and book sessions</p>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 text-center"
                >
                  <p className={`${mutedTextClass} text-sm`}>
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-[#ff9ec6] hover:text-[#ff9ec6]/80 transition-colors font-medium">
                      Sign up here
                    </Link>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          {selectedRole && (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              <div
                className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20" : "bg-white/40 border-gray-200/30"} rounded-3xl p-8 border shadow-2xl`}
              >
                <div className="text-center mb-8">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-[#ff9ec6] to-white bg-clip-text text-transparent"
                  >
                    Sign In
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`${mutedTextClass} text-sm`}
                  >
                    Welcome back as a {selectedRole}
                  </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className={`text-sm font-medium ${textClass}`}>
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className={`mt-1 ${isDarkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"} border focus:border-[#ff9ec6] focus:ring-[#ff9ec6]`}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className={`text-sm font-medium ${textClass}`}>
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className={`pr-10 ${isDarkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"} border focus:border-[#ff9ec6] focus:ring-[#ff9ec6]`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                    >
                      <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#ff9ec6] hover:bg-[#ff9ec6]/90 text-black font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <LogIn className="h-5 w-5 mr-2" />
                        Sign In
                      </div>
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setSelectedRole(null)}
                    className={`text-sm ${mutedTextClass} hover:text-[#ff9ec6] transition-colors`}
                  >
                    ← Back to role selection
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
