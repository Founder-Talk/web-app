import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Users, GraduationCap, Check, Star, Zap, Shield, User, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"



export default function SignupPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedRole, setSelectedRole] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    yearsOfExperience: "",
    startupCompany: "",
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

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        company:
          selectedRole === "mentor"
            ? formData.company
            : formData.startupCompany,
        experience:
          selectedRole === "mentor"
            ? Number(formData.yearsOfExperience)
            : 0,
      }

      const res = await axios.post("http://localhost:3000/user/signup", payload)
      localStorage.setItem("token", res.data.token)

      if (res.data.role === "mentee") {
        navigate("/dashboard/mentee")
      } else if (res.data.role === "mentor") {
        navigate("/dashboard/mentor")
      } else {
        alert("Unknown user role")
      }
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message)
      alert(err.response?.data?.message || "Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      yearsOfExperience: "",
      startupCompany: "",
      password: "",
      confirmPassword: "",
    })
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
          <Link to="/" className="flex items-center space-x-3 group">
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
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`w-full max-w-lg backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20" : "bg-white/40 border-gray-200/30"} rounded-3xl p-8 border`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Join Foundertalk</h1>
            <p className={`${mutedTextClass}`}>Create your account and start connecting</p>
          </div>

          {/* Role Selection */}
          {!selectedRole && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-center mb-6">Choose your role</h2>

              <button
                onClick={() => handleRoleSelect("mentee")}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 ${isDarkMode ? "border-gray-700 hover:border-[#ff9ec6] bg-gray-800/30 hover:bg-gray-800/50" : "border-gray-300 hover:border-[#ff9ec6] bg-white/30 hover:bg-white/50"} group`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} group-hover:bg-[#ff9ec6]/20 transition-colors`}
                  >
                    <User className="h-6 w-6 text-[#ff9ec6]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">I'm a Mentee</h3>
                    <p className={`${mutedTextClass} text-sm`}>Looking for guidance and mentorship</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect("mentor")}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 ${isDarkMode ? "border-gray-700 hover:border-[#ff9ec6] bg-gray-800/30 hover:bg-gray-800/50" : "border-gray-300 hover:border-[#ff9ec6] bg-white/30 hover:bg-white/50"} group`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} group-hover:bg-[#ff9ec6]/20 transition-colors`}
                  >
                    <Users className="h-6 w-6 text-[#ff9ec6]" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">I'm a Mentor</h3>
                    <p className={`${mutedTextClass} text-sm`}>Ready to share my experience and help others</p>
                  </div>
                </div>
              </button>
            </motion.div>
          )}

          {/* Form */}
          {selectedRole && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {selectedRole === "mentor" ? "Mentor" : "Mentee"} Registration
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedRole("")}
                  className={`text-sm ${mutedTextClass} hover:text-[#ff9ec6] transition-colors`}
                >
                  Change role
                </button>
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className={`block text-sm font-medium ${textClass} mb-2`}>
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-[#ff9ec6] focus:border-transparent transition-all`}
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className={`block text-sm font-medium ${textClass} mb-2`}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-[#ff9ec6] focus:border-transparent transition-all`}
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${textClass} mb-2`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-[#ff9ec6] focus:border-transparent transition-all`}
                  placeholder="Enter your email"
                />
              </div>

              {/* Role-specific fields */}
              {selectedRole === "mentor" ? (
                <>
                  {/* Company */}
                  <div>
                    <label htmlFor="company" className={`block text-sm font-medium ${textClass} mb-2`}>
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-[#ff9ec6] focus:border-transparent transition-all`}
                      placeholder="Your company name"
                    />
                  </div>
                  {/* Years of Experience */}
                  <div>
                    <label htmlFor="yearsOfExperience" className={`block text-sm font-medium ${textClass} mb-2`}>
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-[#ff9ec6] focus:border-transparent transition-all`}
                      placeholder="Years of experience"
                    />
                  </div>
                </>
              ) : (
                /* Startup/Company for Mentee */
                <div>
                  <label htmlFor="startupCompany" className={`block text-sm font-medium ${textClass} mb-2`}>
                    Startup/Company
                  </label>
                  <input
                    type="text"
                    id="startupCompany"
                    name="startupCompany"
                    value={formData.startupCompany}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-[#ff9ec6] focus:border-transparent transition-all`}
                    placeholder="Your startup or company name"
                  />
                </div>
              )}

              {/* Password */}
              <div>
                <label htmlFor="password" className={`block text-sm font-medium ${textClass} mb-2`}>
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 pr-12 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-[#ff9ec6] focus:border-transparent transition-all`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${mutedTextClass} hover:text-[#ff9ec6] transition-colors`}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className={`block text-sm font-medium ${textClass} mb-2`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 pr-12 rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 text-white placeholder-gray-400" : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-[#ff9ec6] focus:border-transparent transition-all`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${mutedTextClass} hover:text-[#ff9ec6] transition-colors`}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl py-3 font-semibold group"
              >
                Create Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.form>
          )}

          {selectedRole && (
            <div className="mt-8 text-center">
              <p className={`${mutedTextClass}`}>
                Already have an account?{" "}
                <Link to="/login" className="text-[#ff9ec6] hover:text-[#ff9ec6]/80 transition-colors font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}