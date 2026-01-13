import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const CreateGig = () => {
  const navigate = useNavigate();

  const [gig, setGig] = useState({
    title: "",
    description: "",
    budget: "",
  });

  // Input Handling
  const handleInput = (e) => {
    setGig({
      ...gig,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Gig
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gig.title || !gig.description || !gig.budget) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await api.post("/gigs", gig);

      if (res.status === 201) {
        toast.success("Gig created successfully!");
        setGig({ title: "", description: "", budget: "" });
        navigate("/"); // Redirect to Home
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create gig!");
    }
  };

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* LEFT FORM SECTION */}
      <div className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-black">Create a New Gig</h2>

          <p className="mt-2 text-sm text-gray-600">
            Post a project and start getting bids from skilled freelancers.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            
            {/* Gig Title */}
            <div>
              <label className="text-base font-medium text-gray-900">
                Gig Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="E.g. Need a website developer"
                required
                className="mt-2 w-full h-11 px-3 border rounded-md focus:ring-1 focus:ring-black"
                value={gig.title}
                onChange={handleInput}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-base font-medium text-gray-900">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your project requirements..."
                required
                rows="4"
                className="mt-2 w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-black"
                value={gig.description}
                onChange={handleInput}
              ></textarea>
            </div>

            {/* Budget */}
            <div>
              <label className="text-base font-medium text-gray-900">
                Budget (₹)
              </label>
              <input
                type="number"
                name="budget"
                placeholder="Enter your budget"
                required
                className="mt-2 w-full h-11 px-3 border rounded-md focus:ring-1 focus:ring-black"
                value={gig.budget}
                onChange={handleInput}
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-3 font-semibold text-white hover:bg-black/80"
            >
              Create Gig <ArrowRight className="ml-2" size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden lg:block">
        <img
          className="w-full h-full object-cover rounded-l-xl"
          src="https://images.unsplash.com/photo-1581091012184-5c67f1a8e9c0"
          alt="Create Gig"
        />
      </div>
    </section>
  );
};

export default CreateGig;
