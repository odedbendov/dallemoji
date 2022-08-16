import fs from 'fs';
import { emojisLocalFolder } from '../components/Globals';
import HomePage from '../components/HomePage';

export default function main({ supportedEmojis }) {
  return <HomePage supportedEmojis={supportedEmojis} />
}

export async function getStaticProps(context) {

  const supportedEmojis = getSupportedEmojis();

  return {
    props: {
      supportedEmojis
    }
  }
}

export function getSupportedEmojis() {
  const supportedEmojis = [];

  const files = fs.readdirSync(emojisLocalFolder, { withFileTypes: true });
  files.forEach(file => {
    if (file.isDirectory) {
      supportedEmojis.push(file.name);
    }
  });

  return supportedEmojis;
}
