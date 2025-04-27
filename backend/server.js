const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/problems", require("./routes/problemRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes"));


app.listen(5004, () => console.log("Server running on port 5004"));
