import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, Pagination, IconButton,
  Grid, Divider, Stack, TextField, MenuItem, Tooltip, Stepper, Step, StepLabel, Button
} from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import WorkIcon from '@mui/icons-material/Work';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { StyledPaper } from '../../Components/Global/Style';
import { ButtonComponent } from '../../Components/Global/ButtonComponent';
import CustomModal from '../../Components/Global/ModelComponent';
import UpdateModal from '../../Components/Global/UpdateModel';
import { useTranslation } from 'react-i18next';
import { fetchQuizsDevoir, AddQuizDevoirs, AddDevoir } from '../../redux/actions/QuizActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCours } from '../../redux/actions/CoursAction';
import axios from 'axios';
const AddQuizDevoir = () => {
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [openQuizModal, setOpenQuizModal] = useState(false);
  const handleOpenQuizModal = () => setOpenQuizModal(true);
  const handleCloseQuizModal = () => setOpenQuizModal(false);

  const dispatch = useDispatch();
  const { quizs, loading, error } = useSelector((state) => state.quizDevoir); 
  const { cours } = useSelector((state) => state.cours); 

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const handleOpenDetailModal = () => setOpenDetailModal(true);
  const handleCloseDetailModal = () => {
    setActiveStep(0);
    setOpenDetailModal(false);
  };

  const [newQuiz, setNewQuiz] = useState({
    titre: "",
    type: "QUIZ",
    coursId: "",
    dateLimite: "",
    duree: ""
  });

  const [selectedQuiz, setSelectedQuiz] = useState(null);

const [openDevoirModal, setOpenDevoirModal] = useState(false);
const handleOpenDevoirModal = () => setOpenDevoirModal(true);
const handleCloseDevoirModal = () => setOpenDevoirModal(false);

  const [currentQuestion, setCurrentQuestion] = useState({ texte: "", options: ["", "", "", ""], correctAnswerIndex: 0 });
  const [questions, setQuestions] = useState([]);

  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Détails du Quiz', 'Questions Existantes', 'Ajouter une Question'];

  const itemsPerPage = 3;

  const pageCount = Math.ceil(quizs.length / itemsPerPage);
  const paginatedItems = quizs.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const cardsToShow = [...paginatedItems];
  while (cardsToShow.length < itemsPerPage) cardsToShow.push(null);

  const handlePageChange = (event, value) => setPage(value);

  useEffect(() => {
    dispatch(fetchCours());
    dispatch(fetchQuizsDevoir());
  }, [dispatch]);

  const handleCurrentQuestionChange = (field, value) => {
    const newQuestion = { ...currentQuestion };
    if (field === "texte") newQuestion.texte = value;
    else if (field.startsWith("option")) {
      const index = parseInt(field.slice(-1));
      newQuestion.options[index] = value;
    } else if (field === "correctAnswerIndex") {
      newQuestion.correctAnswerIndex = parseInt(value);
    }
    setCurrentQuestion(newQuestion);
  };

  const addCurrentQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ texte: "", options: ["", "", "", ""], correctAnswerIndex: 0 });
    setActiveStep(1);
  };

  const handleViewDetails = (quiz) => {
    setSelectedQuiz(quiz);
    handleOpenDetailModal();
  };

  const handleNextStep = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBackStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));
const [file, setFile] = useState(null);


const [resourceTitle, setResourceTitle] = useState("");


