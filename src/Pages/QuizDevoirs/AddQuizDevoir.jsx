import React, { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, Pagination, IconButton,
  Grid, Divider, Stack, TextField, MenuItem, Stepper, Step, StepLabel, Button
} from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import WorkIcon from '@mui/icons-material/Work';
import { StyledPaper } from '../../Components/Global/Style';
import { ButtonComponent } from '../../Components/Global/ButtonComponent';
import CustomModal from '../../Components/Global/ModelComponent';
import { useTranslation } from 'react-i18next';
import { 
  fetchQuizsDevoir, AddQuizDevoirs, AddDevoir, AddQuestions 
} from '../../redux/actions/QuizActions';
import { fetchCours } from '../../redux/actions/CoursAction';
import { useDispatch, useSelector } from 'react-redux';
import PaginationComponent from '../../Components/Global/PaginationComponent';

const AddQuizDevoir = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Redux state
  const { quizs } = useSelector(state => state.quizDevoir);
  const { cours } = useSelector(state => state.cours);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;
  const pageCount = Math.ceil(quizs.length / itemsPerPage);
  const paginatedItems = quizs.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const cardsToShow = [...paginatedItems];
  while (cardsToShow.length < itemsPerPage) cardsToShow.push(null);
  const handlePageChange = (_, value) => setPage(value);

  // Modals
  const [openQuizModal, setOpenQuizModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDevoirModal, setOpenDevoirModal] = useState(false);

  const handleCloseQuizModal = () => setOpenQuizModal(false);
  const handleCloseDetailModal = () => { setActiveStep(0); setOpenDetailModal(false); };
  const handleCloseDevoirModal = () => setOpenDevoirModal(false);

  // Form states
  const [newQuiz, setNewQuiz] = useState({
    titre: "",
    type: "QUIZ",
    coursId: "",
    dateLimite: "",
    duree: ""
  });

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [file, setFile] = useState(null);
  const [resourceTitle, setResourceTitle] = useState("");

const questionsPerPage = 2; // ici on affiche 2 questions par page

const handleChangePage = (event, value) => {
  setPage(value);
};

  // Stepper & Questions
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Détails du Quiz', 'Questions Existantes', 'Ajouter une Question'];
  const [currentQuestion, setCurrentQuestion] = useState({ texte: "", options: ["", "", "", ""], correctAnswerIndex: 0 });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    dispatch(fetchCours());
    dispatch(fetchQuizsDevoir());
  }, [dispatch]);

  // Questions handlers
  const handleCurrentQuestionChange = (field, value) => {
    const newQ = { ...currentQuestion };
    if (field === "texte") newQ.texte = value;
    else if (field.startsWith("option")) newQ.options[parseInt(field.slice(-1))] = value;
    else if (field === "correctAnswerIndex") newQ.correctAnswerIndex = Number(value);
    setCurrentQuestion(newQ);
  };

  const addCurrentQuestion = () => {
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({ texte: "", options: ["", "", "", ""], correctAnswerIndex: 0 });
    setActiveStep(1);
  };

  const saveQuestionsToBackend = async () => {
    if (!selectedQuiz || questions.length === 0) return;
    const quizId = selectedQuiz?.quiz?.id || selectedQuiz?.id;
    if (!quizId) {
      console.error("Quiz ID introuvable !", selectedQuiz);
      alert("Erreur : Quiz non défini");
      return;
    }

    try {
      const formattedQuestions = questions.map(q => ({
        content: q.texte,
        correctAnswerIndex: q.correctAnswerIndex,
        choices: q.options.map((opt, index) => ({
          text: opt,
          index: index
        }))
      }));
      console.log("question envoyée",formattedQuestions)
      await dispatch(AddQuestions({ quizId, questions: formattedQuestions })).unwrap();

      alert("Questions enregistrées ✅");
      setCurrentQuestion({ texte: "", options: ["", "", "", ""], correctAnswerIndex: 0 });
      handleCloseDetailModal();
      dispatch(fetchQuizsDevoir());
    } catch (err) {
      console.error("Erreur backend:", err);
      alert("Erreur lors de l'enregistrement ❌");
    }
  };

