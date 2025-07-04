"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Users, GraduationCap, Check, Star, Zap, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

export default function SignupPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedRole, setSelectedRole] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    experience: "",
  })

  const bgClass = isDarkMode ? "bg-black" : "bg-white"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Form submitted:", { ...formData, role: selectedRole })
    setIsLoading(false)
  }

  const roleFeatures = {
    mentor: [
      { icon: Star, text: "Build your personal brand" },
      { icon: Zap, text: "Flexible scheduling" },
      { icon: Shield, text: "Secure payments" },
    ],
    mentee: [
      { icon: Users, text: "Expert mentor matching" },
      { icon: Zap, text: "Accelerated growth" },
      { icon: Shield, text: "Quality guaranteed" },
    ],
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
              className="w-full max-w-4xl"
            >
              <div
                className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20" : "bg-white/40 border-gray-200/30"} rounded-3xl p-8 md:p-12 border shadow-2xl`}
              >
                <div className="text-center mb-12">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#ff9ec6] to-white bg-clip-text text-transparent"
                  >
                    Join Foundertalk
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`text-xl md:text-2xl ${mutedTextClass} max-w-2xl mx-auto`}
                  >
                    Choose your path and start your journey with the startup community
                  </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Mentor Card */}
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole("mentor")}
                    className={`backdrop-blur-xl ${isDarkMode ? "bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-700/30 hover:border-[#ff9ec6]/40" : "bg-gradient-to-br from-white/60 to-gray-50/60 border-gray-300/40 hover:border-[#ff9ec6]/40"} rounded-3xl p-8 border transition-all duration-500 text-left group relative overflow-hidden`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff9ec6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-4 rounded-2xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"} group-hover:bg-[#ff9ec6]/20 transition-all duration-300 group-hover:scale-110`}
                          >
                            <GraduationCap className="h-8 w-8 text-[#ff9ec6]" />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold">I'm a Mentor</h3>
                            <p className="text-[#ff9ec6] font-semibold">Share your expertise</p>
                          </div>
                        </div>
                      </div>

                      <p className={`${mutedTextClass} leading-relaxed mb-6 text-lg`}>
                        Guide the next generation of founders and monetize your experience through personalized
                        mentoring sessions.
                      </p>

                      <div className="space-y-3">
                        {roleFeatures.mentor.map((feature, index) => {
                          const IconComponent = feature.icon
                          return (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="p-1 rounded-full bg-[#ff9ec6]/20">
                                <IconComponent className="h-4 w-4 text-[#ff9ec6]" />
                              </div>
                              <span className={`${mutedTextClass} font-medium`}>{feature.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.button>

                  {/* Mentee Card */}
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole("mentee")}
                    className={`backdrop-blur-xl ${isDarkMode ? "bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-700/30 hover:border-[#ff9ec6]/40" : "bg-gradient-to-br from-white/60 to-gray-50/60 border-gray-300/40 hover:border-[#ff9ec6]/40"} rounded-3xl p-8 border transition-all duration-500 text-left group relative overflow-hidden`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff9ec6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-4 rounded-2xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"} group-hover:bg-[#ff9ec6]/20 transition-all duration-300 group-hover:scale-110`}
                          >
                            <Users className="h-8 w-8 text-[#ff9ec6]" />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold">I'm a Mentee</h3>
                            <p className="text-[#ff9ec6] font-semibold">Accelerate your growth</p>
                          </div>
                        </div>
                      </div>

                      <p className={`${mutedTextClass} leading-relaxed mb-6 text-lg`}>
                        Connect with experienced founders who've built successful companies and get personalized
                        guidance for your startup journey.
                      </p>

                      <div className="space-y-3">
                        {roleFeatures.mentee.map((feature, index) => {
                          const IconComponent = feature.icon
                          return (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="p-1 rounded-full bg-[#ff9ec6]/20">
                                <IconComponent className="h-4 w-4 text-[#ff9ec6]" />
                              </div>
                              <span className={`${mutedTextClass} font-medium`}>{feature.text}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Signup Form */}
          {selectedRole && (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-2xl"
            >
              <div
                className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20" : "bg-white/40 border-gray-200/30"} rounded-3xl p-8 md:p-12 border shadow-2xl`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      Create your {selectedRole === "mentor" ? "Mentor" : "Mentee"} account
                    </h1>
                    <p className={`${mutedTextClass} text-lg`}>
                      {selectedRole === "mentor"
                        ? "Start sharing your expertise and building your personal brand"
                        : "Begin your journey with expert guidance from successful founders"}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedRole(null)}
                    className={`${mutedTextClass} hover:${textClass} transition-colors text-sm font-medium px-4 py-2 rounded-full border ${isDarkMode ? "border-gray-700/50 hover:border-gray-600/50" : "border-gray-300/50 hover:border-gray-400/50"}`}
                  >
                    Change role
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="firstName" className={`${textClass} font-medium`}>
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-[#ff9ec6]/50" : "bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500 focus:border-[#ff9ec6]/50"} backdrop-blur-sm h-12 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-[#ff9ec6]/20`}
                        placeholder="John"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="lastName" className={`${textClass} font-medium`}>
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-[#ff9ec6]/50" : "bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500 focus:border-[#ff9ec6]/50"} backdrop-blur-sm h-12 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-[#ff9ec6]/20`}
                        placeholder="Doe"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="email" className={`${textClass} font-medium`}>
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-[#ff9ec6]/50" : "bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500 focus:border-[#ff9ec6]/50"} backdrop-blur-sm h-12 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-[#ff9ec6]/20`}
                      placeholder="john@example.com"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="company" className={`${textClass} font-medium`}>
                      {selectedRole === "mentor" ? "Current Company" : "Company/Startup"}
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-[#ff9ec6]/50" : "bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500 focus:border-[#ff9ec6]/50"} backdrop-blur-sm h-12 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-[#ff9ec6]/20`}
                      placeholder={selectedRole === "mentor" ? "Your company" : "Your startup"}
                    />
                  </motion.div>

                  {selectedRole === "mentor" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="experience" className={`${textClass} font-medium`}>
                        Years of Experience
                      </Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        required
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-[#ff9ec6]/50" : "bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500 focus:border-[#ff9ec6]/50"} backdrop-blur-sm h-12 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-[#ff9ec6]/20`}
                        placeholder="5"
                        min="1"
                      />
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="password" className={`${textClass} font-medium`}>
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-[#ff9ec6]/50" : "bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500 focus:border-[#ff9ec6]/50"} backdrop-blur-sm h-12 rounded-xl pr-12 transition-all duration-300 focus:ring-2 focus:ring-[#ff9ec6]/20`}
                          placeholder="••••••••"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${mutedTextClass} hover:${textClass} transition-colors p-1 rounded-full`}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </motion.button>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="confirmPassword" className={`${textClass} font-medium`}>
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`${isDarkMode ? "bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-[#ff9ec6]/50" : "bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500 focus:border-[#ff9ec6]/50"} backdrop-blur-sm h-12 rounded-xl pr-12 transition-all duration-300 focus:ring-2 focus:ring-[#ff9ec6]/20`}
                          placeholder="••••••••"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${mutedTextClass} hover:${textClass} transition-colors p-1 rounded-full`}
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#ff9ec6] to-[#ff9ec6]/80 text-black hover:from-[#ff9ec6]/90 hover:to-[#ff9ec6]/70 rounded-xl py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <span>Create Account</span>
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.48 }}
                    className="text-center"
                  >
                    <Link
                       to ="/login"
                      className={`${mutedTextClass} hover:${textClass} transition-colors font-medium`}
                    >
                      Already have an account?{" "}
                      <span className="text-[#ff9ec6] font-semibold hover:underline">Sign in</span>
                    </Link>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`text-center text-sm ${mutedTextClass}`}
                  >
                    By signing up, you agree to our{" "}
                    <a  to ="#" className="text-[#ff9ec6] hover:underline font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a  to ="#" className="text-[#ff9ec6] hover:underline font-medium">
                      Privacy Policy
                    </a>
                  </motion.p>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}