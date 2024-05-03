const express = require("express");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/emailRoutes");
const app = express();
dotenv.config();

// const cors = require("cors");
// const corsOptions = {
//   origin: "*", // Allow requests from any origin
//   credentials: true, // Access-Control-Allow-Credentials header
//   optionSuccessStatus: 200, // Set the success status code to 200
// };

// app.use(cors(corsOptions)); // Use the configured CORS options

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json()); // Tell the server to accept JSON data from the frontend

// Signup and login routes
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000; // Set a default port if PORT environment variable is not provided
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
