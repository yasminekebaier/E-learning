import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Box, Typography, Grid, Card, CardContent, Divider, List, ListItem,
  ListItemIcon, ListItemText,MenuItem,TextField
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { fetchCours } from "../../redux/actions/CoursAction";
import { StyledPaper } from "../../Components/Global/Style";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import { useTranslation } from "react-i18next";
import { AddCircleOutline } from "@mui/icons-material";
import CustomModal from "../../Components/Global/ModelComponent";

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
 const { t } = useTranslation();
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  

  const handleCloseAdd = () => setOpenAddModal(false);

  // État quiz
  const [quizOpen, setQuizOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // Quiz statique
  const quiz = [
    {
      question: "Quelle est la capitale de la France ?",
      options: ["Paris", "Lyon", "Marseille", "Bordeaux"],
      answer: "Paris",
    },
    {
      question: "2 + 2 = ?",
      options: ["3", "4", "5", "22"],
      answer: "4",
    },
    {
      question: "React est une bibliothèque pour ?",
      options: ["Backend", "Frontend", "Base de données", "OS"],
      answer: "Frontend",
    },
  ];

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
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = ressource.contenuRes;
        link.click();
        break;
    }
  };

  const handleAnswer = () => {
    if (selectedAnswer === quiz[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer("");
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz terminé ! Votre score : ${score + (selectedAnswer === quiz[currentQuestion].answer ? 1 : 0)}/${quiz.length}`);
      setQuizOpen(false);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  return (
    <StyledPaper>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ color: "#174090", fontWeight: "bold", mb: 2 }}>
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
                    <Typography variant="h6" fontWeight="bold">{course.nom}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{course.description}</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Ressources :</Typography>
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
                                              
                         

                    <ButtonComponent icon={<AddCircleOutline />}
                          color="#008000" text={t("Lancer le quiz")}
                          onClick={() => setOpenAddModal(true)}
                    />
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

      {/* Modal Quiz */}
      <CustomModal open={openAddModal} handleClose={handleCloseAdd} title="Quiz – Exemple">
        <Box component="form" sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>1. Complétez la phrase : Hier, je __ (manger) une pomme.</Typography>
          <TextField select fullWidth size="small" defaultValue="">
            <MenuItem value="mangé">mangé</MenuItem>
            <MenuItem value="ai mangé">ai mangé</MenuItem>
            <MenuItem value="manger">manger</MenuItem>
          </TextField>

          <Typography>2. Cochez les auxiliaires utilisés pour le passé composé :</Typography>
          <Box>
            <label>
              <input type="checkbox" value="avoir" /> avoir
            </label>
            <br />
            <label>
              <input type="checkbox" value="être" /> être
            </label>
            <br />
            <label>
              <input type="checkbox" value="aller" /> aller
            </label>
          </Box>

          <Typography>3. Conjuguez le verbe "finir" avec "nous" :</Typography>
          <TextField placeholder="Votre réponse ici" fullWidth size="small" />

          <ButtonComponent
            text="Valider le quiz"
            color="#174090"
            onClick={() => {
              /* call API ou correction */
            }}
          />
        </Box>
            </CustomModal>
     
    </StyledPaper>
  );
};

export default MesCours;
