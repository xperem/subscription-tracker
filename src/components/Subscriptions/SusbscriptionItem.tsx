// src/components/Subscriptions/SubscriptionItem.tsx
import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SubscriptionEditModal from './SubscriptionEditModal';
import { Subscription } from '../../types/Subscription';

interface SubscriptionItemProps {
  subscription: Subscription;
  onUpdate: (updatedSubscription: Subscription) => void;
  onRemove: (id: string) => void;
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({ subscription, onUpdate, onRemove }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton onClick={() => setIsEditing(true)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onRemove(subscription.id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </>
        }
      >
        <ListItemText
          primary={subscription.title}
          secondary={`Prix : $${subscription.price} | Type : ${subscription.type} | Fréquence : ${subscription.frequency}`}
        />
      </ListItem>
      
      <SubscriptionEditModal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        subscription={subscription}
        onSave={(updatedSubscription) => {
          onUpdate(updatedSubscription);
          setIsEditing(false);
        }}
      />
    </>
  );
};

export default SubscriptionItem;
