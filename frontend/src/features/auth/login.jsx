import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom" 
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentUser, setToken } from "@/redux/slice/userslice"
import { useEffect } from "react";
export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const dispatch=useDispatch()
  const navigate = useNavigate()
  const bgClass = isDarkMode ? "bg-black" : "bg-white"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"
  const user = useSelector((state) => state.user.user);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  useEffect(() => {
  if (user) {
    if (user.role === "mentee") {
      navigate("/dashboard/mentee");
    } else if (user.role === "mentor") {
      navigate("/dashboard/mentor");
    }
  }
}, [user, navigate]);


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await axios.post("http://localhost:3000/user/signin", {
      email: formData.email,
      password: formData.password,
    });

    const token = res.data.token;
    const role = res.data.role;

    if (!token || !role) {
      throw new Error("Invalid login response: missing token or role");
    }

    // ✅ Save only token
    dispatch(setToken(token));

    // ✅ Fetch user from token and save to Redux
    await dispatch(fetchCurrentUser());

    // ✅ Redirect by role
    if (role === "mentee") {
      navigate("/dashboard/mentee");
    } else if (role === "mentor") {
      navigate("/dashboard/mentor");
    } else {
      alert("Unknown user role");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
    console.error("Login error:", err);
  } finally {
    setIsLoading(false);
  }
};




  return (
    <div className={`min-h-screen ${bgClass} ${textClass} relative overflow-hidden transition-colors duration-300`}>
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 -left-4 w-96 h-96 bg-[#ff9ec6] rounded-full mix-blend-multiply filter blur-3xl ${isDarkMode ? "opacity-5" : "opacity-10"} animate-blob`} />
        <div className={`absolute top-0 -right-4 w-96 h-96 bg-[#ff9ec6] rounded-full mix-blend-multiply filter blur-3xl ${isDarkMode ? "opacity-5" : "opacity-10"} animate-blob animation-delay-2000`} />
        <div className={`absolute -bottom-8 left-20 w-96 h-96 bg-[#ff9ec6] rounded-full mix-blend-multiply filter blur-3xl ${isDarkMode ? "opacity-5" : "opacity-10"} animate-blob animation-delay-4000`} />
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,158,198,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,158,198,0.02)_1px,transparent_1px)] bg-[size:60px_60px]`} />
        <div className={`absolute inset-0 ${isDarkMode ? "bg-gradient-radial from-transparent via-black/50 to-black" : "bg-gradient-radial from-transparent via-white/50 to-white"}`} />
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

      {/* Login Card */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`w-full max-w-md backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20" : "bg-white/40 border-gray-200/30"} rounded-3xl p-8 border`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className={mutedTextClass}>Sign in to your Foundertalk account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl py-3 font-semibold group"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && (
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className={mutedTextClass}>
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#ff9ec6] hover:text-[#ff9ec6]/80 transition-colors font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
