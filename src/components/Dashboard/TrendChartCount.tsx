import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';

interface TrendChartProps {
  trendData: Array<{ month: string; count: number }>;
}

const TrendChartCount: React.FC<TrendChartProps> = ({ trendData }) => {
  const chartData = {
    labels: trendData.map((data) => data.month),
    datasets: [
      {
        label: 'Nombre d’abonnements',
        data: trendData.map((data) => data.count),
        fill: false,
        borderColor: '#36A2EB',
      },
    ],
  };

  return (
    <Box sx={{ minHeight: '300px', width: '100%' }}>
      <Line data={chartData} options={{ responsive: true }} />
    </Box>
  );
};

export default TrendChartCount;
