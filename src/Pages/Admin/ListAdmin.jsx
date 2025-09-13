import React, { useEffect, useState } from "react";
import { StyledPaper } from "../../Components/Global/Style";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import TableComponent from "../../Components/Global/TableComponent";
import { GridSearchIcon, GridDeleteIcon } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllUsers, ConfirmUser } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import UpdateModal from "../../Components/Global/UpdateModel";
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import CustomModal from "../../Components/Global/ModelComponent";

const ListAdmin = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [openAddModal, setOpenAddModal] = useState(false);
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

  // Préparer les lignes du tableau
  const rowsWithData = users
    .filter((user) => user.role === "ADMIN") // <-- seulement les admins
    .map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      nom_prenom_admin: user.nom_prenom_admin || user.username,
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

  // Filtrer et trier selon la recherche
  const filteredRows = rowsWithData
    .filter((row) =>
      row.nom_prenom_admin.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.DateAjout || 0);
      const dateB = new Date(b.DateAjout || 0);
      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { id: "nom_prenom_admin", label: t("Nom et Prénom"), align: "left" },
    { id: "email", label: t("Email"), align: "center" },
    { id: "actions", label: t("Actions"), align: "center" },
  ];

  const handlePageChange = (_e, value) => setCurrentPage(value);

  return (
    <>
  <StyledPaper elevation={3}>
    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
         <Typography sx={{ fontSize: "20px", color: "#080D50", fontWeight: "bold" }}> {t("Liste des administrateurs")}
           </Typography>
           
      <ButtonComponent
            text={t('Ajouter un administrateur')}
            icon={<AddCircleOutline />}
            color="orange"
            onClick={() => setOpenAddModal(true)}
          />
         
        </Box>

        {/* Barre de recherche */}
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
            label={t("Rechercher un administrateur")}
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
<CustomModal
 open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        title={t("Ajouter un administrateur")}  icon={<AddCircleOutline />}>
        <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
           <TextField label="Nom et prénom" fullWidth />
           <TextField label="Email" fullWidth />   
         </Box>
       
</CustomModal>
      {/* Modal pour modifier l'admin */}
      <UpdateModal
        open={openModal}
        handleClose={handleCloseModal}
        title={`Modifier l'administrateur : ${selectedUser?.nom_prenom_admin || ""}`}
      >
        {selectedUser && (
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nom et prénom"
              defaultValue={selectedUser.nom_prenom_admin}
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
          </Box>
        )}
      </UpdateModal>
    </>
  );
};

export default ListAdmin;
