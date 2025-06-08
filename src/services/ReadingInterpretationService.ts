import { Card } from '../types/tarot';

interface Interpretation {
  general: string;
  cards: {
    position: number;
    meaning: string;
    advice: string;
  }[];
  summary: string;
}

export class ReadingInterpretationService {
  private static instance: ReadingInterpretationService;

  private constructor() {}

  public static getInstance(): ReadingInterpretationService {
    if (!ReadingInterpretationService.instance) {
      ReadingInterpretationService.instance = new ReadingInterpretationService();
    }
    return ReadingInterpretationService.instance;
  }

  public interpretSingleCard(card: Card, isReversed: boolean): Interpretation {
    const meaning = isReversed ? card.reversedDescription : card.description;
    const keywords = isReversed ? card.reversedKeywords : card.keywords;

    return {
      general: `Карта ${card.name} ${isReversed ? '(перевернутая)' : ''} говорит о ${meaning.toLowerCase()}`,
      cards: [{
        position: 1,
        meaning: meaning,
        advice: this.generateAdvice(card, isReversed)
      }],
      summary: `Основные ключевые слова: ${keywords.join(', ')}. ${this.generateSummary(card, isReversed)}`
    };
  }

  public interpretThreeCards(cards: Card[], isReversed: boolean[]): Interpretation {
    const positions = ['прошлое', 'настоящее', 'будущее'];
    
    return {
      general: 'Расклад из трех карт показывает путь развития ситуации',
      cards: cards.map((card, index) => ({
        position: index + 1,
        meaning: `${positions[index]}: ${isReversed[index] ? card.reversedDescription : card.description}`,
        advice: this.generateAdvice(card, isReversed[index])
      })),
      summary: this.generateThreeCardSummary(cards, isReversed)
    };
  }

  public interpretCelticCross(cards: Card[], isReversed: boolean[]): Interpretation {
    const positions = [
      'текущая ситуация',
      'вызов',
      'сознательные мысли',
      'подсознательные мысли',
      'прошлое',
      'ближайшее будущее',
      'отношение к ситуации',
      'внешние влияния',
      'надежды и страхи',
      'итоговый результат'
    ];

    return {
      general: 'Кельтский крест - сложный расклад, показывающий полную картину ситуации',
      cards: cards.map((card, index) => ({
        position: index + 1,
        meaning: `${positions[index]}: ${isReversed[index] ? card.reversedDescription : card.description}`,
        advice: this.generateAdvice(card, isReversed[index])
      })),
      summary: this.generateCelticCrossSummary(cards, isReversed)
    };
  }

  private generateAdvice(card: Card, isReversed: boolean): string {
    const element = card.element.toLowerCase();
    const category = card.category;
    const suit = card.suit;

    let advice = '';

    if (isReversed) {
      advice = 'Сейчас важно обратить внимание на внутренние противоречия и работать над их разрешением. ';
    } else {
      advice = 'Это благоприятное время для действий и развития. ';
    }

    switch (element) {
      case 'огонь':
        advice += 'Проявите инициативу и страсть. ';
        break;
      case 'вода':
        advice += 'Прислушайтесь к своим чувствам и интуиции. ';
        break;
      case 'воздух':
        advice += 'Используйте интеллект и коммуникативные навыки. ';
        break;
      case 'земля':
        advice += 'Сосредоточьтесь на практических аспектах. ';
        break;
    }

    if (category === 'major') {
      advice += 'Сейчас происходит важный жизненный урок. ';
    } else {
      switch (suit) {
        case 'wands':
          advice += 'Сосредоточьтесь на творчестве и вдохновении. ';
          break;
        case 'cups':
          advice += 'Обратите внимание на эмоциональную сферу. ';
          break;
        case 'swords':
          advice += 'Важно принимать взвешенные решения. ';
          break;
        case 'pentacles':
          advice += 'Сосредоточьтесь на материальных аспектах. ';
          break;
      }
    }

    return advice;
  }

  private generateSummary(card: Card, isReversed: boolean): string {
    const element = card.element.toLowerCase();
    const category = card.category;

    let summary = '';

    if (category === 'major') {
      summary = 'Эта карта указывает на важный жизненный урок или переходный период. ';
    } else {
      summary = 'Карта говорит о повседневных аспектах жизни. ';
    }

    if (isReversed) {
      summary += 'Перевернутое положение указывает на внутренние препятствия, которые нужно преодолеть. ';
    }

    switch (element) {
      case 'огонь':
        summary += 'Энергия огня призывает к действию и переменам.';
        break;
      case 'вода':
        summary += 'Энергия воды говорит о важности эмоций и интуиции.';
        break;
      case 'воздух':
        summary += 'Энергия воздуха указывает на необходимость ясного мышления.';
        break;
      case 'земля':
        summary += 'Энергия земли призывает к практичности и стабильности.';
        break;
    }

    return summary;
  }

