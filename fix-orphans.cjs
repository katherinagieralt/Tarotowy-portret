const fs = require('fs');
const path = require('path');

const dir = 'content/arkany';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

// A regular expression that matches single Polish orphans: a, i, o, u, w, z
// It looks for a word boundary or space before, then the letter, then space(s).
const regex = /(?<=\s|^|>|\(|\[)(a|i|o|u|w|z|A|I|O|U|W|Z)(\s+)/g;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace letter + spaces with letter + &nbsp;
  let newContent = content.replace(regex, '$1&nbsp;');
  
  // Run it twice to catch consecutive orphans like "a w lesie" -> "a&nbsp;w&nbsp;lesie"
  newContent = newContent.replace(regex, '$1&nbsp;');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log('Fixed ' + file);
  }
});
