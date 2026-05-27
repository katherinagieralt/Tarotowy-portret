import { renderToFile, Font } from '@react-pdf/renderer';
import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

const styles = StyleSheet.create({
  page: { fontFamily: 'Roboto' }
});

const Doc = () => React.createElement(Document, null, 
  React.createElement(Page, { style: styles.page }, 
    React.createElement(Text, null, "Zażółć gęślą jaźń! ĄĆĘŁŃÓŚŹŻ")
  )
);

async function main() {
  await renderToFile(React.createElement(Doc), 'test2.pdf');
  console.log("Done");
}

main().catch(console.error);
