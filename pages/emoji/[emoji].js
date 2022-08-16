import EmojiPage from '../../components/EmojiPage';
import fs from 'fs';
import { emojisLocalFolder, emojisPublicFolder } from '../../components/Globals';
import { getSupportedEmojis } from '..';
import emojiGroups from '../../data-by-group.json'

export default function main({ emoji, pictures, prevEmoji, nextEmoji }) {
  return <EmojiPage 
    emoji={emoji} 
    pictures={pictures} 
    prevEmoji={prevEmoji}
    nextEmoji={nextEmoji}
    />
}

export async function getStaticPaths() {
  const supportedEmojis = [];

  const files = fs.readdirSync(emojisLocalFolder, { withFileTypes: true });
  files.forEach(file => {
    if (file.isDirectory) {
      supportedEmojis.push(file.name);
    }
  });

  return {
    paths: supportedEmojis.map(emoji => ({params: {emoji: emoji}})),
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context) {
  const emoji = context.params.emoji;
  const emojiFolder = `${emojisLocalFolder}/${emoji}`;

  const supportedEmojis = getSupportedEmojis();

  const allEntries = [];
  Object.values(emojiGroups).forEach(emojis => allEntries.push(...emojis));

  const emojiIndex = allEntries.findIndex(e => e.emoji === emoji);

  let prevEmojiIndex = (allEntries.length + emojiIndex - 1) % allEntries.length;
  while (!supportedEmojis.includes(allEntries[prevEmojiIndex].emoji)) {
    prevEmojiIndex = (allEntries.length + prevEmojiIndex - 1) % allEntries.length;
  }
  let nextEmojiIndex = (allEntries.length + emojiIndex + 1) % allEntries.length;
  while (!supportedEmojis.includes(allEntries[nextEmojiIndex].emoji)) {
    nextEmojiIndex = (allEntries.length + nextEmojiIndex + 1) % allEntries.length;
  }

  const pictures = [];

  const files = fs.readdirSync(emojiFolder, { withFileTypes: true });
  files.forEach(file => {
    if (file.isFile) {
      pictures.push(`${emojisPublicFolder}/${context.params.emoji}/${file.name}`);
    }
  });

  return {
    props: {
      emoji,
      pictures,
      prevEmoji: allEntries[prevEmojiIndex].emoji,
      nextEmoji: allEntries[nextEmojiIndex].emoji,
    }
  }
}
