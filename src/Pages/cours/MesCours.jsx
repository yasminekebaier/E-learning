import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Link
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { fetchCours } from "../../redux/actions/CoursAction";
import { StyledPaper } from "../../Components/Global/Style";
import PaginationComponent from "../../Components/Global/PaginationComponent";

const API_BASE_URL = "http://localhost:8085"; // adapte selon ton serveur

const MesCours = () => {
  const { matiere } = useParams();
  const dispatch = useDispatch();
  const { cours = [], isFetching } = useSelector((state) => state.cours);

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const pageCount = Math.ceil((cours?.length || 0) / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedCourses = cours?.slice(startIndex, startIndex + itemsPerPage) || [];

  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handlePageChange = (_e, value) => setPage(value);

  useEffect(() => {
    dispatch(fetchCours(matiere));
  }, [dispatch, matiere]);

  const handleRessourceClick = (ressource) => {
    if (!ressource || !ressource.typeRes) return;

    const fileUrl = `${API_BASE_URL}/Ressource/files/${ressource.contenuRes}`;

    switch (ressource.typeRes.toLowerCase()) {
      case "vidéo":
      case "video":
        setVideoUrl(fileUrl);
        setOpenVideoModal(true);
        break;
      case "pdf":
      case "document":
      case "doc":
      default:
        // téléchargement pour PDF et autres
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = ressource.contenuRes;
        link.click();
        break;
    }
  };

  return (
    <StyledPaper>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ color: "#080D50", fontWeight: "bold", mb: 2 }}>
          {matiere} – Cours
        </Typography>

        {isFetching ? (
          <Typography>Chargement des cours...</Typography>
        ) : displayedCourses.length === 0 ? (
          <Typography>Aucun cours disponible pour cette matière.</Typography>
        ) : (
          <Grid container spacing={4}>
            {displayedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card
                  sx={{
                    minHeight: 250,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 2,
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {course.nom}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {course.description}
                    </Typography>

                    <Divider sx={{ mb: 1 }} />

                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Ressources :
                    </Typography>
                    <List dense>
                      {course.ressources?.map((res) => (
                        <ListItem
                          key={res.id}
                          sx={{ py: 0.5, cursor: "pointer" }}
                          onClick={() => handleRessourceClick(res)}
                        >
                          <ListItemIcon>
                            {res.typeRes.toLowerCase() === "pdf" ? (
                              <DescriptionIcon color="primary" />
                            ) : res.typeRes.toLowerCase() === "vidéo" ? (
                              <VideoLibraryIcon color="secondary" />
                            ) : (
                              <CheckCircleIcon color="success" />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={res.titreRes} />
                        </ListItem>
                      )) || <Typography>Aucune ressource</Typography>}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <PaginationComponent count={pageCount} page={page} onChange={handlePageChange} />
        </Box>
      </Box>

      {/* Modal pour lecture vidéo */}
      <Dialog open={openVideoModal} onClose={() => setOpenVideoModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Lecture de la vidéo</DialogTitle>
        <DialogContent>
          <video width="100%" height="100%" controls>
            <source src={videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </DialogContent>
      </Dialog>
    </StyledPaper>
  );
};

export default MesCours;
