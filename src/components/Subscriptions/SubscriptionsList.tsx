import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddSubscriptionModal from './AddSubscriptionModal';
import { Subscription } from '../../types/Subscription';
import DeleteIcon from '@mui/icons-material/Delete';

interface SubscriptionsListProps {
  subscriptions: Subscription[];
  onAddSubscription: (subscription: Omit<Subscription, 'id' | 'user_id'>) => Promise<void>;
  onRemoveSubscription: (id: string) => Promise<void>;
}

const SubscriptionsList: React.FC<SubscriptionsListProps> = ({ subscriptions, onAddSubscription, onRemoveSubscription }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ maxWidth: 600, mt: 2 }}>
      <Typography variant="h5" gutterBottom align="left">
        Liste des Abonnements
      </Typography>
      <Box display="flex" justifyContent="flex-start" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          Ajouter un abonnement
        </Button>
      </Box>

      {/* Conteneur avec défilement pour la liste des abonnements */}
      <Box
        sx={{
          maxHeight: '60vh', // Limiter la hauteur pour le défilement
          overflowY: 'auto',
          borderRadius: 2,
          border: '1px solid #ddd',
          p: 1,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <List>
          {subscriptions.map((sub) => (
            <ListItem
              key={sub.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #eee',
                padding: '8px 0',
              }}
            >
              <ListItemText
                primary={sub.title}
                secondary={`Prix : $${sub.price} | Type : ${sub.type} | Fréquence : ${sub.frequency}`}
              />
              <IconButton color="secondary" onClick={() => onRemoveSubscription(sub.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <AddSubscriptionModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={async (newSubscription: Omit<Subscription, 'id' | 'user_id'>) => {
          await onAddSubscription(newSubscription);
          setModalOpen(false);
        }}
      />
    </Box>
  );
};

export default SubscriptionsList;
