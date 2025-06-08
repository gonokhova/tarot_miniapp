import WebApp from '@twa-dev/sdk';
import { Subscription, SUBSCRIPTION_LIMITS } from '../types/tarot';

const STORAGE_KEY = 'tarot_subscription';

export class SubscriptionService {
  private static getStoredSubscription(): Subscription | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  }

  private static saveSubscription(subscription: Subscription): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
  }

  static getSubscription(): Subscription {
    const stored = this.getStoredSubscription();
    const now = Date.now();

    if (!stored || stored.expiresAt < now) {
      // Создаем новую бесплатную подписку
      const newSubscription: Subscription = {
        isActive: false,
        expiresAt: now + 24 * 60 * 60 * 1000, // 24 часа
        dailyReadingsLeft: SUBSCRIPTION_LIMITS.FREE_DAILY_READINGS
      };
      this.saveSubscription(newSubscription);
      return newSubscription;
    }

    // Если подписка истекла сегодня, сбрасываем счетчик
    const today = new Date().setHours(0, 0, 0, 0);
    const subscriptionDate = new Date(stored.expiresAt).setHours(0, 0, 0, 0);
    
    if (today > subscriptionDate) {
      stored.dailyReadingsLeft = stored.isActive 
        ? SUBSCRIPTION_LIMITS.PREMIUM_DAILY_READINGS 
        : SUBSCRIPTION_LIMITS.FREE_DAILY_READINGS;
      this.saveSubscription(stored);
    }

    return stored;
  }

  static async purchaseSubscription(): Promise<boolean> {
    try {
      const result = await WebApp.showPopup({
        title: 'Премиум подписка',
        message: `Получите неограниченный доступ к предсказаниям за ${SUBSCRIPTION_LIMITS.SUBSCRIPTION_PRICE} ₽/месяц`,
        buttons: [
          { id: 'buy', type: 'ok' },
          { id: 'cancel', type: 'cancel' }
        ]
      });

      if (result?.button_id === 'buy') {
        const subscription: Subscription = {
          isActive: true,
          expiresAt: Date.now() + SUBSCRIPTION_LIMITS.SUBSCRIPTION_DURATION,
          dailyReadingsLeft: SUBSCRIPTION_LIMITS.PREMIUM_DAILY_READINGS
        };
        this.saveSubscription(subscription);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error purchasing subscription:', error);
      return false;
    }
  }

  static canPerformReading(): boolean {
    const subscription = this.getSubscription();
    return subscription.dailyReadingsLeft > 0;
  }

  static decrementReadingsLeft(): void {
    const subscription = this.getSubscription();
    subscription.dailyReadingsLeft--;
    this.saveSubscription(subscription);
  }

  static getReadingsLeft(): number {
    return this.getSubscription().dailyReadingsLeft;
  }
} 