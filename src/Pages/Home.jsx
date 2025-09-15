import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import keysafe from "../assets/keysafe.jpg";
import apropos from "../assets/apropos.png";
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
        }}
      >
        <img
          src={keysafe}
          alt="keysafe Logo"
          style={{ width: "190px", height: "auto" }}
        />
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography variant="body1" sx={{ cursor: "pointer" }}>
            À propos
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer" }}>
            Formateurs
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to={"/inscription"}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#ee983dff",
                color: "white",
                textTransform: "none",
                borderRadius: "20px",
              }}
            >
              Inscription
            </Button>
          </Link>
          <Link to={"/LoginEtudiant"}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                borderColor: "#ee983dff",
                color: "#ee983dff",
                textTransform: "none",
              }}
            >
              Connexion
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Hero Section */}
      <Box
        px={5}
        py={5}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20%",
          textAlign: "center",
          backgroundColor: "#cce7f5",
          marginBottom: "20px",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="#234aa0">
            {" "}
            KeySafe !
          </Typography>
          <Typography
            sx={{
              maxWidth: 600,
              mx: "auto",
              mt: 2,
              color: "#080D50",
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            Une plateforme d’apprentissage en ligne destinée aux collaborateurs
            du secteur industriel, facilitant leur participation aux formations
            grâce à des contenus fiables et interactifs.
          </Typography>
          <Link to={"/inscription"}>
            <Button
              variant="contained"
              sx={{
                mt: 4,
                bgcolor: "#ee983dff",
                color: "white",
                borderRadius: "20px",
                textTransform: "none",
              }}
            >
              Commencer
            </Button>
          </Link>
        </Box>
        {/* Illustration centrale */}
        <Box mt={5} sx={{ width: "40%" }}>
          <img
            src={apropos}
            alt="Illustration enfants"
            width="100%"
            height="100%"
          />
        </Box>
      </Box>

      {/* Aperçu de KeySafe */}
      <Paper
        sx={{
          textAlign: "center",
          px: 4,
          py: 7,
          width: "60%",
          margin: "auto",
          boxShadow: 8,
          "&:hover": { boxShadow: 12 },
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#234aa0">
          Aperçu de KeySafe !
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mt: 2 }}>
          Keysafe est une plateforme e-learning destinée aux collaborateurs des
          industries, en particulier du secteur pétrolier. Elle propose un
          environnement de formation en ligne interactif, avec des contenus
          fiables et de qualité, favorisant l’engagement des utilisateurs et
          l’efficacité des apprentissages.
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: "20px",
            mt: 4,
            bgcolor: "#ee983dff",
            color: "white",
            textTransform: "none",
          }}
        >
          Découvrir KeySafe
        </Button>
      </Paper>
      <NosServices />

      {/* Contact */}
      <Box sx={{ backgroundColor: "#cce7f5", py: 6, textAlign: "center" }}>
        <Container>
          <Typography variant="h5" fontWeight="bold">
            Contactez Nous !
          </Typography>
          <Typography sx={{ mt: 1, mb: 3 }}>
            Une question ? Écrivez-nous via le formulaire ci-dessous. Nous
            répondrons dans les plus brefs délais.
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
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
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#ee983dff",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "20px",
                }}
              >
                Envoyer
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor:
            "linear-gradient(135deg, #acaeb1ff 0%, #a7b0beff 100%)",
          py: 4,
          px: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={12} md={3}>
            <Typography fontWeight="bold" color="#234aa0">
              Contact
            </Typography>
            <Typography>Une Question ?</Typography>
            <Typography sx={{ textDecoration: "underline", cursor: "pointer" }}>
              Envoyez-nous un message
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography fontWeight="bold" color="#234aa0">
              Ressources
            </Typography>
            <Typography>À Propos</Typography>
            <Typography>Confidentialité</Typography>
            <Typography>Conditions</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography fontWeight="bold" color="#234aa0">
              Espace Utilisateurs
            </Typography>
            <Typography>Connexion Formateur</Typography>
            <Typography>Connexion Admin</Typography>
            <Typography>Accès collaborateur</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography fontWeight="bold" color="#234aa0">
              Adresse
            </Typography>
            <Typography>KeySafe Learning</Typography>
            <Typography>123 Rue de la Lecture</Typography>
            <Typography>Tunis, Tunisie</Typography>
            <Typography mt={2}>Langue 🌍 🇫🇷 🇺🇸</Typography>
          </Grid>
        </Grid>
        <Typography textAlign="center" mt={4} color="#234aa0">
          © 2025 KeySafe Learning. Tous droits réservés.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
