import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Box,Grid,Typography,
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
import loginEtudiant from "../../assets/loginEtudiant.png";
import { GridCheckCircleIcon } from '@mui/x-data-grid';
import { RegisterAction } from '../../redux/actions/userActions';
import { unwrapResult } from '@reduxjs/toolkit';

const situations = ["SCOLARISEE","NON_SCOLARISEE"];
const niveaux = [" PRIMAIRE","SECONDAIRE","AUTRE"];

const steps = ['Info élève', 'Vérification', 'Paiement'];

const RegisterEtudiant = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [formData, setFormData] = useState({
  nom_prenom_parent: '',
  nom_prenom_eleve: '',
  emailParent: '',
  phone: '',
  password: '',
  confirmPassword: '',
  date_naissance: '',
  Situation_Eleve : '',
  Niveau_SCOLAIRE: ''
});
const handleRegister = async () => {
  if (formData.password  !== formData.confirmPassword) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  try {
    console.log(formData)
    const resultAction = await dispatch(RegisterAction(formData));
    const result = unwrapResult(resultAction); // optionnel si tu veux accéder directement aux données

    console.log("Inscription réussie :", result);
    // ici tu peux rediriger, afficher un message de succès, etc.
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

    <Grid sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, bgcolor: '#C6EFF2'
    ,justifyContent:"space-between" ,height: '100vh'}}>
      
      {/* Left panel */}
      <Box sx={{  width: '40%', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center',marginLeft:"30px", 
       alignItems:"center"}}>
          <Box component="img"
                    src={loginEtudiant}
                    alt="illustration"
                    sx={{ width: '70%', maxWidth: 250 ,border:"2 px solid red"}}
                  />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Bienvenue sur <span style={{ color: '#4C5BD4' }}>KeySafe</span> 🎓
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          KeySafe est une plateforme qui aide chaque élève à apprendre à lire à son rythme, avec des activités ludiques et adaptées.
        </Typography>
        <Box>
        <Typography variant="subtitle1" fontWeight="bold" color="#080D50">
          Pourquoi s’inscrire ?
        </Typography>
        <ul style={{ paddingLeft: 20 }}>
          <li><GridCheckCircleIcon sx={{ color: '#52307c', mr: 1, fontSize: 20 }} /> Accès à des jeux et exercices pour apprendre à lire</li>
          <li><GridCheckCircleIcon sx={{ color: '#52307c', mr: 1, fontSize: 20 }} /> Un parcours personnalisé selon ton Niveau_SCOLAIRE</li>
          <li><GridCheckCircleIcon sx={{ color: '#52307c', mr: 1, fontSize: 20 }} />Apprends tout en t’amusant !</li>
        </ul>
        </Box>
         <Box mt={7} p={2} bgcolor="#e3f2fd" borderRadius="10px" width="55%">
          <Typography variant="body2" fontWeight="bold" color="#080D50">
            📧 Un email de confirmation sera envoyé, contenant les informations de connexion.
          </Typography>
        </Box>
      </Box>

      {/* Right panel */}
      <Box   sx={{
    width: "60%",
    p: 4,
    bgcolor: 'white',
    height: '100vh', // ou 'calc(100vh - marge)'
    overflowY: 'auto', // pour scroller si le contenu dépasse
    boxSizing: 'border-box'
  }}
