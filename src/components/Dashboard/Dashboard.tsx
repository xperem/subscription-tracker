import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import TotalCost from './TotalCost';
import SubscriptionTypeChart from './SubscriptionTypeChart';
import TotalSubscriptions from './TotalSubscriptions';
import TrendChartCount from './TrendChartCount';
import TrendChartCost from './TrendChartCost';

interface DashboardProps {
  monthlyCost: number;
  yearlyCost: number;
  totalSubscriptions: number;
  subscriptionsByType: Record<string, number>;
  trendData: Array<{ month: string; count: number; cost: number }>;
}

const Dashboard: React.FC<DashboardProps> = ({
  monthlyCost,
  yearlyCost,
  totalSubscriptions,
  subscriptionsByType,
  trendData,
}) => {
  const trendDataCount = trendData.map(({ month, count }) => ({ month, count }));
  const trendDataCost = trendData.map(({ month, cost }) => ({ month, cost }));

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <TotalCost monthlyCost={monthlyCost} yearlyCost={yearlyCost} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalSubscriptions total={totalSubscriptions} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SubscriptionTypeChart data={subscriptionsByType} size={180} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TrendChartCount trendData={trendDataCount} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TrendChartCost trendData={trendDataCost} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
