import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { Subscription } from '../../types/Subscription';

interface AddSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (subscription: Omit<Subscription, 'id' | 'user_id'>) => void;
}

const AddSubscriptionModal: React.FC<AddSubscriptionModalProps> = ({ open, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [type, setType] = useState<Subscription['type']>('divertissement');
  const [frequency, setFrequency] = useState<Subscription['frequency']>('mensuel');
  const [billingDate, setBillingDate] = useState('');

  const resetFields = () => {
    setTitle('');
    setPrice('');
    setType('divertissement');
    setFrequency('mensuel');
    setBillingDate('');
  };

  const handleAdd = () => {
    if (!title || price === '' || !billingDate) return;

    const newSubscription: Omit<Subscription, 'id' | 'user_id'> = {
      title,
      price: Number(price),
      type,
      frequency,
      billingDate,
    };

    onAdd(newSubscription);
    resetFields();
    onClose();
  };

  useEffect(() => {
    if (!open) {
      resetFields();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={() => { resetFields(); onClose(); }} fullWidth maxWidth="sm">
      <DialogTitle sx={{ paddingBottom: 2 }}>Ajouter un abonnement</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            autoFocus
            label="Titre"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Prix"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            variant="outlined"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Type</InputLabel>
            <Select
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value as Subscription['type'])}
            >
              <MenuItem value="sport">Sport</MenuItem>
              <MenuItem value="divertissement">Divertissement</MenuItem>
              <MenuItem value="bien-être">Bien-être</MenuItem>
              <MenuItem value="education">Éducation</MenuItem>
              <MenuItem value="livre et magazines">Livres et Magazines</MenuItem>
              <MenuItem value="média">Média</MenuItem>
              <MenuItem value="professionnels">Professionnels</MenuItem>
              <MenuItem value="autres">Autres</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Fréquence</InputLabel>
            <Select
              label="Fréquence"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Subscription['frequency'])}
            >
              <MenuItem value="mensuel">Mensuel</MenuItem>
              <MenuItem value="annuel">Annuel</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Date de prélèvement"
            type="date"
            fullWidth
            value={billingDate}
            onChange={(e) => setBillingDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={() => { resetFields(); onClose(); }} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubscriptionModal;
