import React, { useEffect, useState } from "react";
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
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useTranslation } from "react-i18next";
import TableComponent from '../../Components/Global/TableComponent';
import PaginationComponent from '../../Components/Global/PaginationComponent';
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import EvaluationModal from "../../Components/Global/EvaluationModal";
import { useDispatch, useSelector } from "react-redux";
import { evaluateQuiz, fetchQuizsDevoir } from "../../redux/actions/QuizActions";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const EvaluateQuizDevoirs = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const quizDevoirs = useSelector(state => state.quizDevoir.quizs || []);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const handlePageChange = (_e, value) => setPage(value);

  useEffect(() => {
    dispatch(fetchQuizsDevoir());
  }, [dispatch]);

  // Statistiques
  const total = quizDevoirs.length;
  const evalues = quizDevoirs.filter(d => d.statut === "Évalué").length;
  const enAttente = quizDevoirs.filter(d => d.statut === "En attente" || d.statut === "SOUMIS").length;

  // Colonnes tableau
  const columns = [
    { id: "titre", label: "Titre" },
    { id: "type", label: "Type" },
    { 
      id: "details", 
      label: "Détails",
      render: (row) => {
        if(row.type === "QUIZ") {
          return row.questions?.length ? `${row.questions.length} questions` : "Aucune question";
        } else if(row.type === "DEVOIR") {
          return row.assignment?.file || "Pas de fichier";
        }
        return "-";
      }
    },
    { 
      id: "soumission",
      label: "Soumission",
      render: (row) => {
        const date = row.createdAt || row.dateLimite || null;
        return date ? new Date(date).toLocaleDateString() : "-";
      }
    },
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
                : row.statut === "En attente" || row.statut === "SOUMIS"
                ? "#FF9800"
                : "#000",
          }}
        >
          {row.statut}
        </Typography>
      ),
    },
  ];

  // Découpage pour pagination
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const rows = quizDevoirs.slice(startIndex, endIndex);

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
    },
  ];
const exportToExcel = () => {
  // Construire les données à exporter
  const data = quizDevoirs.map(item => ({
    Titre: item.titre,
    Type: item.type,
    Détails:
      item.type === "QUIZ"
        ? item.questions?.length
          ? `${item.questions.length} questions`
          : "Aucune question"
        : item.assignment?.file || "Pas de fichier",
    Soumission: item.createdAt
      ? new Date(item.createdAt).toLocaleDateString()
      : item.dateLimite
      ? new Date(item.dateLimite).toLocaleDateString()
      : "-",
    Statut: item.statut,
  }));

  // Créer une feuille de calcul
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Créer un classeur
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "QuizDevoirs");

  // Générer un fichier Excel
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(blob, "quiz_devoirs.xlsx");
};
  return (
    <StyledPaper sx={{ padding: 3 }}>
      <Typography sx={{ fontSize: 20, fontWeight: 'bold', color:"#174090", mb: 3 }}>
        Évaluer des quiz et devoirs
      </Typography>

      {/* Cards statistiques */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { value: total, label: "Total", color: "#E8F0FE", icon: AssignmentIcon, iconColor: "#1976d2" },
          { value: evalues, label: "Évalués", color: "#E6F4EA", icon: CheckCircleIcon, iconColor: "#388e3c" },
          { value: enAttente, label: "En attente", color: "#FFF4E5", icon: HourglassEmptyIcon, iconColor: "#f57c00" },
        ].map((item, index) => (
          <Grid item key={index} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{
              backgroundColor: item.color,
              p: 2,
              width: 200,
              borderRadius: "20px",
              textAlign: "center",
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              boxShadow: 1
            }}>
              <item.icon htmlColor={item.iconColor} fontSize="large" />
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
          sx={{ borderRadius: 2 }}
        >
          {t("Filtrer")}
        </Button>
      <ButtonComponent
  text={t("Exporter les notes")}
  icon={<DownloadIcon />}
  color="#3F51B5"
  onClick={exportToExcel}
/>

      </Box>

      {/* Table dynamique */}
      <TableComponent rows={rows} columns={columns} actions={actions} />

      {/* Pagination */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <PaginationComponent
          count={Math.ceil(quizDevoirs.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>

      {/* Modal d’évaluation */}
      <EvaluationModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        selectedRow={selectedRow}
        onSubmit={(evaluation) => {
          dispatch(evaluateQuiz(evaluation)); // 🚀 envoi au backend
        }}
      />
    </StyledPaper>
  );
};

export default EvaluateQuizDevoirs;
