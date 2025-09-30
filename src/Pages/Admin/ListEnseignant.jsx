import React, { useEffect, useState } from "react";
import { StyledPaper } from "../../Components/Global/Style";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
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
import {
  fetchSpecialites,
  AddSpeciality,
} from "../../redux/actions/specialityAction";
import { toast } from "react-toastify";
import UpdateModal from "../../Components/Global/UpdateModel";
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

const ListEnseignant = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Users
  const { users, loading, error } = useSelector((state) => state.user);

  // list
  const { list, loading: loadingSpec } = useSelector(
    (state) => state.speciality
  );

  const [newSpecialite, setNewSpecialite] = useState({
    nom: "",
    description: "",
  });

  const [openAddModal, setOpenAddModal] = useState(false);
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

  useEffect(() => {
    if (openAddModal) {
      dispatch(fetchSpecialites());
    }
  }, [dispatch, openAddModal]);

  const handleActivate = async (email) => {
    try {
      const result = await dispatch(ConfirmUser(email)).unwrap();
      toast.success(result.message || "✅ Compte activé avec succès !");
      dispatch(FetchAllUsers());
    } catch (err) {
      toast.error(err || "❌ Erreur lors de l'activation du compte !");
    }
  };

  const handleAddSpecialite = async () => {
    if (!newSpecialite.nom) {
      toast.error("Le nom est obligatoire !");
      return;
    }
    try {
      await dispatch(AddSpeciality(newSpecialite)).unwrap();
      toast.success("Spécialité ajoutée !");
      setNewSpecialite({ nom: "", description: "" });
      dispatch(fetchSpecialites()); // rafraîchir liste
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout de la spécialité.");
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
          <IconButton
            onClick={() => !teacher.confirm && handleActivate(teacher.email)}
          >
            <CheckCircleIcon
              sx={{ color: teacher.confirm ? "#4caf50" : "grey" }}
            />
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
         <Typography
            sx={{ fontSize: "20px", color: "#174090", fontWeight: "bold",marginBottom:"20px" }}
          >
            {t("Liste des enseignants")}
          </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
         
        
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
            <ButtonComponent
            text={t("Gérer les spécialités")}
            icon={<AddCircleOutline />}
            color="#008000"
            onClick={() => setOpenAddModal(true)}
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

      {/* Modal update enseignant */}
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
          </Box>
        )}
      </UpdateModal>

      {/* Modal gestion spécialités */}
      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Gestion des spécialités</DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            Liste des spécialités
          </Typography>
          {loadingSpec ? (
            <Typography>Chargement...</Typography>
          ) : (
            <List>
              {list?.map((spec) => (
                <React.Fragment key={spec.id}>
                  <ListItem
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          color="warning"
                          onClick={() => console.log("Modifier", spec.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => console.log("Supprimer", spec.id)}
                        >
                          <GridDeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={spec.nom}
                      secondary={spec.description}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}

          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Ajouter une nouvelle spécialité
            </Typography>
            <TextField
              label="Nom"
              value={newSpecialite.nom}
              onChange={(e) =>
                setNewSpecialite({ ...newSpecialite, nom: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              value={newSpecialite.description}
              onChange={(e) =>
                setNewSpecialite({
                  ...newSpecialite,
                  description: e.target.value,
                })
              }
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleAddSpecialite}
            >
              Ajouter
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenAddModal(false)}
          >
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListEnseignant;
