import React, { useState, useEffect } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { Subscription } from '../../types/Subscription';

interface SubscriptionEditModalProps {
  open: boolean;
  onClose: () => void;
  subscription: Subscription;
  onSave: (updatedSubscription: Subscription) => void;
}

const SubscriptionEditModal: React.FC<SubscriptionEditModalProps> = ({ open, onClose, subscription, onSave }) => {
  const [title, setTitle] = useState(subscription.title);
  const [price, setPrice] = useState(subscription.price);
  const [type, setType] = useState<Subscription['type']>(subscription.type);
  const [frequency, setFrequency] = useState<Subscription['frequency']>(subscription.frequency);
  const [billingDate, setBillingDate] = useState(subscription.billingDate || '');

  useEffect(() => {
    if (open) {
      setTitle(subscription.title);
      setPrice(subscription.price);
      setType(subscription.type);
      setFrequency(subscription.frequency);
      setBillingDate(subscription.billingDate || '');
    }
  }, [open, subscription]);

  const handleSave = () => {
    onSave({ ...subscription, title, price, type, frequency, billingDate });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Modifier l’abonnement</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <TextField label="Prix" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} fullWidth />
          <TextField
            label="Type"
            select
            value={type}
            onChange={(e) => setType(e.target.value as Subscription['type'])}
            fullWidth
          >
            <MenuItem value="sport">Sport</MenuItem>
            <MenuItem value="divertissement">Divertissement</MenuItem>
            <MenuItem value="bien-être">Bien-être</MenuItem>
            <MenuItem value="education">Éducation</MenuItem>
            <MenuItem value="livre et magazines">Livres et Magazines</MenuItem>
            <MenuItem value="média">Média</MenuItem>
            <MenuItem value="professionnels">Professionnels</MenuItem>
            <MenuItem value="autres">Autres</MenuItem>
          </TextField>
          <TextField
            label="Fréquence"
            select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as Subscription['frequency'])}
            fullWidth
          >
            <MenuItem value="mensuel">Mensuel</MenuItem>
            <MenuItem value="annuel">Annuel</MenuItem>
          </TextField>
          <TextField
            label="Date de prélèvement"
            type="date"
            value={billingDate}
            onChange={(e) => setBillingDate(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionEditModal;
