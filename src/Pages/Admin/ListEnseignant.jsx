import React, { useEffect, useState } from "react";
import { StyledPaper } from "../../Components/Global/Style";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import TableComponent from "../../Components/Global/TableComponent";
import { GridSearchIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers, ConfirmUser } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import UpdateModal from "../../Components/Global/UpdateModel";

const ListEnseignant = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);

const handleOpenModal = (user) => {
  setSelectedUser(user);
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
  setSelectedUser(null);
};


  useEffect(() => {
    dispatch(FetchAllUsers());
  }, [dispatch]);

  const handleActivate = async (email) => {
    try {
      const result = await dispatch(ConfirmUser(email)).unwrap();
      toast.success(result.message || "✅ Compte activé avec succès !");
      dispatch(FetchAllUsers());
    } catch (err) {
      toast.error(err || "❌ Erreur lors de l'activation du compte !");
    }
  };

  // Filtrer uniquement les enseignants
  const teacherRows = users
    .filter((user) => user.role === "ENSEIGNANT")
    .map((teacher) => ({
      id: teacher.id,
      email: teacher.email,
      nom_prenom: teacher.nom_prenom || teacher.username || "-",
      phone: teacher.phone || "-",
      address: teacher.address || "-",
      confirm: teacher.confirm,
      actions: (
        <Box display="flex" gap={1} justifyContent="center">
          <IconButton onClick={() => !teacher.confirm && handleActivate(teacher.email)}>
            <CheckCircleIcon sx={{ color: teacher.confirm ? "#4caf50" : "grey" }} />
          </IconButton>
          <IconButton onClick={() => handleOpenModal(teacher)}>
  <EditIcon sx={{ color: "#f9a825" }} />
</IconButton>

          <IconButton onClick={() => console.log("Delete", teacher.id)}>
            <GridDeleteIcon sx={{ color: "#e53935" }} />
          </IconButton>
        </Box>
      ),
    }));

  const filteredRows = teacherRows
    .filter((row) =>
      row.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.DateAjout);
      const dateB = new Date(b.DateAjout);
      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { id: "nom_prenom", label: t("Nom et prénom"), align: "left" },
    { id: "email", label: t("Email"), align: "left" },
    { id: "phone", label: t("Téléphone"), align: "center" },
    { id: "address", label: t("Adresse"), align: "center" },
    { id: "actions", label: t("Actions"), align: "center" },
  ];

  const handlePageChange = (_e, value) => setCurrentPage(value);

  return (
    <>
    <StyledPaper elevation={3} sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography sx={{ fontSize: "20px", color: "#080D50", fontWeight: "bold" }}>
          {t("Liste des enseignants")}
        </Typography>

        <TextField
          size="small"
          label={t("Rechercher un enseignant")}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 250 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" color="primary">
                  <GridSearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: { borderRadius: "16px", fontSize: "1rem" },
          }}
        />
      </Box>

      {loading ? (
        <Typography sx={{ mt: 3, textAlign: "center" }}>
          {t("Chargement des enseignants...")}
        </Typography>
      ) : error ? (
        <Typography sx={{ mt: 3, textAlign: "center", color: "red" }}>
          {error}
        </Typography>
      ) : (
        <TableComponent columns={columns} rows={paginatedRows} />
      )}

      <Box mt={4} display="flex" justifyContent="center">
        <PaginationComponent
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </StyledPaper>
    <UpdateModal
  open={openModal}
  handleClose={handleCloseModal}
  title={`Modifier l'enseignant : ${selectedUser?.nom_prenom || ""}`}
>
  {selectedUser && (
    <Box component="form" sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Nom et prénom"
        defaultValue={selectedUser.nom_prenom}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Email"
        defaultValue={selectedUser.email}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Téléphone"
        defaultValue={selectedUser.phone || ""}
        sx={{ mb: 2 }}
      />
      {/* Ici tu peux ajouter d'autres champs à modifier */}
    </Box>
  )}
</UpdateModal>
</>
  );
};

export default ListEnseignant;
