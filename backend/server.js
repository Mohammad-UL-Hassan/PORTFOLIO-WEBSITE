const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const contactRoute = require("./routes/contact");
const authRoute = require("./routes/auth");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/contact", contactRoute);
app.use("/api/auth", authRoute);
app.get("/", (req, res) => {
    res.send("🚀 HForge Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});