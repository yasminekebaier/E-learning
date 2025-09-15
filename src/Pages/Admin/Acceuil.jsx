import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell,
  BarChart, Bar,
  ResponsiveContainer
} from "recharts";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { StyledPaper } from "../../Components/Global/Style";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

// Données RadarChart
const radarData = [
  { subject: "Logistique", A: 120, fullMark: 150 },
  { subject: "Digitalisation", A: 98, fullMark: 150 },
  { subject: "Sécurité", A: 86, fullMark: 150 },
  { subject: "Environnement", A: 130, fullMark: 150 },
  { subject: "RSE", A: 99, fullMark: 150 },
];


// ------------------ Données mock (remplace plus tard par ton backend / Redux) ------------------ //
const statsData = [
  { month: "Jan", enseignants: 0, eleves: 0, cours: 0 },
  { month: "Feb", enseignants: 1, eleves: 2, cours: 1 },
  { month: "Mar", enseignants: 2, eleves: 4, cours: 3 },
  { month: "Apr", enseignants: 3, eleves: 7, cours: 5 },
  { month: "May", enseignants: 5, eleves: 9, cours: 8 },
];

const pieData = [
  { name: "PDF", value: 22, color: "#00C49F" },
  { name: "Document", value: 44, color: "#0088FE" },
  { name: "Vidéo", value: 22, color: "#FFBB28" },
  { name: "Quiz", value: 12, color: "#FF8042" },
  { name: "Devoir", value: 12, color: "#FF8042" },
];
 // Données pour BarChart (exemple matières)
  const matiereData = [
    { matiere: "logistique et supply chain", eleves: 5 },
    { matiere: "digitalisation et technologies", eleves: 3 },
    { matiere: "sécurité et prévention", eleves: 1 },
    { matiere: "environnement et RSE", eleves: 9 },
  ];
  
// ------------------ Composant Dashboard ------------------ //
const Acceuil = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Dashboard Admin
      </Typography>

      {/* Statistiques rapides */}
      <Grid  sx={{display:"flex",flexDirection:"row",gap:"70px", mb: 3 }}>
        <Grid item xs={12} sm={4} md={2}>
          <Card sx={{ bgcolor: "#f0f8ff" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  <SchoolIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Enseignants</Typography>
                  <Typography variant="body2">5</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <Card sx={{ bgcolor: "#fff8e1" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: "#ff9800" }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Colaborateurs</Typography>
                  <Typography variant="body2">9</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <Card sx={{ bgcolor: "#e8f5e9" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: "#4caf50" }}>
                  <BookIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Matières</Typography>
                  <Typography variant="body2">12</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <Card sx={{ bgcolor: "#f3e5f5" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: "#9c27b0" }}>
                  <LibraryBooksIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">Ressources</Typography>
                  <Typography variant="body2">25</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <Card sx={{ bgcolor: "#e1f5fe" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{ bgcolor: "#0288d1" }}>
                  <VideoCallIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6">VisioConférence</Typography>
                  <Typography variant="body2">7</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        
      </Grid>

      {/* Graphiques */}
      <Grid  sx={{display:"flex" ,flexDirection:"row",justifyContent:"space-between",}}>
        {/* Évolution enseignants/étudiants/cours */}
        <Grid item xs={12} md={8} sx={{width:"45%", mb: { xs: 2, md: 0 } }}>
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

        {/* Répartition des étudiants */}
        <Grid item xs={12} md={4} sx={{ width:"45%" }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Répartition des ressources de cours
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
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
      
         {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Colaborateur par matière</Typography>
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

export default Acceuil;
