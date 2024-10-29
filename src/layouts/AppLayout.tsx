import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MainContent from './MainContent';

const AppLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar />
      <Sidebar />
      <MainContent />
    </Box>
  );
};

export default AppLayout;
