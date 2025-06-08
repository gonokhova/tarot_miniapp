import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WebApp from '@twa-dev/sdk';
import { ReadingType, Reading, SUBSCRIPTION_LIMITS } from './types/tarot';
import { TarotService } from './services/tarotService';
import { SubscriptionService } from './services/subscriptionService';
import ReadingResult from './components/ReadingResult';
import DisclaimerModal from './components/DisclaimerModal';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: #fff;
`;

const ReadingOptions = styled.div`
  display: grid;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const ReadingButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuestionInput = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 16px;
  margin-bottom: 20px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SubscriptionInfo = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
  text-align: center;
`;

const PremiumButton = styled.button`
  background: linear-gradient(135deg, #ffd700 0%, #ffa500 100%);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #000;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  }
`;

function App() {
  const [currentReading, setCurrentReading] = useState<Reading | null>(null);
  const [question, setQuestion] = useState('');
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [selectedType, setSelectedType] = useState<ReadingType | null>(null);
  const [readingsLeft, setReadingsLeft] = useState<number>(SUBSCRIPTION_LIMITS.FREE_DAILY_READINGS);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    setReadingsLeft(SubscriptionService.getReadingsLeft());

    // Проверяем, показывали ли мы уже предупреждение
    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
    if (hasSeenDisclaimer) {
      setShowDisclaimer(false);
    }
  }, []);

  const handleDisclaimerClose = () => {
    setShowDisclaimer(false);
    localStorage.setItem('hasSeenDisclaimer', 'true');
  };

  const handleReading = async (type: ReadingType) => {
    if (!SubscriptionService.canPerformReading()) {
      const purchased = await SubscriptionService.purchaseSubscription();
      if (!purchased) return;
      setReadingsLeft(SubscriptionService.getReadingsLeft());
    }

    setSelectedType(type);
    if (type === 'yesno') {
      setShowQuestionInput(true);
    } else {
      const reading = TarotService.getReading(type);
      setCurrentReading(reading);
      SubscriptionService.decrementReadingsLeft();
      setReadingsLeft(SubscriptionService.getReadingsLeft());
    }
  };

  const handleQuestionSubmit = async () => {
    if (!selectedType || !question.trim()) return;

    if (!SubscriptionService.canPerformReading()) {
      const purchased = await SubscriptionService.purchaseSubscription();
      if (!purchased) return;
      setReadingsLeft(SubscriptionService.getReadingsLeft());
    }

    const reading = TarotService.getReading(selectedType, question.trim());
    setCurrentReading(reading);
    setShowQuestionInput(false);
    SubscriptionService.decrementReadingsLeft();
    setReadingsLeft(SubscriptionService.getReadingsLeft());
  };

  const handleBack = () => {
    setCurrentReading(null);
    setQuestion('');
    setShowQuestionInput(false);
    setSelectedType(null);
  };

  const handlePurchaseSubscription = async () => {
    const purchased = await SubscriptionService.purchaseSubscription();
    if (purchased) {
      setReadingsLeft(SubscriptionService.getReadingsLeft());
    }
  };

  return (
    <AppContainer>
      {showDisclaimer && <DisclaimerModal onClose={handleDisclaimerClose} />}
      
      <Header>
        <Title>Таро Предсказания</Title>
      </Header>

      {!currentReading && !showQuestionInput && (
        <SubscriptionInfo>
          <div>Осталось предсказаний сегодня: {readingsLeft}</div>
          {readingsLeft === 0 && (
            <PremiumButton onClick={handlePurchaseSubscription}>
              Купить премиум за {SUBSCRIPTION_LIMITS.SUBSCRIPTION_PRICE} ₽/месяц
            </PremiumButton>
          )}
        </SubscriptionInfo>
      )}

      {currentReading ? (
        <>
          <BackButton onClick={handleBack}>← Назад</BackButton>
          <ReadingResult reading={currentReading} />
        </>
      ) : showQuestionInput ? (
        <>
          <BackButton onClick={handleBack}>← Назад</BackButton>
          <QuestionInput
            type="text"
            placeholder="Задайте ваш вопрос..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleQuestionSubmit()}
          />
          <ReadingButton onClick={handleQuestionSubmit}>
            Получить ответ
          </ReadingButton>
        </>
      ) : (
        <ReadingOptions>
          <ReadingButton 
            onClick={() => handleReading('daily')}
            disabled={!SubscriptionService.canPerformReading()}
          >
            Предсказание на день
          </ReadingButton>
          <ReadingButton 
            onClick={() => handleReading('weekly')}
            disabled={!SubscriptionService.canPerformReading()}
          >
            Предсказание на неделю
          </ReadingButton>
          <ReadingButton 
            onClick={() => handleReading('yesno')}
            disabled={!SubscriptionService.canPerformReading()}
          >
            Да или Нет
          </ReadingButton>
        </ReadingOptions>
      )}
    </AppContainer>
  );
}

export default App; 