import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Users, MessageCircle, Search } from "lucide-react";
import Nav from "@/components/common/nav/nav";
import MentorCard from "./mentorCard";


const mentors = [
  {
    id: "1",
    name: "Aarti Patel",
    image: "https://i.pravatar.cc/100?img=10",
    field: "Product Strategy",
    rating: 4.7,
    caption: "Helping startups validate and launch MVPs effectively.",
    charge: 1200,
  },
  {
    id: "2",
    name: "Rahul Sen",
    image: "https://i.pravatar.cc/100?img=12",
    field: "Tech Architecture",
    rating: 4.3,
    caption: "CTO experience in scaling backend systems and dev teams.",
    charge: 1500,
  },
  {
    id: "3",
    name: "Meena Iyer",
    image: "https://i.pravatar.cc/100?img=13",
    field: "Marketing & Branding",
    rating: 4.9,
    caption: "Brand strategist for D2C startups and early-stage companies.",
    charge: 900,
  },
  {
    id: "4",
    name: "Aman Khanna",
    image: "https://i.pravatar.cc/100?img=20",
    field: "Fundraising",
    rating: 4.6,
    caption: "Ex-VC, helps founders prepare for investor meetings.",
    charge: 2000,
  },
  {
    id: "5",
    name: "Simran Doshi",
    image: "https://i.pravatar.cc/100?img=21",
    field: "UI/UX Design",
    rating: 4.5,
    caption: "Design mentor with experience in SaaS and fintech products.",
    charge: 1100,
  },
  {
    id: "6",
    name: "Mohit Verma",
    image: "https://i.pravatar.cc/100?img=25",
    field: "Business Development",
    rating: 4.2,
    caption: "10+ years in sales and GTM strategies for B2B startups.",
    charge: 1000,
  },
  {
    id: "7",
    name: "Sneha Mehra",
    image: "https://i.pravatar.cc/100?img=33",
    field: "Legal & Compliance",
    rating: 4.8,
    caption: "Startup-friendly legal advisor for IP, contracts & fundraising.",
    charge: 1800,
  },
  {
    id: "8",
    name: "Anuj Sharma",
    image: "https://i.pravatar.cc/100?img=34",
    field: "Hiring & Team Building",
    rating: 4.4,
    caption: "Helped 25+ startups hire early engineering & design teams.",
    charge: 1300,
  },
  {
    id: "9",
    name: "Divya Rao",
    image: "https://i.pravatar.cc/100?img=35",
    field: "Growth Hacking",
    rating: 4.9,
    caption: "Scaled 3 apps to 1M+ users through data-driven growth.",
    charge: 1600,
  },
];

function MenteeDashboard({ user = useSelector((state) => state.user.user) }) {
  const isDarkMode = useSelector((state) => state.theme.mode === "light");
  const [selectedTab, setSelectedTab] = useState("mentor");
  const [search, setSearch] = useState("");

  const baseStyles = `flex-1 py-4 px-4 sm:px-6 text-center text-sm sm:text-base font-semibold transition-colors cursor-pointer`;
  const active = isDarkMode
    ? "bg-[#ff9ec6]/20 text-[#ff9ec6]"
    : "bg-[#ff9ec6]/20 text-[#ff1b85]";
  const inactive = isDarkMode
    ? "text-gray-400 hover:bg-gray-800"
    : "text-gray-600 hover:bg-gray-200";

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(search.toLowerCase()) ||
      mentor.field.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen  ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
      } transition-colors`}
    >
      <Nav/>
      <div className="max-w-5xl mx-auto w-full">
        {/* Welcome Text */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Welcome,{" "}
            <span className="text-[#ff9ec6]">
              {user?.name?.split(" ")[0] || "Founder"}
            </span>
          </h1>
          <p className="mt-1 text-base text-gray-500">
            What would you like to explore?
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex w-full lg:w-[320px] rounded-xl overflow-hidden border mb-6 ${
            isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-300 bg-gray-100"
          }`}
        >
          <div
            onClick={() => setSelectedTab("mentor")}
            className={`${baseStyles} ${
              selectedTab === "mentor" ? active : inactive
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              Mentor
            </div>
          </div>

          <div
            onClick={() => setSelectedTab("community")}
            className={`${baseStyles} ${
              selectedTab === "community" ? active : inactive
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Community
            </div>
          </div>
        </div>

        {/* Section Content */}
        <div className="mt-6">
          {selectedTab === "mentor" ? (
            <>
              {/* Search Bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search by name or field..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9ec6] ${
                      isDarkMode
                        ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
                        : "bg-white border-gray-300 text-black placeholder:text-gray-500"
                    }`}
                  />
                </div>
              </div>

              {/* Mentor Cards */}
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredMentors.length > 0 ? (
                  filteredMentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No mentors found.</p>
                )}
              </div>
            </>
          ) : (
            <div className="text-gray-400">hello</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenteeDashboard;
