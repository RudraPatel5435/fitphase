require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { dbName: "fitnessData" });

app.use("/api/user", require("./routes/userRoutes"));

app.listen(3000, () => console.log("Server running on port 3000"));
