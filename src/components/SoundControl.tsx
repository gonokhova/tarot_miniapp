import React from 'react';
import styled from 'styled-components';
import { soundService } from '../services/soundService';

const ControlContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

export const SoundControl: React.FC = () => {
  const [isMuted, setIsMuted] = React.useState(soundService.isSoundMuted());

  const toggleMute = () => {
    soundService.toggleMute();
    setIsMuted(soundService.isSoundMuted());
  };

  return (
    <ControlContainer>
      <Button onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
        <img 
          src={isMuted ? '/images/icons/sound-off.svg' : '/images/icons/sound-on.svg'} 
          alt={isMuted ? 'Unmute' : 'Mute'} 
        />
      </Button>
    </ControlContainer>
  );
}; 