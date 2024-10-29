import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: '200px',
        bgcolor: '#f7f7f7',
        height: '100vh',
        pt: 2,
        borderRight: '1px solid #ddd',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
        Subscription Tracker
      </Typography>
      <List>
        <ListItem  component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" sx={{ textAlign: 'center' }} />
        </ListItem>
        <ListItem  component={Link} to="/subscriptions">
          <ListItemText primary="Subscriptions" sx={{ textAlign: 'center' }} />
        </ListItem>
        <ListItem  component={Link} to="/calendar">
          <ListItemText primary="Calendar" sx={{ textAlign: 'center' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
