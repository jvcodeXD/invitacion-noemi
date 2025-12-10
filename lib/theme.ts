import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6b1b3d', // Borgoña/vino oscuro
      light: '#8b2350',
      dark: '#4a1229',
    },
    secondary: {
      main: '#c9a961', // Dorado elegante
      light: '#d4b67a',
      dark: '#a88844',
    },
    background: {
      default: '#f5f3f0',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c2421',
      secondary: '#6b1b3d',
    },
  },
  typography: {
    fontFamily: "'Lato', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});
