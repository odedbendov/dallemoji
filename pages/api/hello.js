// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import { emojisLocalFolder } from '../../components/Globals';

export default function handler(req, res) {
  try {
    const files = fs.readdirSync(emojisLocalFolder, { withFileTypes: true });
    res.status(200).json({ name: files.map(f => f.name) })
  }
  catch (err) {
    res.status(400).json({ error: `${err}` })  
  }
}
