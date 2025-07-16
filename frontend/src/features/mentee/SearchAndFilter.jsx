import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X, Star, DollarSign } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const StarRating = ({ rating, onRatingChange, interactive = false, isDarkMode }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && onRatingChange(star)}
          className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
          disabled={!interactive}
        >
          <Star
            className={`h-4 w-4 ${
              star <= rating ? "fill-[#ff9ec6] text-[#ff9ec6]" : isDarkMode ? "text-gray-600" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export default function SearchAndFilter({
  searchQuery,
  onSearchChange,
  filters,
  onFilterApply,
  isDarkMode,
  textClass,
  mutedTextClass,
  cardBgClass,
  borderClass,
}) {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [tempFilters, setTempFilters] = useState(filters)

  const handleFilterApply = () => {
    onFilterApply(tempFilters)
    setShowFilterModal(false)
  }

  const handleFilterReset = () => {
    const resetFilters = {
      rating: 0,
      priceRange: [0, 100000],
    }
    setTempFilters(resetFilters)
  }

  const getActiveFilterCount = () => {
    return [filters.rating > 0, filters.priceRange[0] > 0 || filters.priceRange[1] < 100000].filter(Boolean).length
  }

  return (
    <div className="py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-6 sm:mb-8">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${mutedTextClass}`} />
          <Input
            type="text"
            placeholder="Search by name or field..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`pl-10 h-12 rounded-xl border ${borderClass} ${cardBgClass} backdrop-blur-sm focus:border-[#ff9ec6]/50 transition-colors`}
          />
        </div>

        {/* Filter Button */}
        <Button
          onClick={() => setShowFilterModal(true)}
          variant="outline"
          className={`h-12 px-6 rounded-xl border ${borderClass} ${
            isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
          } backdrop-blur-sm font-medium transition-all duration-200 relative`}
        >
          <Filter className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Filter</span>
          <span className="sm:hidden">Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#ff9ec6] text-black text-xs rounded-full px-2 py-1 font-semibold min-w-[20px] h-5 flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFilterModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl backdrop-blur-xl ${cardBgClass} ${borderClass} rounded-3xl border shadow-2xl max-h-[90vh] overflow-y-auto`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-6 border-b ${borderClass}`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${isDarkMode ? "bg-gray-800/50" : "bg-gray-100/50"}`}>
                    <Filter className="h-5 w-5 text-[#ff9ec6]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Filter Mentors</h3>
                </div>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className={`p-2 rounded-full ${
                    isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
                  } transition-colors`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Rating Filter */}
                <div>
                  <label className="block text-lg font-semibold mb-4 flex items-center space-x-2">
                    <Star className="h-5 w-5 text-[#ff9ec6]" />
                    <span>Minimum Rating</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      onClick={() => setTempFilters((prev) => ({ ...prev, rating: 0 }))}
                      className={`p-3 rounded-xl border transition-all duration-200 ${
                        tempFilters.rating === 0
                          ? "bg-[#ff9ec6]/20 border-[#ff9ec6]/50 text-[#ff9ec6]"
                          : `${borderClass} ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"}`
                      }`}
                    >
                      <span className="text-sm font-medium">Any Rating</span>
                    </button>
                    {[3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setTempFilters((prev) => ({ ...prev, rating }))}
                        className={`p-3 rounded-xl border transition-all duration-200 ${
                          tempFilters.rating === rating
                            ? "bg-[#ff9ec6]/20 border-[#ff9ec6]/50 text-[#ff9ec6]"
                            : `${borderClass} ${isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"}`
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-1 mb-1">
                          <StarRating rating={rating} isDarkMode={isDarkMode} />
                        </div>
                        <span className="text-sm font-medium">{rating}+ stars</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-lg font-semibold mb-4 flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-[#ff9ec6]" />
                    <span>Price Range (per hour)</span>
                  </label>
                  <div className="space-y-6">
                    {/* Range Slider */}
                    <div className="relative px-2">
                      <div className="relative h-2">
                        {/* Track */}
                        <div
                          className={`absolute w-full h-2 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                        ></div>

                        {/* Active range */}
                        <div
                          className="absolute h-2 bg-gradient-to-r from-[#ff9ec6] to-[#ff9ec6]/80 rounded-lg transition-all duration-200"
                          style={{
                            left: `${(tempFilters.priceRange[0] / 100000) * 100}%`,
                            width: `${((tempFilters.priceRange[1] - tempFilters.priceRange[0]) / 100000) * 100}%`,
                          }}
                        ></div>

                        {/* Min slider */}
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="250"
                          value={tempFilters.priceRange[0]}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            setTempFilters((prev) => ({
                              ...prev,
                              priceRange: [value, Math.max(value, prev.priceRange[1])],
                            }))
                          }}
                          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-10 opacity-0"
                        />

                        {/* Max slider */}
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="250"
                          value={tempFilters.priceRange[1]}
                          onChange={(e) => {
                            const value = Number.parseInt(e.target.value)
                            setTempFilters((prev) => ({
                              ...prev,
                              priceRange: [Math.min(prev.priceRange[0], value), value],
                            }))
                          }}
                          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer z-20 opacity-0"
                        />

                        {/* Min thumb */}
                        <div
                          className="absolute w-6 h-6 bg-[#ff9ec6] border-3 border-white rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 z-30 hover:scale-110 transition-all duration-200 active:scale-125"
                          style={{
                            left: `${(tempFilters.priceRange[0] / 100000) * 100}%`,
                            top: "50%",
                          }}
                        >
                          <div className="absolute inset-1 bg-white rounded-full opacity-80"></div>
                        </div>

                        {/* Max thumb */}
                        <div
                          className="absolute w-6 h-6 bg-[#ff9ec6] border-3 border-white rounded-full shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 z-30 hover:scale-110 transition-all duration-200 active:scale-125"
                          style={{
                            left: `${(tempFilters.priceRange[1] / 100000) * 100}%`,
                            top: "50%",
                          }}
                        >
                          <div className="absolute inset-1 bg-white rounded-full opacity-80"></div>
                        </div>
                      </div>

                      {/* Input Fields */}
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                          <label className={`text-sm ${mutedTextClass} mb-2 block`}>Minimum</label>
                          <div className="relative">
                            <span
                              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ff9ec6] font-semibold`}
                            >
                              ₹
                            </span>
                            <Input
                              type="number"
                              placeholder="0"
                              value={tempFilters.priceRange[0]}
                              onChange={(e) =>
                                setTempFilters((prev) => ({
                                  ...prev,
                                  priceRange: [
                                    Number.parseInt(e.target.value) || 0,
                                    Math.max(Number.parseInt(e.target.value) || 0, prev.priceRange[1]),
                                  ],
                                }))
                              }
                              className={`pl-8 ${cardBgClass} ${borderClass} rounded-xl`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={`text-sm ${mutedTextClass} mb-2 block`}>Maximum</label>
                          <div className="relative">
                            <span
                              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-[#ff9ec6] font-semibold`}
                            >
                              ₹
                            </span>
                            <Input
                              type="number"
                              placeholder="100000"
                              value={tempFilters.priceRange[1]}
                              onChange={(e) =>
                                setTempFilters((prev) => ({
                                  ...prev,
                                  priceRange: [
                                    Math.min(prev.priceRange[0], Number.parseInt(e.target.value) || 100000),
                                    Number.parseInt(e.target.value) || 100000,
                                  ],
                                }))
                              }
                              className={`pl-8 ${cardBgClass} ${borderClass} rounded-xl`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className={`flex flex-col sm:flex-row justify-between gap-4 p-6 border-t ${borderClass}`}>
                <Button
                  onClick={handleFilterReset}
                  variant="outline"
                  className={`${borderClass} ${
                    isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
                  } rounded-xl px-6 order-2 sm:order-1`}
                >
                  Reset
                </Button>
                <div className="flex space-x-3 order-1 sm:order-2">
                  <Button
                    onClick={() => setShowFilterModal(false)}
                    variant="outline"
                    className={`${borderClass} ${
                      isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
                    } rounded-xl px-6 flex-1 sm:flex-none`}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleFilterApply}
                    className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-8 flex-1 sm:flex-none"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}