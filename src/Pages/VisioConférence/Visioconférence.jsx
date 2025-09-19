import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, TextField, Button, Grid, InputLabel } from "@mui/material";
import { FormControl, Select, MenuItem } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import VideoCallIcon from "@mui/icons-material/VideoCall";
import dayjs from "dayjs";
import TableComponent from "../../Components/Global/TableComponent";
import { AddVisios, fetchVisios } from "../../redux/actions/VisioConférenceAction";
import { toast } from 'react-toastify';
const Visioconference = () => {
  const dispatch = useDispatch();
  const { visioConferences, isFetching } = useSelector((state) => state.visioConferences);
const [formData, setFormData] = useState({
  titre: "",
  description: "",
  dateDebut: "",
  dateFin: "",
  url: "",
  eleveId: "" // <-- pour stocker l'élève sélectionné
});


  const [tempUrl, setTempUrl] = useState("");
const { users } = useSelector((state) => state.user);
const eleves = users.filter(u => u.role === "ELEVE");

  useEffect(() => {
    dispatch(fetchVisios());
  }, [dispatch]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// exemple avec l'utilisateur connecté côté Redux
const { CurrentUser } = useSelector((state) => state.user);
const enseignantId = CurrentUser?.id; // ID de l'enseignant connecté

  const handleGenerateLink = () => {
    setFormData((prev) => ({ ...prev, url: "https://meet.google.com/xyz-meet" }));
  };

const handlePlanify = () => {
  if (!enseignantId || !formData.eleveId) {
    toast.error("Veuillez sélectionner un élève.");
    return;
  }

  const sessionPayload = {
    titre: formData.titre,
    description: formData.description,
    dateDebut: dayjs(formData.dateDebut).toISOString(),
    dateFin: dayjs(formData.dateFin).toISOString(),
    url: formData.url,
    isLive: false,
    isRecorded: false,
    status: "À venir"
  };
if (!formData.url.startsWith("https://meet.google.com/")) {
    toast.error("Veuillez entrer un lien Google Meet valide !");
    return;
}

  dispatch(AddVisios({
    enseignantId,
    eleveId: formData.eleveId,
    session: sessionPayload
  }));

  // Réinitialiser le formulaire
  setFormData({
    titre: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    url: "",
    eleveId: ""
  });
};



  const getStatusColor = (status) => {
    switch (status) {
      case "À venir":
        return "#ef8c85ff";
      case "En cours":
        return "#f3a85cff";
      case "Terminé":
        return "#2e7d32";
      default:
        return "#616161";
    }
  };

  const columns = [
    { id: "titre", label: "Titre" },
    { id: "description", label: "Description" },
    {
      id: "dateDebut",
      label: "Début",
      render: (row) => dayjs(row.dateDebut).format("DD/MM/YYYY HH:mm")
    },
    {
      id: "dateFin",
      label: "Fin",
      render: (row) => dayjs(row.dateFin).format("DD/MM/YYYY HH:mm")
    },
    {
      id: "status",
      label: "Statut",
      render: (row) => (
        <Box
          sx={{
            color: "white",
            backgroundColor: getStatusColor(row.status),
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontSize: "0.8rem",
            fontWeight: "bold",
            textAlign: "center",
            display: "inline-block"
          }}
        >
          {row.status}
        </Box>
      )
    }
  ];

  const actions = [
    {
      tooltip: "Démarrer la visioconférence",
      icon: <VideoCallIcon />,
      onClick: (row) => {
        if (row.url) window.open(row.url, "_blank");
        else alert("Pas de lien Meet disponible !");
      }
    }
  ];

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "16px", mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="#080D50" mb={3}>
          Planifier une visioconférence
        </Typography>

        <Grid container spacing={2} sx={{ display: "flex", flexDirection: "column" }}>
          <Grid item xs={12}>
            <TextField
              label="Titre"
              name="titre"
              fullWidth
              value={formData.titre}
              onChange={handleChange}
              sx={{ "& label": { color: "#080D50", fontWeight: "bold" }, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={2}
              value={formData.description}
              onChange={handleChange}
              sx={{ "& label": { color: "#080D50", fontWeight: "bold" }, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Date début"
              name="dateDebut"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.dateDebut}
              onChange={handleChange}
              sx={{ "& label": { color: "#080D50", fontWeight: "bold" }, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Date fin"
              name="dateFin"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.dateFin}
              onChange={handleChange}
              sx={{ "& label": { color: "#080D50", fontWeight: "bold" }, "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            />
          </Grid>
<FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>Élève</InputLabel>
  <Select
    name="eleveId"
    value={formData.eleveId}
    onChange={handleChange}
    label="Élève"
  >
    {eleves.map(e => (
      <MenuItem key={e.id} value={e.id}>
        {e.nom_prenom_eleve} - {e.email}
      </MenuItem>
    ))}
  </Select>
</FormControl>

          <Grid item xs={12} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/*   <Button onClick={handleGenerateLink} variant="contained" sx={{ bgcolor: "#ee983dff", textTransform: "none", borderRadius: "8px" }}>
              Générer un lien Meet
            </Button> */}

           
   <Grid item xs={12} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
  <TextField
    label="Lien Google Meet"
    name="url"
    size="small"
    fullWidth
    value={formData.url}
    onChange={handleChange}
    sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
  />
  <Button
    variant="outlined"
    sx={{ textTransform: "none", borderRadius: "8px" }}
    onClick={async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text.startsWith("https://meet.google.com/")) {
          setFormData(prev => ({ ...prev, url: text }));
          toast.success("Lien Meet collé !");
        } else {
          toast.error("Le contenu du presse-papiers n'est pas un lien Google Meet valide.");
        }
      } catch (err) {
        toast.error("Impossible d'accéder au presse-papiers.");
      }
    }}
  >
    Coller le lien Meet
  </Button>
</Grid>


          
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button onClick={handlePlanify} variant="contained" sx={{ bgcolor: "#ee983dff", textTransform: "none", borderRadius: "10px", px: 6 }}>
              Planifier
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableComponent rows={visioConferences} columns={columns} actions={actions} />
    </Box>
  );
};

export default Visioconference;
