import { supabase } from './supabaseClient';
import { Subscription } from '../types/Subscription';

// Récupérer tous les abonnements
export const fetchSubscriptions = async (): Promise<Subscription[]> => {
  const { data, error } = await supabase.from('subscription').select('*');
  
  if (error) {
    throw new Error('Erreur lors de la récupération des abonnements');
  }
  
  return data as unknown as Subscription[];
};

// Ajouter un abonnement
export const addSubscription = async (subscription: Omit<Subscription, 'id'>): Promise<Subscription[]> => {
  const { data, error } = await supabase.from('subscription').insert([subscription]).select();

  if (error) {
    throw new Error('Erreur lors de l’ajout de l’abonnement');
  }

  return data as unknown as Subscription[];
};

// Supprimer un abonnement
export const deleteSubscription = async (id: string): Promise<void> => {
  const { error } = await supabase.from('subscription').delete().eq('id', id);

  if (error) {
    throw new Error('Erreur lors de la suppression de l’abonnement');
  }
};

// Mettre à jour un abonnement
export const updateSubscriptionInDb = async (subscription: Subscription): Promise<Subscription> => {
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

  if (error || !data) {
    throw new Error('Erreur lors de la mise à jour de l’abonnement');
  }

  return data[0] as unknown as Subscription;
};
