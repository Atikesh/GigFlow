import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useSelector } from "react-redux";

const BidsList = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchBids = async () => {
      const res = await api.get(`/bids/${id}`);
      setBids(res.data);
    };
    fetchBids();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Bids for this Gig</h2>

      {bids.map((b) => (
        <div
          key={b._id}
          className={`p-4 border rounded mb-4 ${
            b.bidderId === user?.userId ? "bg-green-100" : "bg-white"
          }`}
        >
          <p className="text-lg font-semibold">₹{b.price}</p>
          <p className="text-gray-600">{b.message}</p>

          <small className="text-gray-500">
            By: {b.bidderName} {b.bidderId === user?.userId && "(You)"}
          </small>
        </div>
      ))}
    </div>
  );
};

export default BidsList;
