import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, TextField, Select, MenuItem, InputLabel, FormControl,
  InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Grid
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import QuizIcon from '@mui/icons-material/Quiz';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { StyledPaper } from '../../Components/Global/Style';
import TableComponent from '../../Components/Global/TableComponent';
import PaginationComponent from '../../Components/Global/PaginationComponent';
import { ButtonComponent } from '../../Components/Global/ButtonComponent';
import DeleteModel from '../../Components/Global/DeleteModel';
import { useDispatch, useSelector } from "react-redux";
import { DeleteRessourcesAction, fetchRessources, UpdateRessourceAction } from "../../redux/actions/RessourceActions" // ✅ Vérifie le chemin exact
import UpdateModal from '../../Components/Global/UpdateModel';

// Pour les icônes selon le type
const getTypeIcon = (type) => {
  if (!type || typeof type !== "string") return null; // ✅ Sécurité

  switch (type.toLowerCase()) {
    case "pdf":
      return <PictureAsPdfIcon sx={{ color: "#d32f2f", mr: 1 }} />;
    case "vidéo":
    case "video":
      return <VideoLibraryIcon sx={{ color: "#1976d2", mr: 1 }} />;
    case "quiz":
      return <QuizIcon sx={{ color: "#fbc02d", mr: 1 }} />;
    case "document":
    case "doc":
      return <ArticleIcon sx={{ color: "#616161", mr: 1 }} />;
    default:
      return null;
  }
};


