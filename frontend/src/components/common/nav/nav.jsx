import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/redux/slice/themeSlice";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, LogOut, MessageCircle, User, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "@/redux/slice/userslice";
import Userprofile from "./userprofile";
import ProfileSettings from "@/features/mentee/ProfileSettings";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profile, setprofile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.mode === "light");
  const user = useSelector((state) => state.user.user);
  console.log(user);


  

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl ${
        isDarkMode ? "bg-black/80 border-gray-900/50" : "bg-white/80 border-gray-200/50"
      } border-b`}
    >
      
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-[#ff9ec6] hover:text-[#ff9ec6]/80 transition-colors"
          >
            Foundertalk
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-400 hover:text-white" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              )}
            </button>

            {user ? (
              <>
                {/* Chat button */}
                <Link to="/chat">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded-full p-2`}
                  >
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </Link>

                {/* Profile dropdown */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className={`${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded-full p-2`}
                  >
                    <User className="h-5 w-5" />
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>

                  <AnimatePresence>
                    {showProfileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute right-0 mt-2 w-56 backdrop-blur-xl ${
                          isDarkMode ? "bg-gray-900/95 border-gray-700/60" : "bg-white/95 border-gray-300/60"
                        } rounded-xl border shadow-xl`}
                      >
                        <div className="py-2">
                          <button
                            onClick={() => {
                              navigate("/profile");
                              setShowProfileDropdown(false);
                              setprofile(!profile)
                            }}
                            className={`w-full px-4 py-3 text-left ${
                              isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100/50"
                            } transition-colors flex items-center space-x-3`}
                          >
                            <User className="h-4 w-4 text-[#ff9ec6]" />
                            <span>View Profile</span>
                          </button>
                          <div
                            className={`border-t ${isDarkMode ? "border-gray-800/50" : "border-gray-200/50"} my-2`}
                          ></div>
                          <button
                            onClick={() => {
                              dispatch(clearUser());
                              navigate("/login");
                            }}
                            className={`w-full px-4 py-3 text-left ${
                              isDarkMode ? "hover:bg-red-900/20 text-red-400" : "hover:bg-red-50 text-red-600"
                            } transition-colors flex items-center space-x-3`}
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              // Not logged in — show Get Started button
              <Button
                onClick={() => navigate("/login")}
                className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-full px-6 font-semibold"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Nav Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className={`${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded-full p-2`}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-gray-800/20"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => dispatch(toggleTheme())}
                      className={`p-2 rounded-full ${
                        isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                      } transition-colors`}
                    >
                      {isDarkMode ? (
                        <Sun className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Moon className="h-5 w-5 text-gray-600" />
                      )}
                    </button>

                    <Link to="/chat">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"} rounded-full p-2`}
                      >
                        <MessageCircle className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>

                  {user ? (<div className=" flex gap-2">
                    <Button
                      onClick={() => {
                        navigate("/profile");
                        setShowMobileMenu(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="text-[#ff9ec6] border-[#ff9ec6]/30 hover:bg-[#ff9ec6]/10"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch(clearUser());
                              navigate("/login");
                      }}
                      variant="outline"
                      size="sm"
                      className="text-red-600 p-0 border-[#ff9ec6]/30 hover:bg-[#ff9ec6]/10"
                      >
                     
                      <LogOut/>
                    </Button>
                      </div>
                  ) : (
                    <Button
                      onClick={() => navigate("/login")}
                      className="bg-[#ff9ec6] text-black hover:bg-[#ff9ec6]/90 rounded-full px-6 font-semibold"
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Nav;
