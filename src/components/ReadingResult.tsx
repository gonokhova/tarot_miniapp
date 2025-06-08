import React from 'react';
import styled from 'styled-components';
import { Card } from '../types/tarot';
import { TarotService } from '../services/tarotService';

interface ReadingResultProps {
  cards: Card[];
  type: 'daily' | 'weekly' | 'yesno';
  question?: string;
}

const ResultContainer = styled.div`
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

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CardImage = styled.img`
  width: 200px;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  transform: ${props => props.isReversed ? 'rotate(180deg)' : 'none'};
`;

const CardName = styled.h3`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;

const CardMeaning = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
  max-width: 300px;
`;

const YesNoAnswer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin: 1rem 0;
`;

const Question = styled.div`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: 1rem;
`;

const ReadingResult: React.FC<ReadingResultProps> = ({ cards, type, question }) => {
  const tarotService = TarotService.getInstance();

  return (
    <ResultContainer>
      {question && <Question>Вопрос: {question}</Question>}
      
      <CardsContainer>
        {cards.map((card, index) => (
          <CardContainer key={card.id}>
            <CardImage
              src={`/images/cards/${card.isReversed ? 'reversed' : 'upright'}/${card.image}`}
              alt={card.name}
              isReversed={card.isReversed}
            />
            <CardName>
              {card.name}
              {card.isReversed && ' (Перевернутая)'}
            </CardName>
            
            {type === 'yesno' && (
              <YesNoAnswer>
                Ответ: {tarotService.getYesNoAnswer(card)}
              </YesNoAnswer>
            )}
            
            <CardMeaning>
              {tarotService.getCardMeaning(card)}
            </CardMeaning>
          </CardContainer>
        ))}
      </CardsContainer>
    </ResultContainer>
  );
};

export default ReadingResult; 