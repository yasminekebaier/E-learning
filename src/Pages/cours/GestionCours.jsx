import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Card, CardContent, CardActions, Button, List, ListItem, ListItemText, TextField, MenuItem, Select, InputLabel, FormControl, Divider } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { ListItemIcon } from "@mui/material";

import { fetchMatieres } from "../../redux/actions/MatiéreAction";
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import CustomModal from "../../Components/Global/ModelComponent";
import { AddCours, fetchCours } from "../../redux/actions/CoursAction";
import { StyledPaper } from "../../Components/Global/Style";
const GestionCours = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { matieres, loading, error } = useSelector((state) => state.matiere);
  const { CurrentUser } = useSelector((state) => state.user); // ⚡ utilisateur connecté (enseignant)
  const [coursName, setCoursName] = useState("");

  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedMatiere, setSelectedMatiere] = useState(null);
  const [nom, setNom] = useState("");
const [description, setDescription] = useState("");
const [etat, setEtat] = useState("");
const [type, setType] = useState("");
const [datedebut, setDateDebut] = useState("");
const [datefin, setDateFin] = useState("");
const [nbrhour, setNbrHour] = useState("");
const [prix, setPrix] = useState("");
const [nomformateur, setNomformateur] = useState(CurrentUser?.fullname || "");
const [creepar, setCreepar] = useState(CurrentUser?.id || "");
const { cours, isFetching} = useSelector((state) => state.cours);
const { users } = useSelector((state) => state.user);
const [selectedStudent, setSelectedStudent] = useState("");

// on filtre pour ne garder que les etudiants
const etudiants = users.filter((u) => u.role === "ELEVE");

