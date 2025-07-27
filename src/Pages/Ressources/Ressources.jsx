import React, { useState } from 'react';
import {
  Box, Button, Typography, TextField, Select, MenuItem, InputLabel, FormControl,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import EditIcon from "@mui/icons-material/Edit";
import { StyledPaper } from '../../Components/Global/Style';
import TableComponent from '../../Components/Global/TableComponent';
import PaginationComponent from '../../Components/Global/PaginationComponent';
import {ButtonComponent} from '../../Components/Global/ButtonComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import QuizIcon from '@mui/icons-material/Quiz';
import ArticleIcon from '@mui/icons-material/Article';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
 import AddCircleOutline from '@mui/icons-material/Close';
import DeleteModel from '../../Components/Global/DeleteModel';
const getTypeIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return <PictureAsPdfIcon sx={{ color: '#d32f2f', mr: 1 }} />;
    case 'vidéo':
    case 'video':
      return <VideoLibraryIcon sx={{ color: '#1976d2', mr: 1 }} />;
    case 'quiz':
      return <QuizIcon sx={{ color: '#fbc02d', mr: 1 }} />;
    case 'document':
    case 'doc':
      return <ArticleIcon sx={{ color: '#616161', mr: 1 }} />;
    default:
      return null;
  }
};



const allRows = [
  {
    id: 1,
    Type: "vidéo",
    Titre: "Examen JavaScript",
    DateAjout: "15/07/2025",
    Matiere: "JavaScript",
    Niveau: "3ème année",
  },
  {
    id: 2,
    Type: "pdf",
    Titre: "Introduction à React",
    DateAjout: "14/07/2025",
    Matiere: "React.js",
    Niveau: "2ème année",
  },
  {
    id: 3,
    Type: "Quiz",
    Titre: "Quiz Node.js",
    DateAjout: "13/07/2025",
    Matiere: "Node.js",
    Niveau: "3ème année",
  },
   {
    id: 4,
    Type: "Quiz",
    Titre: "Quiz Node.js",
    DateAjout: "13/07/2025",
    Matiere: "Node.js",
    Niveau: "4ème année",
  },
   {
    id: 5,
    Type: "vidéo",
    Titre: "Quiz Node.js",
    DateAjout: "13/07/2025",
    Matiere: "Node.js",
    Niveau: "4ème année",
  },
];

const Ressources = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);

const handleOpenModal = () => setOpenAddModal(true);
const handleCloseModal = () => setOpenAddModal(false);

  const itemsPerPage = 5;

  const filteredRows = allRows
    .filter(row =>
      row.Titre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType ? row.Type === selectedType : true)
    )
    .sort((a, b) => {
      const dateA = new Date(a.DateAjout.split('/').reverse().join('/'));
      const dateB = new Date(b.DateAjout.split('/').reverse().join('/'));
      return sortOption === 'newest' ? dateB - dateA : dateA - dateB;
    });
const rowsWithIcons = filteredRows.map(row => ({
  ...row,
  Type: (
    <Box display="flex" alignItems="center">
      {getTypeIcon(row.Type)}
      <Typography variant="body2">{row.Type}</Typography>
    </Box>
  )
}));
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
const paginatedRows = rowsWithIcons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (_e, value) => setCurrentPage(value);
     const handleCloseDelete = () => setOpenDelete(false)
    const [openDelete, setOpenDelete] = React.useState(false)
  const columns = [
    { id: 'Type', label: "Type", align: 'center' },
    { id: 'Titre', label: t('Titre'), align: 'left' },
    { id: 'DateAjout', label: t("Date de l'ajout"), align: 'left' },
    { id: 'Matiere', label: t('Matière'), align: 'center' },
    { id: 'Niveau', label: t('Niveau'), align: 'center' },
  ];

 const actions = [
  {
    icon: <DeleteIcon sx={{ color: "#e53935" }} />, // rouge
    tooltip: t('Supprimer'),
  },
  {
    icon: <VisibilityIcon sx={{ color: "#1e88e5" }} />, // bleu
    tooltip: t('Détails'),
  },
  {
    icon: <EditIcon sx={{ color: "#f9a825" }} />, // jaune/orangé
    tooltip: t('Modifier'),
  },
];


  return (
    <>
    <StyledPaper>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={{fontSize:"20px" ,color:"#080D50" ,fontWeight:"bold"}}>{t('Déposez et gérez les ressources pédagogiques')}</Typography>
        <ButtonComponent 
                text={t('Déposez une ressource')}
                icon={<AddCircleOutline />}
                color="orange" onClick={handleOpenModal}/>
  

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
                  <IconButton size="small" color="primary"><SearchIcon /></IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: '16px', fontSize: '1.03rem' }
            }}
        />

        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 130, borderRadius: '16px'}}>
            <InputLabel >{t("Filtrer")}</InputLabel>
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

      <TableComponent columns={columns} rows={paginatedRows} actions={actions} />

      <Box mt={4} display="flex" justifyContent="center">
        <PaginationComponent count={totalPages} page={currentPage} onChange={handlePageChange} />
      </Box>
    </StyledPaper>
    <Dialog open={openAddModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
  <DialogTitle>
    {t("Ajouter une ressource")}
    <IconButton
      aria-label="close"
      onClick={handleCloseModal}
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
      {/* Tu peux aussi ajouter un champ pour uploader un fichier plus tard */}
    </Box>
  </DialogContent>

  <DialogActions>
    <Button onClick={handleCloseModal}>{t("Annuler")}</Button>
    <Button variant="contained">{t("Enregistrer")}</Button>
  </DialogActions>
</Dialog>
<DeleteModel
  open={openDelete}
  handleClose={handleCloseDelete}
  title={t("Supprimer")}
  icon={<DeleteIcon />}
><Typography sx={{marginTop:"20px"}}>{t("Êtes-vous sûr de vouloir supprimer cet employé ?")}</Typography>
  <Box style={{ display: 'flex', justifyContent: 'center', marginTop:"25px"}}>
    <ButtonComponent  text={t("Supprimer")} color="#E1000F" />
  </Box>
</DeleteModel>
</>
  );
};

export default Ressources;
