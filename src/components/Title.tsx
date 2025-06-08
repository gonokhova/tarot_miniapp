import React from 'react';
import styled from 'styled-components';

const TitleContainer = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const MainTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 2.5rem;
  margin: 0;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin: 1rem 0;
  opacity: 0.8;
`;

interface TitleProps {
  title: string;
  subtitle?: string;
}

const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <TitleContainer>
      <MainTitle>{title}</MainTitle>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </TitleContainer>
  );
};

export default Title; 