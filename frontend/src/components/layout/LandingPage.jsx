"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight, Moon, Sun } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FiEdit3, FiUsers, FiCalendar, FiTarget, FiZap, FiTrendingUp, FiGlobe } from "react-icons/fi"
import { BsRocket } from "react-icons/bs"

export default function FoundertalkLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsMenuOpen(false)
  }

  // Animated text component
  const AnimatedText = ({ text, className = "" }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={className}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05, delay: index * 0.02 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  // Scroll velocity component for logos
  const ScrollingLogos = () => {
    const logos = ["Stripe", "Notion", "Airbnb", "Uber", "Spotify", "Discord", "Figma", "Slack"]

    return (
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="flex space-x-12 whitespace-nowrap"
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className={`flex-shrink-0 font-semibold text-lg opacity-60 hover:opacity-100 transition-opacity ${
                isDarkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    )
  }

  const bgClass = isDarkMode ? "bg-black" : "bg-white"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"

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

        {/* Subtle Grid Pattern */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(rgba(255,158,198,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,158,198,0.02)_1px,transparent_1px)] bg-[size:60px_60px]`}
        ></div>

        {/* Radial Gradient Overlay */}
        <div
          className={`absolute inset-0 ${isDarkMode ? "bg-gradient-radial from-transparent via-black/50 to-black" : "bg-gradient-radial from-transparent via-white/50 to-white"}`}
        ></div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl ${isDarkMode ? "bg-black/80 border-gray-900/50" : "bg-white/80 border-gray-200/50"} border-b`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-bold text-[#ff9ec6] hover:text-[#ff9ec6]/80 transition-colors"
            >
              Foundertalk
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors`}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-gray-400 hover:text-white" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                )}
              </button>

              {/* Divider */}
              <div className={`h-6 w-px ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>

              {/* Get Started Button */}
              <Button
                onClick={() => (window.location.href = "/login")}
                className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-full px-6 font-semibold"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className={`md:hidden ${textClass}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`md:hidden mt-4 py-4 backdrop-blur-xl ${isDarkMode ? "bg-gray-900/80 border-gray-800/50" : "bg-white/80 border-gray-200/50"} rounded-2xl border`}
            >
              <div className="flex flex-col space-y-4 px-6">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${mutedTextClass}`}>Theme</span>
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} transition-colors`}
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-gray-600" />
                    )}
                  </button>
                </div>
                <Button
                  onClick={() => (window.location.href = "/login")}
                  className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-full font-semibold"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-[#ff9ec6]/5 via-transparent to-[#ff9ec6]/5"
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <AnimatedText
              text="Connect with the Minds Who've Done It Before."
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={`text-xl md:text-2xl ${mutedTextClass} mb-8 max-w-2xl mx-auto`}
            >
              Get advice from seasoned founders tailored to your startup journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button
                onClick={() => (window.location.href = "/login")}
                className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-full px-8 py-6 text-lg font-semibold group"
              >
                Browse Mentors
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                icon: FiEdit3,
                title: "Tell us your goals",
                description: "Briefly share your startup's needs and challenges.",
              },
              {
                step: "02",
                icon: FiUsers,
                title: "Get matched with mentors",
                description: "We recommend mentors based on your journey and industry.",
              },
              {
                step: "03",
                icon: FiCalendar,
                title: "Book a 1:1 call",
                description: "Connect directly with your mentor and grow smarter.",
              },
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20 hover:bg-gray-900/30 hover:border-[#ff9ec6]/20" : "bg-white/40 border-gray-200/30 hover:bg-white/60 hover:border-[#ff9ec6]/30"} rounded-2xl p-8 border transition-all duration-300 group`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[#ff9ec6] text-sm font-bold">{item.step}</div>
                    <div
                      className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"} group-hover:bg-[#ff9ec6]/10 transition-colors`}
                    >
                      <IconComponent className="h-6 w-6 text-[#ff9ec6]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className={`${mutedTextClass} leading-relaxed`}>{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Most Founders Fail Section */}
      <section id="why-founders-fail" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Most Founders Fail</h2>
            <p className={`text-xl ${mutedTextClass} max-w-3xl mx-auto`}>
              The startup journey is brutal. Here's what kills most companies before they even get started.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: FiTarget,
                title: "No Market Validation",
                stat: "42%",
                description:
                  "42% of startups fail because they build products nobody wants. Learn how to validate your idea before you build.",
              },
              {
                icon: FiZap,
                title: "Poor Execution",
                stat: "33%",
                description:
                  "Great ideas are worthless without flawless execution. Get mentored by founders who've been there and done that.",
              },
              {
                icon: FiUsers,
                title: "Wrong Team",
                stat: "23%",
                description:
                  "23% fail due to team issues. Learn how to build, manage, and scale high-performing teams from day one.",
              },
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`backdrop-blur-xl ${isDarkMode ? "bg-red-950/10 border-red-900/20 hover:bg-red-950/20 hover:border-red-800/30" : "bg-red-50/40 border-red-200/30 hover:bg-red-50/60 hover:border-red-300/40"} rounded-2xl p-8 border transition-all duration-300 group`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-[#ff9ec6] text-3xl font-bold">{item.stat}</div>
                    <div
                      className={`p-3 rounded-xl ${isDarkMode ? "bg-red-900/20" : "bg-red-100/50"} group-hover:bg-red-500/10 transition-colors`}
                    >
                      <IconComponent className="h-6 w-6 text-red-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className={`${mutedTextClass} leading-relaxed`}>{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why 1:1 Calls Matter Section */}
      <section id="why-calls-matter" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why 1:1 Calls Matter</h2>
            <p className={`text-xl ${mutedTextClass} max-w-3xl mx-auto`}>
              Personal mentorship beats generic advice every time. Here's the impact you can expect.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: BsRocket,
                title: "3x Faster",
                description:
                  "Founders who get mentorship reach milestones 3x faster than those going solo. Skip years of trial and error.",
              },
              {
                icon: FiTrendingUp,
                title: "Higher Success Rate",
                description:
                  "Mentored startups have a 70% higher success rate. Get the unfair advantage you need to win.",
              },
              {
                icon: FiGlobe,
                title: "Better Networks",
                description:
                  "Connect with successful founders and their networks. Your next investor or co-founder is one call away.",
              },
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`backdrop-blur-xl ${isDarkMode ? "bg-emerald-950/10 border-emerald-900/20 hover:bg-emerald-950/20 hover:border-emerald-800/30" : "bg-emerald-50/40 border-emerald-200/30 hover:bg-emerald-50/60 hover:border-emerald-300/40"} rounded-2xl p-8 border transition-all duration-300 group`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-[#ff9ec6]">{item.title}</h3>
                    <div
                      className={`p-3 rounded-xl ${isDarkMode ? "bg-emerald-900/20" : "bg-emerald-100/50"} group-hover:bg-emerald-500/10 transition-colors`}
                    >
                      <IconComponent className="h-6 w-6 text-emerald-500" />
                    </div>
                  </div>
                  <p className={`${mutedTextClass} leading-relaxed`}>{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Founder Testimonials Section */}
      <section id="testimonials" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Founders Say</h2>
            <p className={`text-xl ${mutedTextClass} max-w-3xl mx-auto`}>
              Real feedback from founders who've transformed their startups through mentorship.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "Founder, TechFlow",
                feedback:
                  "My mentor helped me pivot at the right time. We went from struggling to find product-market fit to closing our Series A in 8 months.",
                avatar: "SC",
              },
              {
                name: "Marcus Rodriguez",
                role: "Co-founder, GrowthLab",
                feedback:
                  "The network access alone was worth it. My mentor introduced me to our lead investor and two key team members.",
                avatar: "MR",
              },
              {
                name: "Emily Watson",
                role: "Founder, DataSync",
                feedback:
                  "Having someone who's been through the same challenges was invaluable. Saved me from making costly mistakes in scaling.",
                avatar: "EW",
              },
              {
                name: "David Kim",
                role: "Founder, CloudBase",
                feedback:
                  "My mentor's guidance on team building transformed our culture. We went from high turnover to becoming a top workplace.",
                avatar: "DK",
              },
              {
                name: "Lisa Thompson",
                role: "Co-founder, FinTech Pro",
                feedback:
                  "The strategic advice I received helped us navigate regulatory challenges that could have killed our startup.",
                avatar: "LT",
              },
              {
                name: "Alex Johnson",
                role: "Founder, EcoTech",
                feedback:
                  "My mentor helped me refine our go-to-market strategy. We achieved profitability 6 months ahead of schedule.",
                avatar: "AJ",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20 hover:bg-gray-900/30 hover:border-[#ff9ec6]/20" : "bg-white/40 border-gray-200/30 hover:bg-white/60 hover:border-[#ff9ec6]/30"} rounded-2xl p-6 border transition-all duration-300`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#ff9ec6] rounded-full flex items-center justify-center text-black font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${textClass}`}>{testimonial.name}</h4>
                    <p className={`${mutedTextClass} text-sm`}>{testimonial.role}</p>
                  </div>
                </div>
                <p className={`${mutedTextClass} leading-relaxed italic`}>"{testimonial.feedback}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="social-proof" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Trusted by Founders from Top Companies</h2>
          </motion.div>

          <div className="mb-8">
            <ScrollingLogos />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className={`text-center ${mutedTextClass}`}
          >
            Join 500+ founders who've accelerated their growth
          </motion.p>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${isDarkMode ? "border-gray-900/50" : "border-gray-200/50"} relative`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-bold text-[#ff9ec6] mb-4 md:mb-0 hover:text-[#ff9ec6]/80 transition-colors"
            >
              Foundertalk
            </button>

            <div className={`text-center md:text-right ${mutedTextClass} text-sm`}>
              <p>© {new Date().getFullYear()} Foundertalk. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
