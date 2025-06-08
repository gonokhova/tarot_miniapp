import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { Card, Reading, ReadingType } from './types/tarot';
import { tarotService } from './services/tarotService';
import { historyService } from './services/historyService';
import { subscriptionService } from './services/subscriptionService';
import { soundService } from './services/soundService';
import WebApp from '@twa-dev/sdk';
import { SUBSCRIPTION_LIMITS } from './types/tarot';
import { ReadingComponent } from './components/Reading';
import { ReadingResult } from './components/ReadingResult';
import { DisclaimerModal } from './components/DisclaimerModal';
import { HistoryView } from './components/HistoryView';
import { TarotCard } from './components/TarotCard';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AnimatedCard } from './components/AnimatedCard';
import { ReadingButton } from './components/ReadingButton';
import { ReadingOptions } from './components/ReadingOptions';
import { SubscriptionInfo } from './components/SubscriptionInfo';
import { Header } from './components/Header';
import { Title } from './components/Title';
import { SoundControl } from './components/SoundControl';
import { ThemeToggle } from './components/ThemeToggle';

type View = 'reading' | 'history' | 'result';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const Subtitle = styled.p`
  color: #34495e;
  font-size: 1.2rem;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #2980b9;
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const ReadingTypeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ReadingTypeButton = styled(Button)<{ active: boolean }>`
  background: ${props => props.active ? '#2ecc71' : '#3498db'};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const NavButton = styled(Button)<{ isActive: boolean }>`
  background: ${props => props.isActive ? '#2ecc71' : '#3498db'};
`;

const BackButton = styled(Button)`
  background: #e74c3c;

  &:hover {
    background: #c0392b;
  }
`;

const ShareButton = styled(Button)`
  background: #2ecc71;

  &:hover {
    background: #27ae60;
  }
`;

const QuestionInput = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
`;

const App: React.FC = () => {
  const [currentReading, setCurrentReading] = useState<Card[]>([]);
  const [readingsLeft, setReadingsLeft] = useState<number>(SUBSCRIPTION_LIMITS.FREE_DAILY_READINGS);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [currentView, setCurrentView] = useState<View>('reading');
  const [selectedType, setSelectedType] = useState<ReadingType>('daily');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    setReadingsLeft(subscriptionService.getReadingsLeft());

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
    if (!subscriptionService.canPerformReading()) {
      const purchased = await subscriptionService.purchaseSubscription();
      if (!purchased) return;
      setReadingsLeft(subscriptionService.getReadingsLeft());
    }

    const reading = tarotService.createReading(type);
    setCurrentReading(reading.cards);
    historyService.addToHistory(reading);
    subscriptionService.decrementReadingsLeft();
    setReadingsLeft(subscriptionService.getReadingsLeft());
  };

  const handleBack = () => {
    setCurrentReading([]);
  };

  const handlePurchaseSubscription = async () => {
    const purchased = await subscriptionService.purchaseSubscription();
    if (purchased) {
      setReadingsLeft(subscriptionService.getReadingsLeft());
    }
  };

  const handleShare = () => {
    if (currentReading.length) {
      const shareText = `🔮 Таро Предсказание\n\n` +
        `Тип: ${selectedType}\n` +
        `Карты:\n${currentReading.map(card => 
          `${card.name}${card.isReversed ? ' (Перевернутая)' : ''}`
        ).join('\n')}\n\n` +
        `Толкование:\n${currentReading.map(card => 
          `${card.name}: ${card.isReversed ? card.reversedDescription : card.description}`
        ).join('\n')}`;

      WebApp.share(shareText);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <AppContainer>
        <AnimatedBackground />
        <Header>
          <Title>Таро Предсказания</Title>
          <Controls>
            <ThemeToggle isDark={isDarkTheme} onToggle={toggleTheme} />
            <SoundControl />
          </Controls>
        </Header>

        {showDisclaimer && (
          <DisclaimerModal onClose={handleDisclaimerClose} />
        )}

        <Navigation>
          <NavButton 
            isActive={currentView === 'reading'} 
            onClick={() => setCurrentView('reading')}
          >
            Предсказание
          </NavButton>
          <NavButton 
            isActive={currentView === 'history'} 
            onClick={() => setCurrentView('history')}
          >
            История
          </NavButton>
        </Navigation>

        {currentView === 'history' ? (
          <HistoryView />
        ) : currentReading.length > 0 ? (
          <>
            <BackButton onClick={handleBack}>← Назад</BackButton>
            <ReadingComponent
              reading={currentReading}
              onClose={handleBack}
            />
            <ShareButton onClick={handleShare}>
              Поделиться предсказанием
            </ShareButton>
          </>
        ) : (
          <>
            <SubscriptionInfo readingsLeft={readingsLeft} />
            <ReadingOptions
              selectedType={selectedType}
              onTypeSelect={setSelectedType}
              onReadingStart={handleReading}
            />
          </>
        )}
      </AppContainer>
    </ThemeProvider>
  );
};

export default App; 