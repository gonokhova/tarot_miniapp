import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  border-bottom: 2px solid ${props => props.theme.colors.primary};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  margin: 0;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Таро Гадание</Title>
    </HeaderContainer>
  );
};

export default Header; 