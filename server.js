const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();

// Use the cors middleware
app.use(cors());

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
