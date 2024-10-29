import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Typography>Chargement des informations du profil...</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4">Profil</Typography>
      <Typography variant="body1"><strong>Email :</strong> {user.email}</Typography>
      {/* Ajoutez d'autres informations de profil ici si nécessaire */}
    </Box>
  );
};

export default Profile;
