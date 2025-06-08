import React from 'react';
import styled from 'styled-components';

const InfoContainer = styled.div`
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  margin: 1rem 0;
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  margin: 0.5rem 0;
`;

interface SubscriptionInfoProps {
  readingsLeft: number;
}

const SubscriptionInfo: React.FC<SubscriptionInfoProps> = ({ readingsLeft }) => {
  return (
    <InfoContainer>
      <InfoText>
        Осталось гаданий: {readingsLeft}
      </InfoText>
      {readingsLeft === 0 && (
        <InfoText>
          Для продолжения работы приложения необходимо приобрести подписку
        </InfoText>
      )}
    </InfoContainer>
  );
};

export default SubscriptionInfo; 