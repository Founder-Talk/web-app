"use client"

import { motion } from "framer-motion"
import { DollarSign, CheckCircle, Star, ArrowUpRight } from "lucide-react"

export default function Analytics({ stats, isDarkMode, mutedTextClass }) {
  const analyticsData = [
    {
      id: "earnings",
      title: "Total Earnings",
      value: `₹${stats.totalEarnings.toLocaleString()}`,
      subtitle: `₹${stats.monthlyEarnings.toLocaleString()} this month`,
      icon: DollarSign,
      color: "green",
      growth: `+${stats.earningsGrowth}%`,
      bgColor: isDarkMode ? "bg-green-900/20" : "bg-green-100/50",
    },
    {
      id: "sessions",
      title: "Sessions Completed",
      value: stats.completedSessions.toString(),
      subtitle: `${stats.thisMonthSessions} this month`,
      icon: CheckCircle,
      color: "blue",
      growth: `${stats.thisMonthSessions}/${stats.lastMonthSessions}`,
      bgColor: isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50",
    },
    {
      id: "rating",
      title: "Average Rating",
      value: stats.rating.toString(),
      subtitle: `${stats.totalReviews} reviews`,
      icon: Star,
      color: "yellow",
      growth: `${stats.responseRate}%`,
      bgColor: isDarkMode ? "bg-yellow-900/20" : "bg-yellow-100/50",
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      green: "text-green-500",
      blue: "text-blue-500",
      yellow: "text-yellow-500",
    }
    return colors[color] || "text-gray-500"
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"}`}>
            <DollarSign className="h-5 w-5 text-[#ff9ec6]" />
          </div>
          <span>Analytics Overview</span>
        </h2>
        <p className={`${mutedTextClass} text-sm`}>Your mentoring performance at a glance</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {analyticsData.map((item, index) => {
          const IconComponent = item.icon
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`backdrop-blur-xl ${
                isDarkMode ? "bg-gray-900/60 border-gray-700/40" : "bg-white/80 border-gray-300/50"
              } rounded-xl border shadow-lg p-4 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${item.bgColor}`}>
                  <IconComponent className={`h-5 w-5 ${getColorClasses(item.color)}`} />
                </div>
                <div className={`flex items-center space-x-1 ${getColorClasses(item.color)}`}>
                  {item.id === "earnings" && <ArrowUpRight className="h-3 w-3" />}
                  <span className="text-xs font-medium">{item.growth}</span>
                </div>
              </div>
              <div>
                <p className={`text-xs ${mutedTextClass} mb-1`}>{item.title}</p>
                <p className="text-xl font-bold mb-1">{item.value}</p>
                <p className={`text-xs ${mutedTextClass}`}>{item.subtitle}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
