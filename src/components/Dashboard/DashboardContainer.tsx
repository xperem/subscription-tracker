// src/components/Dashboard/DashboardContainer.tsx
import React, { useMemo } from 'react';
import Dashboard from './Dashboard';
import { useSubscription } from '../../contexts/SubscriptionContext';
import dayjs from 'dayjs';
// Enregistrement des éléments nécessaires dans Chart.js
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const DashboardContainer: React.FC = () => {
  const { subscriptions } = useSubscription();

  // 1. Coût total mensuel et annuel
  const monthlyCost = useMemo(() => 
    subscriptions
      .filter(sub => sub.frequency === 'mensuel')
      .reduce((total, sub) => total + sub.price, 0), [subscriptions]);

  const yearlyCost = useMemo(() => 
    monthlyCost * 12 +
    subscriptions
      .filter(sub => sub.frequency === 'annuel')
      .reduce((total, sub) => total + sub.price, 0), [monthlyCost, subscriptions]);

  // 2. Nombre total d'abonnements
  const totalSubscriptions = subscriptions.length;

  // 3. Répartition des types d'abonnement
  const subscriptionsByType = useMemo(() => 
    subscriptions.reduce((acc, sub) => {
      acc[sub.type] = (acc[sub.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>), [subscriptions]);

  // 4. Données pour les courbes de tendance sur 12 mois (mois courant au centre, 6 mois avant et après)
  const trendData = useMemo(() => {
    const months = Array.from({ length: 13 }, (_, i) =>
      dayjs().subtract(6 - i, 'month').startOf('month'));

    return months.map((month) => {
      const cumulativeCount = subscriptions.filter(sub => {
        const billingDate = dayjs(sub.billingDate);
        return billingDate.isBefore(month.endOf('month')) && 
               (sub.frequency === 'mensuel' || billingDate.isSame(month, 'month'));
      }).length;

      const cumulativeCost = subscriptions.reduce((sum, sub) => {
        const billingDate = dayjs(sub.billingDate);
        if (billingDate.isBefore(month.endOf('month'))) {
          if (sub.frequency === 'mensuel') {
            const monthsActive = month.diff(billingDate, 'month') + 1;
            sum += sub.price * monthsActive;
          } else if (sub.frequency === 'annuel' && billingDate.month() === month.month()) {
            sum += sub.price;
          }
        }
        return sum;
      }, 0);

      return {
        month: month.format('MMMM YYYY'),
        count: cumulativeCount,
        cost: cumulativeCost,
      };
    });
  }, [subscriptions]);

  return (
    <Dashboard
      monthlyCost={monthlyCost}
      yearlyCost={yearlyCost}
      totalSubscriptions={totalSubscriptions}
      subscriptionsByType={subscriptionsByType}
      trendData={trendData}
    />
  );
};

export default DashboardContainer;
