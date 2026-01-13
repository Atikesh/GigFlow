require("dotenv").config();
const express = require("express");
const connectDb = require("./src/utils/db");
const app = express();

// Manual CORS (Render-safe)
const allowedOrigins = [
  "https://gig-flow-rouge-nine.vercel.app",
  "http://localhost:5173"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// Swagger
const swaggerDocs = require("./src/config/swagger");
swaggerDocs(app);

// Routes
app.use("/api/auth", require("./src/routes/authrouters"));
app.use("/api/gigs", require("./src/routes/gigrouters"));
app.use("/api/bids", require("./src/routes/bidrouters"));

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
