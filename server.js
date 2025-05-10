const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.js");
const taskRoutes = require("./routes/task.js");
const verifyToken = require("./middleware/authMiddleware");

dotenv.config();
const app = express();
app.use(cors({
  origin: "task-manager-frontend-h9nx-3u5lkg42y.vercel.app", // Replace with your frontend URL
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
   
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", verifyToken, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
