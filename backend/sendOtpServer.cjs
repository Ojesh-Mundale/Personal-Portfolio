const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const otpSendTimestamps = new Map();

// In-memory store for OTPs per email
const otpStore = new Map();

const OTP_VALIDITY_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

app.post('/store-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const now = Date.now();
  const lastSent = otpSendTimestamps.get(email);

  if (lastSent && now - lastSent < OTP_VALIDITY_DURATION) {
    const waitTime = Math.ceil((OTP_VALIDITY_DURATION - (now - lastSent)) / 1000);
    return res.status(429).json({ error: `Please wait ${waitTime} seconds before requesting another OTP.` });
  }

  otpSendTimestamps.set(email, now);
  otpStore.set(email, { otp, timestamp: now });
  res.json({ message: 'OTP stored successfully' });
});

app.post('/send-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const now = Date.now();
  const lastSent = otpSendTimestamps.get(email);

  if (lastSent && now - lastSent < OTP_VALIDITY_DURATION) {
    const waitTime = Math.ceil((OTP_VALIDITY_DURATION - (now - lastSent)) / 1000);
    return res.status(429).json({ error: `Please wait ${waitTime} seconds before requesting another OTP.` });
  }

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'your-verified-email@example.com', // Replace with verified sender
    subject: 'Your OTP Code',
    html: `
      <div style="font-family: system-ui, sans-serif, Arial; font-size: 16px;">
        <p>Hi,</p>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code is valid for 5 minutes.</p>
        <p>Best regards,<br/>Ojesh Mundale</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    otpSendTimestamps.set(email, now);
    otpStore.set(email, { otp, timestamp: now });
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).json({ error: 'Failed to send OTP email' });
  }
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }
  const record = otpStore.get(email);
  if (!record) {
    return res.status(400).json({ error: 'No OTP found for this email' });
  }
  const now = Date.now();
  if (now - record.timestamp > OTP_VALIDITY_DURATION) {
    otpStore.delete(email);
    return res.status(400).json({ error: 'OTP expired' });
  }
  if (record.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  otpStore.delete(email);
  return res.json({ message: 'OTP verified successfully' });
});

// New endpoint to get remaining cooldown time for an email
app.get('/otp-cooldown', (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Email query parameter is required' });
  }
  const now = Date.now();
  const lastSent = otpSendTimestamps.get(email);
  if (lastSent && now - lastSent < OTP_VALIDITY_DURATION) {
    const remaining = Math.ceil((OTP_VALIDITY_DURATION - (now - lastSent)) / 1000);
    return res.json({ cooldown: remaining });
  } else {
    return res.json({ cooldown: 0 });
  }
});

app.listen(port, () => {
  console.log(`OTP send server running on port ${port}`);
});
