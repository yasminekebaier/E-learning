import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const Layout = () => {
  const navbarHeight = 64;

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', mt: `${navbarHeight}px` }}>
        {/* Sidebar fixe à gauche */}
        <Box sx={{ width: '17%', position: 'fixed', top: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)` }}>
          <Sidebar />
        </Box>

        {/* Contenu principal à droite de la sidebar */}
        <Box sx={{ flexGrow: 1, ml: '17%', p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
