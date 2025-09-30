import React, { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Select, MenuItem, InputLabel, FormControl,
  InputAdornment, IconButton, Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent
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
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { StyledPaper } from '../../Components/Global/Style';
import TableComponent from '../../Components/Global/TableComponent';
import PaginationComponent from '../../Components/Global/PaginationComponent';
import { ButtonComponent } from '../../Components/Global/ButtonComponent';
import DeleteModel from '../../Components/Global/DeleteModel';
import UpdateModal from '../../Components/Global/UpdateModel';
import CustomModal from '../../Components/Global/ModelComponent';
import { useDispatch, useSelector } from "react-redux";
import { fetchRessources, DeleteRessourcesAction, UpdateRessourceAction, AddRessources, } from "../../redux/actions/RessourceActions";
import { toast } from 'react-toastify';
import { fetchCours } from '../../redux/actions/CoursAction';

const getTypeIcon = (type) => {
  if (!type || typeof type !== "string") return null;
  switch (type.toLowerCase()) {
    case "pdf": return <PictureAsPdfIcon sx={{ color: "#d32f2f", mr: 1 }} />;
    case "Vidéo":
    case "vidéo": return <VideoLibraryIcon sx={{ color: "#1976d2", mr: 1 }} />;
    case "quiz": return <QuizIcon sx={{ color: "#fbc02d", mr: 1 }} />;
    case "document":
    case "doc": return <ArticleIcon sx={{ color: "#616161", mr: 1 }} />;
    default: return null;
  }
};

const Ressources = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { ressources, loading } = useSelector(state => state.ressources);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal states
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Ressource states
  const [file, setFile] = useState(null);
  const [titreRes, setTitreRes] = useState('');
  const [typeRes, setTypeRes] = useState('PDF');
  const [coursId, setCoursId] = useState('');

const niveaux = ["PRIMAIRE", "SECONDAIRE", "AUTRE"];
const [niveauScolaire, setNiveauScolaire] = useState("PRIMAIRE");
  const [ResId, setResId] = useState(null);
  const [updatedtitreRes, setUpdatedtitreRes] = useState('');
  const [updatedTypeRes, setUpdatetypeRes] = useState('');
  const [UpdatedNiveau, setUpdateNiveau] = useState('');
const [openVideoModal, setOpenVideoModal] = useState(false);
const [videoUrl, setVideoUrl] = useState('');
const [RessourcesIdToDelete, setRessourcesIdToDelete] = useState(null);
  const [RessourcesName, setRessourcesName] = useState('');
    const [ressourcesAvecRelations, setRessourcesAvecRelations] = useState([]);
const { cours } = useSelector((state) => state.cours);
 useEffect(() => {
  dispatch(fetchRessources()).then((res) => {
    console.log("Réponse API brute ===>", res);
  });
  dispatch(fetchCours());
}, [dispatch]);

const refreshRessourcesAvecRelations = async () => {
  try {
    const resCours = await dispatch(fetchCours()).unwrap();
    const resRessources = await dispatch(fetchRessources()).unwrap();

    const fusion = resCours.flatMap(c =>
      (c.ressources || []).map(r => ({
        ...r,
        cours: { id: c.id, nom: c.nom },
        matiere: c.matiere ? { id: c.matiere.id, name: c.matiere.name } : null
      }))
    );

    setRessourcesAvecRelations(fusion);
  } catch (error) {
    console.error("Erreur lors du rafraîchissement des ressources :", error);
  }
};

  // Filtrer + Trier
 // 👉 Remplace "ressources" par "ressourcesAvecRelations" ici :
  const filteredRows = ressourcesAvecRelations
    .filter(r => {
      const matchType = selectedType ? r.typeRes?.toLowerCase() === selectedType.toLowerCase() : true;
      const matchSearch = searchTerm ? r.titreRes?.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return matchType && matchSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateAjout);
      const dateB = new Date(b.dateAjout);
      return sortOption === 'newest' ? dateB - dateA : dateA - dateB;
    });

