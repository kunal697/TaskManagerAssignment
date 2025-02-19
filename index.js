require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const apiLimiter = require("./middleware/rateLimiter");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(apiLimiter);            // 100 request in 10 min for each api


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.get("/", (req, res) => {
  return res.json({ message: "Server is running" });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
