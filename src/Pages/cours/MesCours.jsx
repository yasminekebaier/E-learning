import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box, Typography, Grid, Card, CardContent, Divider, List, ListItem,
  ListItemIcon, ListItemText, Dialog, DialogTitle, DialogContent,
  CardActions, Radio, RadioGroup, FormControlLabel,
  TextField,
  Rating
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from "react-redux";
import { fetchCours } from "../../redux/actions/CoursAction"; // tu dois créer cette action
import { StyledPaper } from "../../Components/Global/Style";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { useTranslation } from "react-i18next";
import CustomModal from "../../Components/Global/ModelComponent";
import { fetchQuizsDevoir, submitQuiz } from "../../redux/actions/QuizActions";
import { addFeedback } from "../../redux/actions/feedbackActions";

const API_BASE_URL = "http://localhost:8085";

const MesCours = () => {
  const { t } = useTranslation();
  const { matiere } = useParams();
  const dispatch = useDispatch();
  const { cours = [], isFetching } = useSelector((state) => state.cours);
  const { quizs = [] } = useSelector((state) => state.quizDevoir);
  const users = useSelector((state) => state.user.users);
  const CurrentUser = useSelector((state) => state.user.CurrentUser);
const [answers, setAnswers] = useState({}); // { questionId: choixIndex }

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const enseignants = users.filter((u) => u.role === "ENSEIGNANT");
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const [quizOpen, setQuizOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
const [feedbackComment, setFeedbackComment] = useState("");
const [feedbackNote, setFeedbackNote] = useState(0);
const [selectedCourseId, setSelectedCourseId] = useState(null);
const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const pageCount = Math.ceil((cours?.length || 0) / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedCourses = cours?.slice(startIndex, startIndex + itemsPerPage) || [];
const { feedbacks } = useSelector((state) => state.feedback);

const handleOpenFeedbackModal = (courseId) => {
  setSelectedCourseId(courseId);
  setFeedbackComment("");
  setFeedbackNote(0);
  setFeedbackModalOpen(true);
};
const handleSubmitFeedback = () => {
  if (!CurrentUser || !selectedCourseId) return;

  dispatch(addFeedback({
    candidatId: CurrentUser.id,
    coursId: selectedCourseId,
    feedback: { 
      commentaire: feedbackComment, 
      rating: feedbackNote 
    }
  }))
  .unwrap()
  .then(() => {
    alert("Merci pour votre avis !");
    setFeedbackModalOpen(false);
  })
  .catch(err => console.error(err));
};



  useEffect(() => {
    dispatch(fetchCours(matiere));
    dispatch(fetchQuizsDevoir()); // récupérer tous les devoir/quiz
  }, [dispatch, matiere]);

  const handlePageChange = (_e, value) => setPage(value);

  const handleRessourceClick = (ressource) => {
    if (!ressource || !ressource.typeRes) return;

    const fileUrl = `${API_BASE_URL}/Ressource/files/${ressource.contenuRes}`;
    const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "mkv"];
    const isVideo =
      ressource.typeRes.toLowerCase() === "vidéo" ||
      videoExtensions.some((ext) => ressource.contenuRes.toLowerCase().endsWith(ext));

    if (isVideo) {
      setVideoUrl(fileUrl);
      setOpenVideoModal(true);
    } else {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = ressource.contenuRes;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const startQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer("");
    setQuizOpen(true);
  };
const handleNextQuestion = () => {
  if (!currentQuiz) return;

  const question = currentQuiz.questions[currentQuestionIndex];
  const questionId = question.id;
  const answerToSend = parseInt(selectedAnswer, 10);

  // Mettre à jour answers de façon sûre
  const updatedAnswers = {
    ...answers,
    [questionId]: answerToSend
  };
  setAnswers(updatedAnswers);

  if (currentQuestionIndex < currentQuiz.questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(""); // reset
  } else {
    // Envoi au backend
    dispatch(submitQuiz({
      quizId: currentQuiz.id,
      studentId: CurrentUser.id,
      reponses: updatedAnswers
    }))
    .unwrap()
    .then((res) => {
      alert("Quiz terminé ! Vos réponses ont été enregistrées.");
    })
    .catch((err) => {
      console.error(err);
      alert("Erreur lors de l'envoi des réponses");
    });

    setQuizOpen(false);
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setAnswers({});
  }
};

const calculerMoyenne = (coursId) => {
  const feedbacksCours = feedbacks?.filter(f => f.cours?.id === coursId) || [];
  if (feedbacksCours.length === 0) return 0;

  const somme = feedbacksCours.reduce((acc, fb) => acc + (fb.rating || 0), 0);
  return somme / feedbacksCours.length;
};


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
            {displayedCourses.map((course) => {
              const courseQuizzes = quizs.filter(
  (d) => d.cours?.id === course.id && d.type === "QUIZ"
);

              return (
                <Grid item xs={12} sm={6} md={4} key={course.id} sx={{width:"30%",boxShadow:"inherit"}}>
                  <Card sx={{ display: "flex", flexDirection: "column", height: 600, width: "100%", borderRadius: 1, boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}>
                    <CardContent>
     <Box display="flex" alignItems="center" mb={1}>
  <Rating
    value={calculerMoyenne(course.id)}
    precision={0.5}
    readOnly
    size="small"
    sx={{ mr: 1 }}
  />
  <Typography variant="h6">{course.nom}</Typography>
</Box>

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
                        <Typography sx={{ fontWeight: '500', color: '#174090' }}>
                          Formateur: {enseignants.find(e => e.id === course.creepar)?.username || "Inconnu"}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="h5" sx={{ mb: 1 }}> Liste des ressources :</Typography>
                      <List dense>
                        {course.ressources?.map((res) => (
                          <ListItem key={res.id} sx={{ py: 0.5, cursor: "pointer" }} onClick={() => handleRessourceClick(res)}>
                            <ListItemIcon>
                              {res.typeRes.toLowerCase() === "pdf" ? <DescriptionIcon color="primary" /> : <VideoLibraryIcon color="secondary" />}
                            </ListItemIcon>
                            <ListItemText primary={res.titreRes} />
                          </ListItem>
                        )) || <Typography>Aucune ressource</Typography>}
                      </List>
                    </CardContent>

                    <CardActions sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
          {courseQuizzes.map(q => (
            <ButtonComponent
              key={q.id}
              text={`Lancer Quiz: ${q.titre}`}
              icon={<AddCircleOutline />}
              color="#008000"
              onClick={() => startQuiz(q.quiz)}
            />
          ))}

          {/* Bouton pour feedback */}
          <ButtonComponent
            text="Donner un avis"
            color="#03a9f4"
            onClick={() => handleOpenFeedbackModal(course.id)}
          />
        </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <PaginationComponent count={pageCount} page={page} onChange={handlePageChange} />
        </Box>
      </Box>

      {/* Modal Vidéo */}
      <Dialog open={openVideoModal} onClose={() => setOpenVideoModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>Lecture de la vidéo</DialogTitle>
        <DialogContent>
          <video width="100%" height="100%" controls>
            <source src={videoUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </DialogContent>
      </Dialog>

      {/* Modal Quiz */}
      <CustomModal open={quizOpen} handleClose={() => setQuizOpen(false)} title={currentQuiz?.titre || "Quiz"}>
        {currentQuiz && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>{currentQuiz.questions[currentQuestionIndex]?.content}</Typography>
     <RadioGroup
  value={selectedAnswer}
  onChange={(e) => {
    const value = parseInt(e.target.value, 10);
    setSelectedAnswer(value);

    const questionId = currentQuiz.questions[currentQuestionIndex].id;
    setAnswers({
      ...answers,
      [questionId]: value
    });
  }}
>
  {currentQuiz.questions[currentQuestionIndex]?.choices.map((opt, idx) => (
    <FormControlLabel
      key={opt.id}
      value={idx}                // ✅ index du choix
      control={<Radio />}
      label={opt.content}
    />
  ))}
</RadioGroup>



            <ButtonComponent
              text="Suivant"
              color="#174090"
              onClick={handleNextQuestion}
            />
          </Box>
        )}
      </CustomModal>
      <CustomModal open={feedbackModalOpen} handleClose={() => setFeedbackModalOpen(false)} title="Ajouter un avis">
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    <TextField
      label="Votre commentaire"
      multiline
      rows={3}
      value={feedbackComment}
      onChange={(e) => setFeedbackComment(e.target.value)}
    />
    <TextField
      label="Note (1 à 5)"
      type="number"
      inputProps={{ min: 1, max: 5 }}
      value={feedbackNote}
      onChange={(e) => setFeedbackNote(parseInt(e.target.value, 10))}
    />
    <ButtonComponent text="Envoyer" color="#008000" onClick={handleSubmitFeedback} />
  </Box>
</CustomModal>

    </StyledPaper>
  );
};

export default MesCours;
