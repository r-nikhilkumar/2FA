const express = require("express");
const cors = require('cors');
const qrcode = require('qrcode');
const port = 8001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/get-qr-code', (req, res) => {
 var otp_auth_url = req.body.otp_auth_url;
 qrcode.toDataURL(otp_auth_url, function(err, data) {
  return res.status(200).json({ qr_code_link: data });
 });
});

app.listen(port, (error) => {
    console.log("Server running on port "+port);
});