const handleDownloadDevoir = async (devoirQuizId) => {
  if (!devoirQuizId) {
    console.error("DevoirQuiz ID introuvable !");
    alert("Erreur : devoir introuvable");
    return;
  }

  try {
    const token = localStorage.getItem("token"); 
    const response = await fetch(`http://localhost:8085/api/devoirquiz/download-devoir/${devoirQuizId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error("Erreur téléchargement");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = selectedQuiz?.devoir?.file || "devoir.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(error);
    alert("Erreur lors du téléchargement.");
  }
};



  // Stepper navigation
  const handleNextStep = () => setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
  const handleBackStep = () => setActiveStep(prev => Math.max(prev - 1, 0));

  const handleFileChange = (e) => setFile(e.target.files[0]);
const questionsList = selectedQuiz?.questions?.length > 0 ? selectedQuiz.questions : questions;
const startIndex = (page - 1) * questionsPerPage;
const paginatedQuestions = questionsList.slice(startIndex, startIndex + questionsPerPage);


  return (
    <>
      <StyledPaper sx={{ width: '95%', m: 1, p: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', color:"#174090" }}>Créez des quiz et devoirs</Typography>
          <ButtonComponent text="Nouveau Quiz Devoir" icon={<AddCircleOutline />} color="#008000" onClick={() => setOpenQuizModal(true)} />
        </Box>

        <Box display="flex" flexWrap="wrap" gap={2} px={2} mt={2}>
          {cardsToShow.map((item, index) =>
            item ? (
              <Card key={item.id} sx={{ flex: '1 1 calc(33.33% - 16px)', minWidth: 250, minHeight: 250 }}>
                <CardContent>
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      {item.type === 'QUIZ' ? <QuizIcon color="primary" /> : <WorkIcon color="secondary" />}
                      <Typography variant="h4" fontWeight="bold">{item.type}</Typography>
                    </Box>
                  </Grid>

                  <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1, color: "#174090" }}>
                    <Typography><strong>Cours:</strong> {item.cours?.nom || "N/A"}</Typography>
                    <Typography><strong>Date limite:</strong> {item.dateLimite || "N/A"}</Typography>
                    <Typography><strong>Titre:</strong> {item.quiz?.titre || "N/A"} minutes</Typography>

{item.type === 'QUIZ' ? (
  <Typography>{item.questions?.length || 0} questions</Typography>
) : (
  item.devoir?.file ? (
    <Button 
      variant="outlined" 
      disabled={!item.devoir}
      onClick={() => handleDownloadDevoir(item.id)}
    >
      Télécharger {item.devoir?.file || ""}
    </Button>
  ) : (
    <Typography>Pas de fichier</Typography>
  )
)}


                  </Box>

                  <Divider sx={{ my: 1 }} />

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    {item.type === 'QUIZ' ? (
                      <Typography>{item.questions?.length || 0} questions</Typography>
                    ) : (
                      item.devoir?.file ? (
                        <Typography>Voir / Télécharger</Typography>
                      ) : <Typography>Pas de fichier</Typography>
                    )}

                    <Typography sx={{ cursor: 'pointer', color: '#1976d2' }}
                      onClick={() => {
                        setSelectedQuiz(item);
                        if (item.type === "QUIZ") setOpenDetailModal(true);
                        else setOpenDevoirModal(true);
                      }}>
                      {item.type === "QUIZ" ? "Voir les détails" : (item.devoir?.file ? "Voir / Télécharger" : "Ajouter un fichier")}
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
                <IconButton color="primary" onClick={() => setOpenQuizModal(true)}><AddIcon /></IconButton>
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
          <TextField label="Titre" fullWidth value={newQuiz.titre} onChange={(e) => setNewQuiz({ ...newQuiz, titre: e.target.value })} />
          <TextField select label="Type" fullWidth value={newQuiz.type} onChange={(e) => setNewQuiz({ ...newQuiz, type: e.target.value })}>
            <MenuItem value="QUIZ">Quiz</MenuItem>
            <MenuItem value="DEVOIR">Devoir</MenuItem>
          </TextField>
          <TextField select label="Cours" fullWidth value={newQuiz.coursId} onChange={(e) => setNewQuiz({ ...newQuiz, coursId: e.target.value })}>
            {cours.map((c) => (<MenuItem key={c.id} value={c.id}>{c.nom}</MenuItem>))}
          </TextField>
          <TextField label="Date limite" type="date" InputLabelProps={{ shrink: true }} fullWidth value={newQuiz.dateLimite} onChange={(e) => setNewQuiz({ ...newQuiz, dateLimite: e.target.value })} />
          <TextField label="Durée (minutes)" type="number" fullWidth value={newQuiz.duree} onChange={(e) => setNewQuiz({ ...newQuiz, duree: e.target.value })} />
          <ButtonComponent text="Enregistrer" color="#174090" onClick={() => {
            dispatch(AddQuizDevoirs(newQuiz));
            handleCloseQuizModal();
            setNewQuiz({ titre: "", type: "QUIZ", dateLimite: "", duree: "", coursId: "" });
          }} />
        </Box>
      </CustomModal>

      {/* Modal Détails Quiz/Step */}
      <CustomModal open={openDetailModal} handleClose={handleCloseDetailModal} title={selectedQuiz ? `Quiz: ${selectedQuiz.type}` : ""} >
         <Box sx={{
    width: "100%",    // largeur fixe
    height: "590px",   // hauteur fixe
    maxHeight: "90vh", // limite pour écran petit
                    // padding
  }}>
          <Stepper activeStep={activeStep}>
            {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
          </Stepper>

          <Box sx={{ mt: 3 }}>
            {activeStep === 0 && (
              <>
                <Typography variant="h6">Détails du Quiz</Typography>
                <Typography><strong>Titre:</strong> {selectedQuiz?.titre || "N/A"}</Typography>
                <Typography><strong>Date limite:</strong> {selectedQuiz?.dateLimite || "N/A"}</Typography>
                <Typography><strong>Durée:</strong> {selectedQuiz?.duree || "N/A"} minutes</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button sx={{color:"white",backgroundColor:"#174090"}} onClick={handleNextStep}>Voir Questions</Button>
                </Box>
              </>
            )}

{activeStep === 1 && (
  <>
    <Typography variant="h6">Questions Existantes</Typography>

  {paginatedQuestions.map((q, i) => {
  const questionText = typeof q.content === "string"
    ? q.content
    : q.content?.content || q.texte || JSON.stringify(q.content);

  return (
    <Box key={q.id || i} sx={{ border: "1px solid #ccc", p: 1, mb: 1 }}>
      <Typography>{`Q${startIndex + i + 1}: ${questionText}`}</Typography>
      <ul>
        {(q.choices || q.options || []).map((choice, j) => {
          const choiceText = typeof choice === "string"
            ? choice
            : choice.content || JSON.stringify(choice);

          return (
            <li key={j}>
              {choiceText} {j === q.correctAnswerIndex && <strong>(✔)</strong>}
            </li>
          );
        })}
      </ul>
    </Box>
  );
})}


    {/* Pagination */}
    <PaginationComponent
      count={Math.ceil(questionsList.length / questionsPerPage)}
      page={page}
      onChange={handleChangePage}
    />

    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button sx={{ color: "white", backgroundColor: "#174090" }} onClick={handleBackStep}>Retour</Button>
      <Button sx={{ color: "white", backgroundColor: "#174090" }} onClick={handleNextStep}>Ajouter une question</Button>
    </Box>
  </>
)}


            {activeStep === 2 && (
              <>
                <Typography variant="h6">Ajouter une nouvelle question</Typography>
                <TextField label="Question" fullWidth value={currentQuestion.texte} onChange={(e)=>handleCurrentQuestionChange("texte",e.target.value)} sx={{ mb:1 }}/>
                {currentQuestion.options.map((opt,i)=>(
                  <TextField key={i} label={`Option ${i+1}`} fullWidth value={opt} onChange={(e)=>handleCurrentQuestionChange(`option${i}`,e.target.value)} sx={{ mb:1 }}/>
                ))}
                <TextField label="Indice bonne réponse (0-3)" type="number" inputProps={{ min:0,max:3 }} fullWidth value={currentQuestion.correctAnswerIndex} onChange={(e)=>handleCurrentQuestionChange("correctAnswerIndex", e.target.value)} sx={{ mb:2 }}/>

                <Box sx={{ display:'flex', justifyContent:'space-between' }}>
                  <Button sx={{color:"white",backgroundColor:"#174090"}} onClick={handleBackStep}>Retour</Button>
                  <Button sx={{color:"white",backgroundColor:"#174090"}} onClick={addCurrentQuestion}>Ajouter & Retour aux questions</Button>
                </Box>

                <Box sx={{ display:'flex', justifyContent:'flex-end', mt:2 }}>
                  <Button sx={{color:"white",backgroundColor:"#1A9BC3"}} onClick={saveQuestionsToBackend} disabled={questions.length === 0}>Enregistrer toutes les questions</Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </CustomModal>

      {/* Modal Devoir / Upload */}
      <CustomModal open={openDevoirModal} handleClose={handleCloseDevoirModal} title={`Ajouter une ressource pour: ${selectedQuiz?.titre}`} icon={<WorkIcon />}>
        <Box sx={{ mt:2, display:'flex', flexDirection:'column', gap:2 }}>
          <TextField label="Titre ressource" fullWidth value={resourceTitle} onChange={(e)=>setResourceTitle(e.target.value)}/>
          
          <Button variant="outlined" component="label" sx={{ textTransform:'none' }}>
            Choisir un fichier
            <input type="file" hidden onChange={handleFileChange}/>
          </Button>

          {file && <Typography variant="body2">Fichier sélectionné : {file.name}</Typography>}

          <ButtonComponent 
            text="Ajouter Ressource" 
            color="#008000" 
            onClick={async ()=>{
              if(!file){alert("Veuillez sélectionner un fichier !"); return;}
              try {
                await dispatch(AddDevoir({ quizDevoirId:selectedQuiz.id, file })).unwrap();
                alert("Ressource ajoutée ✅");
                setFile(null); setResourceTitle(""); 
                handleCloseDevoirModal();
                dispatch(fetchQuizsDevoir());
              } catch(err){console.error(err); alert("Erreur ❌");}
            }}
          />

          {selectedQuiz?.devoir?.id && (
            <Button 
              variant="outlined" 
              onClick={() => handleDownloadDevoir(selectedQuiz.devoir.id)}
              sx={{ textTransform: 'none', color: '#1976d2' }}
            >
              Télécharger {selectedQuiz.devoir.file}
            </Button>
          )}
        </Box>
      </CustomModal>

    </>
  );
};

export default AddQuizDevoir;
