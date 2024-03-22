import { React, useState, useEffect, useContext } from 'react';
import LoadingScreen from "react-loading-screen";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthContext from '../context/AuthContext.ts'
import Cookies from "universal-cookie";

function TFARegister() {
	const [qrCodeLink, setQrCodeLink] = useState("");
	const cookies = new Cookies();

	let { user_id_exists, loginUser } = useContext(AuthContext);
	const navigate = useNavigate();

  const handleSubmit = async() => {
    navigate('/login');
  }

	const getQRCode = async() => {
		let response = await fetch('http://localhost:8000/set-two-factor-auth/', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ user_id: cookies.get('user_id') }),
	    });
	    let responseJson = await response.json();
	    setQrCodeLink(responseJson.qr_code);
	    cookies.remove('user_id');
	}

	useEffect(() => {
		if(!user_id_exists) {
      alert("Can't enter this page");
			navigate('/login');
		}
    else {
      getQRCode();
    }
	}, []);

	return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Scan
          </Typography>
          <img src={qrCodeLink} />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

export default TFARegister;



