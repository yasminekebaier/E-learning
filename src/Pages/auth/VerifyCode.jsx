import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import keysafe from "../../assets/keysafe.jpg"
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyResetCode } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
const dispatch=useDispatch()
const handleVerify = async () => {
  try {
    // ✅ on unwrap la promesse du thunk
    const res = await dispatch(VerifyResetCode({ email, code })).unwrap();

    if (res.valid) {
      toast.success("Code validé !");
      navigate("/reset-password", { state: { email, code } });
    } else {
      toast.error("Code invalide.");
    }
  } catch (err) {
    toast.error(err || "Erreur lors de la vérification.");
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
        <Typography variant="h6">Vérifier le code</Typography>
        <TextField
          fullWidth
          label="Code reçu par email"
          value={code}
          onChange={(e)=>setCode(e.target.value)}
          sx={{ mt:2 }}
        />
        <Button fullWidth variant="contained" sx={{ mt:2 }} onClick={handleVerify}>
          Vérifier
        </Button>
      </Paper>
    </Box>
  );
};

export default VerifyCode;
