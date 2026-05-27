const fs = require('fs');
const https = require('https');
const path = require('path');

const RAW_URL = "https://raw.githubusercontent.com/krates98/tarotcardapi/main/images/";

const map = {
  1: "themagician.jpeg",
  2: "thehighpriestess.jpeg",
  3: "theempress.jpeg",
  4: "theemperor.jpeg",
  5: "thehierophant.jpeg",
  6: "TheLovers.jpg",
  7: "thechariot.jpeg",
  8: "justice.jpeg",
  9: "thehermit.jpeg",
  10: "wheeloffortune.jpeg",
  11: "thestrength.jpeg",
  12: "thehangedman.jpeg",
  13: "death.jpeg",
  14: "temperance.jpeg",
  15: "thedevil.jpeg",
  16: "thetower.jpeg",
  17: "thestar.jpeg",
  18: "themoon.jpeg",
  19: "thesun.jpeg",
  20: "judgement.jpeg",
  21: "theworld.jpeg",
  22: "thefool.jpeg"
};

const dir = path.join(__dirname, 'public', 'arkana');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download() {
  for (const [num, filename] of Object.entries(map)) {
    const url = RAW_URL + filename;
    // Download as .jpg since our app expects .jpg
    const dest = path.join(dir, `${num}.jpg`);
    
    console.log(`Downloading ${filename} -> ${num}.jpg`);
    
    await new Promise((resolve) => {
      https.get(url, (res) => {
        if (res.statusCode === 200) {
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        } else {
          console.error(`Failed: ${url} (status ${res.statusCode})`);
          resolve();
        }
      }).on('error', (e) => {
        console.error(e);
        resolve();
      });
    });
  }
  console.log("Done downloading new cards!");
}

download();
