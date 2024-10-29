// src/components/Dashboard/TotalCost.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface TotalCostProps {
  monthlyCost: number;
  yearlyCost: number;
}

const TotalCost: React.FC<TotalCostProps> = ({ monthlyCost, yearlyCost }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Coût Total des Abonnements</Typography>
      <Typography variant="body1">Mensuel: ${monthlyCost.toFixed(2)}</Typography>
      <Typography variant="body1">Annuel: ${yearlyCost.toFixed(2)}</Typography>
    </CardContent>
  </Card>
);

export default TotalCost;
