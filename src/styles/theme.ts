import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#007AFF', // iOS blue
    secondary: '#5856D6', // iOS purple
    background: '#FFFFFF',
    text: '#000000',
    accent: '#FF9500', // iOS orange
    error: '#FF3B30', // iOS red
    success: '#34C759', // iOS green
    gray: '#8E8E93', // iOS gray
    lightGray: '#F2F2F7' // iOS light gray
  },
  spacing: {
    xxs: '2px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    sizes: {
      small: '11px',
      regular: '17px',
      medium: '17px',
      large: '20px',
      xlarge: '24px'
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
      light: 300,
      semibold: 600,
    },
    lineHeights: {
      small: '1.2',
      regular: '1.4',
      medium: '1.5',
      large: '1.6',
    }
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
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)'
  },
  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    circle: '50%',
  }
}; 