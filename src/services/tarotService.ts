import { Card, Reading, ReadingType } from '../types/tarot';
import { tarotCards } from '../data/tarotCards';

class TarotService {
  private static instance: TarotService;
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
    const cards = [...tarotCards];
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards.slice(0, count).map(card => ({
      ...card,
      isReversed: Math.random() < 0.5
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

  public createReading(type: ReadingType): { cards: Card[] } {
    let count = 3;
    if (type === 'yesno') count = 1;
    if (type === 'weekly') count = 7;
    return { cards: this.getRandomCards(count) };
  }
}

export const tarotService = TarotService.getInstance(); 