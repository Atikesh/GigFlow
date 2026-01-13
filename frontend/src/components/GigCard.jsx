import { useState } from "react";
import { Link } from "react-router-dom";

export default function GigCard({ gig }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-1 shadow-2xl bg-white border border-zinc-800 hover:border-white rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-black p-6 sm:p-8 rounded-xl relative overflow-hidden">
        <div className="relative z-10">

          {/* Status Tag */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-white bg-white/10 px-2 py-1 rounded-full">
              {gig.status === "open" ? "Open" : "Assigned"}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-xl font-bold text-white mb-3">
            {gig.title}
          </h4>

          {/* Assigned Info */}
          {gig.status === "assigned" && gig.assignedTo && (
            <p className="text-xs text-yellow-300 mb-2">
              Assigned to: {gig.assignedTo.username}
            </p>
          )}

          {/* Description */}
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {gig.description}
          </p>

          {/* Budget + Button */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-semibold text-white">
              ₹{gig.budget}
            </span>

            <Link
              to={`/gig/${gig._id}`}
              className="px-4 py-2 bg-white hover:bg-gray-200 text-black text-sm rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-white/5 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}
