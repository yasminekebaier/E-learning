import React, { useState } from "react";
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
  Pagination,
  Button,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import QuizIcon from "@mui/icons-material/Quiz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import { AddCircleOutline } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import CustomModal from "../../Components/Global/ModelComponent";
import { StyledPaper } from "../../Components/Global/Style";

// Exemple de données de cours
const courses = [
  { id: 1, title: "Le passé composé", resources: ["Fiche PDF", "Vidéo explicative", "Exercices d'application"], hasQuiz: true },
  { id: 2, title: "La description d’un lieu", resources: ["Fiche de vocabulaire", "Exemples d'expressions"], hasQuiz: true },
  { id: 3, title: "Les types de phrases", resources: ["Fiche de révision", "Tableau des types de phrases"], hasQuiz: true },
  { id: 4, title: "Les conjugaisons", resources: ["Fiche PDF", "Exercices"], hasQuiz: false },
  { id: 5, title: "Les pronoms", resources: ["Fiche PDF", "Quiz interactif"], hasQuiz: true },
  { id: 6, title: "Les adjectifs", resources: ["Exercices d'application"], hasQuiz: false },
  { id: 7, title: "Les prépositions", resources: ["Fiche PDF"], hasQuiz: true },
];

const MesCours = () => {
  const { matiere } = useParams();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const pageCount = Math.ceil(courses.length / itemsPerPage);
const [openAddModal, setOpenAddModal] = useState(false);
const handleCloseAdd= () => setOpenAddModal(false)
  // Sélection des matières de la page courante
  const startIndex = (page - 1) * itemsPerPage;

   // Gestion de la pagination
  const handlePageChange = (event, value) => {
    setPage(value);
  };
const displayedCourses = courses.slice(startIndex, startIndex + itemsPerPage);



  return (
    <>
    <StyledPaper>
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ color: "#080D50", fontWeight: "bold", mb: 2 }}>
        {matiere} – 4ème année
      </Typography>

      <Paper elevation={3} sx={{ backgroundColor: "#f9f9f9", padding: 2, borderRadius: 1, boxShadow: "0px 2px 6px rgba(0,0,0,0.1)", mb: 4, maxWidth: "800px" }}>
        <Typography variant="h8" sx={{  }}>
          La matière de {matiere} en 4ème année permet aux élèves de développer
          leurs compétences en lecture, écriture, expression orale et
          compréhension grammaticale. Les cours sont adaptés au programme officiel
          et enrichis de ressources interactives et d’exercices variés.
        </Typography>
      </Paper>

        <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 10,
                mb: 2,
              }}
            >
        {displayedCourses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{minHeight: 200,
                height: 300,
                  flex: "0 1 calc(33.33% - 20px)",
                  width: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 1,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 6px 18px rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h8">
                  {course.title}
                </Typography>

                <Divider sx={{ mb: 2,mt:1 }} />
<Box sx={{ height: 120}}>
                <List dense>
                  {course.resources.map((resource, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <ListItemIcon>
                        {resource.toLowerCase().includes("pdf") ? (
                          <DescriptionIcon color="primary" />
                        ) : resource.toLowerCase().includes("vidéo") ? (
                          <VideoLibraryIcon color="secondary" />
                        ) : (
                          <CheckCircleIcon color="success" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={resource} />
                    </ListItem>
                  ))}
                </List>
                </Box>
  <Divider sx={{ mb: 2 }} />
                {course.hasQuiz && (
                    <>
                    <Box marginBottom={2}>
                  <Typography variant="body2" sx={{ color: "red", mt: 1, fontWeight: "bold", display: "flex", alignItems: "center" }}>
                    <QuizIcon sx={{ mr: 0.5, fontSize: 18 }} /> Ce cours contient un quiz.
                  </Typography>
                  </Box>
                      <ButtonComponent
            text={t('Lancer le quiz')}
            icon={<AddCircleOutline />}
            color="orange"
            onClick={() => setOpenAddModal(true)}
          />
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Box>

      
      {/* Pagination en bas */}
      <PaginationComponent
        count={pageCount}
        page={page}
        onChange={handlePageChange}
      />
    </Box>
    {/* Modal Création Quiz/Devoir */}
   <CustomModal open={openAddModal} handleClose={handleCloseAdd} title="Quiz – Le passé composé">
  <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
    
    {/* Question 1 */}
    <Typography>1. Complétez la phrase : Hier, je __ (manger) une pomme.</Typography>
    <TextField
      select
      fullWidth
      size="small"
      defaultValue=""
    >
      <MenuItem value="mangé">mangé</MenuItem>
      <MenuItem value="ai mangé">ai mangé</MenuItem>
      <MenuItem value="manger">manger</MenuItem>
    </TextField>

    {/* Question 2 */}
    <Typography>2. Cochez les auxiliaires utilisés pour le passé composé :</Typography>
    <Box>
      <label>
        <input type="checkbox" value="avoir" /> avoir
      </label><br />
      <label>
        <input type="checkbox" value="être" /> être
      </label><br />
      <label>
        <input type="checkbox" value="aller" /> aller
      </label>
    </Box>

    {/* Question 3 */}
    <Typography>3. Conjuguez le verbe "finir" avec "nous" :</Typography>
    <TextField
      placeholder="Votre réponse ici"
      fullWidth
      size="small"
    />

    <ButtonComponent
      text="Valider le quiz"
      color="#080D50"
      onClick={() => { /* call API ou correction */ }}
    />
  </Box>
</CustomModal>
</StyledPaper>

      </>
  );
};

export default MesCours;
