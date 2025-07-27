import React, { useEffect, useState } from 'react';
import {
  Box, Button, Card, CardContent, Paper, Typography, Pagination, IconButton,
  Grid,
  Divider,
  Tooltip,
  Stack
} from '@mui/material';
 import AddCircleOutline from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import QuizIcon from '@mui/icons-material/Quiz';
import WorkIcon from '@mui/icons-material/Work';
import { useTranslation } from 'react-i18next';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { StyledPaper } from '../../Components/Global/Style'
import { ButtonComponent } from '../../Components/Global/ButtonComponent';

const AddQuizDevoir = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      // Données simulées
    const data = [
  { id: 1, type: 'quiz', classe: '1ère A', date: '2025-07-17', duree: '30 min' },
  { id: 2, type: 'devoir', classe: '2ème B', date: '2025-07-18', duree: '1h' },
  { id: 3, type: 'quiz', classe: '3ème C', date: '2025-07-19', duree: '45 min' },
  { id: 4, type: 'devoir', classe: '4ème D', date: '2025-07-20', duree: '1h15' },
  { id: 5, type: 'quiz', classe: '5ème E', date: '2025-07-21', duree: '20 min' },
];
      setItems(data);
    };

    fetchData();
  }, []);

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const handlePageChange = (event, value) => setPage(value);

  const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const cardsToShow = [...paginatedItems];
  while (cardsToShow.length < itemsPerPage) {
    cardsToShow.push(null);
  }

  return (
    <>
      <StyledPaper
        style={{
          width: '95%',
          marginBottom: '10px',
          marginLeft: '10px',
          padding: 8,
        }}
      >
        <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography sx={{fontSize:"20px" ,color:"#080D50" ,fontWeight:"bold"}}>{t('Créez des quiz et devoirs')}</Typography>
          <ButtonComponent   text={t('Nouveau Quiz Devoir')}
                icon={<AddCircleOutline />}
                color="orange" /* onClick={handleOpenModal} *//>
        </Box>
           {/* Cartes */}
      <Box display="flex" flexWrap="wrap" gap={2} px={2} marginTop={"10px"}>
        {cardsToShow.map((item, index) =>
          item ? (
            <Card key={item.id} sx={{ flex: '1 1 calc(33.33% - 16px)', minWidth: 250 }}>
              <CardContent>
                <Grid style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  {item.type === 'quiz' ? <QuizIcon color="primary" /> : <WorkIcon color="secondary" />}
                  <Typography variant="h6" fontWeight="bold">
                    {item.type === 'quiz' ? t('Quiz') : t('Devoir')}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="Modifier">
        <IconButton size="small" /* onClick={() => onEditTeam(team)} */>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
       <Tooltip title="Supprimer">
        <IconButton size="small" /* onClick={() => onDeleteTeam(team)} */>
          <DeleteOutlineIcon color="error" />
        </IconButton>
      </Tooltip>
                </Stack>
                </Grid>
                <Typography variant="body2"><strong>Classe:</strong> {item.classe}</Typography>
                <Typography variant="body2"><strong>Date:</strong> {item.date}</Typography>
                <Typography variant="body2"><strong>Durée:</strong> {item.duree}</Typography>
                <Divider sx={{marginTop:"20px",marginBottom:"20px"}} />
                <Stack direction="row" justifyContent={"space-between"}>
                  <Typography>20 questions</Typography>
                  <Typography>Voir les détails</Typography>
                </Stack>
              </CardContent>
            </Card>
          ) : (
            <Card
              key={`empty-${index}`}
              sx={{
                flex: '1 1 calc(33.33% - 16px)',
                minWidth: 250,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #ccc',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t('Ajouter un nouveau quiz ou devoir')}
              </Typography>
              <IconButton color="primary">
                <AddIcon />
              </IconButton>
            </Card>
          )
        )}
      </Box>

      <Box mt={3} display="flex" justifyContent="center">
        <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" />
      </Box>
      </StyledPaper>


   
    </>
  );
};

export default AddQuizDevoir;
