import { BrowserRouter, Routes, Route } from "react-router-dom";

// COMMON
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// PAGES
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateGig from "./pages/CreateGig";
import GigDetails from "./pages/GigDetails";
import BidsList from "./pages/BidsList";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/create-gig"
          element={
            <ProtectedRoute>
              <CreateGig />
            </ProtectedRoute>
          }
        />

        <Route path="/gig/:id" element={<GigDetails />} />

        <Route
          path="/gig/:id/bids"
          element={
            <ProtectedRoute>
              <BidsList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
