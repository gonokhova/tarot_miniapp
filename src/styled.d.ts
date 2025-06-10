import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      accent: string;
      error: string;
      success: string;
      gray: string;
      lightGray: string;
    };
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    typography: {
      fontFamily: string;
      sizes: {
        small: string;
        regular: string;
        medium: string;
        large: string;
        xlarge: string;
      };
      weights: {
        light: number;
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      lineHeights: {
        small: string;
        regular: string;
        medium: string;
        large: string;
      };
    };
    animations: {
      cardFlip: {
        duration: string;
        timing: string;
      };
      fadeIn: {
        duration: string;
        timing: string;
      };
      slideIn: {
        duration: string;
        timing: string;
      };
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      circle: string;
    };
  }
} 