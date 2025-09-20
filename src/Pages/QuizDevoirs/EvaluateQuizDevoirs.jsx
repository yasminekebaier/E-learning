import React, { useState } from "react";
import { StyledPaper } from "../../Components/Global/Style";
import {
  Typography,
  Box,
  Grid,
  Button,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import TableComponent from '../../Components/Global/TableComponent';
import PaginationComponent from '../../Components/Global/PaginationComponent';
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PeopleIcon from '@mui/icons-material/People';
import EvaluationModal from "../../Components/Global/EvaluationModal";
const EvaluateQuizDevoirs = () => {
const { t } = useTranslation();
const [openModal, setOpenModal] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);

  // Colonnes du tableau
  const columns = [
    { id: "titre", label: "Devoir" },
    { id: "type", label: "Type" },
    { id: "Etudiant", label: "Nom de l'etudiant" },
    { id: "Niveau", label: "Niveau" },
    { id: "dateLimite", label: "Date limite" },
    { id: "soumissions", label: "Soumissions" },
    {
      id: "statut",
      label: "Statut",
      render: (row) => (
        <Typography
          sx={{
            fontWeight: "bold",
            color:
              row.statut === "Évalué"
                ? "#4CAF50"
                : row.statut === "En attente"
                ? "#FF9800"
                : "#000",
          }}
        >
          {row.statut}
        </Typography>
      ),
    },
  ];

  // Données simulées
  const data = [
    {
      id: 1,
      titre: "Contrôle de mathématiques",
      type: "Quiz",
      Etudiant: "Yasmine keba",
      classe: "Terminale S2",
      dateLimite: "2025-05-25",
      soumissions: "25/30",
      statut: "En attente",
    },
    {
      id: 2,
      titre: "Dissertation littéraire",
      type: "Devoir",
      classe: "Première L1",
      dateLimite: "2025-05-24",
      soumissions: "28/32",
      statut: "Évalué",
    },
    {
      id: 3,
      titre: "Test de conjugaison",
      type: "Quiz",
      classe: "Seconde A",
      dateLimite: "2025-05-23",
      soumissions: "35/35",
      statut: "Évalué",
    },
    {
      id: 4,
      titre: "Exercices de physique",
      type: "Devoir",
      classe: "Terminale S1",
      dateLimite: "2025-05-22",
      soumissions: "27/33",
      statut: "En attente",
    },
    {
      id: 5,
      titre: "Contrôle d’histoire",
      type: "Devoir",
      classe: "Seconde B",
      dateLimite: "2025-05-26",
      soumissions: "30/35",
      statut: "En attente",
    },
    {
      id: 6,
      titre: "Test de géographie",
      type: "Quiz",
      classe: "Terminale S1",
      dateLimite: "2025-05-27",
      soumissions: "28/30",
      statut: "Évalué",
    },
  ];

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Découpage des données selon la page
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const rows = data.slice(startIndex, endIndex);

  // Actions sur les lignes
  const actions = [
    {
      icon: <VisibilityIcon color="primary" />,
      tooltip: "Voir",
      onClick: (row) => alert(`Voir : ${row.titre}`),
    },
   {
  icon: <EditIcon color="success" />,
  tooltip: "Évaluer",
  onClick: (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  },
}

  ];

  return (
    <StyledPaper sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', color:"#174090",mb:"20px" }}>Evaluer des quiz et devoirs</Typography>
          
        </Box>

     {/* Statistiques principales */}
<Grid
  container
  spacing={2}
  sx={{
    mb: 3,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  }}
>
  {[
    { value: 45, label: "Total des devoirs", color: "#E8F0FE", icon: AssignmentIcon, iconColor: "#1976d2" },
    { value: 32, label: "Évalués", color: "#E6F4EA", icon: CheckCircleIcon, iconColor: "#388e3c" },
    { value: 13, label: "En attente", color: "#FFF4E5", icon: HourglassEmptyIcon, iconColor: "#f57c00" },
    { value: 128, label: "collaborateur", color: "#F3E8FF", icon: PeopleIcon, iconColor: "#9c27b0" },
  ].map((item, index) => (
    <Grid
      item
      key={index}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: item.color,
          p: 2,
          width: 200, // largeur fixe
          borderRadius: "20px",
          textAlign: "center",
          gap:2,
          boxShadow: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
          {/* Icône avec fond identique à la carte et couleur différente */}
        
          <item.icon htmlColor={item.iconColor} fontSize="large" />
        
        <Box sx={{ display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', flexDirection: 'column',justifyContent: 'space-between'}}>
        <Typography variant="h5">{item.value}</Typography>
        <Typography variant="h5">{item.label}</Typography>
        </Box>
      </Box>
    </Grid>
  ))}
</Grid>


      {/* Boutons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}>
       <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{ borderRadius: 2 }}>
          {t("Filtrer")}
        </Button>
        <ButtonComponent text={t("Exporter les notes")} icon={<DownloadIcon />} color="#3F51B5" onClick={""} />
      
      </Box>

      {/* Table dynamique */}
      <TableComponent rows={rows} columns={columns} actions={actions} />

      {/* Pagination dynamique */}
      <PaginationComponent
        count={Math.ceil(data.length / rowsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        size="medium"
      />
      {/* Modal d'évaluation */}
      <EvaluationModal
  open={openModal}
  handleClose={() => setOpenModal(false)}
  selectedRow={selectedRow}
  onSubmit={(evaluation) => {
    console.log("Évaluation soumise :", evaluation);
    // Ici tu appelleras ton API pour enregistrer la note
  }}
/>

    </StyledPaper>
  );
};

export default EvaluateQuizDevoirs;