const rowsWithIcons = filteredRows.map(row => ({
  ...row,
  typeRes: (
    <Box 
      display="flex" 
      alignItems="center" 
      sx={{ cursor: "pointer" }} 
      onClick={() => handleRessourceClick(row)}
    >
      {getTypeIcon(row.typeRes)}
      <Typography variant="body2">{row.typeRes || "N/A"}</Typography>
    </Box>
  )
}));


  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedRows = rowsWithIcons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (_e, value) => setCurrentPage(value);

  // Actions
  const handleOpenDelete = (id, titreRes) => {
    setRessourcesIdToDelete(id);
    setRessourcesName(titreRes);
    setOpenDelete(true);
  };
const handleDeleteConfirm = async () => {
  try {
    await dispatch(DeleteRessourcesAction({ RessourcesIdToDelete })).unwrap();
    toast.success(`Ressource "${RessourcesName}" supprimée !`);

    // 🔄 Recharge proprement la liste fusionnée
    await refreshRessourcesAvecRelations();

    setOpenDelete(false);
  } catch (error) {
    console.error(error);
    toast.error("Erreur lors de la suppression !");
  }
};



const updateRessource = async () => {
  try {
    const payload = { RessourceId: ResId };

    if (updatedtitreRes) payload.titreRes = updatedtitreRes;
    if (updatedTypeRes) payload.typeRes = updatedTypeRes;
    if (UpdatedNiveau) payload.niveau = UpdatedNiveau;
    if (coursId) payload.coursId = coursId;
    if (file) payload.file = file;

    await dispatch(UpdateRessourceAction(payload)).unwrap();

    toast.success("Ressource modifiée !");
    setOpenUpdate(false);
    refreshRessourcesAvecRelations();
  } catch (error) {
    toast.error("Erreur lors de la modification !");
  }
};



const handleAddRessource = async () => {
  if (!file || !titreRes || !coursId) 
    return toast.error("Veuillez remplir tous les champs");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("titre", titreRes);
  formData.append("type", typeRes);
  formData.append("coursId", coursId);
  formData.append("niveauScolaire", niveauScolaire);

  try {
    await dispatch(AddRessources({file, titreRes, typeRes, niveau: niveauScolaire, coursId})).unwrap();
    toast.success("Ressource ajoutée !");
    setOpenAddModal(false);

    refreshRessourcesAvecRelations(); // ✅ met à jour l'affichage
  } catch (err) {
    toast.error("Erreur lors de l'ajout !");
  }
};

const API_BASE_URL = "http://localhost:8085"; // adapte selon ton serveur

