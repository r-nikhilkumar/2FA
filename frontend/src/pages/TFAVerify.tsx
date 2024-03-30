import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TFAVerify: React.FC = () => {
  const [otp, setOTP] = useState<string[]>(["", "", "", "", "", ""]); // Initialize with 6 empty strings
  const navigate = useNavigate();
  const handleChange = (index: number, value: string) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
  };
  const handelSubmit = async (e: any) => {
    e.preventDefault();
    let response = await fetch(
      "http://localhost:8000/api/auth/verify-two-factor-auth/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: window.localStorage.getItem("user_id"),
          otp: otp.join(""),
        }),
      }
    );
    let responseJson = await response.json();
    if (responseJson.status == "Verification failed") {
      alert(responseJson["message"]);
    } else if (responseJson.status == "Verified") {
      navigate("/welcome");
    }
  };

  const redirectToSMS = (e: any) => {
    e.preventDefault();
    navigate("/verify-with-sms");
  };
  const redirectToMail = (e: any) => {
    e.preventDefault();
    navigate("/verify-with-mail");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
      <form>
        <div className="flex items-center justify-center space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 border rounded text-center text-xl font-semibold focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-8 block w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handelSubmit}
        >
          Submit OTP
        </button>
      </form>
      <div>Lost authenticator?</div>
      <div
        onClick={redirectToSMS}
        className="text-blue-500 cursor-pointer hover:underline"
      >
        Verify using SMS!
      </div>
      <div>OR</div>
      <div
        onClick={redirectToMail}
        className="text-blue-500 cursor-pointer hover:underline"
      >
        Verify using Mail!
      </div>
    </div>
  );
};

export default TFAVerify;
