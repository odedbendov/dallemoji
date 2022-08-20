import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import emojiGroups from '../data-by-group.json'
import Link from 'next/link';
import { Collapse, Grid, styled, Tooltip, Typography } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import TopBanner from './TopBanner';
import { websiteName, websiteTitle } from './Globals';
import Footer from './Footer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GitHubIcon from '@mui/icons-material/GitHub';

const GrowingComponent = styled('div')(({ disabled }) => ({
  transition: "transform 0.2s ease",
  transform: "scale(1.0)",
  '&:hover': {
    transform: disabled ? "scale(1.0)" : "scale(1.5)",
    zIndex: 100
  }
}));


export default function HomePage({ supportedEmojis }) {

  const [openCategories, setOpenCategories] = useState([...Array(Object.keys(emojiGroups).length).keys()]);

  const totalEmojis = Object.values(emojiGroups).map(group => group.length).reduce((partialSum, a) => partialSum + a, 0);

  useEffect(() => {
    console.log(`Suppported Emojis: ${supportedEmojis.length} / ${totalEmojis}`);
  }, [supportedEmojis.length, totalEmojis]);

  function toggleCategory(categoryIndex) {
    const newOpenCategories = [...openCategories];
    if (openCategories.includes(categoryIndex)) {
      newOpenCategories.splice(newOpenCategories.indexOf(categoryIndex), 1);
    }
    else {
      newOpenCategories.push(categoryIndex);
    }

    setOpenCategories(newOpenCategories);
  }

  function renderEmojiEntry(entry, entryIndex) {
    const emojiSupported = supportedEmojis.includes(entry.emoji);

    const actualEmoji = <span style={{
      fontSize: emojiSupported ? 64 : 24,
      filter: emojiSupported ? 'none' : 'saturate(70%)',
      opacity: emojiSupported ? 1 : 0.5,
    }}>
      {entry.emoji}
    </span>;

    return (
      <Tooltip key={entryIndex}
        title={<div style={{ textAlign: "center" }}>
          {entry.name}{emojiSupported ? "" : <><br />(currently not available)</>}
        </div>}
        enterTouchDelay={1000}
        enterDelay={1000}>

        <Grid item
          style={{
            cursor: emojiSupported ? "pointer" : "default"
          }}>
          <GrowingComponent disabled={!emojiSupported}>
            {emojiSupported ?
              <Link href={emojiSupported ? `/emoji/${entry.emoji}` : "#"}>
                {actualEmoji}
              </Link>
              :
              actualEmoji
            }
          </GrowingComponent>
        </Grid>

      </Tooltip>
    );
  }

  function renderEmojiCategory(groupName, emojiEntries, groupIndex) {
    return (
      <Fragment key={groupIndex}>
        {/* Category Title */}
        <Grid item container alignItems="flex-end" style={{ marginTop: 24, width: "auto" }} spacing={1}
          onClick={() => toggleCategory(groupIndex)}>
          <Grid item>
            <Typography style={{ fontSize: 36, fontWeight: 500 }}>
              {`${groupName}`}
            </Typography>
          </Grid>
          <Grid item>
            <ChevronRightIcon style={{
              transform: `rotate(${openCategories.includes(groupIndex) ? 90 : 0}deg)`,
              transition: "transform 0.4s ease",
              fontSize: 36
            }}
            />
          </Grid>
        </Grid>

        {/* Category Emojis */}
        <Grid item>
          <Collapse in={openCategories.includes(groupIndex)}>
            <Grid container justifyContent="center" spacing={2}
              style={{ fontSize: 64, textAlign: "center" }}>
              {emojiEntries.map((entry, entryIndex) => renderEmojiEntry(entry, entryIndex))}
            </Grid>
          </Collapse>
        </Grid>
      </Fragment>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{websiteName}</title>
        <meta name="description" content="A gallery of DallE2 generations for single emoji prompts 💃🏻 🌠 🐱 🚀 🤩" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <TopBanner />

        <Typography align="center" component="h1" style={{ fontWeight: 500, fontSize: 64 }}>
          {websiteTitle}
        </Typography>

        <Typography align="center" style={{ fontWeight: 500, fontSize: 32 }}>
          Single emoji <span style={{ color: "cornflowerblue" }}><Link href="https://openai.com/dall-e-2/">#DallE2</Link></span> prompts
        </Typography>

        <Typography align="center" style={{ fontWeight: 500, fontSize: 16, color: "darkgray", marginTop: 24 }}>
          The following emojis were fed into <span style={{ textDecoration: "none" }}><Link href="https://openai.com/dall-e-2/">DallE2</Link></span> one at a time.<br />
          Click any to see resulting images
        </Typography>


        <Grid container direction="column" style={{ marginTop: 8 }} alignItems="center" spacing={1}>
          {Object.entries(emojiGroups).map(([groupName, emojiEntries], groupIndex) => renderEmojiCategory(groupName, emojiEntries, groupIndex))}
        </Grid>

        <Grid item container style={{ width: "auto", marginTop: 32 }} spacing={1} alignItems="center">
          <Grid item>
            <Typography style={{ fontSize: 24 }}>
              To contribute emojis:
            </Typography>
          </Grid>
          <Grid item>
            <a href='https://github.com/odedbendov/dallemoji'>
              <GitHubIcon style={{ fontSize: 42 }} />
            </a>
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: 24 }}>
              🙏 ❤️
            </Typography>
          </Grid>
        </Grid>

        <Typography align="center" style={{ fontWeight: 500, fontSize: 16, color: "darkgray", marginTop: 48 }}>
          Special thanks to <a href="https://twitter.com/aaronwetzler" target="_blank" rel="noreferrer">@aaronwetzler</a> and <a href="https://twitter.com/ShaiFeder" target="_blank" rel="noreferrer">@shaifeder</a><br />for believing in me and supplying credits post-ban 😂
        </Typography>
      </main>

      <Footer />

    </div>
  )
}
