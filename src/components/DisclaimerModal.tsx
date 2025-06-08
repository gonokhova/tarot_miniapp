import React from 'react';
import styled from 'styled-components';
import WebApp from '@twa-dev/sdk';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  padding: 24px;
  max-width: 90%;
  width: 400px;
  color: #fff;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0 0 16px 0;
  color: #fff;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 24px 0;
  color: #ccc;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  }
`;

interface DisclaimerModalProps {
  onClose: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Важное предупреждение</Title>
        <Text>
          Данное приложение предназначено исключительно для развлекательных целей. 
          Предсказания Таро не являются научным методом и не должны использоваться 
          для принятия важных жизненных решений. Все результаты следует воспринимать 
          как игру и развлечение.
        </Text>
        <Button onClick={onClose}>
          Я понимаю
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DisclaimerModal; 