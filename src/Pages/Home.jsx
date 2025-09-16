import React from "react";
import { Box, Button, Container, Grid, Typography, TextField, Paper } from "@mui/material";
import keysafe from '../assets/keysafe.jpg';
import learning1 from '../assets/learning1.png';
import NosServices from "../Components/NosServices";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Box sx={{minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
         
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
        }}
      >
        <img src={keysafe} alt="keysafe Logo" width={100} />
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography variant="body1" sx={{ cursor: "pointer" }}>À propos</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
            <Link to={"/inscription"}>
          <Button variant="contained" sx={{ bgcolor: "#ee983dff", color: "white",textTransform:"none",borderRadius:"20px" }}>
            Inscription
           </Button>
          </Link>
          <Link to={"/LoginEtudiant"}>
          <Button variant="outlined" sx={{borderRadius:"20px", borderColor: "#ee983dff", color: "#ee983dff",textTransform:"none" }}>
            Connexion
            </Button>
            </Link>
        </Box>
      </Box>

      {/* Hero Section */}
<Box
  px={2}
  py={2}
  sx={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",          // centre verticalement
    justifyContent: "center",      // centre horizontalement
    gap: "40px",
    backgroundColor: "#cce7f5",
    marginBottom: "20px",
    minHeight: "300px",            // hero réduit
    textAlign: "center",
  }}
>
  {/* Texte */}
  <Box sx={{ maxWidth: 700 }}>
    <Typography variant="h3" fontWeight="bold" color="#234aa0">
      KeySafe !
    </Typography>
    <Typography
      sx={{
        mt: 1,
        color: "#080D50",
        fontWeight: "600",
        fontSize: "16px",
      }}
    >
      Une plateforme d’apprentissage en ligne destinée aux collaborateurs du
      secteur industriel, facilitant leur participation aux formations grâce à
      des contenus fiables et interactifs.
    </Typography>
    <Link to={"/inscription"}>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: "#ee983dff",
          color: "white",
          borderRadius: "20px",
          textTransform: "none",
          fontSize: "19px",
          px: 3,
        }}
      >
        Commencer
      </Button>
    </Link>
  </Box>

  {/* Illustration */}
  <Box sx={{ display: "flex", justifyContent: "center",width:"50%" }}>
    <img
      src={learning1}
      alt="Illustration"
      style={{
        height:"50%", // réduit l’image
        width: "55%",
        
      }}
    />
  </Box>
</Box>



      {/* Aperçu de KeySafe */}
      <Paper 
      sx={{textAlign:"center", px:4, 
      py:7,width:"60%",margin:"auto", boxShadow: 8 ,
                      "&:hover": { boxShadow: 12}}} >
        <Typography variant="h4" fontWeight="bold" color="#234aa0">Aperçu de KeySafe !</Typography>
        <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mt: 2 }}>
         Keysafe est une plateforme e-learning destinée aux collaborateurs des industries, en particulier du secteur pétrolier. Elle propose un environnement de formation en ligne interactif, avec des contenus fiables et de qualité, favorisant l’engagement des utilisateurs et l’efficacité des apprentissages.
        </Typography>
        <Button variant="contained" sx={{borderRadius:"20px", mt: 4, bgcolor: "#ee983dff", color: "white",textTransform:"none" }}>
          Découvrir KeySafe
        </Button>
      </Paper>
<NosServices/>
     

 

      {/* Contact */}
      <Box sx={{ backgroundColor:"#cce7f5", py: 6,textAlign:"center" }}>
        <Container >
          <Typography variant="h5" fontWeight="bold">Contactez Nous !</Typography>
          <Typography sx={{ mt: 1, mb: 3 }}>
            Une question ? Écrivez-nous via le formulaire ci-dessous. Nous répondrons dans les plus brefs délais.
          </Typography>
          <Grid container spacing={2} sx={{display:"flex",flexDirection:"column"}}>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Nom" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Email" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField fullWidth label="Message" multiline rows={4} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" sx={{ bgcolor: "#ee983dff", color: "white",textTransform:"none",borderRadius:"20px" }}>
                Envoyer
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "linear-gradient(135deg, #acaeb1ff 0%, #a7b0beff 100%)", py: 4, px: 2 }}>
        <Grid container spacing={2} sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
          <Grid item xs={12} md={3}>
            <Typography fontWeight="bold" color="#234aa0">Contact</Typography>
            <Typography>Une Question ?</Typography>
            <Typography sx={{ textDecoration: "underline", cursor: "pointer" }}>Envoyez-nous un message</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography fontWeight="bold" color="#234aa0">Ressources</Typography>
            <Typography>À Propos</Typography>
            <Typography>Confidentialité</Typography>
            <Typography>Conditions</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography fontWeight="bold" color="#234aa0">Espace Utilisateurs</Typography>
            <Typography>Connexion Enseignant</Typography>
            <Typography>Connexion Admin</Typography>
            <Typography>Accès apprenant</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography fontWeight="bold" color="#234aa0">Adresse</Typography>
            <Typography>KeySafe Learning</Typography>
            <Typography>123 Rue de la Lecture</Typography>
            <Typography>Tunis, Tunisie</Typography>
            <Typography mt={2}>Langue 🌍 🇫🇷 🇺🇸</Typography>
          </Grid>
        </Grid>
        <Typography textAlign="center" mt={4}color="#234aa0">
          © 2025 KeySafe Learning. Tous droits réservés.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