const getCoursParMatiere = (matiereId) => {
  return Array.isArray(cours) ? cours.filter(c => c.matiere?.id === matiereId) : [];
};



  useEffect(() => {
    dispatch(fetchMatieres());
    dispatch(fetchCours());
  }, [dispatch]);

  // on filtre pour ne garder que les matières de l'enseignant connecté
  const matieresEnseignant = matieres.filter(
    (m) => m.enseignant && m.enseignant.id === CurrentUser?.id
  );

  const handleOpenAdd = (matiere) => {
    setSelectedMatiere(matiere);
    setOpenAddModal(true);
  };

  const handleCloseAdd = () => {
    setOpenAddModal(false);
    setSelectedMatiere(null);
    setCoursName("");
  };

  const handleAddCours = async () => {
  if (!nom.trim()) {
    return toast.error("Veuillez saisir le nom du cours");
  }

  try {
 await dispatch(
  AddCours({
    matiereId: selectedMatiere.id,
    studentId: selectedStudent,  // 👈 ajouté
    nom,
    description,
    etat,
    type,
    datedebut,
    datefin,
    nbrhour,
    prix,
    nomformateur,
    creepar
  })
).unwrap();


    toast.success("Cours ajouté avec succès !");
    handleCloseAdd();
    dispatch(fetchCours()); 
    dispatch(fetchMatieres());
  } catch (err) {
    toast.error("Erreur lors de l'ajout du cours");
  }
};



  return (
   <>
   <StyledPaper elevation={3} sx={{ padding: 2}}>
     <Box>
      <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#174090", mb: 3 }}>
        {t("Gestion des cours par matières")}
      </Typography>

      {loading ? (
        <Typography>Chargement...</Typography>
      ) : error ? (
        <Typography color="red">{error}</Typography>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={3}>
          {matieresEnseignant.map((matiere) => (
            <Card
  key={matiere.id}
  sx={{
    borderRadius: 1,
    boxShadow: 4,
    display: "flex",
    flexDirection: "column",
    height: "100%" // important pour que flex fonctionne bien
  }}
>
  <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h4" color="green">{matiere.name}</Typography>
                <Box sx={{ mb: 2 ,mt:1}}>
                <Typography variant="body2" >
                  Description de la matiére :
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }} >{matiere.description}</Typography>
                </Box>
<Divider sx={{ mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {t("Cours existants")} :
                </Typography>
<List>
  {getCoursParMatiere(matiere.id).length > 0 ? (
    getCoursParMatiere(matiere.id).map((coursItem, idx) => (
      <Box key={idx} sx={{ mb: 2 }}>
        {/* Nom du cours */}
        <ListItem>
          <ListItemText 
            primary={coursItem.nom} 
            secondary={coursItem.description} 
          />
        </ListItem>

        {/* 🔽 Affichage des ressources du cours */}
        {coursItem.ressources && coursItem.ressources.length > 0 ? (
          <List >
            {coursItem.ressources.map((res) => {
              let icon;
              if (
                res.typeRes?.toLowerCase() === "vidéo" || 
                res.contenuRes.toLowerCase().endsWith(".mp4") || 
                res.contenuRes.toLowerCase().endsWith(".mkv")
              ) {
                icon = <OndemandVideoIcon color="primary" />;
              } else if (res.contenuRes.toLowerCase().endsWith(".pdf")) {
                icon = <PictureAsPdfIcon color="error" />;
              } else {
                icon = <InsertDriveFileIcon color="action" />;
              }

              return (
                <ListItem key={res.id}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    primary={res.titreRes}
                    secondary={
                      <a
                        href={res.fichier}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1976d2", textDecoration: "underline" }}
                      >
                        {res.contenuRes}
                      </a>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>
            Aucune ressource pour ce cours
          </Typography>
        )}
      </Box>
    ))
  ) : (
    <Typography variant="body2" color="text.secondary">
      Aucun cours pour l'instant
    </Typography>
  )}
</List>




              </CardContent>
<Divider mb={2} />
               <CardActions sx={{ mt: "auto",display:"flex",justifyContent: "flex-end" }}>
                <ButtonComponent
                  text={t("Ajouter un cours")}
                  icon={<AddCircleOutline />}
                  color="#008000"
                  onClick={() => handleOpenAdd(matiere)}
                />
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      {/* Modal ajout cours */}
<CustomModal open={openAddModal} handleClose={handleCloseAdd} title="Ajouter un cours">
  <Box display="flex" flexDirection="column" gap={2}>
    <TextField 
      label="Nom du cours" 
      value={nom} 
      onChange={(e) => setNom(e.target.value)} 
      size="small"
    />
    <TextField 
      label="Description" 
      value={description} 
      onChange={(e) => setDescription(e.target.value)} 
      size="small"
    />
    
    <FormControl size="small" fullWidth>
      <InputLabel>État</InputLabel>
      <Select value={etat} onChange={(e) => setEtat(e.target.value)}>
        <MenuItem value="PLANIFIE">Planifié</MenuItem>
        <MenuItem value="EN_COURS">En cours</MenuItem>
        <MenuItem value="TERMINE">Terminé</MenuItem>
      </Select>
    </FormControl>

    <FormControl size="small" fullWidth>
      <InputLabel>Type</InputLabel>
      <Select value={type} onChange={(e) => setType(e.target.value)}>
        <MenuItem value="PRESENTIEL">Présentiel</MenuItem>
        <MenuItem value="EN_LIGNE">En ligne</MenuItem>
        <MenuItem value="HYBRIDE">Hybride</MenuItem>
      </Select>
    </FormControl>

    {/* Dates sur la même ligne */}
    <Box display="flex" gap={2}>
      <TextField 
        type="date" 
        label="Date début" 
        InputLabelProps={{ shrink: true }} 
        value={datedebut} 
        onChange={(e) => setDateDebut(e.target.value)} 
        size="small"
        sx={{ flex: 1 }}
      />
      <TextField 
        type="date" 
        label="Date fin" 
        InputLabelProps={{ shrink: true }} 
        value={datefin} 
        onChange={(e) => setDateFin(e.target.value)} 
        size="small"
        sx={{ flex: 1 }}
      />
    </Box>

    <TextField 
      type="number" 
      label="Nombre d'heures" 
      value={nbrhour} 
      onChange={(e) => setNbrHour(e.target.value)} 
      size="small"
    />
   {/*  <TextField 
      type="number" 
      label="Prix" 
      value={prix} 
      onChange={(e) => setPrix(e.target.value)} 
      size="small"
    /> */}
   {/*  <TextField 
      label="Formateur" 
      value={nomformateur} 
      disabled 
      size="small"
    /> */}
<FormControl size="small" fullWidth>
  <InputLabel>Étudiant</InputLabel>
  <Select
    value={selectedStudent}
    onChange={(e) => setSelectedStudent(e.target.value)}
  >
    {etudiants.map((et) => (
      <MenuItem key={et.id} value={et.id}>
        {et.nom_prenom || et.username || et.email}
      </MenuItem>
    ))}
  </Select>
</FormControl>

    <ButtonComponent text="Ajouter" color="#008000" onClick={handleAddCours} />
  </Box>
</CustomModal>



    </Box>
    </StyledPaper>
    </>
  )
}

export default GestionCours
