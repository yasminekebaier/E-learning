import React from "react";
import { Box, Button, Container, Grid, Typography, TextField, Paper } from "@mui/material";
import keysafe from '../assets/keysafe.jpg';
import learning1 from '../assets/learning1.jpg';
import NosServices from "../Components/NosServices";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box sx={{ minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 2,
          backgroundColor: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Logo KeySafe agrandi */}
        <img src={keysafe} alt="keysafe Logo"  style={{ width: "190px", height: "auto" }}/> {/* Augmentation de la taille */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography variant="body1" sx={{ cursor: "pointer", color: "#234aa0", fontWeight: "600" }}>À propos</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to={"/inscription"}>
            <Button variant="contained" sx={{ bgcolor: "#ee983dff", color: "white", textTransform: "none", borderRadius: "20px" }}>
              Inscription
            </Button>
          </Link>
          <Link to={"/LoginEtudiant"}>
            <Button variant="outlined" sx={{ borderRadius: "20px", borderColor: "#ee983dff", color: "#ee983dff", textTransform: "none" }}>
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
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          backgroundColor: "#f0f8ff",
          marginBottom: "20px",
          minHeight: "400px",
          textAlign: { xs: "center"},
        }}
      >
        {/* Texte */}
        <Box sx={{ maxWidth: 700, p: { xs: 2, md: 0 } }}>
          <Typography variant="h3" fontWeight="bold" color="#234aa0">
            KeySafe !
          </Typography>
          <Typography
            sx={{
              mt: 1,
              color: "#080D50",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: 1.6,
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
                mt: 3,
                bgcolor: "#ee983dff",
                color: "white",
                borderRadius: "25px",
                textTransform: "none",
                fontSize: "15px",
                px: 3,
                py: 1.5,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  bgcolor: "#d6872eff",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Commencer
            </Button>
          </Link>
        </Box>

        {/* Illustration - modifiée pour être plus horizontale */}
        <Box sx={{ display: "flex", justifyContent: "center", width: { xs: "90%", md: "50%" } }}>
          <img
            src={learning1} // Utilisez l'image existante ou une nouvelle si vous en avez une plus horizontale
            alt="Illustration"
            style={{
              height: "auto", // Hauteur automatique
              width: "100%", // Prend toute la largeur disponible dans son conteneur
              maxWidth: "600px", // Une largeur maximale pour éviter qu'elle ne soit trop grande sur de très grands écrans
              aspectRatio: "16/9", // Force un ratio horizontal (par exemple, 16:9 ou 21:9)
              objectFit: "cover", // Assure que l'image couvre la zone sans distorsion
              borderRadius: "15px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
            }}
          />
        </Box>
      </Box>

      {/* Aperçu de KeySafe */}
      <Paper
        sx={{
          textAlign: "center",
          px: 4,
          py: 7,
          width: { xs: "90%", md: "60%" },
          margin: "auto",
          boxShadow: 8,
          "&:hover": { boxShadow: 12 },
          borderRadius: "15px",
          mt: 4,
          mb: 6,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#234aa0">Aperçu de KeySafe !</Typography>
        <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mt: 2, fontSize: "17px", lineHeight: 1.7 }}>
          Keysafe est une plateforme e-learning destinée aux collaborateurs des industries, en particulier du secteur pétrolier. Elle propose un environnement de formation en ligne interactif, avec des contenus fiables et de qualité, favorisant l’engagement des utilisateurs et l’efficacité des apprentissages.
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: "25px",
            mt: 4,
            bgcolor: "#ee983dff",
            color: "white",
            textTransform: "none",
            fontSize: "18px",
            px: 3,
            py: 1.2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              bgcolor: "#d6872eff",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          Découvrir KeySafe
        </Button>
      </Paper>

      <NosServices />

      {/* Contact */}
      <Box sx={{ backgroundColor: "#f0f8ff", py: 8, textAlign: "center", mt: 6 }}>
        <Container >
          <Typography variant="h4" fontWeight="bold" color="#234aa0">Contactez Nous !</Typography>
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
            <Grid item xs={14}>
              <Button variant="contained" sx={{ bgcolor: "#ee983dff", color: "white",textTransform:"none",borderRadius:"20px" }}>
                Envoyer
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{
        background: "linear-gradient(135deg, #acaeb1ff 0%, #a7b0beff  100%)",
        py: 6,
        px: 2,
        color: "white",
        mt: 0
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={3}>
              <Typography fontWeight="bold" variant="h6" mb={2} color="#234aa0">Contact</Typography>
              <Typography>Une Question ?</Typography>
              <Typography sx={{ textDecoration: "underline", cursor: "pointer" }}>Envoyez-nous un message</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography fontWeight="bold" variant="h6" mb={2} color="#234aa0">Ressources</Typography>
              <Typography>À Propos</Typography>
              <Typography>Confidentialité</Typography>
              <Typography>Conditions</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography fontWeight="bold" variant="h6" mb={2} color="#234aa0">Espace Utilisateurs</Typography>
              <Typography>Connexion Enseignant</Typography>
              <Typography>Connexion Admin</Typography>
              <Typography>Accès apprenant</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography fontWeight="bold" variant="h6" mb={2} color="#234aa0">Adresse</Typography>
              <Typography>KeySafe Learning</Typography>
              <Typography>123 Rue de la Lecture</Typography>
              <Typography>Tunis, Tunisie</Typography>
              <Typography mt={2}>Langue 🌍 🇫🇷 🇺🇸</Typography>
            </Grid>
          </Grid>
          <Typography textAlign="center" mt={6} fontSize="small" color="#234aa0">
            © 2025 KeySafe Learning. Tous droits réservés.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;