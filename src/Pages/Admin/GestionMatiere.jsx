import React, { useEffect, useState } from "react";
import { StyledPaper } from "../../Components/Global/Style";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../../Components/Global/TableComponent";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import { Add, Delete, Edit } from "@mui/icons-material";

import { toast } from "react-toastify";
import UpdateModal from "../../Components/Global/UpdateModel";
import { AddMatiéres, DeleteMatieres, fetchMatieres } from "../../redux/actions/MatiéreAction";

const GestionMatiere = () => {
  const dispatch = useDispatch();
  const { matieres, loading, error } = useSelector((state) => state.matiere);

  const [matiereName, setMatiereName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [openModal, setOpenModal] = useState(false);
  const [selectedMatiere, setSelectedMatiere] = useState(null);

  useEffect(() => {
    dispatch(fetchMatieres());
  }, [dispatch]);

  const handleAddMatiere = async () => {
    if (!matiereName.trim()) return toast.error("Veuillez saisir le nom de la matière");
    try {
      await dispatch(AddMatiéres({ name: matiereName })).unwrap();
      toast.success("Matière ajoutée avec succès !");
      setMatiereName("");
      dispatch(fetchMatieres());
    } catch (err) {
      toast.error(err || "Erreur lors de l'ajout de la matière");
    }
  };

  const handleDeleteMatiere = async (id) => {
    try {
      await dispatch(DeleteMatieres(id)).unwrap();
      toast.success("Matière supprimée !");
      dispatch(fetchMatieres());
    } catch (err) {
      toast.error(err || "Erreur lors de la suppression");
    }
  };

  const handleOpenModal = (matiere) => {
    setSelectedMatiere(matiere);
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
    {
      id: "actions",
      label: "Actions",
      align: "center",
      render: (matiere) => (
        <Box display="flex" gap={1} justifyContent="center">
          <IconButton onClick={() => handleOpenModal(matiere)}>
            <Edit sx={{ color: "#f9a825" }} />
          </IconButton>
          <IconButton onClick={() => handleDeleteMatiere(matiere.id)}>
            <Delete sx={{ color: "#e53935" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <StyledPaper elevation={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: "#080D50" }}>
          Gestion des Matières
        </Typography>
        <Box display="flex" gap={1}>
          <TextField
            size="small"
            label="Nouvelle matière"
            value={matiereName}
            onChange={(e) => setMatiereName(e.target.value)}
          />
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddMatiere}>
            Ajouter
          </Button>
        </Box>
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

      {/* Modal pour modification */}
      <UpdateModal
        open={openModal}
        handleClose={handleCloseModal}
        title={`Modifier la matière : ${selectedMatiere?.name || ""}`}
      >
        {selectedMatiere && (
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nom de la matière"
              defaultValue={selectedMatiere.name}
            />
          </Box>
        )}
      </UpdateModal>
    </StyledPaper>
  );
};

export default GestionMatiere;
