import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  TextField,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import dayjs from 'dayjs';
import { Subscription } from '../../types/Subscription';

interface PredefinedSubscriptionsModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (subscription: Omit<Subscription, 'id' | 'user_id'>) => void;
}

const predefinedSubscriptions = [
  { title: 'Netflix', price: 9.99, type: 'média', frequency: 'mensuel' },
  { title: 'Amazon Prime', price: 9.99, type: 'média', frequency: 'mensuel' },
  { title: 'Disney+', price: 9.99, type: 'média', frequency: 'mensuel' },
  { title: 'Basic-Fit', price: 9.99, type: 'sport', frequency: 'mensuel' },
];

const PredefinedSubscriptionsModal: React.FC<PredefinedSubscriptionsModalProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [selectedSubscription, setSelectedSubscription] = useState<Omit<Subscription, 'id' | 'user_id'> | null>(null);
  const [billingDate, setBillingDate] = useState(dayjs().format('YYYY-MM-DD'));

  const handleSubscriptionSelect = (subscription: Omit<Subscription, 'id' | 'user_id' | 'billingDate'>) => {
    setSelectedSubscription(subscription);
  };

  const handleAdd = () => {
    if (selectedSubscription) {
      onAdd({ ...selectedSubscription, billingDate });
      reset();
    }
  };

  const reset = () => {
    setSelectedSubscription(null);
    setBillingDate(dayjs().format('YYYY-MM-DD'));
    onClose();
  };

  return (
    <Dialog open={open} onClose={reset} fullWidth maxWidth="sm">
      <DialogTitle>{selectedSubscription ? 'Choisir la date de prélèvement' : 'Choisir un abonnement prédéfini'}</DialogTitle>
      <DialogContent>
        {!selectedSubscription ? (
          <List>
            {predefinedSubscriptions.map((subscription, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleSubscriptionSelect(subscription)}
              >
                <ListItemText
                  primary={subscription.title}
                  secondary={`Prix : $${subscription.price} | Type : ${subscription.type} | Fréquence : ${subscription.frequency}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Typography variant="h6" gutterBottom>
              {selectedSubscription.title}
            </Typography>
            <TextField
              label="Date de prélèvement"
              type="date"
              fullWidth
              value={billingDate}
              onChange={(e) => setBillingDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={reset} color="secondary">
          Annuler
        </Button>
        {selectedSubscription && (
          <Button onClick={handleAdd} variant="contained" color="primary">
            Ajouter
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PredefinedSubscriptionsModal;