const Ressources = () => {
  const { t } = useTranslation();
  

  // --- Récupération des données depuis Redux ---
  const { ressources, loading } = useSelector((state) => state.ressources);
console.log("liste des ressources",ressources)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
const [RessourcesIdToDelete, setRessourcesIdToDelete] = useState(null)
  const [RessourcesName, setRessourcesName] = useState(null)
  const dispatch = useDispatch()
  const itemsPerPage = 5;
const RessourceId=ressources.id
  // --- Charger les ressources au montage ---
  useEffect(() => {
    dispatch (fetchRessources());
  }, [dispatch]);

  // --- Filtrer + Trier les ressources Redux ---
  const filteredRows = (ressources || [])
    .filter(row =>
      row.titreRes?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType ? row.Type === selectedType : true)
    )
    .sort((a, b) => {
      const dateA = new Date(a.DateAjout);
      const dateB = new Date(b.DateAjout);
      return sortOption === 'newest' ? dateB - dateA : dateA - dateB;
    });

  // --- Ajouter icônes sur le Type ---
  const rowsWithIcons = filteredRows.map(row => ({
  ...row,
  typeRes: (
    <Box display="flex" alignItems="center">
      {getTypeIcon(row.typeRes)}
      <Typography variant="body2">{row.typeRes || "N/A"}</Typography>
    </Box>
  )
}));


  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedRows = rowsWithIcons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (_e, value) => setCurrentPage(value);
 const [openUpdate, setopenUpdate] = useState(false);
  const [ResId, setResId] = useState(null);
    const [updatedtitreRes, setUpdatedtitreRes] = useState('');
    const [updatedTypeRes, setUpdatetypeRes] = useState('');
    const [UpdatedNiveau, setUpdateNiveau] = useState('');
    
        const handleCloseUpdate= () => setopenUpdate(false)
 const handleCloseDelete = () => setOpenDelete(false)
     const handleOpenDelete = (id,titreRes) => {
      setRessourcesIdToDelete(id);
      setRessourcesName(titreRes)
      setOpenDelete(true);
    };
     const handleDeleteConfirm = async () => {
      try {
        await dispatch(DeleteRessourcesAction({RessourcesIdToDelete}));
        dispatch(fetchRessources((RessourceId)));
      
        setOpenDelete(false);
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'employé :');
      }
    };
     const handleOpenUpdate = (id, titreRes, typeRes,Niveau) => {
      setResId(id);
      setUpdatedtitreRes(titreRes);
      setUpdateNiveau(Niveau)
      setUpdatetypeRes(typeRes)
      
      setopenUpdate(true);
    };
      const updateRessource = async () => {
          try {
            await dispatch(UpdateRessourceAction({ ResId, Title: updatedtitreRes, Type: updatedTypeRes ,HoursNumber:UpdatedNiveau}));
           /*  toast.success("Task updated succesfully "); */
            handleCloseUpdate()
          } catch (error) {
            
          }
        };
  // --- Colonnes du tableau ---
  const columns = [
    { id: 'typeRes', label: "Type", align: 'center' },
    { id: 'titreRes', label: t('Titre'), align: 'left' },
    { id: 'heureAjout', label: t("Date de l'ajout"), align: 'left' },
    { id: 'Matiere', label: t('Matière'), align: 'center' },
    { id: 'Niveau', label: t('Niveau'), align: 'center' },
  ];

  const actions = [
    {
      icon: <DeleteIcon sx={{ color: "#e53935" }} />,
      tooltip: t('Supprimer'),
       onClick: (row) => handleOpenDelete(row.id, row.titreRes)
    },
    {
      icon: <VisibilityIcon sx={{ color: "#1e88e5" }} />,
      tooltip: t('Détails'),
    },
    {
      icon: <EditIcon sx={{ color: "#f9a825" }} />,
      tooltip: t('Modifier'),
      onClick: (row) => handleOpenUpdate(row.id, row.titreRes)
    },
  ];

  return (
    <>
      <StyledPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: "20px", color: "#080D50", fontWeight: "bold" }}>
            {t('Déposez et gérez les ressources pédagogiques')}
          </Typography>
          <ButtonComponent
            text={t('Déposez une ressource')}
            icon={<AddCircleOutline />}
            color="orange"
            onClick={() => setOpenAddModal(true)}
          />
        </Box>

        {/* Barre de recherche + filtres */}
        <Box
          mt={3}
          mb={2}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <TextField
            size="small"
            label={t("Rechercher une ressource")}
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 200 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" color="primary">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: '16px', fontSize: '1.03rem' }
            }}
          />

          <Box display="flex" gap={2}>
            <FormControl size="small" sx={{ minWidth: 130, borderRadius: '16px' }}>
              <InputLabel>{t("Filtrer")}</InputLabel>
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                label={t("Filtrer")}
              >
                <MenuItem value="">{t("Tous les types")}</MenuItem>
                <MenuItem value="Devoir">Devoir</MenuItem>
                <MenuItem value="Cours">Cours</MenuItem>
                <MenuItem value="Quiz">Quiz</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>{t("Trier")}</InputLabel>
              <Select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                label={t("Trier")}
              >
                <MenuItem value="newest">{t("Plus récent")}</MenuItem>
                <MenuItem value="oldest">{t("Plus ancien")}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Tableau */}
        {loading ? (
          <Typography sx={{ mt: 3, textAlign: "center" }}>
            {t("Chargement des ressources...")}
          </Typography>
        ) : (
          <TableComponent columns={columns} rows={paginatedRows} actions={actions} />
        )}

        {/* Pagination */}
        <Box mt={4} display="flex" justifyContent="center">
          <PaginationComponent count={totalPages} page={currentPage} onChange={handlePageChange} />
        </Box>
      </StyledPaper>

      {/* Modal d'ajout */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {t("Ajouter une ressource")}
          <IconButton
            aria-label="close"
            onClick={() => setOpenAddModal(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label={t("Titre")} fullWidth />
            <TextField label={t("Matière")} fullWidth />
            <TextField label={t("Type")} fullWidth />
            <TextField label={t("Niveau")} fullWidth />
            <TextField label={t("Date d'ajout")} fullWidth type="date" InputLabelProps={{ shrink: true }} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>{t("Annuler")}</Button>
          <Button variant="contained">{t("Enregistrer")}</Button>
        </DialogActions>
      </Dialog>

      {/* Modal suppression */}
      <DeleteModel
        open={openDelete}
        handleClose={handleCloseDelete}
        title={t("Supprimer")}
        icon={<DeleteIcon />}
      >
        <Typography sx={{ marginTop: "20px" }}>
          {t("Êtes-vous sûr de vouloir supprimer cet employé ?")}
        </Typography>
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: "25px" }}>
          <ButtonComponent onClick={handleDeleteConfirm} text={t("Supprimer")} color="#E1000F" />
        </Box>
      </DeleteModel>
      <UpdateModal
  open={openUpdate}
  handleClose={handleCloseUpdate}
  title={t("Modifier cette Ressource")}
  icon={<EditIcon />}
>
  <Box >
  <Grid container sx={{marginTop:"30px"}}>
    <Grid item xs={12}>
      <Typography variant="h4">{t("Titre")}</Typography>
    </Grid>
    
      <TextField
        fullWidth
        variant="outlined"
        id="titreRes"
        name="titreRes"
        type="text"
        margin="normal"
        value={updatedtitreRes}
        onChange={(e) => setUpdatedtitreRes(e.target.value)}
      />
    </Grid>
 
   <Typography variant="h4" marginTop="10px">Type</Typography>
  <TextField
    fullWidth
    id="typeRes"
    margin="normal"
    name="typeRes"
    variant="outlined"
    value={updatedTypeRes}
    onChange={(e) => setUpdatetypeRes(e.target.value)}
  />
  <Typography variant="h4" marginTop="10px">{t("Niveau")}</Typography>
  <TextField
    fullWidth
    id="niveau"
    margin="normal"
    name="niveau"
    type='number'
   variant="outlined"
    value={UpdatedNiveau}
    onChange={(e) => setUpdateNiveau(e.target.value)}
  />
 
  <Box sx={{textAlign:'center', marginTop:"30px"}}>
  <ButtonComponent
    text={t("Modifier")}
    color={"#1A9BC3"}
    onClick={updateRessource}/></Box>
  </Box>
</UpdateModal>
    </>
  );
};

export default Ressources;
