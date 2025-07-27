
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const VisioconférenceEtudiant = () => {
  const [meetings, setMeetings] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const classes = ['3e A', '3e B', '4e A'];

  useEffect(() => {
    const stored = localStorage.getItem('meetings');
    if (stored) {
      setMeetings(JSON.parse(stored));
    }
  }, []);
 
  const filteredMeetings = selectedClass
    ? meetings.filter((m) => m.class === selectedClass)
    : meetings;

  const getStatusColor = (status) => {
    switch (status) {
      case 'À venir': return '#ef8c85ff';
      case 'En cours': return '#f3a85cff';
      case 'Terminé': return '#2e7d32';
      default: return '#616161';
    }
  };

  return (
  <Box p={4}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: '16px', mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="#080D50" mb={2}>
          Visioconférences disponibles
        </Typography>

        {/* Filtre classe */}
        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <InputLabel>Filtrer par classe</InputLabel>
          <Select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            label="Filtrer par classe"
          >
            <MenuItem value="">Toutes les classes</MenuItem>
            {classes.map((cl) => (
              <MenuItem key={cl} value={cl}>{cl}</MenuItem>
            ))}
          </Select>
        </FormControl>
         {/* Tableau */}
         <Box sx={{marginTop:"30px"}}>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ bgcolor: '#e0f2f1' }}>
            <TableRow>
              <TableCell><strong>Titre</strong></TableCell>
              <TableCell><strong>Classe</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Heure</strong></TableCell>
              <TableCell><strong>Statut</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMeetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell>{meeting.title}</TableCell>
                <TableCell>{meeting.class}</TableCell>
                <TableCell>{meeting.date}</TableCell>
                <TableCell>{meeting.time}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: getStatusColor(meeting.status),
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      display: 'inline-block',
                    }}
                  >
                    {meeting.status}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {meeting.meetLink ? (
                    <Button
                      variant="outlined"
                      size="small"
                      href={meeting.meetLink}
                      target="_blank"
                      startIcon={<VideoCallIcon />}
                      sx={{
                        borderColor: '#388e3c',
                        color: '#388e3c',
                        borderRadius: '10px',
                        textTransform: 'none',
                        '&:hover': {
                          bgcolor: '#e8f5e9',
                        },
                      }}
                    >
                      Rejoindre
                    </Button>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Pas encore disponible
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {filteredMeetings.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Aucune visioconférence disponible.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      </Paper>

     
    </Box>
  );
}

export default VisioconférenceEtudiant