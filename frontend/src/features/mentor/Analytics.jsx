"use client"

import { motion } from "framer-motion"
import { DollarSign, CheckCircle, Star, ArrowUpRight } from "lucide-react"
import { useSelector } from "react-redux";


export default function Analytics({ isDarkMode = useSelector((state) => state.theme.mode === "light")}) {
const user= useSelector((state) => state.user.user)
const analyticsData = [
  {
    id: "earnings",
    title: "Total Earnings",
    value: "₹1,20,000",
    subtitle: "₹15,000 this month",
    icon: DollarSign,
    color: "green",
    growth: "10%",
    bgColor: "bg-black", // or "bg-green-900/20" for dark
  },
  {
    id: "sessions",
    title: "Sessions Completed",
    value: `${user.totalSessions}`,
    subtitle: "5 this month",
    icon: CheckCircle,
    color: "blue",
    growth: "5/10",
    bgColor: "bg-black",
  },
  {
    id: "rating",
    title: "Average Rating",
    value: `${user.rating}`,
    subtitle: "40 reviews",
    icon: Star,
    color: "yellow",
    growth: "90%",
    bgColor: "bg-black",
  },
];


  const getColorClasses = (color) => {
    const colors = {
      green: "text-green-500",
      blue: "text-blue-500",
      yellow: "text-yellow-500",
    }
    return colors[color] || "text-gray-500"
  }

  return (
    <div className="space-y-4 sticky top-0 ">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"}`}>
            <DollarSign className="h-5 w-5 text-[#ff9ec6]" />
          </div>
          <span>Analytics Overview</span>
        </h2>
        <p className={` text-sm`}>Your mentoring performance at a glance</p>
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
                  {/* {item.id === "earnings" && <ArrowUpRight className="h-3 w-3" />} */}
                  
                </div>
              </div>
              <div>
                <p className={`text-xs  mb-1`}>{item.title}</p>
                <p className="text-xl font-bold mb-1">{item.value}</p>
                
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
