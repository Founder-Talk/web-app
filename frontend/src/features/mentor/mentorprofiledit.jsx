"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

import {
  User, Camera, X, Plus, Globe, Linkedin, Twitter, Building, Briefcase
} from "lucide-react"

import axios from "axios";

const industries = [
  "Technology", "Healthcare", "Finance", "E-commerce", "Education", "Manufacturing", "Real Estate",
  "Media & Entertainment", "Food & Beverage", "Transportation", "Energy", "Other",
]

const interestOptions = [
  "Product Strategy", "Fundraising", "Team Building", "Marketing", "Sales", "Operations",
  "Technology", "Legal", "Finance", "Business Development", "Customer Success", "Growth Hacking",
]

function sanitizeProfileData(data) {
  const allowedFields = [
    'name', 'bio', 'education', 'goals', 'areasOfInterest', 'company', 'experience', 'profilePic',
    'domainExpertise', 'linkedinProfile', 'hourlyRate', 'availability'
  ];
  const sanitized = {};
  for (const key of allowedFields) {
    if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
      if (key === 'experience' || key === 'hourlyRate') {
        sanitized[key] = Number(data[key]);
        if (isNaN(sanitized[key])) delete sanitized[key];
      } else if (key === 'profilePic') {
        // Only send if it's a URL (not a data URI)
        if (typeof data[key] === 'string' && !data[key].startsWith('data:image/')) {
          sanitized[key] = data[key];
        }
      } else {
        sanitized[key] = data[key];
      }
    }
  }
  return sanitized;
}

export default function MentorProfileSettings({
  profileData,
  onSave,
  isDarkMode = false,
}) {
  const [formData, setFormData] = useState(profileData)
  const [newInterest, setNewInterest] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"
  const cardBgClass = isDarkMode ? "bg-black" : "bg-white"
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-200"

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
    setIsLoading(true);
    const sanitizedData = sanitizeProfileData(formData);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/user/profile",
        sanitizedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Fetch latest profile data and update state
      const res = await axios.get("http://localhost:3000/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData(res.data);
      alert("Profile updated successfully!");
      navigate("/login");
    } catch (err) {
      alert("Failed to update profile. " + (err?.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`p-6 sm:p-10 max-w-5xl mx-auto ${cardBgClass} ${textClass}`}>
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          {formData.profilePic ? (
            <img
              src={formData.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className={`w-24 h-24 rounded-full flex items-center justify-center 
              ${isDarkMode ? "bg-pink-600" : "bg-[#ff9ec6]"} 
              text-white text-3xl font-bold`}>
              {formData.name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>
        <p className={`text-sm mt-2 ${mutedTextClass}`}>Click the camera icon to update your profile picture</p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="name" className={textClass}>Full Name</Label>
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
          <Label htmlFor="email" className={textClass}>Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            disabled={true}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`${cardBgClass} ${borderClass} ${textClass}`}
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Professional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="company" className={textClass}>Company</Label>
          <div className="relative">
            <Building className={`absolute left-3 top-3 h-4 w-4 ${mutedTextClass}`} />
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className={`pl-10 ${cardBgClass} ${borderClass} ${textClass}`}
              placeholder="Company name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="role" className={textClass}>Role</Label>
          <div className="relative">
            <Briefcase className={`absolute left-3 top-3 h-4 w-4 ${mutedTextClass}`} />
            <Input
              id="role"
              value={formData.role}
              disabled={true}
              onChange={(e) => handleInputChange("role", e.target.value)}
              className={`pl-10 ${cardBgClass} ${borderClass} ${textClass}`}
              placeholder="Your role/position"
            />
          </div>
        </div>
        <div className="space-y-2 apace ">
          <Label htmlFor="industry" className={textClass}>Industry</Label>
          <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
            <SelectTrigger className={`${cardBgClass} ${borderClass} ${textClass}`}>
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent className={`${cardBgClass} ${borderClass} ${textClass}`}>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Experience */}
<div className="space-y-2 ">
  <Label htmlFor="experience" className={textClass}>Experience</Label>
  <Input
    id="experience"
    value={formData.experience}
    onChange={(e) => handleInputChange("experience", e.target.value)}
    className={`${cardBgClass} ${borderClass} ${textClass}`}
    placeholder="e.g. 5 years in Product Management"
  />
</div>

      </div>

      {/* Bio */}
 
<div className="space-y-2 mb-4">
  <Label htmlFor="bio" className={textClass}>Short Bio</Label>
  <Textarea
    id="bio"
    value={formData.bio}
    onChange={(e) => handleInputChange("bio", e.target.value)}
    className={`min-h-[70px] ${cardBgClass} ${borderClass} ${textClass}`}
    placeholder="Quick summary about yourself..."
  />
</div>

{/* About You */}
<div className="space-y-2 mb-6">
  <Label htmlFor="about" className={textClass}>About You</Label>
  <Textarea
    id="about"
    value={formData.about || ""}
    onChange={(e) => handleInputChange("about", e.target.value)}
    className={`min-h-[180px] ${cardBgClass} ${borderClass} ${textClass}`}
    placeholder="Tell your full story, experiences, vision, or what drives you..."
  />
</div>


      {/* Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="website" className={textClass}>Website</Label>
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
          <Label htmlFor="linkedin" className={textClass}>LinkedIn</Label>
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
          <Label htmlFor="twitter" className={textClass}>Twitter</Label>
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

      {/* Interests */}
      <div className="space-y-4 mb-8">
        <h3 className={`text-lg font-semibold ${textClass}`}>Areas of expertise</h3>
        <div className="flex space-x-2">
          <Select value={newInterest} onValueChange={setNewInterest}>
            <SelectTrigger className={`flex-1 ${cardBgClass} ${borderClass} ${textClass}`}>
              <SelectValue placeholder="Select an interest" />
            </SelectTrigger>
            <SelectContent className={`${cardBgClass} ${borderClass} ${textClass}`}>
              {interestOptions
                .filter((option) => !formData.interests.includes(option))
                .map((option) => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
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

        <div className="flex flex-wrap gap-2">
          {(formData.interests || formData.areasOfInterest || []).map((interest) => (
            <motion.div key={interest} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate("/login")} className={borderClass} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
