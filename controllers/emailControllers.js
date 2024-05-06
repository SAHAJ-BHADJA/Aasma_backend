const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const e = require("express");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, email, contact, url, cv, jobTitle} = req.body;
  // console.log(firstName, lastName, email, contact, gender, subjects, resume, url, cv);

  const resumeFile = req.file;

  var mailOptions = {
    from: process.env.SMTP_MAIL ,
    to: "zackmacwan@gmail.com,sahajspam1@gmail.com",
    cc: "hima@aasmatech.com",
    subject: `${firstName} ${lastName}'s Job Application for ${jobTitle}`,
    text: `Hello,
    I wish to apply for the position of ${jobTitle} that is listed on your website. The role and responsibilities listed in the job description match my interests and skills. I believe that I am a good candidate for this position.

    ${cv}

    I have attached my resume for your attention. I hope they can help you learn more about my background, my qualification and my experience.

    Thank you for your valuable time. I look forward to hearing from you about this job opportunity.

    Sincerely,
    ${firstName} ${lastName}
    ${email}
    ${contact}
    ${url}`,
    attachments: [
      {
        filename: resumeFile.originalname,
        path: resumeFile.path,
      },
    ],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, error: 'Failed to send email.' });
    } else {
      console.log("Email sent successfully!");
      res.status(200).json({ success: true, message: 'Email sent successfully.' });
    }
  });
});

module.exports = { sendEmail };
