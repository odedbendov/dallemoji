const testFolder = '.';
const fs = require('fs');

let newEmojis = 0;

fs.readdirSync(testFolder).forEach(file => {

  if (!fs.statSync(file).isDirectory()) {
    if (file.startsWith("DALL")) {
      console.log(file);

      var myRegexp = / - (.+).png$/g;
      var match = myRegexp.exec(file);

      
      if (match) {
        const fileEmoji = match[1];

        if (!fs.existsSync(fileEmoji)) {
          fs.mkdirSync(fileEmoji);
          newEmojis += 1;
        }

        fs.renameSync(file, `./${fileEmoji}/${file}`);
      }
    }
  }

});

console.log(`${newEmojis} emojis added`);