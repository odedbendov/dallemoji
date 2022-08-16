import { createTheme } from '@mui/material/styles';
import { baseTheme } from './lightTheme';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  ...baseTheme,
});

export default darkTheme;