import React from 'react';
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
  margin: ${props => props.theme.spacing.md};
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
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md};
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 70%;
  object-fit: contain;
  margin-bottom: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const CardName = styled.h3`
  margin: 0;
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.sizes.large};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CardDescription = styled.p`
  margin: ${props => props.theme.spacing.sm} 0;
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.sizes.regular};
  font-weight: ${props => props.theme.typography.weights.regular};
  color: ${props => props.theme.colors.text};
  text-align: center;
  line-height: 1.4;
`;

const KeywordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  justify-content: center;
  margin-top: ${props => props.theme.spacing.md};
`;

const Keyword = styled.span`
  background: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.sizes.small};
  font-weight: ${props => props.theme.typography.weights.medium};
`;

export const TarotCard: React.FC<TarotCardProps> = ({ card, isRevealed, isReversed, onClick }) => {
  const imagePath = `/images/cards/${isReversed ? 'reversed' : 'upright'}/${card.image}`;
  
  return (
    <CardContainer isRevealed={isRevealed} isReversed={isReversed}>
      <CardInner isRevealed={isRevealed} onClick={onClick}>
        <CardFront />
        <CardBack>
          <CardImage src={imagePath} alt={card.name} />
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