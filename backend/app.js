require("dotenv").config();
const express = require("express");
const cors = require("cors"); // ✅ 1. Import cors
const app = express();
const connectionDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const dbgr = require("debug")("development: port");

connectionDB(); // ✅ Start DB

// ✅ 2. Use cors BEFORE routes
app.use(cors({
  origin: "http://localhost:5173", // ✅ allow only your frontend
  credentials: true               // ✅ allow cookies if needed
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const userRoute = require("./routes/user.routes");
const sessionRoute = require("./routes/session.routes");
const messageRoute = require("./routes/message.routes");
const adminRoute = require("./routes/admin.routes");
const postRoute = require("./routes/post.routes");

// Use routes
app.use("/user", userRoute);
app.use("/session", sessionRoute);
app.use("/message", messageRoute);
app.use("/admin", adminRoute);
app.use("/post", postRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the Mentorship Platform API");
});

// ✅ Global Catch/Error Handler
app.use((err, req, res, next) => {
  res.status(400).json({
    message: `Something Broke ${err.message}`
  });
});

const server = app.listen(PORT, () => {
  dbgr(`Server running on http://localhost:${PORT}`);
});

// Initialize Socket.io
const { initializeSocket } = require("./utils/socketService");
initializeSocket(server);
