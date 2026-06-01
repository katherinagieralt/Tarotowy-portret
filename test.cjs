const https = require('https');
https.get('https://getarcheya.com/kontakt', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const matches = data.match(/src=\"([^\"]+\.js)\"/g);
    if (matches) {
      matches.forEach(m => {
        const jsUrl = 'https://getarcheya.com' + m.split('"')[1];
        https.get(jsUrl, (r) => {
          let jsData = '';
          r.on('data', jd => jsData += jd);
          r.on('end', () => {
            if (jsData.includes('0x4A')) {
              console.log('FOUND TURNSTILE KEY IN ' + jsUrl);
              const idx = jsData.indexOf('0x4A');
              console.log(jsData.substring(idx - 20, idx + 50));
            } else if (jsData.includes('1x000')) {
              console.log('FOUND DUMMY KEY IN ' + jsUrl);
            }
          });
        });
      });
    }
  });
});
