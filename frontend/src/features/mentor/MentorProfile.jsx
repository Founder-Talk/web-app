"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  User,
  X,
  ImageIcon,
  Upload,
  Briefcase,
  GraduationCap,
  DollarSign,
  Globe,
  Award,
  Clock,
  Calendar,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function MentorProfile({
  showModal,
  setShowModal,
  profileData,
  isDarkMode,
  mutedTextClass,
  onProfileComplete,
}) {
  const [profileCompletionStep, setProfileCompletionStep] = useState(1)

  // Options for dropdowns
  const expertiseOptions = [
    "Product Development",
    "Fundraising",
    "Team Building",
    "Go-to-Market Strategy",
    "Strategic Partnerships",
    "Operations & Scaling",
    "Marketing & Growth",
    "Sales Strategy",
    "Technology & Engineering",
    "Finance & Accounting",
    "Legal & Compliance",
    "HR & Talent",
    "Customer Success",
    "Data & Analytics",
    "Business Strategy",
    "Leadership & Management",
  ]

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
    "Korean",
    "Portuguese",
    "Italian",
    "Russian",
    "Arabic",
    "Hindi",
    "Dutch",
    "Swedish",
  ]

  const handleExpertiseToggle = (expertise) => {
    setProfileData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(expertise)
        ? prev.expertise.filter((e) => e !== expertise)
        : [...prev.expertise, expertise],
    }))
  }

  const handleLanguageToggle = (language) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter((l) => l !== language)
        : [...prev.languages, language],
    }))
  }

  const nextStep = () => {
    if (profileCompletionStep < 3) {
      setProfileCompletionStep(profileCompletionStep + 1)
    }
  }

  const prevStep = () => {
    if (profileCompletionStep > 1) {
      setProfileCompletionStep(profileCompletionStep - 1)
    }
  }

  const getStepProgress = () => {
    return (profileCompletionStep / 3) * 100
  }

  const handleProfileCompletion = () => {
    onProfileComplete(profileData)
    setShowModal(false)
  }

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-4xl backdrop-blur-xl ${
              isDarkMode ? "bg-gray-900/98 border-gray-700/60" : "bg-white/98 border-gray-300/60"
            } rounded-3xl border shadow-2xl max-h-[90vh] overflow-y-auto`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800/20">
              <div className="flex items-center space-x-3">
                <div className={`p-2 md:p-3 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"}`}>
                  <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-[#ff9ec6]" />
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold">Complete Your Mentor Profile</h3>
                  <p className={`text-xs md:text-sm ${mutedTextClass}`}>
                    Step {profileCompletionStep} of 3 - Build your professional presence
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className={`p-2 rounded-full ${
                  isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
                } transition-colors`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-4 md:px-6 pt-4">
              <div className={`w-full h-2 rounded-full ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}>
                <div
                  className="h-2 bg-gradient-to-r from-[#ff9ec6] to-[#ff9ec6]/80 rounded-full transition-all duration-500"
                  style={{ width: `${getStepProgress()}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4 md:p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Info & Images */}
                {profileCompletionStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <h4 className="text-lg md:text-xl font-bold mb-2">Basic Information & Photos</h4>
                      <p className={mutedTextClass}>Let's start with your visual presence and basic details</p>
                    </div>

                    {/* Background Image Upload */}
                    <div>
                      <Label className="flex items-center space-x-2 mb-4">
                        <ImageIcon className="h-4 w-4 md:h-5 md:w-5 text-[#ff9ec6]" />
                        <span className="text-base md:text-lg font-semibold">Background Image</span>
                      </Label>
                      <div
                        className={`relative h-32 md:h-48 rounded-xl border-2 border-dashed ${
                          isDarkMode ? "border-gray-700 bg-gray-800/30" : "border-gray-300 bg-gray-100/30"
                        } flex items-center justify-center cursor-pointer hover:border-[#ff9ec6]/50 transition-colors`}
                      >
                        <div className="text-center">
                          <Upload className="h-8 w-8 md:h-12 md:w-12 text-[#ff9ec6] mx-auto mb-2" />
                          <p className={`${mutedTextClass} text-xs md:text-sm`}>Click to upload background image</p>
                          <p className={`${mutedTextClass} text-xs mt-1`}>Recommended: 1200x400px</p>
                        </div>
                      </div>
                    </div>

                    {/* Profile Picture Upload */}
                    <div>
                      <Label className="flex items-center space-x-2 mb-4">
                        <User className="h-4 w-4 md:h-5 md:w-5 text-[#ff9ec6]" />
                        <span className="text-base md:text-lg font-semibold">Profile Picture</span>
                      </Label>
                      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div
                          className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-dashed ${
                            isDarkMode ? "border-gray-700 bg-gray-800/30" : "border-gray-300 bg-gray-100/30"
                          } flex items-center justify-center cursor-pointer hover:border-[#ff9ec6]/50 transition-colors`}
                        >
                          <Upload className="h-6 w-6 md:h-8 md:w-8 text-[#ff9ec6]" />
                        </div>
                        <div className="text-center md:text-left">
                          <p className="font-semibold mb-2">Upload your professional photo</p>
                          <p className={`${mutedTextClass} text-sm mb-3`}>
                            This will be your main profile image that mentees see
                          </p>
                          <Button className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl">
                            Choose Photo
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <Label className="flex items-center space-x-2 mb-2">
                          <Briefcase className="h-4 w-4 text-[#ff9ec6]" />
                          <span>Current Company</span>
                        </Label>
                        <Input
                          value={profileData.company}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, company: e.target.value }))}
                          placeholder="TechFlow Solutions"
                          className={`${
                            isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"
                          } rounded-xl`}
                        />
                      </div>
                      <div>
                        <Label className="flex items-center space-x-2 mb-2">
                          <GraduationCap className="h-4 w-4 text-[#ff9ec6]" />
                          <span>Position/Title</span>
                        </Label>
                        <Input
                          value={profileData.position}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, position: e.target.value }))}
                          placeholder="CEO & Founder"
                          className={`${
                            isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"
                          } rounded-xl`}
                        />
                      </div>
                      <div>
                        <Label className="flex items-center space-x-2 mb-2">
                          <DollarSign className="h-4 w-4 text-[#ff9ec6]" />
                          <span>Hourly Rate (₹)</span>
                        </Label>
                        <Input
                          type="number"
                          value={profileData.hourlyRate}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                          placeholder="150"
                          className={`${
                            isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"
                          } rounded-xl`}
                        />
                      </div>
                      <div>
                        <Label className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-[#ff9ec6]" />
                          <span>Years of Experience</span>
                        </Label>
                        <Input
                          value={profileData.experience}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, experience: e.target.value }))}
                          placeholder="10+ years"
                          className={`${
                            isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"
                          } rounded-xl`}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: About & Expertise */}
                {profileCompletionStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <h4 className="text-lg md:text-xl font-bold mb-2">About You & Expertise</h4>
                      <p className={mutedTextClass}>Share your story and areas of expertise</p>
                    </div>

                    {/* About Section */}
                    <div>
                      <Label className="flex items-center space-x-2 mb-4">
                        <User className="h-4 w-4 md:h-5 md:w-5 text-[#ff9ec6]" />
                        <span className="text-base md:text-lg font-semibold">About You</span>
                      </Label>
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                        placeholder="I'm a seasoned entrepreneur with over 10 years of experience in building and scaling startups..."
                        rows={6}
                        className={`${
                          isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"
                        } rounded-xl resize-none`}
                      />
                    </div>

                    {/* Expertise Selection */}
                    <div>
                      <Label className="flex items-center space-x-2 mb-4">
                        <Award className="h-4 w-4 md:h-5 md:w-5 text-[#ff9ec6]" />
                        <span className="text-base md:text-lg font-semibold">Areas of Expertise</span>
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {expertiseOptions.map((expertise) => (
                          <button
                            key={expertise}
                            onClick={() => handleExpertiseToggle(expertise)}
                            className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                              profileData.expertise.includes(expertise)
                                ? "bg-[#ff9ec6] text-black shadow-md"
                                : isDarkMode
                                  ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
                                  : "bg-gray-100/50 hover:bg-gray-200/50 border border-gray-300/50"
                            }`}
                          >
                            {expertise}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Final Details */}
                {profileCompletionStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div className="text-center mb-6 md:mb-8">
                      <h4 className="text-lg md:text-xl font-bold mb-2">Final Details</h4>
                      <p className={mutedTextClass}>Complete your profile setup</p>
                    </div>

                    {/* Languages */}
                    <div>
                      <Label className="flex items-center space-x-2 mb-4">
                        <Globe className="h-4 w-4 md:h-5 md:w-5 text-[#ff9ec6]" />
                        <span className="text-base md:text-lg font-semibold">Languages</span>
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {languageOptions.map((language) => (
                          <button
                            key={language}
                            onClick={() => handleLanguageToggle(language)}
                            className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                              profileData.languages.includes(language)
                                ? "bg-[#ff9ec6] text-black shadow-md"
                                : isDarkMode
                                  ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
                                  : "bg-gray-100/50 hover:bg-gray-200/50 border border-gray-300/50"
                            }`}
                          >
                            {language}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <Label className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-4 w-4 text-[#ff9ec6]" />
                        <span>Availability</span>
                      </Label>
                      <Textarea
                        value={profileData.availability}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, availability: e.target.value }))}
                        placeholder="Available weekdays 9 AM - 6 PM PST. Weekend sessions by appointment."
                        rows={3}
                        className={`${
                          isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"
                        } rounded-xl resize-none`}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-800/20 space-y-4 sm:space-y-0">
                <Button
                  onClick={prevStep}
                  disabled={profileCompletionStep === 1}
                  variant="outline"
                  className={`${
                    isDarkMode ? "border-gray-700/50 hover:bg-gray-800/50" : "border-gray-300/50 hover:bg-gray-100/50"
                  } rounded-xl px-4 md:px-6 disabled:opacity-50 w-full sm:w-auto`}
                >
                  Previous
                </Button>

                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        step <= profileCompletionStep ? "bg-[#ff9ec6]" : isDarkMode ? "bg-gray-700" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {profileCompletionStep < 3 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-4 md:px-6 w-full sm:w-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleProfileCompletion}
                    className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-6 md:px-8 w-full sm:w-auto"
                  >
                    Complete Profile
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
