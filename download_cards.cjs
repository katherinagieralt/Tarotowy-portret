const https = require('https');
const fs = require('fs');

const urls = [
'upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
'upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
'upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',
'upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg',
'upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg',
'upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg',
'upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg',
'upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
'upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
'upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg',
'upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg',
'upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg',
'upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg',
'upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg',
'upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg',
'upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg',
'upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
'upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg',
'upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg',
'upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',
'upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg',
'upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg'
];

const map = {
  22: 0,
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 11, 9: 9, 10: 10, 11: 8, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20, 21: 21
};

async function download() {
  for (let i = 0; i < urls.length; i++) {
    const numberKey = Object.keys(map).find(key => map[key] === i);
    const dest = 'public/arkana/' + numberKey + '.jpg';
    
    // check if file exists and size > 1kb
    if (fs.existsSync(dest)) {
      const stats = fs.statSync(dest);
      if (stats.size > 1000) {
        console.log(`Skipping ${dest}, already downloaded.`);
        continue;
      }
    }

    const proxiedUrl = 'https://images.weserv.nl/?url=' + urls[i];
    console.log(`Downloading ${dest}...`);
    let success = false;
    let attempts = 0;
    while (!success && attempts < 5) {
      attempts++;
      success = await new Promise((resolve) => {
        const file = fs.createWriteStream(dest);
        https.get(proxiedUrl, function(response) {
          if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => { file.close(); resolve(true); });
          } else {
            console.error(`Failed to download ${proxiedUrl} (status ${response.statusCode})`);
            file.close();
            resolve(false);
          }
        }).on('error', (err) => {
          console.error(err);
          file.close();
          resolve(false);
        });
      });
      if (!success) {
        console.log("Retrying in 2 seconds...");
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    
    await new Promise(r => setTimeout(r, 500));
  }
}
download();
