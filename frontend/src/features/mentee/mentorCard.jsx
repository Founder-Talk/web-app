import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MentorCard({ mentor }) {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
      );
    }
    if (hasHalf && fullStars < 5) {
      stars.push(
        <Star key="half" className="h-4 w-4 text-yellow-400 fill-yellow-300" />
      );
    }
    while (stars.length < 5) {
      stars.push(
        <Star
          key={`empty-${stars.length}`}
          className="h-4 w-4 text-gray-300"
        />
      );
    }
    return stars;
  };

  const Avatar = () =>
    mentor.image ? (
      <img
        src={mentor.image}
        alt={mentor.name || "Mentor Avatar"}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-pink-300 shadow"
      />
    ) : (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pink-500 text-white flex items-center justify-center text-xl font-bold border-2 border-pink-300 shadow">
        {mentor?.name?.charAt(0)?.toUpperCase() || "M"}
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col justify-between w-full sm:max-w-[350px]">
      {/* Top Section */}
      <div className="flex items-center gap-4">
        <Avatar />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mentor.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.field}</p>
          <div className="flex items-center gap-1 mt-1">
            {renderStars(mentor.rating)}
            <span className="text-xs text-gray-500 ml-1">({mentor.rating})</span>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-4 mb-4 line-clamp-2">
        {mentor.caption}
      </p>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-sm text-pink-600 dark:text-pink-400 font-medium whitespace-nowrap">
          ₹{mentor.charge} / session
        </span>
        <button
          onClick={() => navigate(`/mentor/${mentor.id}`)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
        >
          Contact
        </button>
      </div>
    </div>
  );
}
