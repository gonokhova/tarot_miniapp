import { TarotCard, Reading, ReadingType } from '../types/tarot';
import { tarotCards } from '../data/tarotCards';

export class TarotService {
  private static shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  private static getRandomCards(count: number): TarotCard[] {
    const shuffledCards = this.shuffleArray(tarotCards);
    return shuffledCards.slice(0, count);
  }

  private static isReversed(): boolean {
    return Math.random() > 0.5;
  }

  static getReading(type: ReadingType, question?: string): Reading {
    let cards: TarotCard[];
    
    switch (type) {
      case 'daily':
        cards = this.getRandomCards(1);
        break;
      case 'weekly':
        cards = this.getRandomCards(3);
        break;
      case 'yesno':
        cards = this.getRandomCards(1);
        break;
      default:
        cards = this.getRandomCards(1);
    }

    return {
      type,
      cards,
      question,
      timestamp: Date.now()
    };
  }

  static getCardMeaning(card: TarotCard): string {
    return this.isReversed() ? card.meaning.reversed : card.meaning.upright;
  }

  static getYesNoAnswer(card: TarotCard): string {
    const isPositive = [
      "Маг", "Императрица", "Император", "Иерофант", "Влюбленные",
      "Колесница", "Сила", "Колесо Фортуны", "Справедливость",
      "Умеренность", "Звезда", "Солнце", "Суд", "Мир"
    ].includes(card.name);

    const isReversed = this.isReversed();
    
    if (isPositive) {
      return isReversed ? "Нет" : "Да";
    } else {
      return isReversed ? "Да" : "Нет";
    }
  }
} 