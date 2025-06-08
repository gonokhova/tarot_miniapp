import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#6B4E71',
    secondary: '#C98BB9',
    background: '#FFFFFF',
    text: '#333333',
    accent: '#F2D4AE',
    error: '#FF6B6B',
    success: '#4CAF50'
  },
  animations: {
    cardFlip: {
      duration: '0.8s',
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    fadeIn: {
      duration: '0.5s',
      timing: 'ease-in-out'
    },
    slideIn: {
      duration: '0.6s',
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#C98BB9',
    secondary: '#6B4E71',
    background: '#1A1A1A',
    text: '#FFFFFF',
    accent: '#F2D4AE',
    error: '#FF6B6B',
    success: '#4CAF50'
  },
  animations: {
    cardFlip: {
      duration: '0.8s',
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    fadeIn: {
      duration: '0.5s',
      timing: 'ease-in-out'
    },
    slideIn: {
      duration: '0.6s',
      timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
}; 