import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box, Typography, Grid, Card, CardContent, Divider, List, ListItem,
  ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent,
  CardActions
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import { useDispatch, useSelector } from "react-redux";
import { fetchCours } from "../../redux/actions/CoursAction";
import { StyledPaper } from "../../Components/Global/Style";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import ReactPlayer from "react-player";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { toast } from 'react-toastify';
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from "react-i18next";
import PersonIcon from '@mui/icons-material/Person';
const API_BASE_URL = "http://localhost:8085";

const MesCours = () => {
   const { t } = useTranslation();
  const { matiere } = useParams();
  const dispatch = useDispatch();
  const { cours = [], isFetching } = useSelector((state) => state.cours);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
const CurrentUser = useSelector((state) => state.user.CurrentUser);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const pageCount = Math.ceil((cours?.length || 0) / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedCourses = cours?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handlePageChange = (_e, value) => setPage(value);

  useEffect(() => {
    dispatch(fetchCours(matiere));
  }, [dispatch, matiere]);

const handleRessourceClick = async (ressource) => {
  if (!ressource || !ressource.typeRes) return;

  try {
    const fileUrl = `${API_BASE_URL}/Ressource/files/${ressource.contenuRes}?userId=${CurrentUser.id}`;

    if (["vidéo", "video"].includes(ressource.typeRes.toLowerCase())) {
      // Pour les vidéos, on ne teste pas l'accès avec fetch
      setVideoUrl(fileUrl);
      setOpenVideoModal(true);
    } else {
      // Pour les autres fichiers, tester l'accès
      const response = await fetch(fileUrl);
      if (!response.ok) {
        if (response.status === 403) {
          toast.info("Vous n'avez pas accès à cette ressource.");
        } else {
          toast.error("Erreur lors du téléchargement de la ressource.");
        }
        return;
      }
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = ressource.contenuRes;
      link.click();
    }
  } catch (err) {
    console.error(err);
    toast.error("Erreur lors de l'accès à la ressource.");
  }
};

const { users } = useSelector((state) => state.user);

// on filtre pour ne garder que les enseignants
const enseignants = users.filter((u) => u.role === "ENSEIGNANT");

  return (
    <StyledPaper>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ color: "#174090", fontWeight: "bold", mb: 3 }}>
          {matiere} – Cours
        </Typography>

        {isFetching ? (
          <Typography>Chargement des cours...</Typography>
        ) : displayedCourses.length === 0 ? (
          <Typography>Aucun cours disponible pour cette matière.</Typography>
        ) : (
          <Grid container spacing={3}>
            {displayedCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 2,
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    "&:hover": { transform: "scale(1.02)" },
                    transition: "transform 0.2s",
                    height: 400,
                    width: "100%"
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {course.nom}
                    </Typography>
<Divider sx={{ my: 1 }} />
                    <Box display="flex" alignItems="center" mb={1}>
                    <ArticleIcon sx={{ mr: 1, color: "#9c27b0" }} /> 
                      <Typography variant="body2">{course.description}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={1}>
                   <AccessTimeIcon sx={{ mr: 1, color: "#f44336" }} />
                      <Typography variant="body2">{course.nbrhour} heures</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" mb={1}>
                      <EventIcon sx={{ mr: 1, color: "#03a9f4" }} />
                      <Typography variant="body2">
                        Du {new Date(course.datedebut).toLocaleDateString()} au {new Date(course.datefin).toLocaleDateString()}
                      </Typography>
                    </Box>
                   <Box display="flex" alignItems="center" mb={1}>
   <PersonIcon sx={{ mr: 1, color: "#ff9800" }} />
  <Typography  sx={{ fontWeight: '500' , color: '#174090' }}>
    Formateur: {
      enseignants.find(e => e.id === course.creepar)?.username || "Inconnu"
    }
  </Typography>
</Box>

                    <Divider sx={{ my: 1 }} />

                    <Typography variant="h5" sx={{ mb: 1 }}> Liste des ressources :</Typography>
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
                              <GridCheckCircleIcon color="success" />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={res.titreRes} />
                        </ListItem>
                      )) || <Typography>Aucune ressource</Typography>}
                    </List>
                  
                    
                  </CardContent>
                    
                                   <CardActions sx={{ mt: "auto",display:"flex",justifyContent: "flex-end" }}>
                                    <Divider mb={2} />
                                    <ButtonComponent
                                      text={t("Lancer Quiz")}
                                      icon={<AddCircleOutline />}
                                      color="#008000"
                                      onClick={() => setOpenAddModal(true)}
                                    />
                                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <PaginationComponent count={pageCount} page={page} onChange={handlePageChange} />
        </Box>
      </Box>

      {/* Modal Vidéo */}
      <Dialog open={openVideoModal} onClose={() => setOpenVideoModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Lecture de la vidéo</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <ReactPlayer
            url={videoUrl}
            controls
            width="100%"
            height="100%"
          />
        </DialogContent>
      </Dialog>
    </StyledPaper>
  );
};

export default MesCours;
