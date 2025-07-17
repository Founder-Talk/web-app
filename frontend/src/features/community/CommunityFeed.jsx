"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, ImageIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import FeedPost from "./FeedPost"

export default function CommunityFeed({ posts, setPosts, isDarkMode, textClass, mutedTextClass }) {
  const user = useSelector((state) => state.user.user)

  const [showCreatePostModal, setShowCreatePostModal] = useState(false)
  const [newPost, setNewPost] = useState({
    content: "",
    image: null,
  })

  if (!user) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">Loading Community Feed...</h3>
        <p className={`${mutedTextClass}`}>Please wait while we load your profile.</p>
      </div>
    )
  }

  const handleCreatePost = () => {
    if (newPost.content.trim()) {
      const post = {
        id: posts.length + 1,
        author: {
          name: user.name,
          avatar: user.avatar || "/placeholder.svg?height=40&width=40&text=CU",
          role: user.role || "Mentor",
          field: user.field || "Tech Startup",
        },
        content: newPost.content,
        image: newPost.image,
        likes: 0,
        comments: [],
        timestamp: "Just now",
        liked: false,
      }
      setPosts([post, ...posts])
      setNewPost({ content: "", image: null })
      setShowCreatePostModal(false)
    }
  }

  const handleLikePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleAddComment = (postId, comment) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, comment],
            }
          : post,
      ),
    )
  }

  return (
    <div className="py-6">
      {/* Community Feed Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center space-x-2">
          <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-[#ff9ec6]" />
          <span>Community Feed</span>
          {user.role === "Mentor" && (
            <span className="px-2 py-1 rounded-full bg-[#ff9ec6]/20 text-[#ff9ec6] text-xs font-medium">Required</span>
          )}
        </h2>
        <p className={`${mutedTextClass} text-sm md:text-base`}>
          {user.role === "Mentor"
            ? "Share your expertise and engage with the community to build your reputation and attract more mentees."
            : "Connect with mentors and fellow entrepreneurs. Share your journey and learn from others."}
        </p>
      </div>

      {/* Create Post Section */}
      <div
        className={`backdrop-blur-xl ${
          isDarkMode ? "bg-gray-900/60 border-gray-700/40" : "bg-white/80 border-gray-300/50"
        } rounded-2xl border shadow-lg p-4 md:p-6 mb-6`}
      >
        <div className="flex space-x-3 md:space-x-4">
          <img
            src={user.avatar || "/placeholder.svg?height=48&width=48&text=CU"}
            alt="Your avatar"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#ff9ec6]/20 flex-shrink-0"
          />
          <div className="flex-1">
            <div
              onClick={() => setShowCreatePostModal(true)}
              className={`w-full p-3 md:p-4 rounded-xl cursor-text transition-all duration-200 ${
                isDarkMode
                  ? "bg-transparent border border-gray-700/30 hover:border-gray-600/50"
                  : "bg-transparent border border-gray-300/30 hover:border-gray-400/50"
              }`}
            >
              <p className={`${mutedTextClass} text-base md:text-lg`}>
                {user.role === "Mentor"
                  ? "Share your expertise, insights, or startup tips with the community..."
                  : "What's happening in your startup journey? Share your thoughts..."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setShowCreatePostModal(true)}
                  variant="ghost"
                  size="sm"
                  className={`${mutedTextClass} hover:${textClass} hover:bg-[#ff9ec6]/10 rounded-full p-2`}
                >
                  <ImageIcon className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                {user.role === "Mentor" && (
                  <span className={`text-xs md:text-sm ${mutedTextClass} hidden sm:block`}>
                    💡 Tip: Regular posting increases your visibility by 3x
                  </span>
                )}
              </div>

              <Button
                onClick={() => setShowCreatePostModal(true)}
                className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-full px-4 md:px-6 py-2 font-semibold w-full sm:w-auto"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className={`text-6xl mb-4 ${mutedTextClass}`}>📝</div>
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className={`${mutedTextClass} mb-6`}>Be the first to share something with the community!</p>
            <Button
              onClick={() => setShowCreatePostModal(true)}
              className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl"
            >
              Create First Post
            </Button>
          </div>
        ) : (
          posts.map((post) => (
            <FeedPost
              key={post.id}
              post={post}
              onLike={handleLikePost}
              onComment={handleAddComment}
              isDarkMode={isDarkMode}
              textClass={textClass}
              mutedTextClass={mutedTextClass}
            />
          ))
        )}
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreatePostModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-lg backdrop-blur-xl ${
                isDarkMode ? "bg-gray-900/95 border-gray-800/50" : "bg-white/95 border-gray-200/50"
              } rounded-3xl border shadow-2xl`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Create Post</h3>
                  <Button
                    onClick={() => setShowCreatePostModal(false)}
                    variant="ghost"
                    size="sm"
                    className="rounded-full p-2"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={user.avatar || "/placeholder.svg?height=40&width=40&text=CU"}
                      alt="Your avatar"
                      className="w-10 h-10 rounded-full border-2 border-[#ff9ec6]/20"
                    />
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className={`text-sm ${mutedTextClass}`}>{user.role}</p>
                    </div>
                  </div>

                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder={
                      user.role === "Mentor"
                        ? "What insights would you like to share with the community? Tips, experiences, or advice for fellow entrepreneurs..."
                        : "What's on your mind? Share your startup journey, ask questions, or celebrate wins!"
                    }
                    rows={6}
                    className={`${
                      isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"
                    } rounded-xl resize-none border-0 focus:ring-2 focus:ring-[#ff9ec6]/20`}
                  />

                  <div className="flex items-center justify-between">
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <ImageIcon className="h-5 w-5" />
                      <span>Add Image</span>
                    </Button>

                    <Button
                      onClick={handleCreatePost}
                      disabled={!newPost.content.trim()}
                      className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-6 disabled:opacity-50"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
