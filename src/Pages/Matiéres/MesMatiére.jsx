import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

const subjects = [
  { name: 'مادة الإيقاظ العلمي' },
  { name: 'مادة التربية الإسلامية' },
  { name: 'مادة الفرنسية' },
  { name: 'مادة قواعد اللغة' },
  { name: 'مادة القراءة' },
  { name: 'مادة الرياضيات' },
];

const MesMatieres = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: '#eaf2fc', minHeight: '100vh' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Bienvenue en 4ème année
      </Typography>
      <Grid container spacing={3}>
        {subjects.map((subject, index) => (
          <Grid item xs={4} key={index}>
  <Card
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      backgroundColor: '#ffe4f0',
    }}
  >
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="h6">{subject.name}</Typography>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2331/2331777.png"
        alt="mascotte"
        style={{ width: 50, marginTop: 10 }}
      />
    </CardContent>
  </Card>
</Grid>

        ))}
      </Grid>
    </Box> 
  );
};

export default MesMatieres;
