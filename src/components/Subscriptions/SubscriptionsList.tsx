import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddSubscriptionModal from './AddSubscriptionModal';
import PredefinedSubscriptionsModal from './PredefinedSubscriptionsModal';
import { Subscription } from '../../types/Subscription';
import DeleteIcon from '@mui/icons-material/Delete';

interface SubscriptionsListProps {
  subscriptions: Subscription[];
  onAddSubscription: (subscription: Omit<Subscription, 'id' | 'user_id'>) => Promise<void>;
  onRemoveSubscription: (id: string) => Promise<void>;
}

const SubscriptionsList: React.FC<SubscriptionsListProps> = ({
  subscriptions,
  onAddSubscription,
  onRemoveSubscription,
}) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isPredefinedModalOpen, setPredefinedModalOpen] = useState(false);

  return (
    <Box sx={{ maxWidth: 600, mt: 2, mx: 'auto' }}> {/* Centré horizontalement */}
      <Typography variant="h5" gutterBottom align="center">
        Liste des Abonnements
      </Typography>
      <Box display="flex" justifyContent="center" mb={2} gap={2}>
        <Button variant="contained" color="primary" onClick={() => setAddModalOpen(true)}>
          Ajouter un abonnement
        </Button>
        <Button variant="contained" color="secondary" onClick={() => setPredefinedModalOpen(true)}>
          Ajouter un abonnement prédéfini
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
          backgroundColor: '#f9f9f9', // Couleur de fond pour le conteneur
        }}
      >
        <List>
          {subscriptions.length === 0 ? ( // Affichage d'un message si la liste est vide
            <ListItem>
              <ListItemText primary="Aucun abonnement trouvé." />
            </ListItem>
          ) : (
            subscriptions.map((sub) => (
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
            ))
          )}
        </List>
      </Box>

      {/* Modal pour ajouter un abonnement personnalisé */}
      <AddSubscriptionModal
        open={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={async (newSubscription: Omit<Subscription, 'id' | 'user_id'>) => {
          await onAddSubscription(newSubscription);
          setAddModalOpen(false);
        }}
      />

      {/* Modal pour ajouter un abonnement prédéfini */}
      <PredefinedSubscriptionsModal
        open={isPredefinedModalOpen}
        onClose={() => setPredefinedModalOpen(false)}
        onAdd={async (predefinedSubscription: Omit<Subscription, 'id' | 'user_id'>) => {
          await onAddSubscription(predefinedSubscription);
          setPredefinedModalOpen(false);
        }}
      />
    </Box>
  );
};

export default SubscriptionsList;
