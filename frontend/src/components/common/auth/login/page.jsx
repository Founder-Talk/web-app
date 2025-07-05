"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Users, GraduationCap, LogIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import axios from "axios"

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedRole, setSelectedRole] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 2000))
  //   console.log("Login submitted:", { ...formData, role: selectedRole })
  //   setIsLoading(false)
  // }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)

  try {
    const res = await axios.post("http://localhost:3000/user/signin", {
      email: formData.email,
      password: formData.password,
      role: selectedRole,  // include role here
    })

    localStorage.setItem("token", res.data.token)
    console.log("signed in");
    
    // navigate("/dashboard") // or navigate by role: /mentor or /mentee
  } catch (err) {
    alert(err.response?.data?.message || "Login failed")
    console.log(err);
    
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
                  <p className={`${mutedTextClass} text-sm`}>Trusted by 500+ founders worldwide</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 text-center"
                >
                  <Link  to ="/signup" className={`${mutedTextClass} hover:${textClass} transition-colors font-medium`}>
                    Don't have an account?{" "}
                    <span className="text-[#ff9ec6] font-semibold hover:underline">Sign up here</span>
                  </Link>
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
              className="w-full max-w-lg"
            >
              <div
                className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20" : "bg-white/40 border-gray-200/30"} rounded-3xl p-8 md:p-12 border shadow-2xl`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {selectedRole === "mentor" ? "Mentor" : "Mentee"} Login
                    </h1>
                    <p className={`${mutedTextClass} text-lg`}>
                      Welcome back! Ready to {selectedRole === "mentor" ? "mentor" : "grow"}?
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
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
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className={`${textClass} font-medium`}>
                        Password
                      </Label>
                      <a  to ="#" className="text-[#ff9ec6] hover:underline text-sm font-medium">
                        Forgot password?
                      </a>
                    </div>
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
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-[#ff9ec6] to-[#ff9ec6]/80 text-black hover:from-[#ff9ec6]/90 hover:to-[#ff9ec6]/70 rounded-xl py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <span>Sign In</span>
                          <LogIn className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-center"
                  >
                    <Link
                       to ="/signup"
                      className={`${mutedTextClass} hover:${textClass} transition-colors font-medium`}
                    >
                      Don't have an account?{" "}
                      <span className="text-[#ff9ec6] font-semibold hover:underline">Sign up here</span>
                    </Link>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
