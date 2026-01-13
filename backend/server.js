require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./src/utils/db");
const cors = require("cors");

app.use(cors({
  origin: ["https://gig-flow-rouge-nine.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

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
