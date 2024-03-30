import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BackupVerify() {
  const [backupCode, setBackupCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate()
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setBackupCode(inputValue);
    setIsValid(inputValue.length === 10);
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/auth/verify-with-backup/", {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: window.localStorage.getItem("user_id"),
        backup_top : backupCode
      }),
    })
    const resJson = await res.json()
    if(resJson.status == "ok"){
        navigate("/welcome")
    }else{
        alert("Backup token is invalid")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        Enter Your Backup Token
      <input
        type="text"
        value={backupCode}
        onChange={handleChange}
        placeholder="Enter backup code"
        className="border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
      />
      {backupCode.length != 0 ? (
        isValid ? (
          <p className="text-green-500">Backup code is valid</p>
        ) : (
          <p className="text-red-500">Backup code is invalid</p>
        )
      ) : (
        ""
      )}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}

export default BackupVerify;
