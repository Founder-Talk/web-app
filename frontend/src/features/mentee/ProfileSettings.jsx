"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Camera, X, Plus, MapPin, Phone, Globe, Linkedin, Twitter, Building, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Education",
  "Manufacturing",
  "Real Estate",
  "Media & Entertainment",
  "Food & Beverage",
  "Transportation",
  "Energy",
  "Other",
]

const experienceLevels = ["Less than 1 year", "1-2 years", "3-5 years", "5-10 years", "10+ years"]

const interestOptions = [
  "Product Strategy",
  "Fundraising",
  "Team Building",
  "Marketing",
  "Sales",
  "Operations",
  "Technology",
  "Legal",
  "Finance",
  "Business Development",
  "Customer Success",
  "Growth Hacking",
]

export default function ProfileSettings({
  isOpen,
  onClose,
  profileData,
  onSave,
  isDarkMode,
  textClass,
  mutedTextClass,
  cardBgClass,
  borderClass,
}) {
  const [formData, setFormData] = useState(profileData)
  const [newInterest, setNewInterest] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddInterest = (interest) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }))
    }
    setNewInterest("")
  }

  const handleRemoveInterest = (interestToRemove) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((interest) => interest !== interestToRemove),
    }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profilePic: e.target.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSave(formData)
    setIsLoading(false)
  }

  const handleCancel = () => {
    setFormData(profileData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`${cardBgClass} ${borderClass} border backdrop-blur-xl ${textClass} max-w-2xl max-h-[90vh] overflow-y-auto`}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Profile Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <img
                src={formData.profilePic || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`absolute bottom-0 right-0 p-2 rounded-full bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 transition-colors`}
              >
                <Camera className="h-4 w-4" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
            <p className={`text-sm ${mutedTextClass}`}>Click the camera icon to update your profile picture</p>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={textClass}>
                Full Name
              </Label>
              <div className="relative">
                <User className={`absolute left-3 top-3 h-4 w-4 ${mutedTextClass}`} />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`pl-10 ${cardBgClass} ${borderClass} ${textClass}`}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={textClass}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`${cardBgClass} ${borderClass} ${textClass}`}
                placeholder="Enter your email"
              />
            </div>

            

            
          </div>

          {/* Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className={textClass}>
                Company
              </Label>
              <div className="relative">
                <Building className={`absolute left-3 top-3 h-4 w-4 ${mutedTextClass}`} />
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className={`pl-10 ${cardBgClass} ${borderClass} ${textClass}`}
                  placeholder="Enter your company name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className={textClass}>
                Role
              </Label>
              <div className="relative">
                <Briefcase className={`absolute left-3 top-3 h-4 w-4 ${mutedTextClass}`} />
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className={`pl-10 ${cardBgClass} ${borderClass} ${textClass}`}
                  placeholder="Enter your role/position"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry" className={textClass}>
                Industry
              </Label>
              <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                <SelectTrigger className={`${cardBgClass} ${borderClass} ${textClass}`}>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent className={`${cardBgClass} ${borderClass} ${textClass}`}>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className={textClass}>
              Bio
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className={`min-h-[100px] resize-none ${cardBgClass} ${borderClass} ${textClass}`}
              placeholder="Tell us about yourself and your goals..."
            />
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textClass}`}>Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website" className={textClass}>
                  Website
                </Label>
                <div className="relative">
                  <Globe className={`absolute left-3 top-3 h-4 w-4 ${mutedTextClass}`} />
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className={`pl-10 ${cardBgClass} ${borderClass} ${textClass}`}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin" className={textClass}>
                  LinkedIn
                </Label>
                <div className="relative">
                  <Linkedin className={`absolute left-3 top-3 h-4 w-4 ${mutedTextClass}`} />
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    className={`pl-10 ${cardBgClass} ${borderClass} ${textClass}`}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="twitter" className={textClass}>
                  Twitter
                </Label>
                <div className="relative">
                  <Twitter className={`absolute left-3 top-3 h-4 w-4 ${mutedTextClass}`} />
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                    className={`pl-10 ${cardBgClass} ${borderClass} ${textClass}`}
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textClass}`}>Areas of Interest</h3>

            {/* Add Interest */}
            <div className="flex space-x-2">
              <Select value={newInterest} onValueChange={setNewInterest}>
                <SelectTrigger className={`flex-1 ${cardBgClass} ${borderClass} ${textClass}`}>
                  <SelectValue placeholder="Select an interest to add" />
                </SelectTrigger>
                <SelectContent className={`${cardBgClass} ${borderClass} ${textClass}`}>
                  {interestOptions
                    .filter((option) => !formData.interests.includes(option))
                    .map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={() => handleAddInterest(newInterest)}
                disabled={!newInterest}
                className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Current Interests */}
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest, index) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge variant="secondary" className="bg-[#ff9ec6]/20 text-[#ff9ec6] border-[#ff9ec6]/30 pr-1">
                    {interest}
                    <button
                      onClick={() => handleRemoveInterest(interest)}
                      className="ml-2 hover:bg-[#ff9ec6]/30 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className={`flex-1 ${borderClass}`}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
