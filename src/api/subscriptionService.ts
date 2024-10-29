import { supabase } from './supabaseClient';
import { Subscription } from '../types/Subscription';

// Récupère tous les abonnements d'un utilisateur
export const fetchSubscriptions = async (userId: string): Promise<Subscription[]> => {
  const { data, error } = await supabase
    .from('subscription')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  // Vérification de type pour s'assurer que les données sont bien un tableau de Subscription
  return (data ?? []) as unknown as Subscription[];
};

// Ajoute un nouvel abonnement
export const addSubscription = async (subscription: Omit<Subscription, 'id'>): Promise<Subscription[]> => {
  const { data, error } = await supabase
    .from('subscription')
    .insert([subscription]);

  if (error) throw error;

  return (data ?? []) as unknown as Subscription[];
};

// Supprime un abonnement
export const deleteSubscription = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('subscription')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
