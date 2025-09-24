import React, { useEffect } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuizsDevoir } from "../../redux/actions/QuizActions";

const MesDevoirs = () => {
  const dispatch = useDispatch();
  const { quizs } = useSelector((state) => state.quizDevoir); // liste venant du store

  useEffect(() => {
    dispatch(fetchQuizsDevoir()); // récupère les devoirs/quiz
  }, [dispatch]);

  // filtrer seulement les devoirs pour l'affichage étudiant
  const devoirs = quizs.filter((item) => item.type === "DEVOIR");

  return (
    <Box sx={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" sx={{ color: "#174090", fontWeight: "bold" }}>
          Mes Devoirs
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          "@media (max-width: 768px)": { gridTemplateColumns: "1fr" },
        }}
      >
        {devoirs.map((devoir, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: "15px",
              borderRadius: "12px",
              borderLeft: `8px solid#174090`, // couleur fixe ou selon matière
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#174090", fontSize: "1.1rem", mb: 1 }}>
              {devoir.cours?.nom || "Cours inconnu"}
            </Typography>
            <Divider />
            <Box sx={{ marginTop: "10px" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <AssignmentIcon sx={{ color: "#888", fontSize: "20px" }} />
                  <Typography variant="body2" sx={{ color: "#333" }}>
                    {devoir.titre}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "#777", fontWeight: "bold" }}>
                  {devoir.dateLimite}
                </Typography>
              </Box>
           {devoir.devoir?.file && (
  <Box mt={1}>
    <Typography variant="body2">
      Fichier :{" "}
      <a
        href={`http://localhost:8085/api/devoirquiz/download-devoir/${devoir.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {devoir.devoir.file}
      </a>
    </Typography>
  </Box>
)}

            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default MesDevoirs;
