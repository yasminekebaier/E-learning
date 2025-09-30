import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Divider, IconButton, Grid } from "@mui/material";
import GridCloseIcon from "@mui/icons-material/Close";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: "60%",
  minHeight: "60%",
  maxHeight: "100%",
  bgcolor: '#F4FAFF',
  boxShadow: 10,
  borderRadius: '10px',
  overflowY: 'auto',
 
  p: 3,
};

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
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: -7,
            top: -7,
            backgroundColor: '#f2f2f2',
            color: "#174090",
          }}
        >
          <GridCloseIcon />
        </IconButton>

        <Grid sx={{ textAlign: "center", color: "#174090" }}>
          {/* Optionnel : tu peux mettre une icône ici */}
        </Grid>

        <Typography sx={{ textAlign: "center", color: "#174090", fontSize: 20, mb: 2 }}>
          Évaluer : {selectedRow.titre}
        </Typography>

        <Box sx={{ maxHeight: "70vh", overflowY: "auto" }}>
          {/* Infos principales */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Étudiant :</b> {selectedRow?.Etudiant?.username || "N/A"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Classe :</b> {selectedRow?.classe || "-"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <b>Type :</b> {selectedRow?.type}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <b>Date limite :</b>{" "}
            {selectedRow?.dateLimite
              ? new Date(selectedRow.dateLimite).toLocaleDateString()
              : "-"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Affichage des réponses */}
          {selectedRow?.questions?.map((q, index) => {
            const studentChoiceIndex = selectedRow?.reponses?.[q.id];
            const studentChoice = q.choices?.find(c => c.index === studentChoiceIndex);
            const correctChoice = q.choices?.find(c => c.index === q.correctChoice?.index);

            return (
              <Box key={q.id} sx={{ mb: 2 }}>
                <Typography fontWeight="bold">
                  Q{index + 1}. {q.content}
                </Typography>

                <Typography>
                  ✅ Réponse correcte : {correctChoice?.content || "Non défini"}
                </Typography>

                <Typography>
                  📝 Réponse étudiant :{" "}
                  <span style={{ color: studentChoiceIndex === correctChoice?.index ? "green" : "red" }}>
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

          {/* Boutons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EvaluationModal;
