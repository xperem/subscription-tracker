import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';

interface TrendChartProps {
  trendData: Array<{ month: string; cost: number }>;
}

const TrendChartCost: React.FC<TrendChartProps> = ({ trendData }) => {
  const chartData = {
    labels: trendData.map((data) => data.month),
    datasets: [
      {
        label: 'Coût des abonnements',
        data: trendData.map((data) => data.cost),
        fill: false,
        borderColor: '#FF6384',
      },
    ],
  };

  return (
    <Box sx={{ minHeight: '300px', width: '100%' }}>
      <Line data={chartData} options={{ responsive: true }} />
    </Box>
  );
};

export default TrendChartCost;