const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};



  return (
    <>
      <StyledPaper sx={{ width: '95%', m: 1, p: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', color:"#080D50" }}>Créez des quiz et devoirs</Typography>
          <ButtonComponent text="Nouveau Quiz Devoir" icon={<AddCircleOutline />} color="orange" onClick={handleOpenQuizModal} />
        </Box>

 <Box display="flex" flexWrap="wrap" gap={2} px={2} mt={2}>
  {cardsToShow.map((item, index) =>
    item ? (
      <Card key={item.id} sx={{ flex: '1 1 calc(33.33% - 16px)', minWidth: 250, minHeight: 250 }}>
        <CardContent>
          {/* Header type et icône */}
          <Grid container justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              {item.type === 'QUIZ' ? <QuizIcon color="primary" /> : <WorkIcon color="secondary" />}
              <Typography variant="h4" fontWeight="bold">{item.type}</Typography>
            </Box>
          </Grid>

          {/* Infos principales */}
          <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1, color: "#080D50" }}>
            <Typography><strong>Cours:</strong> {item.cours?.nom || "N/A"}</Typography>
            <Typography><strong>Date limite:</strong> {item.dateLimite || "N/A"}</Typography>

            {item.type === 'QUIZ' ? (
              <Typography><strong>Durée:</strong> {item.duree || "N/A"} minutes</Typography>
            ) : (
              <Typography>
                <strong>Fichier:</strong>{" "}
                {item.file ? (
                  <a href={item.file} target="_blank" rel="noopener noreferrer">{item.file}</a>
                ) : "Aucun fichier"}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* Footer actions */}
          <Stack direction="row" justifyContent="space-between">
            {item.type === 'QUIZ' ? (
              <Typography>{item.questions?.length || 0} questions</Typography>
            ) : (
              <Typography>{item.file ? "Fichier disponible" : "Pas de fichier"}</Typography>
            )}

            <Typography
              sx={{ cursor: 'pointer', color: '#1976d2' }}
              onClick={() => {
                setSelectedQuiz(item);
                if (item.type === "QUIZ") {
                  handleViewDetails(item);       // ouvre modal quiz
                } else {
                  handleOpenDevoirModal();       // ouvre modal devoir/fichier
                }
              }}
            >
              {item.type === "QUIZ" ? "Voir les détails" : (item.file ? "Voir / Télécharger fichier" : "Ajouter un fichier")}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    ) : (
      <Card key={`empty-${index}`} sx={{
        flex: '1 1 calc(33.33% - 16px)',
        minWidth: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #ccc',
        textAlign: 'center',
        cursor: 'pointer'
      }}>
        <Typography sx={{ mb: 1 }}>Ajouter un nouveau quiz ou devoir</Typography>
        <IconButton color="primary"><AddIcon /></IconButton>
      </Card>
    )
  )}
</Box>



        <Box mt={3} display="flex" justifyContent="center">
          <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
        </Box>
      </StyledPaper>

      {/* Modal Création Quiz/Devoir */}
      <CustomModal open={openQuizModal} handleClose={handleCloseQuizModal} title="Ajouter Quiz Devoir" icon={<AddCircleOutline />}>
        <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Titre"
            fullWidth
            value={newQuiz.titre}
            onChange={(e) => setNewQuiz({ ...newQuiz, titre: e.target.value })}
          />
          <TextField
            select
            label="Type"
            fullWidth
            value={newQuiz.type}
            onChange={(e) => setNewQuiz({ ...newQuiz, type: e.target.value })}
          >
            <MenuItem value="QUIZ">Quiz</MenuItem>
            <MenuItem value="DEVOIR">Devoir</MenuItem>
          </TextField>
          <TextField
            select
            label="Cours"
            fullWidth
            value={newQuiz.coursId}
            onChange={(e) => setNewQuiz({ ...newQuiz, coursId: e.target.value })}
          >
            {cours.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.nom}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date limite"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={newQuiz.dateLimite}
            onChange={(e) => setNewQuiz({ ...newQuiz, dateLimite: e.target.value })}
          />
          <TextField
            label="Durée (minutes)"
            type="number"
            fullWidth
            value={newQuiz.duree}
            onChange={(e) => setNewQuiz({ ...newQuiz, duree: e.target.value })}
          />
          <ButtonComponent
            text="Enregistrer"
            color="#080D50"
            onClick={() => {
              dispatch(AddQuizDevoirs(newQuiz, newQuiz.coursId));
              handleCloseQuizModal();
              setNewQuiz({ titre: "", type: "QUIZ", dateLimite: "", duree: "", coursId: "" });
            }}
          />
        </Box>
      </CustomModal>
       {/* Modal Détails / Questions avec Stepper */}
      <CustomModal open={openDetailModal} handleClose={handleCloseDetailModal} title={selectedQuiz ? `Quiz: ${selectedQuiz.type} - Classe: ${selectedQuiz.classe}` : ""} icon={<AddCircleOutline />}>
        <Box sx={{ width: '100%', mt: 2 }}>
          <Stepper activeStep={activeStep}>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}
      >
        {label}
      </StepLabel>
    </Step>
  ))}
