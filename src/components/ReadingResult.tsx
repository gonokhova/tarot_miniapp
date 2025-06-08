import React from 'react';
import styled from 'styled-components';
import { Reading, TarotCard } from '../types/tarot';
import { TarotService } from '../services/tarotService';

const ResultContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  margin-top: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const CardImage = styled.img`
  width: 200px;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardName = styled.h3`
  font-size: 20px;
  margin: 10px 0;
  color: #fff;
`;

const CardMeaning = styled.p`
  font-size: 16px;
  color: #ccc;
  text-align: center;
  line-height: 1.5;
  max-width: 300px;
`;

const QuestionText = styled.p`
  font-size: 18px;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  font-style: italic;
`;

const YesNoAnswer = styled.div`
  font-size: 24px;
  color: #fff;
  text-align: center;
  margin: 20px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-weight: bold;
`;

interface ReadingResultProps {
  reading: Reading;
}

const ReadingResult: React.FC<ReadingResultProps> = ({ reading }) => {
  return (
    <ResultContainer>
      {reading.question && (
        <QuestionText>Вопрос: {reading.question}</QuestionText>
      )}
      
      {reading.type === 'yesno' ? (
        <>
          {reading.cards.map((card: TarotCard, index: number) => (
            <CardContainer key={index}>
              <CardImage src={card.image} alt={card.name} />
              <CardName>{card.name}</CardName>
              <YesNoAnswer>
                Ответ: {TarotService.getYesNoAnswer(card)}
              </YesNoAnswer>
              <CardMeaning>
                {TarotService.getCardMeaning(card)}
              </CardMeaning>
            </CardContainer>
          ))}
        </>
      ) : (
        reading.cards.map((card: TarotCard, index: number) => (
          <CardContainer key={index}>
            <CardImage src={card.image} alt={card.name} />
            <CardName>{card.name}</CardName>
            <CardMeaning>
              {TarotService.getCardMeaning(card)}
            </CardMeaning>
          </CardContainer>
        ))
      )}
    </ResultContainer>
  );
};

export default ReadingResult; 