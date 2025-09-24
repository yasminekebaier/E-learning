import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Box, Typography, Card, CardContent, Divider, List, ListItem, ListItemText 
} from "@mui/material";
import { Rating } from "@mui/material";
import { useTranslation } from "react-i18next";

import { fetchMatieres } from "../../redux/actions/MatiéreAction";
import { fetchCours } from "../../redux/actions/CoursAction";
import { fetchFeedbacks, fetchFeedbacksByCours } from "../../redux/actions/feedbackActions";
import { StyledPaper } from "../../Components/Global/Style";
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import CustomModal from "../../Components/Global/ModelComponent";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ListItemIcon } from "@mui/material";

const GestionCours = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { matieres, loading, error } = useSelector((state) => state.matiere);
  const { CurrentUser } = useSelector((state) => state.user);
  const { cours } = useSelector((state) => state.cours);
  const { feedbacks } = useSelector((state) => state.feedback);


  const [selectedMatiereId, setSelectedMatiereId] = useState(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [currentCoursId, setCurrentCoursId] = useState(null);

 useEffect(() => {
  dispatch(fetchMatieres());
  dispatch(fetchCours());
  dispatch(fetchFeedbacks());
}, [dispatch]);

const calculerMoyenne = (coursId) => {
  const feedbacksCours = feedbacks?.filter(f => f.cours?.id === coursId) || [];
  if (feedbacksCours.length === 0) return 0;

  const somme = feedbacksCours.reduce((acc, fb) => acc + (fb.rating || 0), 0);
  return somme / feedbacksCours.length;
};

const calculerNombreAvis = (coursId) => {
  return feedbacks?.filter(f => f.cours?.id === coursId)?.length || 0;
};

  // Matières de l’enseignant connecté
  const matieresEnseignant = matieres.filter(
    (m) => m.enseignant && m.enseignant.id === CurrentUser?.id
  );
const API_BASE_URL = "http://localhost:8085"; // ou ta base URL

const handleRessourceClick = (ressource) => {
  if (!ressource || !ressource.typeRes) return;

  const fileUrl = `${API_BASE_URL}/Ressource/files/${ressource.contenuRes}`;
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "mkv"];
  const isVideo =
    ressource.typeRes.toLowerCase() === "vidéo" ||
    videoExtensions.some((ext) => ressource.contenuRes.toLowerCase().endsWith(ext));

  if (isVideo) {
    // Ici tu peux ouvrir un modal vidéo comme dans MesCours
    window.open(fileUrl, "_blank");
  } else {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = ressource.contenuRes;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

  // Cours filtrés
  const coursFiltres = selectedMatiereId
    ? cours.filter((c) => c.matiere?.id === selectedMatiereId)
    : [];

  const handleOpenFeedbackModal = (coursId) => {
  setCurrentCoursId(coursId);
  dispatch(fetchFeedbacksByCours(coursId)); // ⚡ Charge uniquement les avis du cours
  setFeedbackModalOpen(true);
};

  return (
    <StyledPaper elevation={3} sx={{ padding: 2 }}>
      <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#174090", mb: 3 }}>
        {t("Gestion des cours par matières")}
      </Typography>

      {/* Liste des matières en cards */}
      {loading ? (
        <Typography>Chargement...</Typography>
      ) : error ? (
        <Typography color="red">{error}</Typography>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={3}>
          {matieresEnseignant.map((matiere) => (
            <Card
              key={matiere.id}
              onClick={() => setSelectedMatiereId(matiere.id)}
              sx={{
                borderRadius: 2,
                boxShadow: 4,
                cursor: "pointer",
                border: selectedMatiereId === matiere.id ? "2px solid #174090" : "1px solid #ccc"
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary">{matiere.name}</Typography>
                <Typography variant="body2" color="text.secondary">{matiere.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Affichage des cours de la matière sélectionnée */}
      {selectedMatiereId && (
        <Box mt={4}>
          <Typography variant="h5" sx={{ mb: 2, color: "#174090" }}>
            {t("Cours pour la matière sélectionnée")}
          </Typography>

          {coursFiltres.length > 0 ? (
            coursFiltres.map((coursItem) => (
              <Card key={coursItem.id} sx={{ borderRadius: 2, boxShadow: 3, mb: 2 }}>
                <CardContent>
                  <Box sx={{display:"flex" ,flexDirection:"row",justifyContent:"space-between"}}>
                    <Box>
                  <Typography variant="h6" color="green">{coursItem.nom}</Typography>
                  <Typography variant="body2" color="text.secondary">{coursItem.description}</Typography>
                  </Box>
                  <Box>
              <Box sx={{display:"flex" ,flexDirection:"row",justifyContent:"space-between"}}>    
  <Rating value={calculerMoyenne(coursItem.id)} precision={0.5} readOnly />
  <Typography variant="body2" sx={{  }}>
    ({calculerNombreAvis(coursItem.id)})
  </Typography>
  </Box>  
                   {/* Bouton avis */}
                  <ButtonComponent
                    text="Voir les avis"
                    color="#1976d2"
                    onClick={() => handleOpenFeedbackModal(coursItem.id)}
                  />
                  </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />

                  {/* Note moyenne */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
               <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
  
</Box>

                  </Box>

                 

                  {/* Ressources */}
                  {coursItem.ressources && coursItem.ressources.length > 0 ? (
                    <List>
                      {coursItem.ressources.map((res) => {
                        let icon;
                        if (res.typeRes?.toLowerCase() === "vidéo" || res.contenuRes.toLowerCase().endsWith(".mp4")) {
                          icon = <OndemandVideoIcon color="primary" />;
                        } else if (res.contenuRes.toLowerCase().endsWith(".pdf")) {
                          icon = <PictureAsPdfIcon color="error" />;
                        } else {
                          icon = <InsertDriveFileIcon color="action" />;
                        }

                        return (
                        <ListItem
  key={res.id}
  sx={{ py: 0.5, cursor: "pointer" }}
  onClick={() => handleRessourceClick(res)}
>
  <ListItemIcon>{icon}</ListItemIcon>
  <ListItemText primary={res.titreRes} />
</ListItem>

                        );
                      })}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Aucune ressource pour ce cours
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>Aucun cours trouvé pour cette matière.</Typography>
          )}
        </Box>
      )}

      {/* Modal feedback */}
     <CustomModal
  open={feedbackModalOpen}
  handleClose={() => setFeedbackModalOpen(false)}
  title="Avis des étudiants"
>
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    {loading ? (
      <Typography>Chargement...</Typography>
    ) : feedbacks && feedbacks.length > 0 ? (
      feedbacks.map((fb) => (
        <Box key={fb.id} sx={{ borderBottom: "1px solid #ccc", pb: 1 }}>
          <Typography variant="subtitle2">{fb.candidat?.username || fb.candidat?.nom_prenom}</Typography>
          <Rating value={fb.rating} readOnly size="small" />
          <Typography variant="body2">{fb.commentaire}</Typography>
        </Box>
      ))
    ) : (
      <Typography>Aucun avis pour ce cours.</Typography>
    )}
  </Box>
</CustomModal>

    </StyledPaper>
  );
};

export default GestionCours;
