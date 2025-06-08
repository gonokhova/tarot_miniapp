import WebApp from '@twa-dev/sdk';
import { Subscription, SUBSCRIPTION_LIMITS } from '../types/tarot';

class SubscriptionService {
  private static instance: SubscriptionService;
  private subscription: Subscription | null = null;
  private readingsLeft: number = SUBSCRIPTION_LIMITS.FREE_DAILY_READINGS;

  private constructor() {
    this.loadSubscription();
  }

  public static getInstance(): SubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService();
    }
    return SubscriptionService.instance;
  }

  private loadSubscription(): void {
    const savedSubscription = localStorage.getItem('subscription');
    if (savedSubscription) {
      this.subscription = JSON.parse(savedSubscription);
    }
  }

  private saveSubscription(): void {
    if (this.subscription) {
      localStorage.setItem('subscription', JSON.stringify(this.subscription));
    }
  }

  public static canPerformReading(): boolean {
    const instance = SubscriptionService.getInstance();
    return instance.readingsLeft > 0;
  }

  public static getReadingsLeft(): number {
    const instance = SubscriptionService.getInstance();
    return instance.readingsLeft;
  }

  public static decrementReadingsLeft(): void {
    const instance = SubscriptionService.getInstance();
    if (instance.readingsLeft > 0) {
      instance.readingsLeft--;
    }
  }

  public static async purchaseSubscription(): Promise<boolean> {
    const instance = SubscriptionService.getInstance();
    
    try {
      const result = await WebApp.showPopup({
        title: 'Премиум подписка',
        message: `Хотите приобрести премиум подписку за ${SUBSCRIPTION_LIMITS.SUBSCRIPTION_PRICE} ₽/месяц?`,
        buttons: [
          { id: 'confirm', type: 'ok' },
          { id: 'cancel', type: 'cancel' }
        ]
      });

      if (result === 'confirm') {
        const subscription: Subscription = {
          isActive: true,
          startDate: Date.now(),
          endDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
          readingsLeft: SUBSCRIPTION_LIMITS.SUBSCRIPTION_DAILY_READINGS
        };
        
        instance.subscription = subscription;
        instance.readingsLeft = SUBSCRIPTION_LIMITS.SUBSCRIPTION_DAILY_READINGS;
        instance.saveSubscription();
        return true;
      }
    } catch (error) {
      console.error('Error purchasing subscription:', error);
    }
    
    return false;
  }
}

export const subscriptionService = SubscriptionService.getInstance(); 