</Stepper>


          <Box sx={{ mt: 3 }}>
            {/* Step 1: Détails du Quiz */}
            {activeStep === 0 && (
              <>
              <Box sx={{display:'flex', flexDirection:'column', gap:1,color:"#080D50"}}>
                <Typography variant="h6">Détails du Quiz</Typography>
                <Typography><strong>Classe:</strong> {selectedQuiz?.classe}</Typography>
                <Typography><strong>Date:</strong> {selectedQuiz?.date}</Typography>
                <Typography><strong>Durée:</strong> {selectedQuiz?.duree}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button sx={{color:"white",backgroundColor:"orange",textTransform:"none",padding:"10px 20px"}} onClick={handleNextStep}>Voir Questions</Button>
                </Box>
              </>
            )}

            {/* Step 2: Questions existantes */}
            {activeStep === 1 && (
              <>
                <Typography variant="h6">Questions Existantes</Typography>
                {questions.length === 0 ? (
                  <Typography>Aucune question ajoutée.</Typography>
                ) : (
                  questions.map((q, index) => (
                    <Box key={index} sx={{ border: "1px solid #ccc", p: 1, mb: 1 }}>
                      <Typography>{`Q${index + 1}: ${q.texte}`}</Typography>
                    </Box>
                  ))
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button sx={{color:"white",backgroundColor:"orange",textTransform:"none",padding:"10px 20px"}} onClick={handleBackStep}>Retour</Button>
                  <Button sx={{color:"white",backgroundColor:"orange",textTransform:"none",padding:"10px 20px"}} onClick={handleNextStep}>Ajouter une question</Button>
                </Box>
              </>
            )}

            {/* Step 3: Ajouter nouvelle question */}
            {activeStep === 2 && (
              <>
                <Typography variant="h6">Ajouter une nouvelle question</Typography>
                <TextField
                  label="Question"
                  value={currentQuestion.texte}
                  onChange={(e) => handleCurrentQuestionChange("texte", e.target.value)}
                  fullWidth
                  sx={{ mb: 1 }}
                />
                {currentQuestion.options.map((opt, i) => (
                  <TextField
                    key={i}
                    label={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => handleCurrentQuestionChange(`option${i}`, e.target.value)}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                ))}
                <TextField
                  label="Indice bonne réponse (0-3)"
                  type="number"
                  inputProps={{ min: 0, max: 3 }}
                  value={currentQuestion.correctAnswerIndex}
                  onChange={(e) => handleCurrentQuestionChange("correctAnswerIndex", e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button sx={{color:"white",backgroundColor:"orange",textTransform:"none",padding:"10px 20px"}} onClick={handleBackStep}>Retour</Button>
                  <Button sx={{color:"white",backgroundColor:"orange",textTransform:"none",padding:"10px 20px"}} onClick={addCurrentQuestion}>Ajouter & Retour aux questions</Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </CustomModal>
     {/* Modal Détails / ajout ressource devoir */}
<CustomModal
  open={openDevoirModal}
  handleClose={handleCloseDevoirModal}
  title={`Ajouter une ressource pour le devoir: ${selectedQuiz?.titre}`}
  icon={<WorkIcon />}
>
  <Box
    component="form"
    sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
  >
    <TextField
      label="Titre de la ressource"
      fullWidth
      value={resourceTitle}
      onChange={(e) => setResourceTitle(e.target.value)}
    />

    {/* input fichier */}
    <Button
      variant="outlined"
      component="label"
      sx={{ textTransform: "none" }}
    >
      Choisir un fichier
      <input
        type="file"
        hidden
        onChange={handleFileChange}
      />
    </Button>

    {file && (
      <Typography variant="body2" color="textSecondary">
        Fichier sélectionné : {file.name}
      </Typography>
    )}

   <ButtonComponent
  text="Ajouter Ressource"
  color="orange"
  onClick={async () => {
    if (!file) {
      alert("Veuillez sélectionner un fichier !");
      return;
    }

    try {
      await dispatch(AddDevoir({ file, titre: resourceTitle, coursId: selectedQuiz.id })).unwrap();
      alert("Ressource ajoutée avec succès ✅");
      setFile(null);
      setResourceTitle("");
      handleCloseDevoirModal();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout ❌");
    }
  }}
/>

  </Box>
</CustomModal>


      <UpdateModal
  open={openUpdate}
  handleClose={handleCloseUpdate}
  title={t("Modifier ce Quiz/Devoir")}
  icon={<EditIcon />}
>
  <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
    <TextField
      label="Titre"
      fullWidth
      defaultValue={selectedQuiz?.type} // ou un champ titre réel
    />
    <TextField
      select
      label="Classe"
      fullWidth
      defaultValue={selectedQuiz?.classe}
    >
      <MenuItem value="1ère A">1ère A</MenuItem>
      <MenuItem value="2ème B">2ème B</MenuItem>
    </TextField>
    <TextField
      label="Date"
      type="date"
      InputLabelProps={{ shrink: true }}
      fullWidth
      defaultValue={selectedQuiz?.date}
    />
    <TextField
      label="Durée (minutes)"
      type="number"
      fullWidth
      defaultValue={selectedQuiz?.duree}
    />
    <Box sx={{ textAlign: 'center', marginTop: "20px" }}>
      <ButtonComponent
        text={t("Modifier")}
        color="#1A9BC3"
        onClick={() => {
          console.log("Envoyer modification du quiz :", selectedQuiz);
          setOpenUpdate(false);
        }}
      />
    </Box>
  </Box>
</UpdateModal>
    </>
  );
};

export default AddQuizDevoir;
