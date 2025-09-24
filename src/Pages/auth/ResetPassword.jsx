import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import keysafe from "../../assets/keysafe.jpg"
import { useLocation, useNavigate } from "react-router-dom";
import { ResetPasswords } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { email, code } = location.state || {};
const dispatch=useDispatch()
  const handleReset = async () => {
    try {
      await dispatch(ResetPasswords({ email, code, newPassword }))
      toast.success("Mot de passe réinitialisé avec succès !");
      navigate("/");
    } catch (err) {
      toast.error("Erreur lors de la réinitialisation.");
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
        <Typography variant="h6">Nouveau mot de passe</Typography>
        <TextField
          fullWidth
          label="Nouveau mot de passe"
          type="password"
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          sx={{ mt:2 }}
        />
        <Button fullWidth variant="contained" sx={{ mt:2 }} onClick={handleReset}>
          Réinitialiser
        </Button>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
