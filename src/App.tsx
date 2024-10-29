// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import AppLayout from './layouts/AppLayout';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import SubscriptionsListContainer from './components/Subscriptions/SubscriptionsListContainer';
import Profile from './components/Profile/Profile';
import CalendarContainer from './components/Calendar/CalendarContainer';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <SubscriptionProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Layout principal pour les pages sécurisées */}
            <Route path="/" element={<AppLayout />}>
              <Route path="dashboard" element={<DashboardContainer />} />
              <Route path="subscriptions" element={<SubscriptionsListContainer />} />
              <Route path="profile" element={<Profile />} /> {/* Ajout de la route profil */}
              <Route path="calendar" element={<CalendarContainer />} />
            </Route>
          </Routes>
        </SubscriptionProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