>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
          
          {/* Stepper en haut */}
          <Stepper activeStep={activeStep} alternativeLabel  sx={{
    mb: 4,
    '& .MuiStepIcon-root': {
      color: '#ccc', // étapes non actives
    },
    '& .MuiStepIcon-root.Mui-completed': {
      color: '#a259ff', // étapes complétées
    },
    '& .MuiStepIcon-root.Mui-active': {
      color: '#a259ff', // étape active (cercle)
    },
  }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Étape 1 uniquement affichée pour l’instant */}
          {activeStep === 0 && (
           <>
              <Grid container spacing={4} sx={{mt:4,flexDirection:"column",display:"flex"}} >
                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <Grid item xs={12} md={6} width={"45%"}>
                  <TextField label="Nom et prénom du parent" fullWidth required
                  size="small" InputProps={{sx: {borderRadius: '12px'}}}
                  onChange={(e) => setFormData({ ...formData, nom_prenom_parent: e.target.value })} />
                </Grid>
                <Grid item xs={12} md={6} width={"45%"}>
                  <TextField label="Nom et prénom de l'élève" fullWidth required
                  size="small" InputProps={{sx: {borderRadius: '12px'}}}
                  onChange={(e) => setFormData({ ...formData, nom_prenom_eleve: e.target.value })} />
                </Grid>
                </Box>
                <Grid item xs={12} md={6}>
                  <TextField label="Numéro de téléphone de parent" fullWidth required placeholder="+216 21 345 678"
                  size="small" InputProps={{sx: {borderRadius: '12px'}}} 
                  onChange={(e) => setFormData({ ...formData, emailParent: e.target.value })}/>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Email de parent" type="email" fullWidth required placeholder="exemple@exemple.com"
                  size="small" InputProps={{sx: {borderRadius: '12px'}}}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </Grid>
                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <Grid width={"45%"} xs={12} md={6} >
                  <TextField
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    required
                    size="small" 
                    InputProps={{
                      sx: {borderRadius: '12px'},
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                 onChange={(e) => setFormData({ ...formData, password : e.target.value })} />
                </Grid>
                
                <Grid width={"45%"} item xs={12} md={6}>
                  <TextField
                    label="Confirmer le mot de passe"
                    type={showConfirmPassword ? 'text' : 'password'}
                    fullWidth
                    required
                     size="small" 
                    InputProps={{
                      sx: {borderRadius: '12px'},
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}/>
                </Grid>
                </Box>
                
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date de date_naissance de l'élève"
                    type="date"
                     size="small" InputProps={{sx: {borderRadius: '12px'}}}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                    
                 onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })} />
                </Grid>
                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <Grid width={"45%"} item xs={12} md={3}>
                  <TextField
                    select
                    label="Situation_Eleve  de l'élève"
                    fullWidth
                    required
                     size="small" InputProps={{sx: {borderRadius: '12px'}}}
                    onChange={(e) => setFormData({ ...formData, Situation_Eleve : e.target.value })}
                  >
                    {situations.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid width={"45%"}  item xs={12} md={3}>
                  <TextField
                    select
                    label="Niveau_SCOLAIRE scolaire"
                    fullWidth
                    required
                     size="small" InputProps={{sx: {borderRadius: '12px'}}}
                    onChange={(e) => setFormData({ ...formData, niveau: e.target.value })}
                  >
                    {niveaux.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                </Box>
              </Grid>
                       {/* Boutons de navigation */}
    <Box sx={{ mt: 7, display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="contained"
        onClick={handleBack}
        sx={{
          backgroundColor: '#ffc1cc',
          color: '#000',
          borderRadius: '20px',
          textTransform:"none",
          px: 4,
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#ffb0b8' }
        }}
      >
        <span style={{ marginRight: 8 }}>‹</span> Précédent
      </Button>

      <Button
        variant="contained"
        onClick={handleNext}
        sx={{
          backgroundColor: '#ffc1cc',
          color: '#000',
          borderRadius: '20px',
          textTransform:"none",
          px: 4,
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#ffb0b8' }
        }}
      >
        Suivant <span style={{ marginLeft: 8 }}>›</span>
      </Button>
    </Box>
    </> 
              
          )}
  
          {activeStep === 1 && (
  <>
    <Box sx={{ bgcolor: '#C6EFF2', p: 3, borderRadius: '10px' , }}>
      <Typography variant="h6" fontWeight="bold" color="#080D50" mb={2}>
        Validation des informations
      </Typography>

 <Grid container spacing={2}>
  {[
    { label: "Nom et prénom du parent :", value: formData.nomParent },
    { label: "Nom et prénom de l'élève :", value: formData.nomEleve },
    { label: "Email du parent :", value: formData.emailParent },
    { label: "Numéro de téléphone :", value: formData.telParent },
    { label: "Situation de l'élève :", value: formData.situation },
    { label: "Date de naissance de l'élève :", value: formData.naissance },
    { label: "Niveau scolaire :", value: formData.niveau }
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



      <Box mt={4} px={2}>
        <Typography variant="subtitle2" color="#234aa0" fontWeight="bold" gutterBottom>
          Déclaration
        </Typography>
        <Typography fontSize={14}>
          Je confirme que les informations ci-dessus sont exactes et je souhaite inscrire mon enfant
          sur la plateforme ALTUS pour l'accompagner dans son apprentissage.
        </Typography>
      </Box>
    </Box>

    {/* Boutons de navigation */}
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="contained"
        onClick={handleBack}
        sx={{
          backgroundColor: '#ffc1cc',
          color: '#000',
          borderRadius: '20px',
          px: 4,
          textTransform:"none",
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#ffb0b8' }
        }}
      >
        <span style={{ marginRight: 8 }}>‹</span> Précédent
      </Button>

      <Button
        variant="contained"
        onClick={handleNext}
        sx={{
          backgroundColor: '#ffc1cc',
          color: '#000',
          borderRadius: '20px',
          px: 4,
          fontWeight: 'bold',
          textTransform:"none",
          '&:hover': { backgroundColor: '#ffb0b8' }
        }}
      >
        Suivant <span style={{ marginLeft: 8 }}>›</span>
      </Button>
    </Box>
  </>
)}


          {activeStep === 2 && (
  <>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Onglets de paiement */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" sx={{ borderRadius: '10px' }}>Carte</Button>
        <Button variant="outlined" sx={{ borderRadius: '10px' }}>Virement bancaire</Button>
        <Button variant="outlined" sx={{ borderRadius: '10px' }}>Paiement par téléphone</Button>
      </Box>

      {/* Carte de crédit */}
      <Paper sx={{ p: 3, borderRadius: '16px', bgcolor: '#d9f5f8' }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>Carte de crédit</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              label="Numéro de carte *"
              placeholder="0000 0000 0000 0000"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="CVV *"
              placeholder="123"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nom de la carte *"
              placeholder="John Smith"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date d'expiration *"
              placeholder="MM/YY"
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Checkbox */}
        <Box mt={2}>
          <label>
            <input type="checkbox" style={{ marginRight: 8 }} />
            Mémorisez les détails de votre carte de crédit pour la prochaine fois
          </label>
        </Box>
      </Paper>
    </Box>

    {/* Navigation boutons */}
    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
      <Button
        variant="contained"
        onClick={handleBack}
        sx={{
          backgroundColor: '#ffc1cc',
          color: '#000',
          borderRadius: '20px',
          px: 4,
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#ffb0b8' }
        }}
      >
        <span style={{ marginRight: 8 }}>‹</span> Précédent
      </Button>

     <Button
  variant="contained"
  onClick={handleRegister}
  sx={{
    backgroundColor: '#ffc1cc',
    color: '#000',
    borderRadius: '20px',
    px: 4,
    fontWeight: 'bold',
    '&:hover': { backgroundColor: '#ffb0b8' }
  }}
>
  Valider <span style={{ marginLeft: 8 }}>›</span>
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
