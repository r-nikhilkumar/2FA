import { React, useState, useEffect, useContext } from "react";
import LoadingScreen from "react-loading-screen";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AuthContext from "../context/AuthProvider.tsx";
import Cookies from "universal-cookie";

function TFARegister() {
  const [qrCodeLink, setQrCodeLink] = useState("");
  const cookies = new Cookies();

  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    navigate("/login");
  };

  const getQRCode = async () => {
    let response = await fetch(
      "http://localhost:8000/api/auth/set-two-factor-auth/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: window.localStorage.getItem("user_id"),
        }),
      }
    );
    let responseJson = await response.json();
    setQrCodeLink(responseJson.qr_code);
    console.log(responseJson.qr_code);
  };

  useEffect(() => {
    getQRCode();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {qrCodeLink.length === 0 ? (
          <div>Loading</div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              QR Code
            </div>
            <img
              src={qrCodeLink}
              alt="QR Code"
              style={{ display: "block", margin: "0 auto" }}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
              Complete
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default TFARegister;
