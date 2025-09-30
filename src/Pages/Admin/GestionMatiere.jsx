import React, { useEffect, useState } from "react";
import { StyledPaper } from "../../Components/Global/Style";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../Components/Global/TableComponent";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import { Add, AddCircleOutline, Delete, Edit } from "@mui/icons-material";

import { toast } from "react-toastify";
import UpdateModal from "../../Components/Global/UpdateModel";
import { AddMatiéres, DeleteMatieres, fetchMatieres, UpdateMatiere } from "../../redux/actions/MatiéreAction";
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import { useTranslation } from "react-i18next";
import CustomModal from "../../Components/Global/ModelComponent";
import DeleteModel from "../../Components/Global/DeleteModel";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { DeleteRessourcesAction } from "../../redux/actions/RessourceActions";

const GestionMatiere = () => {
  const dispatch = useDispatch();
  const { matieres, loading, error } = useSelector((state) => state.matiere);
const handleCloseAdd= () => setOpenAddModal(false)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMatiere, setSelectedMatiere] = useState(null);
const { t } = useTranslation();
const { users } = useSelector((state) => state.user);
const [updatedName, setUpdatedName] = useState("");
const [updatedDescription, setUpdatedDescription] = useState("");
const [updatedFormateurId, setUpdatedFormateurId] = useState("");
const [updatedEleveId, setUpdatedEleveId] = useState("");

// on filtre pour ne garder que les formateurs
const formateurs = users.filter((u) => u.role === "ENSEIGNANT");

// état pour la sélection
const [formateurId, setformateurId] = useState("");
 const [matiereName, setMatiereName] = useState("");
  const [description, setDescription] = useState("");
  const [MatiéresIdToDelete, setMatiéresIdToDelete] = useState(null)
  const [openDelete, setOpenDelete] = useState(false);
  const [eleveId, setEleveId] = useState(""); // id de l'étudiant sélectionné

   const handleCloseDelete = () => setOpenDelete(false)
   const [MatiéreName, setMatiéreName] = useState(null)
 const MatiéreId=matieres.id
   const handleOpenDelete = (id,name) => {
      setMatiéresIdToDelete(id);
      setMatiéreName(name)
      setOpenDelete(true);
    };
  useEffect(() => {
    dispatch(fetchMatieres());
  }, [dispatch]);

const handleAddMatiere = async () => {
  if (!matiereName.trim()) {
    return toast.error("Veuillez saisir le nom de la matière");
  }
  if (!formateurId) {
    return toast.error("Veuillez sélectionner un formateur");
  }
  if (!eleveId) {
    return toast.error("Veuillez sélectionner un étudiant");
  }

  try {
    await dispatch(
      AddMatiéres({
        name: matiereName,
        description,
        formateurId,
        eleveId, // <-- ajouté ici
      })
    ).unwrap();

    toast.success("Matière ajoutée avec succès !");
    setMatiereName("");
    setDescription("");
    setformateurId("");
    setEleveId(""); // reset
    handleCloseAdd();
    dispatch(fetchMatieres());
  } catch (err) {
    toast.error(err || "Erreur lors de l'ajout de la matière");
  }
};



const handleUpdateMatiere = (e) => {
  e.preventDefault(); // Empêche le refresh
  if (!updatedName.trim()) {
    return toast.error("Veuillez saisir le nom de la matière");
  }
  dispatch(UpdateMatiere({
    id: selectedMatiere.id,
    name: updatedName,
    description: updatedDescription,
    formateurId: updatedFormateurId,
    eleveId: updatedEleveId
  }))
    .unwrap()
    .then(() => {
      toast.success("Matière mise à jour !");
      handleCloseModal();
      dispatch(fetchMatieres());
    })
    .catch((err) => toast.error(err || "Erreur lors de la mise à jour"));
};

