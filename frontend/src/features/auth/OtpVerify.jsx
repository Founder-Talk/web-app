"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Mail, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [status, setStatus] = useState(null) // "success" | "error" | null
  const [errorMessage, setErrorMessage] = useState("")
  const inputRefs = useRef([])

  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)
  const email = params.get("email")
  const role = params.get("role")

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 6), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
    if (status === "error") {
      setStatus(null)
      setErrorMessage("")
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, "").slice(0, 6).split("")
        const newOtp = [...otp]
        digits.forEach((digit, i) => {
          if (i < 6) newOtp[i] = digit
        })
        setOtp(newOtp)
        const nextEmpty = newOtp.findIndex((d) => !d)
        inputRefs.current[nextEmpty !== -1 ? nextEmpty : 5]?.focus()
      })
    }
  }

 const handleVerify = async () => {
  const code = otp.join("");
  if (code.length !== 6) {
    setStatus("error");
    setErrorMessage("Please enter the complete 6-digit code.");
    return;
  }

  setIsLoading(true);
  try {
    const res = await axios.post("http://localhost:3000/user/verify-email", {
      email,
      otp: code
    });

    if (res.status === 200) {
      setStatus("success");
      setTimeout(() => {
        navigate(role === "mentor" ? "/dashboard/mentor" : "/dashboard/mentee");
      }, 2000);
    }
  } catch (err) {
    setStatus("error");
    setErrorMessage(err.response?.data?.message || "Invalid OTP. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

const handleResend = async () => {
  setIsResending(true);
  setCanResend(false);
  setCountdown(60);
  setOtp(["", "", "", "", "", ""]);
  try {
    await axios.post("http://localhost:3000/user/resend-verification", {
      email
    });
  } catch (err) {
    console.error("Resend OTP error:", err);
  } finally {
    setIsResending(false);
  }
};


  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Blurred Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#ff9ec6] blur-3xl opacity-10 rounded-full animate-blob" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff9ec6] blur-3xl opacity-10 rounded-full animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-[#ff9ec6] blur-3xl opacity-10 rounded-full animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link to="/signup" className="flex items-center space-x-2 text-[#ff9ec6] hover:text-[#ff9ec6]/80 transition">
          <ArrowLeft size={20} />
          <span className="font-bold text-xl">Foundertalk</span>
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 flex justify-center items-center min-h-[calc(100vh-120px)] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-gray-900/20 backdrop-blur-lg border border-gray-700 rounded-2xl p-8"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <Mail className="text-[#ff9ec6]" size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-1">Verify Your Email</h1>
            <p className="text-gray-400 text-sm">We've sent a code to</p>
            <p className="text-[#ff9ec6] text-sm font-medium mt-1">{email}</p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 mb-4">
            {otp.map((digit, i) => (
              <Input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-12 text-center text-lg font-bold rounded-xl bg-gray-800 border-gray-700"
              />
            ))}
          </div>

          {/* Status Message */}
          <AnimatePresence mode="wait">
            {status === "error" && (
              <motion.p
                className="text-red-400 text-sm text-center mb-3 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AlertCircle size={16} />
                {errorMessage}
              </motion.p>
            )}
            {status === "success" && (
              <motion.p
                className="text-green-400 text-sm text-center mb-3 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircle size={16} />
                Email verified successfully!
              </motion.p>
            )}
          </AnimatePresence>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={isLoading || status === "success"}
            className="w-full mt-2 bg-[#ff9ec6] text-black font-semibold py-3 hover:bg-[#ff9ec6]/90 rounded-xl"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Button>

          {/* Resend OTP */}
          <div className="text-center mt-4 text-sm text-gray-400">
            {canResend ? (
              <Button
                onClick={handleResend}
                disabled={isResending}
                variant="ghost"
                className="text-[#ff9ec6] hover:underline"
              >
                {isResending ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw size={14} className="animate-spin" />
                    Resending...
                  </span>
                ) : (
                  "Resend Code"
                )}
              </Button>
            ) : (
              <p>Resend available in {formatTime(countdown)}</p>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Didn't get it? Check spam or{" "}
            <a href="mailto:support@foundertalk.com" className="text-[#ff9ec6] hover:underline">
              contact support
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  )
}
