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
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers, ConfirmUser } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import { GridDeleteIcon } from "@mui/x-data-grid";
import UpdateModal from "../../Components/Global/UpdateModel";

const ListEleve = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
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

const rowsWithData = (users || []).map((user) => ({
  id: user.id,
  email: user.email,
  role: user.role, // <-- ajouté
  nom_prenom_parent: user.nom_prenom_parent
    ? `${user.nom_prenom_parent} - ${user.email || "-"} - ${user.phone || "-"}`
    : `${user.email || "-"} - ${user.phone || "-"}`,
  nom_prenom_eleve: user.nom_prenom_eleve || user.username || "-",
  date_naissance: user.date_naissance
    ? new Date(user.date_naissance).toLocaleDateString("fr-FR")
    : "-",
  niveau: user.niveau || "-",
  situation: user.situation || "-",
  Photo: user.photo || null,
  confirm: user.confirm,
  actions: (
    <Box display="flex" gap={1} justifyContent="center">
      <IconButton onClick={() => !user.confirm && handleActivate(user.email)}>
        <CheckCircleIcon sx={{ color: user.confirm ? "#4caf50" : "grey" }} />
      </IconButton>
     <IconButton onClick={() => handleOpenModal(user)}>
  <EditIcon sx={{ color: "#f9a825" }} />
</IconButton>

      <IconButton onClick={() => console.log("Delete", user.id)}>
        <GridDeleteIcon sx={{ color: "#e53935" }} />
      </IconButton>
    </Box>
  ),
}));





 const filteredRows = rowsWithData
  .filter((row) =>
    // Filtre par rôle : uniquement les élèves ici
    row.role === "ELEVE" &&
    // Filtre par recherche
    row.nom_prenom_eleve.toLowerCase().includes(searchTerm.toLowerCase()) &&
    // Filtre par type si sélectionné
    (selectedType ? row.Type === selectedType : true)
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
  // { id: "nom_prenom_parent", label: t("Parent"), align: "center" },
  { id: "nom_prenom_eleve", label: t("Collaborateur"), align: "left" },
  { id: "date_naissance", label: t("Né(e) le"), align: "left" },
  { id: "niveau", label: t("Niveau"), align: "center" },
  { id: "situation", label: t("Situation"), align: "center" },
  { id: "Photo", label: t("Photo"), align: "center" },
  { id: "actions", label: t("Actions"), align: "center" }, // <-- clé correspondante
];



  const handlePageChange = (_e, value) => setCurrentPage(value);

  return (
    <>
    <StyledPaper elevation={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ fontSize: "20px", color: "#080D50", fontWeight: "bold" }}
        >
          {t("Liste des collaborateurs")}
        </Typography>
      </Box>

      {/* Barre de recherche + filtres */}
      <Box
        mt={3}
        mb={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <TextField
          size="small"
          label={t("Rechercher un collaborateur")}
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" color="primary">
                  <GridSearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: { borderRadius: "16px", fontSize: "1.03rem" },
          }}
        />

        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 130 }}>
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
          {t("Chargement des utilisateurs...")}
        </Typography>
      ) : error ? (
        <Typography sx={{ mt: 3, textAlign: "center", color: "red" }}>
          {error}
        </Typography>
      ) : (
        <TableComponent columns={columns} rows={paginatedRows} />
      )}

      {/* Pagination */}
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
  title={`Modifier le collaborateur : ${selectedUser?.nom_prenom_eleve || ""}`}
>
  {selectedUser && (
    <Box component="form" sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Nom et prénom"
        defaultValue={selectedUser.nom_prenom_eleve}
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

export default ListEleve;
