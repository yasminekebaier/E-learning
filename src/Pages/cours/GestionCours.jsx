import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Card, CardContent, CardActions, Button, List, ListItem, ListItemText, TextField, MenuItem, Select, InputLabel, FormControl, Divider } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

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
      <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#080D50", mb: 3 }}>
        {t("Gestion des cours par matières")}
      </Typography>

      {loading ? (
        <Typography>Chargement...</Typography>
      ) : error ? (
        <Typography color="red">{error}</Typography>
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={3}>
          {matieresEnseignant.map((matiere) => (
            <Card key={matiere.id} sx={{ borderRadius: 1, boxShadow: 4 }}>
              <CardContent>
                <Typography variant="h3" color="green">{matiere.name}</Typography>
                <Box sx={{display:"flex", mt: 1, mb: 2 }}>
                <Typography variant="body2" >
                  Description de la matiére :
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }} >{matiere.description}</Typography>
                </Box>
<Divider sx={{ mb: 1 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {t("Cours existants")} :
                </Typography>
              <List>
  {getCoursParMatiere(matiere.id).length > 0 ? (
    getCoursParMatiere(matiere.id).map((coursItem, idx) => (
      <ListItem key={idx}>
        <ListItemText primary={coursItem.nom} />
      </ListItem>
    ))
  ) : (
    <Typography variant="body2" color="text.secondary">
      Aucun cours pour l'instant
    </Typography>
  )}
</List>

              </CardContent>

              <CardActions>
                <ButtonComponent
                  text={t("Ajouter un cours")}
                  icon={<AddCircleOutline />}
                  color="orange"
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
    <TextField 
      type="number" 
      label="Prix" 
      value={prix} 
      onChange={(e) => setPrix(e.target.value)} 
      size="small"
    />
    <TextField 
      label="Formateur" 
      value={nomformateur} 
      disabled 
      size="small"
    />

    <ButtonComponent text="Ajouter" color="orange" onClick={handleAddCours} />
  </Box>
</CustomModal>



    </Box>
    </StyledPaper>
    </>
  )
}

export default GestionCours
