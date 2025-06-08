import { Reading } from '../types/tarot';

interface HistoryEntry {
  id: string;
  reading: Reading;
  timestamp: number;
  isFavorite: boolean;
}

class HistoryService {
  private static readonly HISTORY_KEY = 'tarot_history';
  private static readonly MAX_HISTORY_ITEMS = 50;

  static getHistory(): HistoryEntry[] {
    const history = localStorage.getItem(this.HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  }

  static addToHistory(reading: Reading): void {
    const history = this.getHistory();
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      reading,
      timestamp: Date.now(),
      isFavorite: false
    };

    history.unshift(newEntry);
    
    // Ограничиваем количество записей в истории
    if (history.length > this.MAX_HISTORY_ITEMS) {
      history.pop();
    }

    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
  }

  static toggleFavorite(id: string): void {
    const history = this.getHistory();
    const entry = history.find(item => item.id === id);
    
    if (entry) {
      entry.isFavorite = !entry.isFavorite;
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    }
  }

  static getFavorites(): HistoryEntry[] {
    return this.getHistory().filter(entry => entry.isFavorite);
  }

  static clearHistory(): void {
    localStorage.removeItem(this.HISTORY_KEY);
  }

  static removeFromHistory(id: string): void {
    const history = this.getHistory();
    const filteredHistory = history.filter(entry => entry.id !== id);
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(filteredHistory));
  }
}

export const historyService = new HistoryService(); 