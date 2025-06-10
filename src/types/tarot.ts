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