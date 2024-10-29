export interface Subscription {
    id: string;
    user_id: string;
    title: string;
    price: number;
    type: 'sport' | 'divertissement' | 'bien-être' | 'education' | 'livre et magazines' | 'média' | 'professionnels' | 'autres';
    frequency: 'mensuel' | 'annuel';
    billingDate: string; // Date de prélèvement
  }
  