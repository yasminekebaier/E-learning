import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Divider
} from "@mui/material";

const EvaluationModal = ({ open, handleClose, selectedRow, onSubmit }) => {
  const [note, setNote] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSave = () => {
    onSubmit({
      id: selectedRow.id,
      note,
      feedback,
    });
    handleClose();
  };

  if (!selectedRow) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 500,
          bgcolor: "white",
          p: 4,
          mx: "auto",
          mt: "10%",
          borderRadius: 3,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Évaluer : {selectedRow.titre}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Infos principales */}
        <Typography variant="body1">
          <b>Étudiant :</b> {selectedRow.Etudiant || "N/A"}
        </Typography>
        <Typography variant="body1">
          <b>Classe :</b> {selectedRow.classe}
        </Typography>
        <Typography variant="body1">
          <b>Type :</b> {selectedRow.type}
        </Typography>
        <Typography variant="body1">
          <b>Date limite :</b> {selectedRow.dateLimite}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Note */}
        <TextField
          label="Note (/20)"
          type="number"
          fullWidth
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Feedback */}
        <TextField
          label="Remarques"
          multiline
          rows={3}
          fullWidth
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Enregistrer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EvaluationModal;
