import { Card, Reading, UserReading, ReadingType } from '../types/tarot';
import { tarotCards } from '../data/tarotCards';

class TarotService {
  private static instance: TarotService;
  private userReadings: Map<string, UserReading> = new Map();
  private cards: Card[] = [...tarotCards];

  private constructor() {}

  public static getInstance(): TarotService {
    if (!TarotService.instance) {
      TarotService.instance = new TarotService();
    }
    return TarotService.instance;
  }

  public shuffleCards(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public drawCards(count: number): Card[] {
    if (count > this.cards.length) {
      throw new Error('Not enough cards in the deck');
    }
    return this.cards.slice(0, count);
  }

  public getCardById(id: number): Card | undefined {
    return this.cards.find(card => card.id === id);
  }

  public getCardsByCategory(category: 'major' | 'minor'): Card[] {
    return this.cards.filter(card => card.category === category);
  }

  public getCardsBySuit(suit: 'wands' | 'cups' | 'swords' | 'pentacles'): Card[] {
    return this.cards.filter(card => card.suit === suit);
  }

  public getRandomCard(): Card {
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    return this.cards[randomIndex];
  }

  public getRandomCards(count: number): Card[] {
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(card => ({
      ...card,
      isReversed: Math.random() > 0.5
    }));
  }

  public resetDeck(): void {
    this.cards = [...tarotCards];
  }

  public getCardMeaning(card: Card): string {
    return card.isReversed ? card.reversedDescription : card.description;
  }

  public getCardKeywords(card: Card, isReversed: boolean): string[] {
    return isReversed ? card.reversedKeywords : card.keywords;
  }

  public createReading(type: ReadingType, question?: string): Reading {
    const cards = this.getRandomCards(type === 'yesno' ? 1 : type === 'daily' ? 3 : 7);
    
    return {
      type,
      date: Date.now(),
      cards,
      question
    };
  }

  public getUserReading(userId: string): UserReading | undefined {
    return this.userReadings.get(userId);
  }

  public saveUserReading(userId: string, reading: Reading): void {
    const userReading = this.userReadings.get(userId) || {
      userId,
      readings: [],
      lastReadingDate: 0,
      questionsRemaining: 2,
      isSubscribed: false
    };

    userReading.readings.push(reading);
    userReading.lastReadingDate = Date.now();
    
    if (!userReading.isSubscribed) {
      userReading.questionsRemaining = Math.max(0, userReading.questionsRemaining - 1);
    }

    this.userReadings.set(userId, userReading);
  }

  public canUserAskQuestion(userId: string): boolean {
    const userReading = this.userReadings.get(userId);
    if (!userReading) return true;
    return userReading.isSubscribed || userReading.questionsRemaining > 0;
  }

  public subscribeUser(userId: string): void {
    const userReading = this.userReadings.get(userId) || {
      userId,
      readings: [],
      lastReadingDate: 0,
      questionsRemaining: 2,
      isSubscribed: false
    };

    userReading.isSubscribed = true;
    this.userReadings.set(userId, userReading);
  }

  public getYesNoAnswer(card: Card): string {
    const isPositive = !card.isReversed;
    return isPositive ? 'Да' : 'Нет';
  }
}

export const tarotService = TarotService.getInstance(); 