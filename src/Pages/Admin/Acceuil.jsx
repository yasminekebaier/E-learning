import React from "react";
import {
  Grid, Card, CardContent, Typography, Box, Avatar
} from "@mui/material";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer
} from "recharts";
import { useSelector } from "react-redux";

import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { StyledPaper } from "../../Components/Global/Style";

const Acceuil = () => {
  // Sélection des données depuis différents slices
  const { matieres, loading: loadingMat } = useSelector((state) => state.matiere);
  const { list: specialities, loading: loadingSpec } = useSelector((state) => state.speciality);
  const { users } = useSelector((state) => state.user);
  const teacherRows = users?.filter((u) => u.role === "ENSEIGNANT") || [];
  const studentRows = users?.filter((u) => u.role === "ETUDIANT") || [];

  const { visioConferences, isFetching: loadingVisio } = useSelector((state) => state.visioConferences);
  const { cours } = useSelector((state) => state.cours);

  // Exemple de PieChart ressources (tu pourrais le calculer depuis ton slice "ressources")
  const pieData = [
    { name: "PDF", value: 22, color: "#00C49F" },
    { name: "Document", value: 44, color: "#0088FE" },
    { name: "Vidéo", value: 22, color: "#FFBB28" },
    { name: "Quiz", value: 12, color: "#FF8042" },
    { name: "Devoir", value: 12, color: "#FF4444" },
  ];

  // Exemple BarChart (associer les élèves aux matières depuis tes slices)
  const matiereData = matieres.map((m) => ({
    matiere: m.nom,
    eleves: studentRows.filter((s) => s.matiereId === m.id).length,
  }));

  // Exemple LineChart → évolution cours/enseignants/étudiants (mock si pas encore dans le backend)
  const statsData = [
    { month: "Jan", enseignants: 2, eleves: 5, cours: 1 },
    { month: "Feb", enseignants: 4, eleves: 9, cours: 3 },
    { month: "Mar", enseignants: teacherRows.length, eleves: studentRows.length, cours: cours.length },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Dashboard Admin
      </Typography>

      {/* Cartes rapides */}
      <Grid sx={{ display: "flex", flexDirection: "row", gap: "70px", mb: 3 }}>
        <CardItem icon={<SchoolIcon />} title="Enseignants" value={teacherRows.length} color="#1976d2" bg="#f0f8ff" />
        <CardItem icon={<PersonIcon />} title="Étudiants" value={studentRows.length} color="#ff9800" bg="#fff8e1" />
        <CardItem icon={<BookIcon />} title="Matières" value={matieres.length} color="#4caf50" bg="#e8f5e9" />
        <CardItem icon={<LibraryBooksIcon />} title="Cours" value={cours.length} color="#9c27b0" bg="#f3e5f5" />
        <CardItem icon={<VideoCallIcon />} title="Visioconférences" value={visioConferences.length} color="#0288d1" bg="#e1f5fe" />
      </Grid>

      {/* Graphiques */}
      <Grid sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        {/* LineChart */}
        <Grid item xs={12} md={8} sx={{ width: "45%" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Statistiques générales
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={statsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="enseignants" stroke="#8884d8" />
                  <Line type="monotone" dataKey="eleves" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="cours" stroke="#ff9800" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* PieChart */}
        <Grid item xs={12} md={4} sx={{ width: "45%" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Répartition des ressources
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* BarChart */}
      <Grid item xs={12} md={6} sx={{ mt: 3 }}>
        <StyledPaper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">Étudiants par matière</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={matiereData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="matiere" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="eleves" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </StyledPaper>
      </Grid>
    </Box>
  );
};

// Composant utilitaire pour éviter les répétitions
const CardItem = ({ icon, title, value, color, bg }) => (
  <Grid item xs={12} sm={4} md={2}>
    <Card sx={{ bgcolor: bg }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
          <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2">{value}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grid>
);

export default Acceuil;
