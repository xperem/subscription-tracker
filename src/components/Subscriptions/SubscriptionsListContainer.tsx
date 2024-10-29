import React from 'react';
import SubscriptionsList from './SubscriptionsList';
import { useSubscription } from '../../contexts/SubscriptionContext';
import { useAuth } from '../../contexts/AuthContext'; // Assurez-vous d'avoir accès au contexte de l'auth
import { CircularProgress, Box } from '@mui/material';
import { Subscription } from '../../types/Subscription';

const SubscriptionsListContainer: React.FC = () => {
  const { subscriptions, loading, addNewSubscription, removeSubscription } = useSubscription();
  const { user } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <SubscriptionsList
      subscriptions={subscriptions}
      onAddSubscription={async (newSub: Omit<Subscription, 'id' | 'user_id'>) => {
        if (!user) return;
        
        // Ajout de user_id ici avant d'appeler addNewSubscription
        const subscriptionWithUserId = { ...newSub, user_id: user.id };
        await addNewSubscription(subscriptionWithUserId);
      }}
      onRemoveSubscription={async (id: string) => await removeSubscription(id)}
    />
  );
};

export default SubscriptionsListContainer;
