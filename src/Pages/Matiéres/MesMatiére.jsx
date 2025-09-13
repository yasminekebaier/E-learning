import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../Components/Global/PaginationComponent";

const subjects = [
  { name: "Anglais" },
  { name: "Français" },
  { name: "Matière Islamique" },
  { name: "Mathématique" },
  { name: "Physique" },
  { name: "مادة الرياضيات" },
];

const MesMatieres = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Nombre total de pages
  const pageCount = Math.ceil(subjects.length / itemsPerPage);

  // Sélection des matières de la page courante
  const startIndex = (page - 1) * itemsPerPage;
  const displayedSubjects = subjects.slice(startIndex, startIndex + itemsPerPage);

  // Gestion de la pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Redirection vers la page des cours
  const handleCardClick = (subject) => {
    navigate(`/app/matieres/${encodeURIComponent(subject.name)}`);
  };

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{ fontSize: "20px", color: "#080D50", fontWeight: "bold", mb: 3 }}
      >
        Bienvenue en 4ème année
      </Typography>

      {/* Conteneur des cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
          mb: 2,
        }}
      >
        {displayedSubjects.map((subject, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(subject)}
            sx={{
              flex: "0 1 calc(33.33% - 20px)",
              maxWidth: "250px",
              minWidth: "80px",
              height: 160,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f1e0bfff",
              borderRadius: 2,
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease-in-out",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {subject.name}
              </Typography>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2331/2331777.png"
                alt="mascotte"
                style={{
                  width: 60,
                  height: 60,
                  marginTop: 5,
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination en bas */}
      <PaginationComponent
        count={pageCount}
        page={page}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default MesMatieres;
