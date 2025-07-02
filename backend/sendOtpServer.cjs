const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/send-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to: email,
    subject: 'Your OTP Code',
    html: `
      <div style="font-family: system-ui, sans-serif, Arial; font-size: 16px;">
        <p>Hi,</p>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code is valid for 5 minutes.</p>
        <p>Best regards,<br/>Your Company</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ error: 'Failed to send OTP email' });
  }
});

app.listen(port, () => {
  console.log(`OTP send server running on port ${port}`);
});
