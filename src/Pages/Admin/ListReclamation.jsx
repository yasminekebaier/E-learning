import React, { useEffect, useState } from "react";
import { StyledPaper } from "../../Components/Global/Style";
import { Typography, Box } from "@mui/material";
import TableComponent from "../../Components/Global/TableComponent";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchReclamations } from "../../redux/actions/reclamationAction";

const ListReclamation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { reclamations, loading } = useSelector(
    (state) => state.reclamations
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchReclamations());
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const columns = [
    { id: "titre", label: t("Titre"), align: "left" },
    { id: "description", label: t("Description"), align: "left" },
    { id: "priorite", label: t("Priorité"), align: "center" },
    { id: "statut", label: t("Statut"), align: "center" },
    { id: "type", label: t("Type"), align: "center" },
    {
      id: "user",
      label: t("Utilisateur"),
      align: "left",
      render: (row) => row.user?.nom_prenom_ensignant || row.user?.username || "-"
    },
  ];

  const paginatedRows = reclamations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(reclamations.length / pageSize);

  return (
    <StyledPaper>
      <Typography sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}>
        {t("Liste des réclamations")}
      </Typography>

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
