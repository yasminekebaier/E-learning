import React, { useState, useEffect } from "react";
import { StyledPaper } from "../../Components/Global/Style";
import { Typography, Box, Modal, TextField, MenuItem } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { ButtonComponent } from "../../Components/Global/ButtonComponent";
import TableComponent from "../../Components/Global/TableComponent";
import PaginationComponent from "../../Components/Global/PaginationComponent";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { createReclamation, fetchReclamations } from "../../redux/actions/reclamationAction";


const Reclamation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { reclamations, loading } = useSelector((state) => state.reclamations);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
const [priorite, setPriorite] = useState("MOYENNE");
// Moyenne par défaut

  const [type, setType] = useState("TECHNIQUE");
 const CurrentUser = useSelector((state) => state.user.CurrentUser);
 const userId= CurrentUser?.id

  useEffect(() => {
    dispatch(fetchReclamations());
  }, [dispatch]);

const handleAddReclamation = async () => {
  if (!userId) {
    console.error("Utilisateur non connecté");
    return;
  }

  await dispatch(
    createReclamation({
      userId,
      titre,
      description,
      priorite,
      type,
    })
  );

  setOpenAddModal(false);
};



  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

const columns = [
  { id: "titre", label: t("Titre"), align: "left" },
  { id: "description", label: t("Description"), align: "left" },
  { id: "priorite", label: t("Priorité"), align: "center" },
  { id: "statut", label: t("Statut"), align: "center" },
  { id: "type", label: t("Type"), align: "center" },
];


  const paginatedRows = reclamations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(reclamations.length / pageSize);

  return (
    <>
      <StyledPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            {t("Réclamations")}
          </Typography>
          <ButtonComponent
            text={t("Ajouter une réclamation")}
            icon={<AddCircleOutline />}
            color="#008000"
            onClick={() => setOpenAddModal(true)}
          />
        </Box>
<Box sx={{marginTop:"20px"}}>
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
        </Box>
      </StyledPaper>

      {/* Modal d'ajout */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Box sx={{ p: 3, backgroundColor: "white", margin: "auto", mt: 10, width: 400 }}>
          <Typography variant="h6" mb={2}>
            {t("Ajouter une réclamation")}
          </Typography>
          <TextField
            label={t("Titre")}
            fullWidth
            margin="normal"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
          <TextField
            label={t("Description")}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        <TextField
  select
  label={t("Priorité")}
  value={priorite}
  fullWidth
  margin="normal"
  onChange={(e) => setPriorite(e.target.value)}
>
<MenuItem value="BASSE">{t("Basse")}</MenuItem>
<MenuItem value="MOYENNE">{t("Moyenne")}</MenuItem>
<MenuItem value="HAUTE">{t("Haute")}</MenuItem>

</TextField>

          <TextField
            select
            label={t("Type")}
            value={type}
            fullWidth
            margin="normal"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="TECHNIQUE">{t("Technique")}</MenuItem>
            <MenuItem value="ADMINISTRATIVE">{t("Administrative")}</MenuItem>
          </TextField>

          <ButtonComponent text={t("Envoyer")} color="#008000" onClick={handleAddReclamation} />
        </Box>
      </Modal>
    </>
  );
};

export default Reclamation;
