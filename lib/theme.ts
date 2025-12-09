import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#d97706', // amber-600
      light: '#fbbf24',
      dark: '#b45309',
    },
    secondary: {
      main: '#9333ea', // purple-600
      light: '#a855f7',
      dark: '#7e22ce',
    },
    background: {
      default: '#fef3c7',
      paper: '#ffffff',
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
