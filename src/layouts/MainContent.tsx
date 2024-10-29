import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainContent: React.FC = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 0,
        ml: '200px',
        mt: '10px', // pour ajuster selon la hauteur de la barre supérieure
        overflow: 'hidden', // empêcher le défilement global
        height: 'calc(100vh - 64px)', // limiter la hauteur pour inclure la barre supérieure
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar /> {/* Espace pour la barre supérieure */}
      
      {/* Zone défilable pour le contenu */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainContent;
