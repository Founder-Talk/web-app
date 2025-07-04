import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlurText from "../common/BlurText";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = ["Home", "About", "Features", "Pricing", "Contact"];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#FEB8D5]">
              Foundertalk
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-[#FEB8D5] transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button className="bg-[#FEB8D5] text-black hover:bg-[#fda9cc] font-semibold">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="text-gray-300 hover:text-[#FEB8D5]"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-800 bg-[#0a0a0a] px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-gray-300 hover:text-[#FEB8D5] transition-colors"
                >
                  {item}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full bg-[#FEB8D5] text-black hover:bg-[#fda9cc] font-semibold">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-center max-w-4xl mx-auto">
              <BlurText
                className="inline-block text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight"
                text="Connect with the Minds Who’ve Done It Before."
                delay={150}
                animateBy="words"
                direction="top"
              />
            </div>

            <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with seasoned founders for tailored guidance, real conversations, and actionable advice — when it matters most.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-[#FEB8D5] text-black hover:bg-[#fda9cc] font-semibold text-lg px-10 py-5 rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
              >
                Browse Mentors
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
