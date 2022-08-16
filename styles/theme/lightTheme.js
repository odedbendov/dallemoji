import { createTheme } from '@mui/material/styles';

export const baseTheme = {
  typography: {
    fontFamily: [
      'Montserrat',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  ...baseTheme
});

export default lightTheme;