const handleDeleteMatiereConfirm = (e) => {
  e.preventDefault(); // Empêche le refresh
  if (!MatiéresIdToDelete) return;
  dispatch(DeleteMatieres(MatiéresIdToDelete))
    .unwrap()
    .then(() => {
      toast.success("Matière supprimée !");
      setOpenDelete(false);
      dispatch(fetchMatieres());
    })
    .catch((err) => toast.error(err || "Erreur lors de la suppression"));
};



 const handleOpenModal = (matiere) => {
  setSelectedMatiere(matiere);
  setUpdatedName(matiere.name);
  setUpdatedDescription(matiere.description || "");
  setUpdatedFormateurId(matiere.enseignant?.id || "");
  setUpdatedEleveId(matiere.eleve?.id || "");
  setOpenModal(true);
};


  const handleCloseModal = () => {
    setSelectedMatiere(null);
    setOpenModal(false);
  };

  // Pagination
  const totalPages = Math.ceil(matieres.length / itemsPerPage);
  const paginatedMatieres = matieres.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
  { id: "name", label: "Nom de la matière", align: "left" },
  { id: "description", label: "Description de la matière", align: "left" },
{
  id: "enseignant", 
  label: "Collaborateur", 
  align: "left",
  render: (matiere) => 
    matiere.enseignant
      ? (matiere.enseignant.nom_prenom || matiere.enseignant.username || matiere.enseignant.email)
      : "—"
},

 {
  id: "actions",
  label: "Actions",
  align: "center",
  render: (matiere) => (
    <Box display="flex" gap={1} justifyContent="center">
      <IconButton onClick={() => handleOpenModal(matiere)}>
        <Edit sx={{ color: "#f9a825" }} />
      </IconButton>
    <IconButton onClick={() => handleOpenDelete(matiere.id, matiere.name)}>
  <Delete sx={{ color: "#e53935" }} />
</IconButton>


    </Box>
  ),
},

];
const handleDeleteConfirm = async () => {
  console.log("Suppression de la matière ID :", MatiéresIdToDelete);
  try {
    await dispatch(DeleteMatieres(MatiéresIdToDelete)).unwrap();
    toast.success("Matière supprimée !");
    setOpenDelete(false); // ferme le modal
    // plus besoin de fetchMatieres() si reducer est mis à jour
  } catch (error) {
    console.error(error);
    toast.error("Erreur lors de la suppression de la matière");
  }
};




  return (
    <StyledPaper elevation={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
          <Typography sx={{ fontSize: "20px", color: "#174090", fontWeight: "bold" }}>
            {t('Gestion des Matières')}
          </Typography>
          <ButtonComponent
            text={t('Ajouter une matière')}
            icon={<AddCircleOutline />}
            color="#008000"
            onClick={() => setOpenAddModal(true)}
          />
        </Box>
    {loading ? (
        <Typography sx={{ textAlign: "center" }}>Chargement...</Typography>
      ) : error ? (
        <Typography sx={{ textAlign: "center", color: "red" }}>{error}</Typography>
      ) : (
        <>
          <TableComponent columns={columns} rows={paginatedMatieres} />
          <Box mt={4} display="flex" justifyContent="center">
            <PaginationComponent
              count={totalPages}
              page={currentPage}
              onChange={(_e, value) => setCurrentPage(value)}
            />
          </Box>
        </>
      )}
{/* Modal pour l'ajout */}
    {/* Modal d'ajout */}
  <CustomModal
  open={openAddModal}
  handleClose={handleCloseAdd}
  title={t("Ajouter une matière")}
  icon={<AddCircleOutline />}
>
  <Box
    component="form"
    sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
  >
    <Typography sx={{ fontWeight: 500, color: "#174090" }}>
      {t("Nom de la matière")}
    </Typography>
    <TextField
      label="Nom"
      fullWidth
      value={matiereName}
      onChange={(e) => setMatiereName(e.target.value)}
    />

    <Typography sx={{ fontWeight: 500, color: "#174090" }}>
      {t("Description de la matière")}
    </Typography>
    <TextField
      label="Description"
      fullWidth
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <Typography sx={{ fontWeight: 500, color: "#174090" }}>
      {t("Formateur")}
    </Typography>
  <FormControl fullWidth>
  <InputLabel id="formateur-select-label">
    {t("Sélectionner un formateur")}
  </InputLabel>
  <Select
    labelId="formateur-select-label"
    id="formateur-select"
    value={formateurId}
    onChange={(e) => setformateurId(e.target.value)}
    label={t("Sélectionner un formateur")} // <-- important pour que le label flotte
  >
    {formateurs.map((ens) => (
      <MenuItem key={ens.id} value={ens.id}>
        {ens.nom_prenom || ens.username || ens.email}
      </MenuItem>
    ))}
  </Select>
</FormControl>

<Typography sx={{ fontWeight: 500, color: "#174090" }}>
  {t("Collaborateur")}
</Typography>
<FormControl fullWidth>
  <InputLabel id="eleve-select-label">
    {t("Sélectionner un Collaborateur")}
  </InputLabel>
  <Select
    labelId="eleve-select-label"
    value={eleveId}
    onChange={(e) => setEleveId(e.target.value)}
  >
    {users
      .filter(u => u.role === "ELEVE")
      .map((eleve) => (
        <MenuItem key={eleve.id} value={eleve.id}>
          {eleve.nom_prenom || eleve.username || eleve.email}
        </MenuItem>
    ))}
  </Select>
</FormControl>

    <ButtonComponent
      text={t("Ajouter")}
      color="#008000"
      onClick={handleAddMatiere} // ✅ on utilise la fonction centrale
    />
  </Box>
</CustomModal>


      {/* Modal pour modification */}
      <UpdateModal
  open={openModal}
  handleClose={handleCloseModal}
  title={`Modifier la matière : ${selectedMatiere?.name || ""}`}
>
  {selectedMatiere && (
    <Box component="form" sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        fullWidth
        label="Nom de la matière"
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      />

      <TextField
        fullWidth
        label="Description"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel>Formateur</InputLabel>
        <Select
          value={updatedFormateurId}
          onChange={(e) => setUpdatedFormateurId(e.target.value)}
        >
          {formateurs.map((ens) => (
            <MenuItem key={ens.id} value={ens.id}>
              {ens.nom_prenom || ens.username || ens.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Collaborateur</InputLabel>
        <Select
          value={updatedEleveId}
          onChange={(e) => setUpdatedEleveId(e.target.value)}
        >
          {users.filter(u => u.role === "ELEVE").map((eleve) => (
            <MenuItem key={eleve.id} value={eleve.id}>
              {eleve.nom_prenom || eleve.username || eleve.email}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

  <ButtonComponent
  type="button" // important
  text="Mettre à jour"
  color="#f9a825"
  onClick={handleUpdateMatiere}
/>

    </Box>
  )}
</UpdateModal>

           {/* Modal suppression */}
      <DeleteModel
        open={openDelete}
        handleClose={handleCloseDelete}
        title={t("Supprimer")}
        icon={<GridDeleteIcon />}
      >
        <Typography sx={{ marginTop: "20px" }}>
          {t("Êtes-vous sûr de vouloir supprimer cet matiére ?")}
        </Typography>
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: "25px" }}>
         <ButtonComponent
  type="button" // important
  onClick={handleDeleteMatiereConfirm}
  text={t("Supprimer")}
  color="#E1000F"
/>

        </Box>
      </DeleteModel>
    </StyledPaper>
  );
};

export default GestionMatiere;
