import React from 'react';
import styled from 'styled-components';

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

const OptionButton = styled.button`
  padding: 1rem;
  font-size: 1.1rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

interface ReadingOptionsProps {
  onSelect: (type: string) => void;
}

const ReadingOptions: React.FC<ReadingOptionsProps> = ({ onSelect }) => {
  return (
    <OptionsContainer>
      <OptionButton onClick={() => onSelect('yesno')}>
        Да/Нет
      </OptionButton>
      <OptionButton onClick={() => onSelect('daily')}>
        На день
      </OptionButton>
      <OptionButton onClick={() => onSelect('weekly')}>
        На неделю
      </OptionButton>
    </OptionsContainer>
  );
};

export default ReadingOptions; 