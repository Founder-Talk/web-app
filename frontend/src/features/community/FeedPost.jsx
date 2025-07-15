"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Send, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function FeedPost({ post, onLike, onComment, isDarkMode, textClass, mutedTextClass }) {
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: post.comments.length + 1,
        author: "Current User", // This would come from user context
        avatar: "/placeholder.svg?height=30&width=30&text=CU",
        content: newComment,
        timestamp: "Just now",
      }
      onComment(post.id, comment)
      setNewComment("")
      setShowCommentModal(false)
    }
  }

  return (
    <>
      <div
        className={`backdrop-blur-xl ${
          isDarkMode ? "bg-gray-900/60 border-gray-700/40" : "bg-white/80 border-gray-300/50"
        } rounded-2xl border shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow`}
      >
        {/* Post Header */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={post.author.avatar || "/placeholder.svg"}
            alt={post.author.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#ff9ec6]/20"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-sm md:text-base">{post.author.name}</h4>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  post.author.role === "Mentor" ? "bg-[#ff9ec6]/20 text-[#ff9ec6]" : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {post.author.role}
              </span>
            </div>
            <p className={`text-xs md:text-sm ${mutedTextClass}`}>
              {post.author.field} • {post.timestamp}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="whitespace-pre-line mb-4 text-sm md:text-base leading-relaxed">{post.content}</p>
          {post.image && (
            <img
              src={post.image || "/placeholder.svg"}
              alt="Post content"
              className="w-full rounded-xl max-h-64 md:max-h-96 object-cover"
            />
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800/20">
          <div className="flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 transition-colors ${
                post.liked ? "text-red-500" : mutedTextClass
              } hover:text-red-500 group`}
            >
              <Heart
                className={`h-4 w-4 md:h-5 md:w-5 ${post.liked ? "fill-current" : ""} group-hover:scale-110 transition-transform`}
              />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button
              onClick={() => setShowCommentModal(true)}
              className={`flex items-center space-x-2 ${mutedTextClass} hover:${textClass} transition-colors group`}
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{post.comments.length}</span>
            </button>
          </div>
        </div>

        {/* Comments Preview */}
        {post.comments.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-800/20">
            <div className="space-y-3">
              {post.comments.slice(0, 2).map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <img
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.author}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#ff9ec6]/20"
                  />
                  <div className="flex-1">
                    <div className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-800/60" : "bg-gray-100/70"} shadow-sm`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-xs md:text-sm">{comment.author}</span>
                        <span className={`text-xs ${mutedTextClass}`}>{comment.timestamp}</span>
                      </div>
                      <p className="text-xs md:text-sm">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {post.comments.length > 2 && (
                <button
                  onClick={() => setShowCommentModal(true)}
                  className={`text-sm ${mutedTextClass} hover:${textClass} transition-colors font-medium`}
                >
                  View all {post.comments.length} comments
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Comment Modal */}
      <AnimatePresence>
        {showCommentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCommentModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg backdrop-blur-xl ${
                isDarkMode ? "bg-gray-900/95 border-gray-800/50" : "bg-white/95 border-gray-200/50"
              } rounded-3xl border shadow-2xl max-h-[80vh] overflow-y-auto`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Comments</h3>
                  <Button
                    onClick={() => setShowCommentModal(false)}
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Post Preview */}
                <div className={`p-4 rounded-xl ${isDarkMode ? "bg-gray-800/30" : "bg-gray-100/30"} mb-6`}>
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full border-2 border-[#ff9ec6]/20"
                    />
                    <div>
                      <h4 className="font-semibold">{post.author.name}</h4>
                      <p className={`text-sm ${mutedTextClass}`}>{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-3">{post.content}</p>
                </div>

                {/* Comments List */}
                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <img
                        src={comment.avatar || "/placeholder.svg"}
                        alt={comment.author}
                        className="w-8 h-8 rounded-full border border-[#ff9ec6]/20"
                      />
                      <div className="flex-1">
                        <div className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-800/30" : "bg-gray-100/30"}`}>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm">{comment.author}</span>
                            <span className={`text-xs ${mutedTextClass}`}>{comment.timestamp}</span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex items-center space-x-3">
                  <img
                    src="/placeholder.svg?height=32&width=32&text=CU"
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full border border-[#ff9ec6]/20"
                  />
                  <div className="flex-1 flex items-center space-x-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className={`flex-1 ${
                        isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"
                      } rounded-xl`}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddComment()
                        }
                      }}
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-4 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