const handleRessourceClick = (ressource) => {
  if (!ressource || !ressource.typeRes) return;

  const fileUrl = `${API_BASE_URL}/Ressource/files/${ressource.contenuRes}`;

  // Vérifie le type pour décider de l'action
  const typeLower = ressource.typeRes.toLowerCase();

  if (typeLower === "vidéo" || typeLower === "video") {
    // Ouvrir dans le modal vidéo
    setVideoUrl(fileUrl);
    setOpenVideoModal(true);
  } else {
    // Forcer le téléchargement pour les autres types
    const link = document.createElement("a");
    link.href = fileUrl;

    // nom du fichier pour le téléchargement
    link.download = ressource.contenuRes;

    // pour certains navigateurs, il faut l'ajouter au DOM
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

useEffect(() => {
  refreshRessourcesAvecRelations();
}, [dispatch]);

;

const handleOpenUpdate = (id, titre, type, niveau, coursId) => {
  setResId(id);
  setUpdatedtitreRes(titre);
setUpdatetypeRes(type);
setUpdateNiveau(niveau);
setCoursId(coursId);

  setOpenUpdate(true);
};





  // Tableau colonnes
  const columns = [
    { id: 'typeRes', label: "Type", align: 'center' },
    { id: 'titreRes', label: "Titre", align: 'left' },
   { 
    id: 'dateAjout', 
    label: "Date d'ajout", 
    align: 'left', 
    render: row => row.dateAjout ? new Date(row.dateAjout.replace(' ', 'T')).toLocaleString() : "-"
 // remplace le T pour que JS comprenne

  },
    { id: 'cours', label: "Cours", align: 'center', render: row => row.cours?.nom },
    { id: 'niveauScolaire', label: "Niveau", align: 'center' },
    { id: 'matiere', label: "Matière", align: 'center', render: row => row.matiere?.name },


  ];

  const actions = [
    { icon: <DeleteIcon sx={{ color: "#e53935" }} />, tooltip: t('Supprimer'), onClick: row => handleOpenDelete(row.id, row.titreRes) },
    { icon: <VisibilityIcon sx={{ color: "#1e88e5" }} />, tooltip: t('Détails') },
    { icon: <EditIcon sx={{ color: "#f9a825" }} />, tooltip: t('Modifier'), onClick: row => handleOpenUpdate(row.id, row.titreRes, row.typeRes, row.niveauScolaire) },
  ];

  return (
    <>
      <StyledPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            {t('Déposez et gérez les ressources pédagogiques')}
          </Typography>
          <ButtonComponent
            text={t('Déposez une ressource')}
            icon={<AddCircleOutline />}
            color="#008000"
            onClick={() => setOpenAddModal(true)}
          />
        </Box>

        {/* Recherche et filtres */}
        <Box mt={3} mb={2} display="flex" gap={2} flexWrap="wrap">
          <TextField
            size="small"
            label={t("Rechercher une ressource")}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small"><SearchIcon /></IconButton>
                </InputAdornment>
              )
            }}
          />
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>{t("Filtrer")}</InputLabel>
            <Select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
              <MenuItem value="">{t("Tous les types")}</MenuItem>
              <MenuItem value="Devoir">Devoir</MenuItem>
              <MenuItem value="Cours">Cours</MenuItem>
              <MenuItem value="Quiz">Quiz</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>{t("Trier")}</InputLabel>
            <Select value={sortOption} onChange={e => setSortOption(e.target.value)}>
              <MenuItem value="newest">{t("Plus récent")}</MenuItem>
              <MenuItem value="oldest">{t("Plus ancien")}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Tableau */}
        {loading ? <Typography>{t("Chargement...")}</Typography>
          : <TableComponent columns={columns} rows={paginatedRows} actions={actions} />}

        {/* Pagination */}
        <Box mt={4} display="flex" justifyContent="center">
          <PaginationComponent count={totalPages} page={currentPage} onChange={handlePageChange} />
        </Box>
      </StyledPaper>

      {/* Modal ajout */}
      <CustomModal open={openAddModal} handleClose={() => setOpenAddModal(false)} title={t("Déposer une ressource")} icon={<AddCircleOutline />}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField label={t("Titre")} value={titreRes} onChange={e => setTitreRes(e.target.value)} />
          <FormControl>
            <InputLabel>{t("Type")}</InputLabel>
            <Select value={typeRes} onChange={e => setTypeRes(e.target.value)}>
              <MenuItem value="PDF">PDF</MenuItem>
              <MenuItem value="Vidéo">Vidéo</MenuItem>
              <MenuItem value="Quiz">Quiz</MenuItem>
              <MenuItem value="Document">Document</MenuItem>
            </Select>
          </FormControl>
  <FormControl fullWidth size="small">
  <InputLabel>{t("Cours")}</InputLabel>
  <Select
    value={coursId || ""}
    onChange={e => setCoursId(Number(e.target.value))}

  >
    {cours.map((c) => (
      <MenuItem key={c.id} value={c.id}>
        {c.nom}
      </MenuItem>
    ))}
  </Select>
</FormControl>

         <FormControl fullWidth size="small">
  <InputLabel>{t("Niveau")}</InputLabel>
  <Select
    value={niveauScolaire}
    onChange={(e) => setNiveauScolaire(e.target.value)}
  >
    {niveaux.map((n) => (
      <MenuItem key={n} value={n}>
        {t(n)}
      </MenuItem>
    ))}
  </Select>
</FormControl>
<Box sx={{border:"1px dashed grey",p:2,borderRadius:2,textAlign:"center",backgroundColor:"#f9f9f9"}}>
  <Typography variant="body2" sx={{mb:1}}>{file ? file.name : t("Glisser-déposez un fichier ici ou ")}</Typography>
          <Button variant="contained" component="label"sx={{textTransform:"none",bgcolor:"#0f9f0fff","&:hover":{bgcolor:"#0f9f0fff"}}}>
            {t("Parcourir")}
            <input type="file" hidden onChange={e => setFile(e.target.files[0])} />
          </Button>
          </Box>
          <ButtonComponent text={t("Déposer")} color="#174090" onClick={handleAddRessource} />
        </Box>
      </CustomModal>

      {/* Modal suppression */}
      <DeleteModel open={openDelete} handleClose={() => setOpenDelete(false)} title={t("Supprimer")} icon={<DeleteIcon />}>
        <Typography sx={{ mt: 2 }}>{t("Êtes-vous sûr de vouloir supprimer cette ressource ?")}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <ButtonComponent text={t("Supprimer")} color="#E1000F" onClick={handleDeleteConfirm} />
        </Box>
      </DeleteModel>

      {/* Modal modification */}
