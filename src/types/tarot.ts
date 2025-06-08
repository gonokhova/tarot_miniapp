export interface TarotCard {
  id: number;
  name: string;
  image: string;
  meaning: {
    upright: string;
    reversed: string;
  };
}

export type ReadingType = 'daily' | 'weekly' | 'yesno';

export interface Reading {
  type: ReadingType;
  cards: TarotCard[];
  question?: string;
  timestamp: number;
}

export interface Subscription {
  isActive: boolean;
  expiresAt: number;
  dailyReadingsLeft: number;
}

export const SUBSCRIPTION_LIMITS = {
  FREE_DAILY_READINGS: 2,
  PREMIUM_DAILY_READINGS: 10,
  SUBSCRIPTION_PRICE: 299, // в рублях
  SUBSCRIPTION_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 дней в миллисекундах
} as const; 