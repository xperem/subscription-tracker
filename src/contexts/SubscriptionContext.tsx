import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../api/supabaseClient';
import { Subscription } from '../types/Subscription';

interface SubscriptionContextType {
  subscriptions: Subscription[];
  loading: boolean;
  addNewSubscription: (subscription: Omit<Subscription, 'id' | 'user_id'>) => Promise<void>;
  removeSubscription: (id: string) => Promise<void>;
  updateSubscription: (subscription: Subscription) => Promise<void>;
}

interface SubscriptionProviderProps {
  children: ReactNode;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fonction pour récupérer tous les abonnements
  const fetchSubscriptions = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('subscription').select('*');
    
    if (error) {
      console.error('Erreur lors de la récupération des abonnements:', error);
    } else {
      setSubscriptions(data as unknown as Subscription[]);
    }
    setLoading(false);
  };

  // Fonction pour ajouter un nouvel abonnement
  const addNewSubscription = async (subscription: Omit<Subscription, 'id' | 'user_id'>) => {
    const { data, error } = await supabase.from('subscription').insert([subscription]).select();

    if (error) {
      console.error('Erreur lors de l’ajout de l’abonnement:', error);
    } else if (data) {
      setSubscriptions((prev) => [...prev, ...(data as unknown as Subscription[])]);
    }
  };

  // Fonction pour supprimer un abonnement
  const removeSubscription = async (id: string) => {
    const { error } = await supabase.from('subscription').delete().match({ id });

    if (error) {
      console.error('Erreur lors de la suppression de l’abonnement:', error);
    } else {
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
    }
  };

  // Fonction pour mettre à jour un abonnement
  const updateSubscription = async (subscription: Subscription) => {
    const { data, error } = await supabase
      .from('subscription')
      .update({
        title: subscription.title,
        price: subscription.price,
        type: subscription.type,
        frequency: subscription.frequency,
        billingDate: subscription.billingDate,
      })
      .eq('id', subscription.id)
      .select();

    if (error) {
      console.error('Erreur lors de la mise à jour de l’abonnement:', error);
    } else if (data) {
      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === subscription.id ? (data[0] as unknown as Subscription) : sub))
      );
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <SubscriptionContext.Provider
      value={{ subscriptions, loading, addNewSubscription, removeSubscription, updateSubscription }}
    >
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
