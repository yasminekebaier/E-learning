import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import { fetchMatieres } from "../../redux/actions/MatiéreAction";

const MesMatieres = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { matieres, loading, error } = useSelector(state => state.matiere);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Récupération des matières au montage
  useEffect(() => {
    dispatch(fetchMatieres());
  }, [dispatch]);

  // Gestion de la pagination
  const pageCount = Math.ceil(matieres.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedSubjects = matieres.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => setPage(value);

  // Redirection vers la page des cours
  const handleCardClick = (subject) => {
    navigate(`/app/matieres/${encodeURIComponent(subject.name)}`);
  };

  // Gestion du chargement et des erreurs
  if (loading) return <Typography sx={{ p: 3 }}>Chargement...</Typography>;
  if (error) return <Typography color="error" sx={{ p: 3 }}>Erreur : {error}</Typography>;
  if (!matieres.length) return <Typography sx={{ p: 3 }}>Aucune matière disponible</Typography>;

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
      <Typography
        variant="h5"
        sx={{ fontSize: "20px", color: "#174090", fontWeight: "bold", mb: 3 }}
      >
        Bienvenue
      </Typography>

      {/* Conteneur des cartes */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
          mb: 2,
        }}
      >
        {displayedSubjects.map((subject) => (
          <Card
            key={subject.id}
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
              backgroundColor: "#f5faff",
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
                style={{ width: 60, height: 60, marginTop: 5 }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      <PaginationComponent
        count={pageCount}
        page={page}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default MesMatieres;
