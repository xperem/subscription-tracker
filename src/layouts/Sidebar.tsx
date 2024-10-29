import React from 'react';
import { Box, List, ListItem, ListItemText, Typography, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: '200px',
        bgcolor: '#1E3A5F', // Couleur de fond plus cohérente avec la barre supérieure
        height: '100vh',
        pt: 4,
        color: '#ffffff',
        borderRight: '1px solid #37474f',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          color: '#2196F3', // Couleur bleue qui s’harmonise avec le reste de l'application
          textAlign: 'center', // Centre le texte horizontalement
        }}
      >
        Subscription<br />Tracker
      </Typography>
      <List sx={{ width: '100%' }}>
        <ListItem
          
          component={Link}
          to="/dashboard"
          sx={{
            color: '#ffffff',
            '&:hover': { bgcolor: '#37474f' }, // Couleur au survol
          }}
        >
          <ListItemIcon sx={{ color: '#2196F3' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
        
          component={Link}
          to="/subscriptions"
          sx={{
            color: '#ffffff',
            '&:hover': { bgcolor: '#37474f' }, // Couleur au survol
          }}
        >
          <ListItemIcon sx={{ color: '#2196F3' }}>
            <SubscriptionsIcon />
          </ListItemIcon>
          <ListItemText primary="Subscriptions" />
        </ListItem>
        <ListItem
          
          component={Link}
          to="/calendar"
          sx={{
            color: '#ffffff',
            '&:hover': { bgcolor: '#37474f' }, // Couleur au survol
          }}
        >
          <ListItemIcon sx={{ color: '#2196F3' }}>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
