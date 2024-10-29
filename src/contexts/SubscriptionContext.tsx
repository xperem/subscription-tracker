import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../api/supabaseClient';
import { Subscription } from '../types/Subscription';

interface SubscriptionContextType {
  subscriptions: Subscription[];
  addNewSubscription: (subscription: Omit<Subscription, 'id' | 'user_id'>) => Promise<void>;
  removeSubscription: (id: string) => Promise<void>;
  loading: boolean; // Ajout de `loading`
}

interface SubscriptionProviderProps {
  children: ReactNode;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Initialisation de l'état `loading`

  const fetchSubscriptions = async () => {
    setLoading(true); // Début du chargement
    const { data, error } = await supabase
      .from('subscription')
      .select('*');

    if (error) {
      console.error('Error fetching subscriptions:', error);
    } else if (data && Array.isArray(data)) {
      setSubscriptions(data as unknown as Subscription[]); // Conversion explicite vers `Subscription[]`
    } else {
      console.error('Unexpected data format', data);
      setSubscriptions([]);
    }
    setLoading(false); // Fin du chargement
  };

  const addNewSubscription = async (subscription: Omit<Subscription, 'id' | 'user_id'>) => {
    const { data, error } = await supabase
      .from('subscription')
      .insert(subscription)
      .select();

    if (error) {
      console.error('Error adding subscription:', error);
    } else if (data && Array.isArray(data)) {
      setSubscriptions((prev) => [...prev, ...(data as unknown as Subscription[])]);
    }
  };

  const removeSubscription = async (id: string) => {
    const { error } = await supabase
      .from('subscription')
      .delete()
      .match({ id });

    if (error) {
      console.error('Error removing subscription:', error);
    } else {
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <SubscriptionContext.Provider value={{ subscriptions, addNewSubscription, removeSubscription, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription doit être utilisé dans SubscriptionProvider");
  }
  return context;
};
