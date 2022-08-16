
import Link from 'next/link';
import { Grid, IconButton, Typography, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useContext } from 'react';
import { ColorModeContext } from '../pages/_app';
import { websiteTitle } from './Globals';
import { useRouter } from 'next/router';

export default function TopBanner({ showBack, showTitle }) {

  const theme = useTheme();

  const router = useRouter();

  const colorMode = useContext(ColorModeContext);

  return (
    <Grid container direction="column">
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item container style={{ width: "auto" }} spacing={2}>
          {showBack ?
            <Grid item>
              <Typography onClick={(e) => {
                router.back();
                e.stopPropagation();
              }}
              style={{
                cursor: "pointer"
              }}>
                Back
              </Typography>
            </Grid>
            :
            ""}
          <Grid item>
            <Typography style={{ color: colorMode.currentMode() === 'light' ? "gray" : "lightgray" }}>
              <Link href="https://twitter.com/odedbendov">
                @odedbendov
              </Link>
            </Typography>
          </Grid>
        </Grid>

        <Grid item>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Grid>
      </Grid>
      {showTitle ?
        <Grid item container justifyContent={"center"} style={{ marginBottom: 16 }}>
          <Grid item>
            <Typography style={{ fontWeight: 500, fontSize: 32 }}>
              <Link href="/">
                {websiteTitle}
              </Link>
            </Typography>
          </Grid>
        </Grid>
        :
        ""}
    </Grid>
  );
}
