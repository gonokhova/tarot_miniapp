import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

interface ReadingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ReadingButton: React.FC<ReadingButtonProps> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  );
};

export default ReadingButton; 