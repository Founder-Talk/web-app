import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Foot() {
  const isDarkMode = useSelector((state) => state.theme.mode === "dark")
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"

  return (
    <footer className={`py-12 border-t ${isDarkMode ? "border-gray-900/50" : "border-gray-200/50"} mt-16`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-[#ff9ec6] mb-4 md:mb-0 hover:text-[#ff9ec6]/80 transition-colors"
          >
            Foundertalk
          </Link>

          <div className={`text-center md:text-right ${mutedTextClass} text-sm`}>
            <p>© {new Date().getFullYear()} Foundertalk. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Foot
