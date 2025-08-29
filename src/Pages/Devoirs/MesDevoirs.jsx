import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import AssignmentIcon from "@mui/icons-material/Assignment";

const subjects = [
  {
    title: "Français",
    color: "#1976d2",
    tasks: [
      { name: "Exercice sur les verbes", date: "20 Mai" },
      { name: "Rédaction libre", date: "25 Mai" },
    ],
  },
  {
    title: "English",
    color: "#2e7d32",
    tasks: [
      { name: "Reading comprehension", date: "22 May" },
      { name: "Essay: My Dream", date: "26 May" },
    ],
  },
  {
    title: "عربية",
    color: "#d32f2f",
    tasks: [
      { name: "تعبير كتابي", date: "21 ماي" },
      { name: "قواعد نحوية", date: "23 ماي" },
    ],
  },
  {
    title: "رياضيات",
    color: "#ed6c02",
    tasks: [{ name: "الامتحان غير متاح حاليا", date: "" }],
  },
];

const MesDevoirs = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Titre principal */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" sx={{ color: "#080D50", fontWeight: "bold" }}>
          {t("Mes Devoirs")}
        </Typography>
      </Box>

      {/* Conteneur des cartes */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // ✅ Deux cartes par ligne
          gap: "20px", // ✅ Espacement entre les cartes
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr", // ✅ Une seule carte par ligne sur mobile
          },
        }}
      >
        {subjects.map((subject, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: "15px",
              borderRadius: "12px",
              borderLeft: `8px solid ${subject.color}`, // ✅ Ligne colorée sur toute la hauteur
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* En-tête matière */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: subject.color,
                fontSize: "1.1rem",
                mb: 1,
              }}
            >
              {subject.title}
            </Typography>
            <Divider />

            {/* Liste des devoirs */}
            <Box sx={{ marginTop: "10px" }}>
              {subject.tasks.map((task, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <AssignmentIcon sx={{ color: "#888", fontSize: "20px" }} />
                    <Typography variant="body2" sx={{ color: "#333" }}>
                      {task.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: "#777", fontWeight: "bold" }}>
                    {task.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default MesDevoirs;