  private generateThreeCardSummary(cards: Card[], isReversed: boolean[]): string {
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];

    let summary = '';

    // Анализ прошлого
    summary += `В прошлом ${isReversed[0] ? pastCard.reversedDescription.toLowerCase() : pastCard.description.toLowerCase()}. `;

    // Анализ настоящего
    summary += `Сейчас ${isReversed[1] ? presentCard.reversedDescription.toLowerCase() : presentCard.description.toLowerCase()}. `;

    // Анализ будущего
    summary += `В будущем ${isReversed[2] ? futureCard.reversedDescription.toLowerCase() : futureCard.description.toLowerCase()}. `;

    // Общий анализ
    const majorCount = cards.filter(card => card.category === 'major').length;
    if (majorCount >= 2) {
      summary += 'Наличие нескольких Старших Арканов указывает на важный жизненный период. ';
    }

    const reversedCount = isReversed.filter(Boolean).length;
    if (reversedCount >= 2) {
      summary += 'Большое количество перевернутых карт говорит о необходимости внутренней работы. ';
    }

    return summary;
  }

  private generateCelticCrossSummary(cards: Card[], isReversed: boolean[]): string {
    const currentSituation = cards[0];
    const challenge = cards[1];
    const conscious = cards[2];
    const subconscious = cards[3];
    const past = cards[4];
    const future = cards[5];
    const attitude = cards[6];
    const external = cards[7];
    const hopes = cards[8];
    const outcome = cards[9];

    let summary = '';

    // Анализ текущей ситуации и вызова
    summary += `Текущая ситуация (${currentSituation.name}) ${isReversed[0] ? currentSituation.reversedDescription.toLowerCase() : currentSituation.description.toLowerCase()}. `;
    summary += `Основной вызов (${challenge.name}) ${isReversed[1] ? challenge.reversedDescription.toLowerCase() : challenge.description.toLowerCase()}. `;

    // Анализ сознательного и подсознательного
    summary += `Сознательные мысли (${conscious.name}) ${isReversed[2] ? conscious.reversedDescription.toLowerCase() : conscious.description.toLowerCase()}, `;
    summary += `в то время как подсознание (${subconscious.name}) ${isReversed[3] ? subconscious.reversedDescription.toLowerCase() : subconscious.description.toLowerCase()}. `;

    // Анализ прошлого и будущего
    summary += `Прошлое (${past.name}) ${isReversed[4] ? past.reversedDescription.toLowerCase() : past.description.toLowerCase()}, `;
    summary += `что ведет к ближайшему будущему (${future.name}) ${isReversed[5] ? future.reversedDescription.toLowerCase() : future.description.toLowerCase()}. `;

    // Анализ отношения и внешних влияний
    summary += `Ваше отношение к ситуации (${attitude.name}) ${isReversed[6] ? attitude.reversedDescription.toLowerCase() : attitude.description.toLowerCase()}, `;
    summary += `а внешние влияния (${external.name}) ${isReversed[7] ? external.reversedDescription.toLowerCase() : external.description.toLowerCase()}. `;

    // Анализ надежд и итогового результата
    summary += `Ваши надежды и страхи (${hopes.name}) ${isReversed[8] ? hopes.reversedDescription.toLowerCase() : hopes.description.toLowerCase()}, `;
    summary += `что в итоге приведет к (${outcome.name}) ${isReversed[9] ? outcome.reversedDescription.toLowerCase() : outcome.description.toLowerCase()}. `;

    // Общий анализ
    const majorCount = cards.filter(card => card.category === 'major').length;
    if (majorCount >= 3) {
      summary += 'Наличие нескольких Старших Арканов указывает на важный жизненный период и судьбоносные изменения. ';
    }

    const reversedCount = isReversed.filter(Boolean).length;
    if (reversedCount >= 4) {
      summary += 'Большое количество перевернутых карт говорит о необходимости серьезной внутренней работы и преодоления препятствий. ';
    }

    return summary;
  }
} 