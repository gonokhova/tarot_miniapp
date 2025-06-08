import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../types/tarot';

interface TarotCardProps {
  card: Card;
  isRevealed: boolean;
  isReversed: boolean;
  onClick?: () => void;
}

const CardContainer = styled.div<{ isRevealed: boolean; isReversed: boolean }>`
  width: 200px;
  height: 350px;
  perspective: 1000px;
  cursor: ${props => props.isRevealed ? 'default' : 'pointer'};
  transform: ${props => props.isReversed ? 'rotate(180deg)' : 'none'};
`;

const CardInner = styled.div<{ isRevealed: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${props => props.isRevealed ? 'rotateY(180deg)' : 'none'};
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: url('/images/card-back.jpg') center/cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CardBack = styled.div<{ isReversed: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background: url(${props => props.isReversed ? '/images/cards/reversed/' : '/images/cards/upright/'}${props => props.card.image}) center/cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 70%;
  object-fit: contain;
  margin-bottom: 10px;
`;

const CardName = styled.h3`
  margin: 0;
  font-size: 1.2em;
  text-align: center;
`;

const CardDescription = styled.p`
  margin: 5px 0;
  font-size: 0.9em;
  text-align: center;
`;

const KeywordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
`;

const Keyword = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const TarotCard: React.FC<TarotCardProps> = ({ card, isRevealed, isReversed, onClick }) => {
  return (
    <CardContainer isRevealed={isRevealed} isReversed={isReversed}>
      <CardInner isRevealed={isRevealed} onClick={onClick}>
        <CardFront />
        <CardBack card={card} isReversed={isReversed}>
          <CardImage src={`/images/cards/${isReversed ? 'reversed' : 'upright'}/${card.image}`} alt={card.name} />
          <CardName>{card.name}</CardName>
          <CardDescription>
            {isReversed ? card.reversedDescription : card.description}
          </CardDescription>
          <KeywordsContainer>
            {(isReversed ? card.reversedKeywords : card.keywords).map((keyword, index) => (
              <Keyword key={index}>{keyword}</Keyword>
            ))}
          </KeywordsContainer>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default TarotCard; 