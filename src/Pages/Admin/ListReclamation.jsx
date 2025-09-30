import React, { useEffect, useState } from "react";
import { StyledPaper } from "../../Components/Global/Style";
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import TableComponent from "../../Components/Global/TableComponent";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchReclamations } from "../../redux/actions/reclamationAction";

const ListReclamation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { reclamations, loading } = useSelector((state) => state.reclamations);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState(""); // filtre utilisateur

  useEffect(() => {
    dispatch(fetchReclamations());
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleUserFilterChange = (event) => {
    setSelectedUser(event.target.value);
    setCurrentPage(1); // reset pagination
  };

  // Filtrer les réclamations selon l'utilisateur sélectionné
  const filteredReclamations = selectedUser
    ? reclamations.filter(
        (rec) =>
          (rec.user?.nom_prenom_ensignant || rec.user?.username || "")
            .toLowerCase()
            .includes(selectedUser.toLowerCase())
      )
    : reclamations;

  const columns = [
    { id: "titre", label: t("Titre"), align: "left" },
    { id: "description", label: t("Description"), align: "left" },
    { id: "priorite", label: t("Priorité"), align: "center" },

    {
      id: "statut",
      label: t("Statut"),
      align: "center",
      render: (row) => {
        let color = "gray";
        if (row.statut === "OUVERTE") color = "orange";
        else if (row.statut === "EN_COURS") color = "green";
        else if (row.statut === "RESOLUE") color = "blue";
        else if (row.statut === "REJETEE") color = "red";
        return (
          <span style={{ color, fontWeight: "bold" }}>
            {row.statut}
          </span>
        );
      },
    },

    {
      id: "type",
      label: t("Type"),
      align: "center",
      render: (row) => {
        let color = "blue";
        if (row.type === "TECHNIQUE") color = "purple";
        else if (row.type === "PEDAGOGIQUE") color = "teal";
        else if (row.type === "ADMINISTRATIVE") color = "gray";
        else if (row.type === "AUTRE") color = "gray";
        return (
          <span style={{ color, fontWeight: "bold" }}>
            {row.type}
          </span>
        );
      },
    },

    {
      id: "user",
      label: t("Utilisateur"),
      align: "left",
      render: (row) =>
        row.user?.nom_prenom_ensignant || row.user?.username || "-",
    },
  ];

  const paginatedRows = filteredReclamations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredReclamations.length / pageSize);

  return (
    <StyledPaper>
      <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
        {t("Liste des réclamations")}
      </Typography>

      {/* Filtre utilisateur */}
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel>{t("Filtrer par utilisateur")}</InputLabel>
          <Select value={selectedUser} onChange={handleUserFilterChange}>
            <MenuItem value="">Tous les utilisateurs</MenuItem>
            {[...new Set(reclamations.map(rec => rec.user?.nom_prenom_ensignant || rec.user?.username))]
              .filter(Boolean)
              .map((userName, index) => (
                <MenuItem key={index} value={userName}>
                  {userName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Typography>{t("Chargement...")}</Typography>
      ) : (
        <>
          <TableComponent columns={columns} rows={paginatedRows} />
          <Box mt={4} display="flex" justifyContent="center">
            <PaginationComponent
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </StyledPaper>
  );
};

export default ListReclamation;
