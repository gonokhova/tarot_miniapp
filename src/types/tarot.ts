import { tarotCards } from '../data/tarotCards';

export type ReadingType = 'yesno' | 'daily' | 'weekly';

export interface Card {
  id: number;
  name: string;
  nameEn: string;
  image: string;
  description: string;
  reversedDescription: string;
  element: string;
  keywords: string[];
  reversedKeywords: string[];
  category: string;
  suit?: string;
  number?: number;
  isReversed?: boolean;
}

export interface Reading {
  type: ReadingType;
  cards: Card[];
  date: number;
  question?: string;
}

export interface UserReading {
  userId: string;
  readings: Reading[];
  lastReadingDate: number;
  questionsRemaining: number;
  isSubscribed: boolean;
}

export interface Subscription {
  isActive: boolean;
  startDate: number;
  endDate: number;
  readingsLeft: number;
}

export const SUBSCRIPTION_LIMITS = {
  FREE_DAILY_READINGS: 3,
  SUBSCRIPTION_PRICE: 299,
  SUBSCRIPTION_DAILY_READINGS: 10
} as const; 