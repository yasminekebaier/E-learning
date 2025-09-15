import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  MenuItem,
  Paper,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import registerEtudiant1 from "../../assets/registerEtudiant1.png";
import { GridCheckCircleIcon } from '@mui/x-data-grid';
import { RegisterAction } from '../../redux/actions/userActions';
import { unwrapResult } from '@reduxjs/toolkit';

// const situations = ["SCOLARISEE", "NON_SCOLARISEE"];
// const niveaux = ["PRIMAIRE", "SECONDAIRE", "AUTRE"];

const steps = ['Info collaborateur', 'Vérification', 'Paiement'];

const RegisterEtudiant = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    
    nom_prenom_eleve: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    date_naissance: '',
    Situation_Eleve: '',
    Niveau_SCOLAIRE: ''
  });

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
       console.log("Form data envoyé :", formData);
      const resultAction = await dispatch(RegisterAction(formData));
      const result = unwrapResult(resultAction);

      console.log("Inscription réussie :", result);
      alert("Inscription réussie !");
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        bgcolor: '#cfeef1ff',
        justifyContent: "space-between",
        height: '100vh'
      }}
    >
      {/* Left panel */}
      <Box
        sx={{
          width: '40%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: "30px",
          alignItems: "center"
        }}
      >
        <Box
          component="img"
          src={registerEtudiant1}
          alt="illustration"
          sx={{ width: '70%', maxWidth: 250 }}
        />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Bienvenue sur <span style={{ color: '"#080D50"' }}>KeySafe</span> 🎓
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
KeySafe est la plateforme de formation TPSS conçue pour chaque collaborateur de l'industrie pétrolière. Elle vous aide à optimiser les processus administratifs et logistiques grâce à des outils numériques innovants et des contenus de formation fiables.        </Typography>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" color="#080D50">
            Pourquoi s’inscrire ?
          </Typography>
          <ul style={{ paddingLeft: 20 }}>
            <li><GridCheckCircleIcon sx={{ color: '#52307c', mr: 1, fontSize: 20 }} /> Accès à des formations interactives </li>
            <li><GridCheckCircleIcon sx={{ color: '#52307c', mr: 1, fontSize: 20 }} /> Optimisation des processus</li>
            <li><GridCheckCircleIcon sx={{ color: '#52307c', mr: 1, fontSize: 20 }} /> Engagement écoresponsable !</li>
            <li><GridCheckCircleIcon sx={{ color: '#52307c', mr: 1, fontSize: 20 }} /> Développement continu</li>

          </ul>
        </Box>
        <Box mt={7} p={2} bgcolor="#e3f2fd" borderRadius="10px" width="55%">
          <Typography variant="body2" fontWeight="bold" color="#080D50">
            📧 Un email de confirmation sera envoyé, contenant les informations de connexion.
          </Typography>
        </Box>
      </Box>

      {/* Right panel */}
      <Box
        sx={{
          width: "60%",
          p: 4,
          bgcolor: 'white',
          height: '100vh',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}
      >
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
          {/* Stepper */}
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              mb: 4,
              '& .MuiStepIcon-root': { color: '#ccc' },
              '& .MuiStepIcon-root.Mui-completed': { color: '#ffac59ff' },
              '& .MuiStepIcon-root.Mui-active': { color: '#ffac59ff' }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Étape 1 */}
          {activeStep === 0 && (
            <>
              <Grid container spacing={4} sx={{ mt: 4, flexDirection: "column", display: "flex" }}>
               
              
                  <Grid item xs={12} md={6} >
                    <TextField
                      label="Nom et prénom"
                      fullWidth
                      required
                      size="small"
                      InputProps={{ sx: { borderRadius: '12px' } }}
                      onChange={(e) => setFormData({ ...formData, nom_prenom_eleve: e.target.value })}
                    />
                  </Grid>
               

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    required
                    placeholder="exemple@exemple.com"
                    size="small"
                    InputProps={{ sx: { borderRadius: '12px' } }}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Numéro de téléphone"
                    fullWidth
                    required
                    placeholder="+216 21 345 678"
                    size="small"
                    InputProps={{ sx: { borderRadius: '12px' } }}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Grid>

                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <Grid width={"45%"} xs={12} md={6}>
                    <TextField
                      label="Mot de passe"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      required
                      size="small"
                      InputProps={{
                        sx: { borderRadius: '12px' },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </Grid>

                  <Grid width={"45%"} item xs={12} md={6}>
                    <TextField
                      label="Confirmer le mot de passe"
                      type={showConfirmPassword ? 'text' : 'password'}
                      fullWidth
                      required
                      size="small"
                      InputProps={{
                        sx: { borderRadius: '12px' },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                  </Grid>
                </Box>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date de naissance "
                    type="date"
                    size="small"
                    InputProps={{ sx: { borderRadius: '12px' } }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                    onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })}
                  />
                </Grid>
{/* 
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <Grid width={"45%"} item xs={12} md={3}>
                    <TextField
                      select
                      label="Situation du collaborateur"
                      fullWidth
                      required
                      size="small"
                      InputProps={{ sx: { borderRadius: '12px' } }}
                      onChange={(e) => setFormData({ ...formData, Situation_Eleve: e.target.value })}
                    >
                      {situations.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid width={"45%"} item xs={12} md={3}>
                    <TextField
                      select
                      label="Niveau scolaire"
                      fullWidth
                      required
                      size="small"
                      InputProps={{ sx: { borderRadius: '12px' } }}
                      onChange={(e) => setFormData({ ...formData, Niveau_SCOLAIRE: e.target.value })}
                    >
                      {niveaux.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Box> */}
              </Grid>

              {/* Navigation */}
              <Box sx={{ mt: 7, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{
                    backgroundColor: 'orange',
                    color: 'White',
                    borderRadius: '20px',
                    textTransform: "none",
                    px: 4,
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'orange' }
                  }}
                >
                  ‹ Précédent
                </Button>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    backgroundColor: 'orange',
                    color: 'White',
                    borderRadius: '20px',
                    textTransform: "none",
                    px: 4,
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'orange' }
                  }}
                >
                  Suivant ›
                </Button>
              </Box>
            </>
          )}

          {/* Étape 2 */}
          {activeStep === 1 && (
            <>
              <Box sx={{ bgcolor: '#C6EFF2', p: 3, borderRadius: '10px' }}>
                <Typography variant="h6" fontWeight="bold" color="#080D50" mb={2}>
                  Validation des informations
                </Typography>

                <Grid container spacing={2}>
                  {[
                    
                    { label: "Nom et prénom du collaborateur :", value: formData.nom_prenom_eleve },
                    { label: "Email :", value: formData.email },
                    { label: "Numéro de téléphone :", value: formData.phone },
                    // { label: "Situation du collaborateur :", value: formData.Situation_Eleve },
                    { label: "Date de naissance du collaborateur :", value: formData.date_naissance },
                    // { label: "Niveau scolaire :", value: formData.Niveau_SCOLAIRE }
                  ].map((item, index) => (
                    <Grid
                      key={index}
                      item
                      xs={12}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 15px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #ccc'
                      }}
                    >
                      <Typography fontWeight="bold" color="#080D50">
                        {item.label}
                      </Typography>
                      <Typography color="#234aa0">
                        {item.value || '—'}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Navigation */}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{
                    backgroundColor: 'orange',
                    color: 'White',
                    borderRadius: '20px',
                    px: 4,
                    textTransform: "none",
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'orange' }
                  }}
                >
                  ‹ Précédent
                </Button>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    backgroundColor: 'orange',
                    color: 'White',
                    borderRadius: '20px',
                    px: 4,
                    fontWeight: 'bold',
                    textTransform: "none",
                    '&:hover': { backgroundColor: 'orange' }
                  }}
                >
                  Suivant ›
                </Button>
              </Box>
            </>
          )}

          {/* Étape 3 */}
          {activeStep === 2 && (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  <Button variant="outlined" sx={{ borderRadius: '10px' }}>Carte</Button>
                  <Button variant="outlined" sx={{ borderRadius: '10px' }}>Virement bancaire</Button>
                  <Button variant="outlined" sx={{ borderRadius: '10px' }}>Paiement par téléphone</Button>
                </Box>

                <Paper sx={{ p: 3, borderRadius: '16px', bgcolor: '#d9f5f8' }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2}>Carte de crédit</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <TextField label="Numéro de carte *" placeholder="0000 0000 0000 0000" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField label="CVV *" placeholder="123" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Nom de la carte *" placeholder="John Smith" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField label="Date d'expiration *" placeholder="MM/YY" fullWidth />
                    </Grid>
                  </Grid>
                </Paper>
              </Box>

              {/* Navigation */}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{
                    backgroundColor: 'orange',
                    color: 'White',
                    borderRadius: '20px',
                    px: 4,
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'orange' }
                  }}
                >
                  ‹ Précédent
                </Button>

                <Button
                  variant="contained"
                  onClick={handleRegister}
                  sx={{
                    backgroundColor: 'orange',
                    color: 'White',
                    borderRadius: '20px',
                    px: 4,
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'orange' }
                  }}
                >
                  Valider ›
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Box>
    </Grid>
  );
};

export default RegisterEtudiant;
