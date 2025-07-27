import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import loginamelll from "../../assets/loginamell.png";
const specialties = ['Français', 'Mathématiques', 'Sciences', 'Anglais', 'Arabe'];
const steps = ['Informations de l’enseignant', 'Vérification'];

const RegisterEnseignant = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const [formData, setFormData] = useState({
  fullName: '',
  matricule: '1234567890',
  specialty: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  cvFile: null,
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleFileChange = (e) => {
  setFormData({ ...formData, cvFile: e.target.files[0] });
};


  return (
    <>
      <Grid
        sx={{
          backgroundColor: '#1A9BC3',
          display: 'flex',
          justifyContent: 'space-between',
          height: '100vh',
        }}
      >
        {/* Partie gauche (Présentation) */}
        <Grid
          sx={{
            backgroundColor: '#cce7f5',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            textAlign: 'center',
            width: '40%',
            
          }}
        >
          <Box
            component="img"
            src={loginamelll}
            alt="illustration"
            sx={{ width: '70%', maxWidth: 250, mb: 3 }}
          />
 <Typography variant="h5" color="#080D50" fontWeight="bold" gutterBottom>
          🎓 Bienvenue sur KeySafe
        </Typography>
        <Typography variant="body1" mb={3}>
          Notre objectif est d'aider chaque enseignant à accompagner ses élèves dans leur apprentissage.
        </Typography>
        <Typography variant="subtitle1" color="#080D50" fontWeight="bold" mb={1}>
          Pourquoi s'inscrire ?
        </Typography>
    {[
  "Des outils pédagogiques avancés",
  "Créez et gérez vos classes facilement",
  "Suivi personnalisé des élèves",
].map((text, index) => (
  <Box key={index} display="flex" alignItems="center" mb={1}>
    <CheckCircleIcon sx={{ color: '#52307c', mr: 1, fontSize: 20 }} />
    <Typography display="flex" alignItems="center">
      {text}
    </Typography>
  </Box>
))}


        <Box mt={7} p={2} bgcolor="#e3f2fd" borderRadius="10px" width="55%">
          <Typography variant="body2" fontWeight="bold" color="#080D50">
            Cette inscription est préliminaire et sera approuvée par un administrateur par courriel.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={7} sx={{ backgroundColor: '#f6f9faff', p: 4 ,width:"60%"}}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: '16px', backgroundColor: '#ffffff' }}>
         <Stepper
  activeStep={activeStep}
  alternativeLabel
  sx={{
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
  }}
>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField label="Nom et prénom *" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth />
              <TextField label="Matricule *" name="matricule" value={formData.matricule} onChange={handleChange} fullWidth />
              <FormControl fullWidth>
                <InputLabel>Spécialité(s) *</InputLabel>
                <Select name="specialty" value={formData.specialty} onChange={handleChange} label="Spécialité(s)">
                  {specialties.map((sp) => (
                    <MenuItem key={sp} value={sp}>{sp}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField label="Numéro de téléphone *" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
              <TextField label="Email académique *" name="email" value={formData.email} onChange={handleChange} fullWidth />
              <Box display="flex" gap={2}>
                <TextField label="Mot de passe *" type="password" name="password" value={formData.password} onChange={handleChange} fullWidth />
                <TextField label="Confirmer le mot de passe *" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} fullWidth />
              </Box>
              
              <Button variant="outlined" sx={{backgroundColor:"#52307c",color:"white",borderRadius:"20px",width:"60%"}}  component="label" >
                📎 Joindre un CV
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              <Box mt={2} textAlign="right">
                <Button variant="contained" sx={{backgroundColor:"#52307c",borderRadius:"15px"}}  onClick={handleNext}>Suivant</Button>
              </Box>
            </Box>
          )}

          {activeStep === 1 && (
            <>
              <Typography variant="h6" mb={3}>✅ Validation des informations</Typography>
              <Box sx={{ p: 2 }}>
                <Typography><strong>Nom et prénom:</strong> {formData.fullName}</Typography>
                <Typography><strong>Matricule:</strong> {formData.matricule}</Typography>
                <Typography><strong>Numéro de téléphone:</strong> {formData.phone}</Typography>
                <Typography><strong>Email académique:</strong> {formData.email}</Typography>
                <Typography><strong>Mot de passe:</strong> {formData.password}</Typography>
                <Typography><strong>CV:</strong> {formData.cvFile ? formData.cvFile.name : 'Non fourni'}</Typography>
              </Box>
              <Box mt={2} bgcolor="#e3f2fd" p={2} borderRadius="8px">
                <Typography variant="body2">
                  Je confirme que les informations ci-dessus sont correctes et que je suis un enseignant habilité par mon établissement à utiliser KeySafe.
                </Typography>
              </Box>
              <Box mt={4} display="flex" justifyContent="space-between">
                <Button variant="outlined" onClick={handleBack}>← Précédent</Button>
                <Button variant="contained" color="primary">Valider</Button>
              </Box>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
    </>
  );
};

export default RegisterEnseignant;
