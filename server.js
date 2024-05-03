const express = require("express");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/emailRoutes");
const app = express();
const cors = require('cors');

dotenv.config();

app.use(cors({
  origin: '*', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));


app.use(express.json()); // Tell the server to accept JSON data from the frontend

// Signup and login routes
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT; 
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
