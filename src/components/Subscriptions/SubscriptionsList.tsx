// src/components/Subscriptions/SubscriptionsList.tsx
import React, { useState } from 'react';
import { Box, Typography, Button, List } from '@mui/material';
import SubscriptionItem from './SusbscriptionItem';
import AddSubscriptionModal from './AddSubscriptionModal';
import PredefinedSubscriptionsModal from './PredefinedSubscriptionsModal';
import { Subscription } from '../../types/Subscription';

interface SubscriptionsListProps {
  subscriptions: Subscription[];
  onAddSubscription: (subscription: Omit<Subscription, 'id' | 'user_id'>) => Promise<void>;
  onRemoveSubscription: (id: string) => Promise<void>;
  onUpdateSubscription: (subscription: Subscription) => Promise<void>; // Assurez-vous que cette fonction est bien définie dans le parent
}

const SubscriptionsList: React.FC<SubscriptionsListProps> = ({ 
  subscriptions, 
  onAddSubscription, 
  onRemoveSubscription, 
  onUpdateSubscription 
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPredefinedModalOpen, setPredefinedModalOpen] = useState(false);

  return (
    <Box sx={{ maxWidth: 600, mt: 2, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom align="center">
        Liste des Abonnements
      </Typography>
      <Box display="flex" justifyContent="center" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          Ajouter un abonnement
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setPredefinedModalOpen(true)} sx={{ ml: 2 }}>
          Ajouter un abonnement prédéfini
        </Button>
      </Box>

      <List>
        {subscriptions.length === 0 ? (
          <Typography variant="body1" align="center">
            Aucun abonnement trouvé.
          </Typography>
        ) : (
          subscriptions.map((sub) => (
            <SubscriptionItem 
              key={sub.id} 
              subscription={sub} 
              onUpdate={onUpdateSubscription} // Passez la fonction onUpdate ici
              onRemove={onRemoveSubscription} 
            />
          ))
        )}
      </List>

      <AddSubscriptionModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={async (newSubscription: Omit<Subscription, 'id' | 'user_id'>) => {
          await onAddSubscription(newSubscription);
          setModalOpen(false);
        }}
      />

      <PredefinedSubscriptionsModal
        open={isPredefinedModalOpen}
        onClose={() => setPredefinedModalOpen(false)}
        onAdd={async (newSubscription: Omit<Subscription, 'id' | 'user_id'>) => {
          await onAddSubscription(newSubscription);
          setPredefinedModalOpen(false);
        }}
      />
    </Box>
  );
};

export default SubscriptionsList;
