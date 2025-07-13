import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, MoreVertical, Paperclip, Smile, Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { Link, Navigate } from "react-router-dom"

export default function ChatDetailPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const params = useParams()
  const chatId = params.id

  const bgClass = isDarkMode ? "bg-black" : "bg-white"
  const textClass = isDarkMode ? "text-white" : "text-gray-900"
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-gray-600"

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Mock chat data
  const chatData = {
    1: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=SC",
      status: "Online",
      field: "Tech Startup Mentor",
    },
    2: {
      name: "Marcus Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
      status: "Last seen 1h ago",
      field: "E-commerce Expert",
    },
    3: {
      name: "Emily Watson",
      avatar: "/placeholder.svg?height=40&width=40&text=EW",
      status: "Online",
      field: "SaaS Founder",
    },
    4: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
      status: "Last seen 2h ago",
      field: "Marketing Strategist",
    },
    5: {
      name: "Lisa Thompson",
      avatar: "/placeholder.svg?height=40&width=40&text=LT",
      status: "Online",
      field: "FinTech Advisor",
    },
  }

  const currentChat = chatData[chatId]

  // Mock messages
  const mockMessages = [
    {
      id: 1,
      text: "Hi! I'd love to schedule a mentoring session with you.",
      sender: "user",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: "Hello! I'd be happy to help. What specific areas would you like to focus on?",
      sender: "mentor",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      text: "I'm particularly interested in scaling strategies and fundraising approaches.",
      sender: "user",
      timestamp: "10:35 AM",
    },
    {
      id: 4,
      text: "Perfect! I have extensive experience in both areas. I helped my last startup raise $5M Series A and scale from 10 to 100 employees.",
      sender: "mentor",
      timestamp: "10:37 AM",
    },
    {
      id: 5,
      text: "That sounds exactly like what I need! When would be a good time for our first session?",
      sender: "user",
      timestamp: "10:40 AM",
    },
  ]

  useEffect(() => {
    setMessages(mockMessages)
  }, [chatId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!currentChat) {
    return (
      <div className={`min-h-screen ${bgClass} ${textClass} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Chat not found</h2>
          <Link href="/chats">
            <Button className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl">Back to Chats</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300 flex flex-col`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl ${isDarkMode ? "bg-black/80 border-gray-900/50" : "bg-white/80 border-gray-200/50"} border-b`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/chats">
                <Button variant="ghost" size="sm" className="rounded-full p-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={currentChat.avatar || "/placeholder.svg"}
                    alt={currentChat.name}
                    className="w-10 h-10 rounded-full border-2 border-[#ff9ec6]/20"
                  />
                  {currentChat.status === "Online" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h1 className="text-lg font-bold">{currentChat.name}</h1>
                  <p className={`text-sm ${mutedTextClass}`}>{currentChat.status}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                } transition-colors`}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-gray-400 hover:text-white" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                )}
              </button>

              {/* More options */}
              <Button variant="ghost" size="sm" className="rounded-full p-2">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div
          className={`backdrop-blur-xl ${isDarkMode ? "bg-gray-900/20 border-gray-800/20" : "bg-white/40 border-gray-200/30"} rounded-2xl border h-full flex flex-col`}
        >
          {/* Chat Info */}
          <div className={`p-4 border-b ${isDarkMode ? "border-gray-800/20" : "border-gray-200/30"} text-center`}>
            <img
              src={currentChat.avatar || "/placeholder.svg"}
              alt={currentChat.name}
              className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-[#ff9ec6]/20"
            />
            <h3 className="font-semibold text-lg">{currentChat.name}</h3>
            <p className="text-[#ff9ec6] text-sm">{currentChat.field}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-[#ff9ec6] text-black"
                        : isDarkMode
                          ? "bg-gray-800/50"
                          : "bg-gray-100/50"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-black/70" : mutedTextClass}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className={`p-4 border-t ${isDarkMode ? "border-gray-800/20" : "border-gray-200/30"}`}>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="rounded-full p-2">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className={`flex-1 ${isDarkMode ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-gray-300/50"} rounded-xl`}
              />
              <Button variant="ghost" size="sm" className="rounded-full p-2">
                <Smile className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleSendMessage}
                className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-xl px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
