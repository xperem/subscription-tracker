import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/material';

interface SubscriptionTypeChartProps {
  data: Record<string, number>;
  size?: number; // Taille optionnelle pour personnaliser le graphique
}

const SubscriptionTypeChart: React.FC<SubscriptionTypeChartProps> = ({ data, size = 300 }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: size,
        maxWidth: size,
        maxHeight: size,
        margin: '0 auto',
      }}
    >
      <Pie data={chartData} options={options} />
    </Box>
  );
};

export default SubscriptionTypeChart;
