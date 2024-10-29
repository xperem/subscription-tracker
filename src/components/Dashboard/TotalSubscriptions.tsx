// src/components/Dashboard/TotalSubscriptions.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface TotalSubscriptionsProps {
  total: number;
}

const TotalSubscriptions: React.FC<TotalSubscriptionsProps> = ({ total }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Nombre Total d'Abonnements</Typography>
      <Typography variant="h4">{total}</Typography>
    </CardContent>
  </Card>
);

export default TotalSubscriptions;
