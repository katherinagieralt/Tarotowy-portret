const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'node_modules', 'tarot-card-img', 'major');
const destDir = path.join(__dirname, 'public', 'arkana');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Mapping my app's card number to Rider-Waite 'tarot-card-img' file name
const map = {
  22: '0m.jpg',
  1: '1m.jpg',
  2: '2m.jpg',
  3: '3m.jpg',
  4: '4m.jpg',
  5: '5m.jpg',
  6: '6m.jpg',
  7: '7m.jpg',
  8: '11m.jpg', // Sprawiedliwość (My App) -> Justice is 11 in Rider Waite
  9: '9m.jpg',
  10: '10m.jpg',
  11: '8m.jpg', // Siła (My App) -> Strength is 8 in Rider Waite
  12: '12m.jpg',
  13: '13m.jpg',
  14: '14m.jpg',
  15: '15m.jpg',
  16: '16m.jpg',
  17: '17m.jpg',
  18: '18m.jpg',
  19: '19m.jpg',
  20: '20m.jpg',
  21: '21m.jpg'
};

for (const [appNum, sourceFile] of Object.entries(map)) {
  const srcFile = path.join(srcDir, sourceFile);
  const destFile = path.join(destDir, `${appNum}.jpg`);
  
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${sourceFile} to ${appNum}.jpg`);
  } else {
    console.error(`Source file not found: ${srcFile}`);
  }
}
