import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme } from './styles/theme';
import { Card, ReadingType } from './types/tarot';
import { tarotService } from './services/tarotService';
import WebApp from '@twa-dev/sdk';
import { ReadingComponent } from './components/Reading';
import { DisclaimerModal } from './components/DisclaimerModal';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ReadingOptions } from './components/ReadingOptions';
import { Header } from './components/Header';
import { Title } from './components/Title';
import { SoundControl } from './components/SoundControl';

type View = 'reading';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.typography.fontFamily};
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.sizes.regular};
  font-weight: ${props => props.theme.typography.weights.medium};
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.small};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${props => props.theme.shadows.small};
  }

  &:disabled {
    background: ${props => props.theme.colors.gray};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  width: 100%;
  max-width: 600px;
`;

const NavButton = styled(Button)<{ isActive: boolean }>`
  background: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.secondary};
  width: 100%;
`;

const BackButton = styled(Button)`
  background: ${props => props.theme.colors.error};
  margin-bottom: ${props => props.theme.spacing.lg};

  &:hover {
    background: ${props => props.theme.colors.error};
  }
`;

const App: React.FC = () => {
  const [currentReading, setCurrentReading] = useState<Card[]>([]);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [currentView, setCurrentView] = useState<View>('reading');
  const [selectedType, setSelectedType] = useState<ReadingType>('daily');

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();

    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
    if (hasSeenDisclaimer) {
      setShowDisclaimer(false);
    }
  }, []);

  const handleDisclaimerClose = () => {
    setShowDisclaimer(false);
    localStorage.setItem('hasSeenDisclaimer', 'true');
  };

  const canDoReading = (type: ReadingType): boolean => {
    if (!WebApp.initDataUnsafe.user?.id) {
      // For testing outside Telegram or if user ID is not available
      return true;
    }

    const userId = WebApp.initDataUnsafe.user.id;
    const lastReading = localStorage.getItem(`${type}_${userId}`);

    if (!lastReading) return true;

    const lastDate = new Date(lastReading);
    const now = new Date();

    if (type === 'daily') {
      return lastDate.getDate() !== now.getDate() ||
             lastDate.getMonth() !== now.getMonth() ||
             lastDate.getFullYear() !== now.getFullYear();
    }
    if (type === 'weekly') {
      const startOfWeekLast = new Date(lastDate);
      startOfWeekLast.setDate(lastDate.getDate() - lastDate.getDay()); // Sunday
      startOfWeekLast.setHours(0, 0, 0, 0);

      const startOfWeekNow = new Date(now);
      startOfWeekNow.setDate(now.getDate() - now.getDay()); // Sunday
      startOfWeekNow.setHours(0, 0, 0, 0);

      return startOfWeekLast.getTime() !== startOfWeekNow.getTime();
    }
    return true; // No limit for 'yesno' type
  };

  const handleReading = (type: ReadingType) => {
    if (!canDoReading(type)) {
      let message = '';
      if (type === 'daily') {
        message = 'Вы уже получали карту дня сегодня! Пожалуйста, попробуйте завтра.';
      } else if (type === 'weekly') {
        message = 'Вы уже делали недельный расклад на этой неделе! Пожалуйста, попробуйте на следующей.';
      } else {
        message = 'Пожалуйста, подождите, прежде чем делать следующий расклад.';
      }
      WebApp.showAlert(message);
      return;
    }

    const reading = tarotService.createReading(type);
    setCurrentReading(reading.cards);
    if (WebApp.initDataUnsafe.user?.id) {
      localStorage.setItem(`${type}_${WebApp.initDataUnsafe.user.id}`, new Date().toISOString());
    }
  };

  const handleBack = () => {
    setCurrentReading([]);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <AppContainer>
        <AnimatedBackground />
        <Header>
          <Title title="Таро Предсказания" />
          <Controls>
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
        </Navigation>

        {currentView === 'reading' && currentReading.length > 0 ? (
          <>
            <BackButton onClick={handleBack}>← Назад</BackButton>
            <ReadingComponent
              reading={currentReading}
              onClose={handleBack}
            />
          </>
        ) : (
          <>
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