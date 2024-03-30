import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function TFARegister() {
  const [qrCodeLink, setQrCodeLink] = useState("");
  const [backupToken, setBackupToken] = useState("");
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(backupToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  const handleSubmit = async (e: any) => {
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
    setBackupToken(responseJson.backup_token);
    // console.log(responseJson.qr_code);
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
            <div>
              <textarea readOnly value={backupToken} />
              <button onClick={copyToClipboard}>
                {copied ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : (
                  <FontAwesomeIcon icon={faCopy} />
                )}{" "}
              </button>
              {copied && <p>Copied to clipboard!</p>}
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Complete
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default TFARegister;
