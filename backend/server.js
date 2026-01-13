require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./src/utils/db");
const cors = require("cors");

const allowedOrigins = [
  "https://gig-flow-rouge-nine.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Handle preflight requests
app.options("*", cors());

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
