import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Rating,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import { fetchMatieres } from "../../redux/actions/MatiéreAction";
import { fetchCours, UpdateCours } from "../../redux/actions/CoursAction";
import { fetchFeedbacks, fetchFeedbacksByCours } from "../../redux/actions/feedbackActions";
import { StyledPaper } from "../../Components/Global/Style";
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import CustomModal from "../../Components/Global/ModelComponent";
import UpdateModal from "../../Components/Global/UpdateModel";

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
const [updateModalOpen, setUpdateModalOpen] = useState(false);
const [coursToUpdate, setCoursToUpdate] = useState(null);
const [updateData, setUpdateData] = useState({
  nom: "",
  description: "",
  etat: "",
  type: "",
  datedebut: "",
  datefin: "",
  nbrhour: "",
  prix: "",
  nomformateur: "",
  creepar: ""
});

const handleOpenUpdateModal = (coursItem) => {
  setCoursToUpdate(coursItem);
  setUpdateData({
    nom: coursItem.nom || "",
    description: coursItem.description || "",
    etat: coursItem.etat || "",
    type: coursItem.type || "",
    datedebut: coursItem.datedebut || "",
    datefin: coursItem.datefin || "",
    nbrhour: coursItem.nbrhour || "",
    prix: coursItem.prix || "",
    nomformateur: coursItem.nomformateur || "",
    creepar: coursItem.creepar || ""
  });
  setUpdateModalOpen(true);
};


const handleCloseUpdateModal = () => {
  setCoursToUpdate(null);
  setUpdateModalOpen(false);
};

  useEffect(() => {
    dispatch(fetchMatieres());
    dispatch(fetchCours());
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const calculerMoyenne = (coursId) => {
    const feedbacksCours = feedbacks?.filter((f) => f.cours?.id === coursId) || [];
    if (feedbacksCours.length === 0) return 0;

    const somme = feedbacksCours.reduce((acc, fb) => acc + (fb.rating || 0), 0);
    return somme / feedbacksCours.length;
  };

  const calculerNombreAvis = (coursId) => {
    return feedbacks?.filter((f) => f.cours?.id === coursId)?.length || 0;
  };

  const matieresEnseignant = matieres.filter(
    (m) => m.enseignant && m.enseignant.id === CurrentUser?.id
  );

  const API_BASE_URL = "http://localhost:8085";

  const handleRessourceClick = (ressource) => {
    if (!ressource || !ressource.typeRes) return;

    const fileUrl = `${API_BASE_URL}/Ressource/files/${ressource.contenuRes}`;
    const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "mkv"];
    const isVideo =
      ressource.typeRes.toLowerCase() === "vidéo" ||
      videoExtensions.some((ext) => ressource.contenuRes.toLowerCase().endsWith(ext));

    if (isVideo) {
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

  const coursFiltres = selectedMatiereId
    ? cours.filter((c) => c.matiere?.id === selectedMatiereId)
    : [];

  const handleOpenFeedbackModal = (coursId) => {
    setCurrentCoursId(coursId);
    dispatch(fetchFeedbacksByCours(coursId));
    setFeedbackModalOpen(true);
  };
const handleUpdateCours = () => {
  dispatch(UpdateCours({
    id: coursToUpdate.id,
    coursData: updateData
  })).then(() => {
    dispatch(fetchCours());
    handleCloseUpdateModal();
  });
};
  

  return (
    <StyledPaper elevation={3} sx={{ padding: 2 }}>
      <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#174090", mb: 3 }}>
        {t("Gestion des cours par matières")}
      </Typography>

      {/* Liste des matières */}
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
      border: selectedMatiereId === matiere.id ? "2px solid #174090" : "1px solid #ccc",
    }}
  >
    <CardContent>
      <Typography variant="h6" color="primary">{matiere.nom || matiere.name}</Typography>
      <Typography variant="body2" color="text.secondary">{matiere.description}</Typography>
    </CardContent>
  </Card>
))}

        </Box>
      )}

      {/* Affichage des cours */}
      {selectedMatiereId && (
        <Box mt={4}>
          <Typography variant="h5" sx={{ mb: 2, color: "#174090" }}>
            {t("Cours pour la matière sélectionnée")}
          </Typography>
<Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
          {coursFiltres.length > 0 ? (
            coursFiltres.map((coursItem) => (
              <Card key={coursItem.id} sx={{ borderRadius: 2, boxShadow: 3, mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                   <Tooltip title="Modifier ce cours">
                        <IconButton color="primary" onClick={() => handleOpenUpdateModal(coursItem)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      </Box>
                  <Box sx={{ display: "flex", flexDirection:"row",justifyContent: "space-between" }}>
                    <Box>
                      <Typography variant="h6" color="green">{coursItem.nom}</Typography>
                    </Box>

                    {/* Actions */}
                   <Box sx={{ display: "flex"}}>
                        <Rating value={calculerMoyenne(coursItem.id)} precision={0.5} readOnly />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          ({calculerNombreAvis(coursItem.id)})
                        </Typography>
                    </Box>
                  </Box>
<Typography variant="body2" color="text.secondary">{coursItem.description}</Typography>
                  <Divider sx={{ my: 1 }} />

                  {/* Ressources */}
                  {coursItem.ressources && coursItem.ressources.length > 0 ? (
                    <>
                    <Typography variant="h5">List des ressources</Typography>
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
                     <Divider sx={{ my: 1 }} />
                     <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <ButtonComponent
                        text="Voir les avis"
                        color="#008000"
                        onClick={() => handleOpenFeedbackModal(coursItem.id)}
                      />
                      </Box>
                      </>
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
      <UpdateModal
  open={updateModalOpen}
  handleClose={handleCloseUpdateModal}
  title="Modifier le cours"
>
  {coursToUpdate && (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
 <TextField
  label="Nom du cours"
  value={updateData.nom}
  onChange={(e) => setUpdateData({ ...updateData, nom: e.target.value })}
  fullWidth
/>
<TextField
  label="Description"
  value={updateData.description}
  onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
  fullWidth
  multiline
  rows={4}
/>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <ButtonComponent text="Annuler" color="grey" onClick={handleCloseUpdateModal} />
        <ButtonComponent
  text="Mettre à jour"
  color="#1976d2"
  onClick={handleUpdateCours}
/>

      </Box>
    </Box>
  )}
</UpdateModal>

    </StyledPaper>
  );
};

export default GestionCours;
