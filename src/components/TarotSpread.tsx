import React, { useState } from 'react';
import styled from 'styled-components';
import TarotCard from './TarotCard';
import ReadingInterpretation from './ReadingInterpretation';
import { Card } from '../types/tarot';
import { ReadingInterpretationService } from '../services/ReadingInterpretationService';

interface TarotSpreadProps {
  cards: Card[];
  onCardReveal?: (index: number) => void;
  spreadType: 'single' | 'three-card' | 'celtic-cross';
}

const SpreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  min-height: 400px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const SpreadTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const CardPosition = styled.div<{ position: number }>`
  position: relative;
  ${props => {
    switch (props.position) {
      case 1:
        return 'transform: translateY(-50px);';
      case 2:
        return 'transform: translateY(50px);';
      case 3:
        return 'transform: translateY(0);';
      default:
        return '';
    }
  }}
`;

const TarotSpread: React.FC<TarotSpreadProps> = ({ cards, onCardReveal, spreadType }) => {
  const [revealedCards, setRevealedCards] = useState<boolean[]>(new Array(cards.length).fill(false));
  const [reversedCards, setReversedCards] = useState<boolean[]>(
    cards.map(() => Math.random() > 0.5)
  );
  const [interpretation, setInterpretation] = useState<any>(null);
  const interpretationService = ReadingInterpretationService.getInstance();

  const handleCardClick = (index: number) => {
    if (!revealedCards[index]) {
      const newRevealedCards = [...revealedCards];
      newRevealedCards[index] = true;
      setRevealedCards(newRevealedCards);
      onCardReveal?.(index);

      // Если все карты открыты, генерируем интерпретацию
      if (newRevealedCards.every(revealed => revealed)) {
        let newInterpretation;
        switch (spreadType) {
          case 'single':
            newInterpretation = interpretationService.interpretSingleCard(cards[0], reversedCards[0]);
            break;
          case 'three-card':
            newInterpretation = interpretationService.interpretThreeCards(cards, reversedCards);
            break;
          case 'celtic-cross':
            newInterpretation = interpretationService.interpretCelticCross(cards, reversedCards);
            break;
        }
        setInterpretation(newInterpretation);
      }
    }
  };

  const getSpreadTitle = () => {
    switch (spreadType) {
      case 'single':
        return 'Одна карта';
      case 'three-card':
        return 'Расклад из трех карт';
      case 'celtic-cross':
        return 'Кельтский крест';
      default:
        return 'Расклад Таро';
    }
  };

  return (
    <SpreadContainer>
      <SpreadTitle>{getSpreadTitle()}</SpreadTitle>
      <CardsContainer>
        {cards.map((card, index) => (
          <CardPosition key={index} position={index + 1}>
            <TarotCard
              card={card}
              isRevealed={revealedCards[index]}
              isReversed={reversedCards[index]}
              onClick={() => handleCardClick(index)}
            />
          </CardPosition>
        ))}
      </CardsContainer>
      {interpretation && (
        <ReadingInterpretation
          interpretation={interpretation}
          spreadType={spreadType}
        />
      )}
    </SpreadContainer>
  );
};

export default TarotSpread; 