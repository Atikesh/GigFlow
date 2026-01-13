import { useState } from "react";

export default function BidCard({ bid, onHire }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-1 shadow-xl bg-white border border-zinc-800 hover:border-white rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-black p-6 rounded-xl relative overflow-hidden">
        <div className="relative z-10">
          {/* Bid User Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-black">
                {bid.freelancerId?.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium">{bid.freelancerId?.username}</p>
                <p className="text-gray-400 text-xs">{bid.freelancerId?.email}</p>
              </div>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                bid.status === "hired"
                  ? "bg-green-600 text-white"
                  : bid.status === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-white"
              }`}
            >
              {bid.status}
            </span>
          </div>

          {/* Bid message */}
          <p className="text-sm text-gray-400 mb-3">
            {bid.message}
          </p>

          {/* Price + Hire Button */}
          <div className="flex items-center justify-between">
            <p className="text-lg text-white font-bold">₹{bid.price}</p>

            {bid.status === "pending" && (
              <button
                onClick={() => onHire(bid._id)}
                className="px-4 py-2 bg-white hover:bg-gray-200 text-black text-sm rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Hire
              </button>
            )}
          </div>
        </div>

        {/* Hover Effect */}
        <div
          className={`absolute inset-0 bg-white/5 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
