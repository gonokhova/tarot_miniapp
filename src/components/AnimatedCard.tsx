import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../types/tarot';

const CardContainer = styled.div<{ isFlipped: boolean }>`
  width: 200px;
  height: 350px;
  perspective: 1000px;
  cursor: pointer;
  margin: 1rem;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardFace = styled.div<{ isBack?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.isBack ? '#2c3e50' : '#fff'};
  transform: ${props => props.isBack ? 'rotateY(180deg)' : 'rotateY(0)'};
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardName = styled.h3`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  margin: 0;
  text-align: center;
  font-size: 1.2rem;
`;

interface AnimatedCardProps {
  card: Card;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ card, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(true);
    if (onClick) {
      onClick();
    }
  };

  return (
    <CardContainer isFlipped={isFlipped} onClick={handleClick}>
      <CardFace>
        <CardImage src="/images/card-back.jpg" alt="Card Back" />
      </CardFace>
      <CardFace isBack>
        <CardImage 
          src={`/images/cards/${card.isReversed ? 'reversed' : 'upright'}/${card.name.toLowerCase()}.jpg`} 
          alt={card.name} 
        />
        <CardName>{card.name}</CardName>
      </CardFace>
    </CardContainer>
  );
}; 