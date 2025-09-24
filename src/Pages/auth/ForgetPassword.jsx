import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import keysafe from "../../assets/keysafe.jpg"
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { SendResetCode } from "../../redux/actions/userActions";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
const dispatch=useDispatch()
  const handleSendCode = async () => {
    try {
      await dispatch(SendResetCode(email));;
      toast.success("Un code vous a été envoyé par email !");
      navigate("/verify-code", { state: { email } });
    } catch (err) {
      toast.error("Erreur lors de l’envoi du code.");
    }
  };

  return (
    <Box sx={{ display:"flex", justifyContent:"center", mt:5 }}>
           {/* Logo en haut à gauche */}
                            <img
                              src={keysafe}
                              alt="Logo"
                              style={{
                                position: "absolute",
                                top: 20,
                                left: 20,
                                width: "190px", height: "auto",
                                backgroundColor: "#a7b0beff",
                              }}
                            />
      <Paper sx={{ p:3, width:400 }}>
        <Typography variant="h6">Mot de passe oublié</Typography>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          sx={{ mt:2 }}
        />
        <Button fullWidth variant="contained" sx={{ mt:2 }} onClick={handleSendCode}>
          Envoyer le code
        </Button>
      </Paper>
    </Box>
  );
};

export default ForgetPassword;
