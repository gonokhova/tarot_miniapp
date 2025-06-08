import React from 'react';
import styled from 'styled-components';

interface Interpretation {
  general: string;
  cards: {
    position: number;
    meaning: string;
    advice: string;
  }[];
  summary: string;
}

interface ReadingInterpretationProps {
  interpretation: Interpretation;
  spreadType: 'single' | 'three-card' | 'celtic-cross';
}

const InterpretationContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const GeneralMeaning = styled.div`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CardsSection = styled.div`
  margin-bottom: 2rem;
`;

const CardInterpretation = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const PositionTitle = styled.h3`
  color: #3498db;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const Meaning = styled.p`
  color: #2c3e50;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const Advice = styled.p`
  color: #27ae60;
  font-style: italic;
  line-height: 1.5;
`;

const Summary = styled.div`
  background: #e8f4f8;
  border-radius: 10px;
  padding: 1.5rem;
  color: #2c3e50;
  line-height: 1.6;
`;

const ReadingInterpretation: React.FC<ReadingInterpretationProps> = ({
  interpretation,
  spreadType
}) => {
  const getPositionTitle = (position: number): string => {
    switch (spreadType) {
      case 'single':
        return 'Значение карты';
      case 'three-card':
        switch (position) {
          case 1:
            return 'Прошлое';
          case 2:
            return 'Настоящее';
          case 3:
            return 'Будущее';
          default:
            return `Позиция ${position}`;
        }
      case 'celtic-cross':
        switch (position) {
          case 1:
            return 'Текущая ситуация';
          case 2:
            return 'Вызов';
          case 3:
            return 'Сознательные мысли';
          case 4:
            return 'Подсознательные мысли';
          case 5:
            return 'Прошлое';
          case 6:
            return 'Ближайшее будущее';
          case 7:
            return 'Отношение к ситуации';
          case 8:
            return 'Внешние влияния';
          case 9:
            return 'Надежды и страхи';
          case 10:
            return 'Итоговый результат';
          default:
            return `Позиция ${position}`;
        }
      default:
        return `Позиция ${position}`;
    }
  };

  return (
    <InterpretationContainer>
      <GeneralMeaning>{interpretation.general}</GeneralMeaning>

      <CardsSection>
        {interpretation.cards.map((card) => (
          <CardInterpretation key={card.position}>
            <PositionTitle>{getPositionTitle(card.position)}</PositionTitle>
            <Meaning>{card.meaning}</Meaning>
            <Advice>{card.advice}</Advice>
          </CardInterpretation>
        ))}
      </CardsSection>

      <Summary>
        <h3>Общее значение расклада</h3>
        <p>{interpretation.summary}</p>
      </Summary>
    </InterpretationContainer>
  );
};

export default ReadingInterpretation; 