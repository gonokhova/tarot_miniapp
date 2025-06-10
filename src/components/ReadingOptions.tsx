import React from 'react';
import styled from 'styled-components';
import { ReadingType } from '../types/tarot';

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.xl} 0;
  padding: 0 ${props => props.theme.spacing.md};
  max-width: 600px;
  width: 100%;
`;

const OptionButton = styled.button<{ isActive: boolean }>`
  padding: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => props.theme.typography.sizes.regular};
  font-weight: ${props => props.theme.typography.weights.medium};
  background: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => props.isActive ? props.theme.colors.background : props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.small};

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.background};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${props => props.theme.shadows.small};
  }
`;

interface ReadingOptionsProps {
  selectedType: ReadingType;
  onTypeSelect: (type: ReadingType) => void;
  onReadingStart: (type: ReadingType) => void;
}

export const ReadingOptions: React.FC<ReadingOptionsProps> = ({ selectedType, onTypeSelect, onReadingStart }) => {
  return (
    <OptionsContainer>
      <OptionButton 
        isActive={selectedType === 'yesno'}
        onClick={() => {
          onTypeSelect('yesno');
          onReadingStart('yesno');
        }}
      >
        Да/Нет
      </OptionButton>
      <OptionButton 
        isActive={selectedType === 'daily'}
        onClick={() => {
          onTypeSelect('daily');
          onReadingStart('daily');
        }}
      >
        На день
      </OptionButton>
      <OptionButton 
        isActive={selectedType === 'weekly'}
        onClick={() => {
          onTypeSelect('weekly');
          onReadingStart('weekly');
        }}
      >
        На неделю
      </OptionButton>
    </OptionsContainer>
  );
}; 