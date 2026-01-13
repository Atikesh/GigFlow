import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [bid, setBid] = useState({ message: "", price: "" });

  // FETCH GIG DETAILS
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await api.get(`/gigs/${id}`);
        setGig(res.data);
      } catch (err) {
        toast.error("Error fetching gig details");
      }
    };
    fetchGig();
  }, [id]);

  // FETCH BIDS
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await api.get(`/bids/${id}`);
        setBids(res.data);
      } catch {
        toast.error("Failed to load bids");
      }
    };
    fetchBids();
  }, [id]);

  // SUBMIT BID
  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    try {
      await api.post("/bids", {
        gigId: id,
        message: bid.message,
        price: bid.price,
      });

      toast.success("Bid Submitted Successfully!");
      setBid({ message: "", price: "" });

      const refreshed = await api.get(`/bids/${id}`);
      setBids(refreshed.data);

    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to submit bid");
    }
  };

  if (!gig) return <p className="text-center mt-20">Loading...</p>;

  const isOwner = gig.ownerId?._id === user?.userId;
  const isAssigned = gig.status === "assigned";

  return (
    <div className="max-w-7xl mx-auto px-4 pt-10 pb-20">

      <h1 className="text-4xl font-bold">{gig.title}</h1>

      <p className="text-gray-700 mt-2">
        Posted by: <strong>{gig.ownerId?.username}</strong> ({gig.ownerId?.email})
      </p>

      {/* Assigned Info */}
      {isAssigned && gig.assignedTo && (
        <p className="mt-2 text-blue-700 font-semibold">
          Assigned To: {gig.assignedTo.username} ({gig.assignedTo.email})
        </p>
      )}

      <p className="text-lg text-gray-600 mt-3">{gig.description}</p>

      <p className="text-2xl font-semibold text-green-700 mt-3">
        Budget: ₹{gig.budget}
      </p>

      <p className="mt-2 font-bold">
        Status:{" "}
        <span className={isAssigned ? "text-red-600" : "text-green-600"}>
          {gig.status.toUpperCase()}
        </span>
      </p>

      {/* BID FORM (Only logged-in, not owner, not assigned) */}
      {user && !isOwner && !isAssigned && (
        <div className="mt-12 p-8 border rounded-xl bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-4">Submit Your Bid</h2>

          <form onSubmit={handleBidSubmit} className="space-y-4">

            <textarea
              className="w-full border px-4 py-3 rounded"
              placeholder="Write your proposal..."
              value={bid.message}
              onChange={(e) => setBid({ ...bid, message: e.target.value })}
            />

            <input
              type="number"
              className="w-full border px-4 py-3 rounded"
              placeholder="Your bid price"
              value={bid.price}
              onChange={(e) => setBid({ ...bid, price: e.target.value })}
            />

            <button type="submit" className="px-6 py-3 bg-black text-white rounded">
              Submit Bid
            </button>
          </form>
        </div>
      )}

      {/* If not logged in show message */}
      {!user && (
        <p className="mt-8 text-blue-600 font-semibold">
          Please <Link to="/login" className="underline">login</Link> to submit a bid.
        </p>
      )}

      {/* BIDS LIST */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">All Bids ({bids.length})</h2>

        {bids.length === 0 ? (
          <p className="text-gray-600">No bids yet.</p>
        ) : (
          <div className="space-y-4">
            {bids.map((b) => (
              <div
                key={b._id}
                className={`border p-4 rounded-lg shadow-sm ${
                  b.freelancerId?._id === user?.userId ? "bg-blue-50 border-blue-400" : ""
                }`}
              >
                <p className="font-semibold">
                  {b.freelancerId?.username} — {b.freelancerId?.email}
                </p>

                <p className="mt-2">{b.message}</p>

                <p className="font-bold text-green-700 mt-1">₹{b.price}</p>

                {/* OWNER CAN HIRE */}
                {isOwner && b.status === "pending" && !isAssigned && (
                  <button
                    className="mt-3 bg-black text-white px-4 py-2 rounded"
                    onClick={async () => {
                      try {
                        await api.patch(`/bids/${b._id}/hire`);
                        toast.success("Freelancer Hired!");

                        const updatedGig = await api.get(`/gigs/${id}`);
                        setGig(updatedGig.data);

                        const updatedBids = await api.get(`/bids/${id}`);
                        setBids(updatedBids.data);

                      } catch {
                        toast.error("Hiring failed");
                      }
                    }}
                  >
                    Hire This Freelancer
                  </button>
                )}

                {/* STATUS */}
                {b.status !== "pending" && (
                  <p className="mt-2 font-semibold">
                    Status:{" "}
                    <span className={b.status === "hired" ? "text-green-600" : "text-red-600"}>
                      {b.status.toUpperCase()}
                    </span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isAssigned && !isOwner && (
        <p className="text-red-600 font-bold mt-5">
          This gig is already assigned — bidding closed.
        </p>
      )}
    </div>
  );
};

export default GigDetails;
