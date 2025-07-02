import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpSentTime, setOtpSentTime] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpCooldown, setOtpCooldown] = useState(0);

  const form = useRef();

  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setOtpVerified(false);
    setOtpError("");
  };
  const handleMessage = (e) => setMessage(e.target.value);
  const handleEnteredOtp = (e) => setEnteredOtp(e.target.value);

  useEffect(() => {
    let timer;
    if (otpCooldown > 0) {
      timer = setTimeout(() => setOtpCooldown(otpCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpCooldown]);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtp = () => {
    if (otpCooldown > 0) {
      setOtpError(`Please wait ${otpCooldown} seconds before requesting another OTP.`);
      return;
    }
    if (!email) {
      setOtpError("Please enter your email first.");
      return;
    }
    const newOtp = generateOtp();
    setOtp(newOtp);
    setOtpSentTime(Date.now());
    setOtpError("");
    // Send OTP email using backend API
    fetch("http://localhost:5000/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: newOtp,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send OTP");
        }
        return response.json();
      })
      .then(() => {
        setSuccess("OTP sent to your email.");
        setOtpCooldown(300); // 5 minutes cooldown
      })
      .catch((error) => {
        console.error("Failed to send OTP...", error);
        setOtpError("Failed to send OTP. Please try again.");
      });
  };

  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setOtpVerified(true);
      setOtpError("");
      setSuccess("OTP verified successfully.");
    } else {
      setOtpVerified(false);
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setOtpError("Please verify your email with OTP before submitting.");
      return;
    }
    // Send original email
    emailjs
      .send("service_hcrtsrp", "template_fgacdp5", {
        name: name,
        email: email,
        message: message,
      }, "d5_m5gKH9o-qJit99")
      .then(
        () => {
          // After original email sent, send reply email
          emailjs
            .send(
              "service_hcrtsrp",
              "template_h117ljp",
              {
                name: name,
                email: email,
                message: message,
              },
              "d5_m5gKH9o-qJit99"
            )
            .then(
              () => {
                setEmail("");
                setName("");
                setMessage("");
                setOtp("");
                setEnteredOtp("");
                setOtpVerified(false);
                setSuccess("Message Sent Successfully!");
              },
              (error) => {
                console.log("Reply email FAILED...", error.text);
                setSuccess("Failed to send reply email. Please try again.");
              }
            );
        },
        (error) => {
          console.log("Original email FAILED...", error.text);
          setSuccess("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div>
      <p className="text-cyan">{success}</p>
      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="h-12 rounded-lg bg-lightBrown px-2"
          value={name}
          onChange={handleName}
        />
        <div className="flex gap-2 items-center">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="h-12 rounded-lg bg-lightBrown px-2 flex-grow"
            value={email}
            onChange={handleEmail}
            disabled={otpVerified}
          />
          <button
            type="button"
            onClick={sendOtp}
            disabled={otpCooldown > 0 || otpVerified}
            className="rounded-lg border border-cyan text-white h-12 px-4 font-bold text-sm hover:bg-darkCyan bg-cyan transition-all duration-500"
          >
            {otpCooldown > 0 ? `Resend OTP (${otpCooldown}s)` : "Send OTP"}
          </button>
        </div>
        {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
        {!otpVerified && (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Enter OTP"
              value={enteredOtp}
              onChange={handleEnteredOtp}
              className="h-12 rounded-lg bg-lightBrown px-2 flex-grow"
            />
            <button
              type="button"
              onClick={verifyOtp}
              className="rounded-lg border border-cyan text-white h-12 px-4 font-bold text-sm hover:bg-darkCyan bg-cyan transition-all duration-500"
            >
              Verify
            </button>
          </div>
        )}
        <textarea
          name="message"
          rows="9"
          cols="50"
          placeholder="Message"
          required
          className="rounded-lg bg-lightBrown p-2"
          value={message}
          onChange={handleMessage}
        />
        <button
          type="submit"
          disabled={!otpVerified}
          className="w-full rounded-lg border border-cyan text-white h-12 font-bold text-xl hover:bg-darkCyan bg-cyan transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