<UpdateModal 
  open={openUpdate} 
  handleClose={() => setOpenUpdate(false)} 
  title={t("Modifier cette Ressource")} 
  icon={<EditIcon />}
>
  <Box display="flex" flexDirection="column" gap={2}>
    {/* Titre */}
    <TextField 
      label={t("Titre")} 
      value={updatedtitreRes} 
      onChange={e => setUpdatedtitreRes(e.target.value)} 
    />

    {/* Type */}
   <FormControl fullWidth size="small">
  <InputLabel id="type-label">{t("Type")}</InputLabel>
  <Select
    labelId="type-label"
    id="type-select"
    value={updatedTypeRes || ""}
    label={t("Type")}   // ✅ obligatoire
    onChange={(e) => setUpdatetypeRes(e.target.value)}
  >
    <MenuItem value="PDF">PDF</MenuItem>
    <MenuItem value="Vidéo">Vidéo</MenuItem>
    <MenuItem value="Quiz">Quiz</MenuItem>
    <MenuItem value="Document">Document</MenuItem>
  </Select>
</FormControl>



    {/* Niveau */}
<FormControl fullWidth size="small">
  <InputLabel id="niveau-label">{t("Niveau")}</InputLabel>
  <Select
    labelId="niveau-label"
    id="niveau-select"
    value={UpdatedNiveau || ""}
    label={t("Niveau")}   // ✅ obligatoire
    onChange={(e) => setUpdateNiveau(e.target.value)}
  >
    {niveaux.map((n) => (
      <MenuItem key={n} value={n}>
        {t(n)}
      </MenuItem>
    ))}
  </Select>
</FormControl>



    {/* Cours */}
<FormControl fullWidth size="small">
  <InputLabel id="cours-label">{t("Cours")}</InputLabel>
  <Select
    labelId="cours-label"
    id="cours-select"
    value={coursId || ""}
    label={t("Cours")}   // ✅ obligatoire
    onChange={(e) => setCoursId(Number(e.target.value))}
  >
    {cours.map((c) => (
      <MenuItem key={c.id} value={c.id}>
        {c.nom}
      </MenuItem>
    ))}
  </Select>
</FormControl>



    {/* Fichier (optionnel si on veut remplacer) */}
    <Box sx={{border:"1px dashed grey",p:2,borderRadius:2,textAlign:"center",backgroundColor:"#f9f9f9"}}>
      <Typography variant="body2" sx={{mb:1}}>
        {file ? file.name : t("Glisser-déposez un fichier ici ou ")}
      </Typography>
      <Button 
        variant="contained" 
        component="label"
        sx={{textTransform:"none",bgcolor:"#0f9f0fff","&:hover":{bgcolor:"#0f9f0fff"}}}
      >
        {t("Parcourir")}
        <input type="file" hidden onChange={e => setFile(e.target.files[0])} />
      </Button>
    </Box>

    {/* Bouton modifier */}
    <ButtonComponent 
      text={t("Modifier")} 
      color="#1A9BC3" 
      onClick={updateRessource} 
    />
  </Box>
</UpdateModal>


      {/* Modal pour l'apercu de vidéo */}
   <Dialog open={openVideoModal} onClose={() => setOpenVideoModal(false)} maxWidth="md" fullWidth>
  <DialogTitle>Lecture de la vidéo</DialogTitle>
  <DialogContent>
   <video width="100%" height="100%" controls>
  <source src={videoUrl} type="video/mp4" />
  Votre navigateur ne supporte pas la lecture vidéo.
</video>

  </DialogContent>
</Dialog>


    </>
  );
};

export default Ressources;
