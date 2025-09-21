import React from "react";
import { Grid, Card, CardContent, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import keysafe from "../../assets/keysafe.jpg";
import enseignat from "../../assets/enseignat.png";
import adminstrateur from "../../assets/adminstrateur.png";
import etudiant from "../../assets/etudiant.png";
import inscrigauche from "../../assets/inscrigauche.png";

const roles = [
  {
    id: 1,
    label: "Formateur",
    img: enseignat,
    link: "/register",
  },
  {
    id: 2,
    label: "Administrateur",
    img: adminstrateur,
    link: "/inscription/admin",
  },
  {
    id: 3,
    label: "Collarateur",
    img: etudiant,
    link: "/registerEtudiant",
  },
];

const Inscription = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Logo en haut à gauche */}
      <img
        src={keysafe}
        alt="Logo"
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          height: "80px",
          width:"180px"
        }}
      />

      {/* Titre */}
      <Typography
        variant="h3"
        sx={{
          marginBottom: 5,
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Lire à son rythme : une clé pour la réussite
      </Typography>

      {/* Cartes */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ maxWidth: "800px" }}
      >
        {roles.map((role) => (
          <Grid item xs={12} sm={4} key={role.id}>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "10px",
                textAlign: "center",
                backgroundColor: "#fff",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <img
                  src={role.img}
                  alt={role.label}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#174090",
                    textTransform: "none",
                    color: "#000",
                    fontWeight: "bold",
                    borderRadius: "25px",
                    padding: "8px 16px",
                    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                    "&:hover": { backgroundColor: "#174090" },
                  }}
                  fullWidth
                  onClick={() => handleNavigate(role.link)}
                >
                  {role.label}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Image pile de livres */}
      <img
        src={inscrigauche}
        alt="Books"
        style={{
          position: "absolute",
          bottom: 20,
          right: 40,
          height: "40%",
        }}
      />
    </Grid>
  );
};

export default Inscription;
