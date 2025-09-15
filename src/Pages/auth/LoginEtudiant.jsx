import React, { useState } from 'react';
import {
  Grid, Box, Typography, TextField, Button,
  InputAdornment, IconButton, Paper,
  MenuItem,
  Menu,
  Avatar
} from '@mui/material';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import inscription from "../../assets/inscription.png";
import { useDispatch } from 'react-redux';
import { LoginAction } from '../../redux/actions/userActions'; // à adapter
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import keysafe from '../../assets/keysafe.jpg';
import ReactCountryFlag from "react-country-flag";
const LoginEtudiant = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // -------- Gestion du menu de langue --------
  const [langMenu, setLangMenu] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('fr'); 
  // Ouvre menu
  const handleFlagClose = () => setLangMenu(null); 
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang); 
    handleFlagClose();
  };
const handleFlagClick = (e) => setLangMenu(e.currentTarget); 
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

   const handleLogin = async () => {
    try {
      const resultAction = await dispatch(LoginAction(formData)); // adapte selon ta logique
      console.log("Connexion réussie :", resultAction);
      navigate('/app'); // redirection à modifier selon ton app
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Email ou mot de passe incorrect.");
    }
  };

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Grid container sx={{ height: '100vh', bgcolor: '#cfeef1ff' }}>
      
      {/* Left - Illustration */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4,width:"50%" }}>
        <Box component="img" src={inscription} alt="Login Illustration" sx={{ width: '70%', maxWidth: 300 }} />
        <Typography variant="h4" fontWeight="bold" mt={3}>
          Bienvenue sur <span style={{ color: "#080D50" }}>KeySafe</span> 🎓
        </Typography>
        <Typography variant="h3" mt={1} textAlign="center" maxWidth={400}>
          Connectez-vous pour accéder à votre plateforme de formation et optimisez votre parcours professionnel avec TPSS.
        </Typography>
      </Grid>

      {/* Right - Form */}
      <Grid item xs={12} md={6} sx={{ backgroundColor: 'white', display: 'flex', 
        alignItems: 'center', justifyContent: 'center',width:"50%" }}>
        <Paper elevation={3} sx={{ width: '80%', maxWidth: 400, p: 4, borderRadius: 4 }}>
           {/* Ligne du logo et du drapeau langue */}
          <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 0, md: 0 },
            pt: { xs: 2, md: 3 },
            pb: 0
          }}>
            <img src={keysafe} alt="Logo" style={{ width: 170, height: 100, objectFit: "contain" }} />
            <Box>
              <IconButton onClick={handleFlagClick}
                sx={{
                  p: 0.7,
                  background: "#fff",
                  border: "1px solid #e0e0e0",
                  "&:hover": { background: "#f5faff" },
                  mr: 2,
                }}>

                <ReactCountryFlag 
                  countryCode={selectedLanguage === 'fr' ? 'FR' : 'GB'} svg 
                  style={{ width: 28, height: 18, borderRadius: 3 }}
                />
              </IconButton>
              <Menu
                anchorEl={langMenu}
                open={Boolean(langMenu)}
                onClose={handleFlagClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={() => handleLanguageChange('fr')}>
                  <ReactCountryFlag countryCode="FR" svg style={{ width: 26, marginRight: 10 }} />
                  Français
                </MenuItem>
                <MenuItem onClick={() => handleLanguageChange('en')}>
                  <ReactCountryFlag countryCode="GB" svg style={{ width: 26, marginRight: 10 }} />
                  English
                </MenuItem>
              </Menu>
            </Box>
          </Box>
                  {/* --------- Formulaire --------- */}
          <Box sx={{
            flex: 1,
            width: "100%",
            maxWidth: 410,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 2, md: 0 }
          }}>
       <Avatar sx={{ m: 1, bgcolor: "#1890ff" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight={600} mb={2} sx={{ textAlign: "center" }}>
              {t("Connexion")}
            </Typography>

          <TextField
            label="username"
            type="text" 
            fullWidth
            required
            margin="normal"
            size="small"
            InputProps={{ sx: { borderRadius: '12px' } }}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />

          <TextField
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            required
            margin="normal"
            size="small"
            InputProps={{
              sx: { borderRadius: '12px' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              mt: 3,
              backgroundColor: 'orange',
              color: '#000',
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: 'orange' }
            }}
          >
            Se connecter
          </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
    </>
  );
};

export default LoginEtudiant;
