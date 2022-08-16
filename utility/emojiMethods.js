import emojiGroups from '../data-by-group.json'

export function getEmojiEntryByEmoji(emoji) {
  for (const group of Object.keys(emojiGroups)) {
    const emojis = emojiGroups[group];
    for (const emojiEntry of emojis) {
      if (emojiEntry.emoji === emoji) {
        return emojiEntry;
      }
    }
  }

  return null;
}

export function getEmojiNameByEmoji(emoji) {
  const emojiEntry = getEmojiEntryByEmoji(emoji);
  return emojiEntry && emojiEntry.name;
}