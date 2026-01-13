import React, { useEffect, useState } from "react";
import api from "../services/api";
import GigCard from "../components/GigCard";
import { Search } from "lucide-react";

const Home = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchGigs = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/gigs?search=${search}`);
      setGigs(res.data);
    } catch (error) {
      console.log("Error fetching gigs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, [search]);

  return (
    <div className="min-h-screen px-6 md:px-12 py-10">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
          Browse All Gigs
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Open + Assigned gigs available
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-lg">
          <Search className="absolute top-3 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search gigs..."
            className="w-full h-12 pl-10 pr-4 border rounded-lg shadow-md focus:ring-2 focus:ring-black outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 mt-16">Loading...</div>
      ) : gigs.length === 0 ? (
        <div className="text-center text-gray-600 mt-20 text-xl">
          No gigs found.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {gigs.map((gig) => (
            <GigCard key={gig._id} gig={gig} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
