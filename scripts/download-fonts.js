import fs from 'fs';

async function download(url, dest) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)'
    }
  });
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`Downloaded ${dest}`);
}

async function main() {
  const cssResponseForTtf = await fetch('https://fonts.googleapis.com/css?family=Cinzel:400,700&subset=latin-ext', {
    headers: {
      'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)' // IE8 gets TTF!
    }
  });

  const css = await cssResponseForTtf.text();
  
  const urlMatches = css.match(/url\((https:\/\/[^)]+)\)/g);
  if (urlMatches && urlMatches.length >= 2) {
    // first url is regular, second is bold
    const regularUrl = urlMatches[0].slice(4, -1);
    const boldUrl = urlMatches[1].slice(4, -1);
    
    await download(regularUrl, 'public/fonts/Cinzel-Regular.ttf');
    await download(boldUrl, 'public/fonts/Cinzel-Bold.ttf');
  } else {
    console.log("Could not find URLs in CSS:", css);
  }
}

main().catch(console.error);
