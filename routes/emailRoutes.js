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

router.post("/sendEmail",upload.single("resume"), sendEmail);

module.exports = router;
