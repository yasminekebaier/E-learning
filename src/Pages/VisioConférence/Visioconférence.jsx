import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const classes = ['3e A', '3e B', '4e A'];
const durations = ['30 mn', '45 mn', '1 h'];

const Visioconference = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    description: '',
    class: '',
    meetLink: '',
  });

  const [meetings, setMeetings] = useState([]);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [tempLink, setTempLink] = useState('');

  // Charger les réunions sauvegardées depuis localStorage
  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetings');
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateLink = () => {
    setFormData((prev) => ({ ...prev, meetLink: 'https://meet.google.com/xyz-meet' }));
  };

  const handlePlanify = () => {
    const newMeeting = { ...formData, id: Date.now(), status: 'À venir' };
    const updatedMeetings = [...meetings, newMeeting];
    setMeetings(updatedMeetings);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));

    setFormData({
      title: '',
      date: '',
      time: '',
      duration: '',
      description: '',
      class: '',
      meetLink: '',
    });
  };

  const handleSaveLink = (id) => {
    const updatedMeetings = meetings.map((m) =>
      m.id === id ? { ...m, meetLink: tempLink } : m
    );
    setMeetings(updatedMeetings);
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    setEditingLinkId(null);
    setTempLink('');
  };
  const getStatusColor = (status) => {
  switch (status) {
    case 'À venir':
      return '#ef8c85ff'; // bleu
    case 'En cours':
      return '#f3a85cff'; // orange
    case 'Terminé':
      return '#2e7d32'; // vert
    default:
      return '#616161'; // gris par défaut
  }
};


  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="#080D50" mb={3}>
          Planifier une visioconférence
        </Typography>

        <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '30%' }}>
            <Grid item xs={12}>
              <TextField
                label="Titre"
                name="title"
                fullWidth
                value={formData.title}
                onChange={handleChange}
                sx={{
                  '& label': { color: '#080D50', fontWeight: 'bold' },
                  '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                }}
              />
            </Grid>

            <Grid item xs={6} width={100}>
              <FormControl
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': { color: '#080D50', fontWeight: 'bold' },
                  '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                }}
              >
                <InputLabel>Classe</InputLabel>
                <Select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  label="Classe"
                >
                  {classes.map((cl) => (
                    <MenuItem key={cl} value={cl}>
                      {cl}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '30%' }}>
            <Grid item xs={6}>
              <TextField
                label="Date"
                name="date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={handleChange}
                sx={{
                  '& label': { color: '#080D50', fontWeight: 'bold' },
                  '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Heure"
                name="time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.time}
                onChange={handleChange}
                sx={{
                  '& label': { color: '#080D50', fontWeight: 'bold' },
                  '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                }}
              />
            </Grid>

            <Grid item xs={3} width={100}>
              <FormControl
                fullWidth
                sx={{
                  '& .MuiInputLabel-root': { color: '#080D50', fontWeight: 'bold' },
                  '& .MuiOutlinedInput-root': { borderRadius: '10px' },
                }}
              >
                <InputLabel>Durée</InputLabel>
                <Select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  label="Durée"
                >
                  {durations.map((d) => (
                    <MenuItem key={d} value={d}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Box>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={2}
              value={formData.description}
              onChange={handleChange}
              sx={{
                '& label': { color: '#080D50', fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': { borderRadius: '10px' },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                onClick={handleGenerateLink}
                variant="contained"
                sx={{ bgcolor: '#ee983dff', textTransform: 'none', borderRadius: '8px' }}
              >
                Générer un lien Meet
              </Button>

              {formData.meetLink && (
                <TextField
                  value={formData.meetLink}
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                  }}
                />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button
              onClick={handlePlanify}
              variant="contained"
              sx={{ bgcolor: '#ee983dff', textTransform: 'none', borderRadius: '10px', px: 6 }}
            >
              Planifier
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Table des visioconférences */}
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead sx={{ bgcolor: '#eece8dff' }}>
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
            {meetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell>{meeting.title}</TableCell>
                <TableCell>{meeting.class}</TableCell>
                <TableCell>{meeting.date}</TableCell>
                <TableCell>{meeting.time}</TableCell>
               <TableCell>
  <Box
    sx={{
      color: 'white',
      backgroundColor: getStatusColor(meeting.status),
      px: 2,
      py: 0.5,
      borderRadius: '10px',
      display: 'inline-block',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      textAlign: 'center',
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
                      startIcon={<VideoCallIcon />}
                      href={meeting.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        borderColor: '#ee983dff',
                        color: '#ee983dff',
                        borderRadius: '10px',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#f3e5f5' },
                      }}
                    >
                      Démarrer
                    </Button>
                  ) : editingLinkId === meeting.id ? (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        size="small"
                        placeholder="https://meet.google.com/..."
                        value={tempLink}
                        onChange={(e) => setTempLink(e.target.value)}
                        sx={{ width: '70%' }}
                      />
                      <Button
                        variant="text"
                        onClick={() => handleSaveLink(meeting.id)}
                      >
                        Sauvegarder
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setEditingLinkId(meeting.id);
                        setTempLink('');
                      }}
                      sx={{
                        bgcolor: '#6a1b9a',
                        color: 'white',
                        textTransform: 'none',
                        borderRadius: '10px',
                        '&:hover': { bgcolor: '#4a0072' },
                      }}
                    >
                      Ajouter lien Meet
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Visioconference;
