import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import TableComponent from '../../Components/Global/TableComponent';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVisios } from '../../redux/actions/VisioConférenceAction';

const VisioconférenceEtudiant = () => {
  const dispatch = useDispatch();
  const { visioConferences } = useSelector((state) => state.visioConferences);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    dispatch(fetchVisios());
  }, [dispatch]);


  const getStatusColor = (status) => {
    switch (status) {
      case 'À venir': return '#ef8c85ff';
      case 'En cours': return '#f3a85cff';
      case 'Terminé': return '#2e7d32';
      default: return '#616161';
    }
  };

  const columns = [
    { id: 'titre', label: 'Titre' },
    { id: 'description', label: 'Description' },
    {
      id: 'enseignant',
      label: 'Enseignant',
      render: (row) => row.enseignant?.nom_prenom_ensignant || 'Inconnu'
    },
    {
      id: 'dateDebut',
      label: 'Début',
      render: (row) => dayjs(row.dateDebut).format('DD/MM/YYYY HH:mm')
    },
    {
      id: 'dateFin',
      label: 'Fin',
      render: (row) => dayjs(row.dateFin).format('DD/MM/YYYY HH:mm')
    },
    {
      id: 'status',
      label: 'Statut',
      render: (row) => (
        <Box
          sx={{
            color: 'white',
            backgroundColor: getStatusColor(row.status),
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.8rem',
            fontWeight: 'bold',
            textAlign: 'center',
            display: 'inline-block'
          }}
        >
          {row.status}
        </Box>
      )
    }
  ];

  const actions = [
    {
      tooltip: 'Rejoindre la visioconférence',
      icon: <VideoCallIcon />,
      onClick: (row) => {
        if (row.url) window.open(row.url, '_blank');
        else alert('Pas de lien Meet disponible !');
      }
    }
  ];
const [selectedTeacher, setSelectedTeacher] = useState('');

// Filtrer les visioconférences par enseignant
const filteredMeetings = selectedTeacher
  ? visioConferences.filter(
      (m) => m.enseignant?.nom_prenom_ensignant === selectedTeacher
    )
  : visioConferences;

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: '16px', mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" color="#080D50" mb={2}>
          Visioconférences disponibles
        </Typography>

        {/* Filtre par élève si besoin */}
     <FormControl fullWidth sx={{ maxWidth: 300 }}>
  <InputLabel>Filtrer par formateur</InputLabel>
  <Select
    value={selectedTeacher}
    onChange={(e) => setSelectedTeacher(e.target.value)}
    label="Filtrer par enseignant"
  >
    <MenuItem value="">Tous les enseignants</MenuItem>
    {visioConferences
      .map((m) => m.enseignant?.nom_prenom_ensignant)
      .filter((v, i, a) => v && a.indexOf(v) === i) // unique
      .map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
  </Select>
</FormControl>


        <Box sx={{ marginTop: '30px' }}>
          <TableComponent rows={filteredMeetings} columns={columns} actions={actions} />
        </Box>
      </Paper>
    </Box>
  );
};

export default VisioconférenceEtudiant;
