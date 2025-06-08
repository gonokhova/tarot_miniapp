import React, { useState } from 'react';
import styled from 'styled-components';
import TarotCard from './TarotCard';
import { Card } from '../types/tarot';
import { TarotService } from '../services/tarotService';

interface ReadingProps {
  type: 'daily' | 'weekly' | 'yesno';
  onComplete: (reading: Card[]) => void;
}

const ReadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const QuestionInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.8rem;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Reading: React.FC<ReadingProps> = ({ type, onComplete }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [revealedCards, setRevealedCards] = useState<boolean[]>([]);
  const [question, setQuestion] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const startReading = () => {
    const tarotService = TarotService.getInstance();
    const numCards = type === 'yesno' ? 1 : type === 'daily' ? 3 : 7;
    const newCards = tarotService.getRandomCards(numCards);
    setCards(newCards);
    setRevealedCards(new Array(numCards).fill(false));
  };

  const handleCardReveal = (index: number) => {
    const newRevealedCards = [...revealedCards];
    newRevealedCards[index] = true;
    setRevealedCards(newRevealedCards);

    if (newRevealedCards.every(revealed => revealed)) {
      setIsComplete(true);
      onComplete(cards);
    }
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      startReading();
    }
  };

  return (
    <ReadingContainer>
      {type === 'yesno' && !cards.length && (
        <form onSubmit={handleQuestionSubmit}>
          <QuestionInput
            type="text"
            placeholder="Задайте ваш вопрос..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button type="submit" disabled={!question.trim()}>
            Получить ответ
          </Button>
        </form>
      )}

      {!cards.length && type !== 'yesno' && (
        <Button onClick={startReading}>
          Начать гадание
        </Button>
      )}

      <CardsContainer>
        {cards.map((card, index) => (
          <TarotCard
            key={card.id}
            card={card}
            isRevealed={revealedCards[index]}
            isReversed={card.isReversed || false}
            onClick={() => !revealedCards[index] && handleCardReveal(index)}
          />
        ))}
      </CardsContainer>

      {isComplete && (
        <Button onClick={() => {
          setCards([]);
          setRevealedCards([]);
          setQuestion('');
          setIsComplete(false);
        }}>
          Новое гадание
        </Button>
      )}
    </ReadingContainer>
  );
};

export default Reading; 