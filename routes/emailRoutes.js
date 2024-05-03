const express = require("express");
const router = express.Router();
const multer = require("multer");
const { sendEmail } = require("../controllers/emailControllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define the route for sending emails
router.post("/sendEmail", upload.single("resume"), async (req, res) => {
  try {
    // Assuming sendEmail function returns a Promise
    await sendEmail(req.body, req.file); // Pass request body and uploaded file to the sendEmail function
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;
