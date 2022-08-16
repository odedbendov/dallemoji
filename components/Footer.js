
import Link from 'next/link';
import { Grid, IconButton, Typography, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ColorModeContext } from '../pages/_app';

export default function Footer({ }) {

  const colorMode = useContext(ColorModeContext);

  return (
    <footer>
      <Grid container justifyContent="space-between" alignItems="center" 
      style={{ 
        color: colorMode.currentMode() === 'light' ? "gray" : "lightgray",
        marginBottom: 16
      }}>
        <Grid item>
          <Typography >
            <Link href="https://twitter.com/odedbendov">
              @odedbendov
            </Link>
          </Typography>
        </Grid>

        <Grid item>
          <Typography>
            {`Copyright © ${new Date().getFullYear()}`}
          </Typography>
        </Grid>
      </Grid >
    </footer>
  );
}
