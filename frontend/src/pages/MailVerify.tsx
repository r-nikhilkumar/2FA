import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MailVerify = () => {
  const [mail, setMail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:8000/api/auth/mailverify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: window.localStorage.getItem("user_id"),
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        setMail(resJson.mail);
      });
  });

  const handleVerificationInputChange = async (event: any) => {
    setVerificationCode(event.target.value);
  };

  const handleVerificationRequest = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/auth/send-mail-otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: window.localStorage.getItem("user_id"),
      }),
    });
    setIsVerificationRequested(true);
  };

  const handleSubmitVerification =async () => {
    const response = await fetch("http://127.0.0.1:8000/api/auth/verify-sms-otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: window.localStorage.getItem("user_id"),
        otp : verificationCode
      }),
    });
    const resJson = await response.json()
    if(resJson.status=="verification failed"){
        alert(resJson.message)
    }
    else if(resJson.status=="ok"){
        navigate("/welcome")
    }

  };

  return (
    <div className="max-w-md mx-auto p-4">
      {mail && !isVerificationRequested ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg font-semibold mb-4">
            Please confirm your Email Address:
          </p>
          <p className="text-xl mb-4">
            {mail}
          </p>
          <button
            onClick={handleVerificationRequest}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400"
          >
            Send Verification Code
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg font-semibold mb-4">
            A verification code has been sent to
            {mail}.
          </p>
          <label
            htmlFor="verificationCode"
            className="block text-sm font-semibold mb-2"
          >
            Verification Code:
          </label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={handleVerificationInputChange}
            placeholder="Enter the verification code"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSubmitVerification}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-400"
          >
            Submit Verification Code
          </button>
        </div>
      )}
    </div>
  );
};

export default MailVerify;
