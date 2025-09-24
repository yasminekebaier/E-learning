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
          width: 700,
          bgcolor: "white",
          p: 4,
          mx: "auto",
          mt: "5%",
          borderRadius: 3,
          boxShadow: 24,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Évaluer : {selectedRow.titre}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Infos principales */}
        <Typography variant="body1">
          <b>Étudiant :</b> {selectedRow?.Etudiant?.username || "N/A"}
        </Typography>
        <Typography variant="body1">
          <b>Classe :</b> {selectedRow?.classe || "-"}
        </Typography>
        <Typography variant="body1">
          <b>Type :</b> {selectedRow?.type}
        </Typography>
        <Typography variant="body1">
          <b>Date limite :</b>{" "}
          {selectedRow?.dateLimite
            ? new Date(selectedRow.dateLimite).toLocaleDateString()
            : "-"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Affichage des réponses de l’étudiant */}
        {selectedRow?.questions?.map((q, index) => {
         // Récupérer la réponse de l'étudiant (si elle existe)
const studentChoiceId = selectedRow?.reponses?.[q.id];
const studentChoice = q.choices?.find(c => c.id === studentChoiceId);

// Récupérer la réponse correcte à partir de correctAnswerIndex
const correctChoice = q.choices?.[q.correctAnswerIndex];


          return (
            <Box key={q.id} sx={{ mb: 2 }}>
              <Typography fontWeight="bold">
                Q{index + 1}. {q.content}
              </Typography>
          <Typography>
  ✅ Réponse correcte :{" "}
  <span style={{ color: "green" }}>
    {correctChoice?.content || "Non défini"}
  </span>
</Typography>
<Typography>
  📝 Réponse étudiant :{" "}
  <span
    style={{
      color: studentChoiceId === correctChoice?.id ? "green" : "red",
    }}
  >
    {studentChoice?.content || "Non répondu"}
  </span>
</Typography>

              <Divider sx={{ my: 1 }} />
            </Box>
          );
        })}

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
