import { renderToFile } from '@react-pdf/renderer';
import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica' }
});

const Doc = () => React.createElement(Document, null, 
  React.createElement(Page, { style: styles.page }, 
    React.createElement(Text, null, "Zażółć gęślą jaźń! ĄĆĘŁŃÓŚŹŻ")
  )
);

async function main() {
  await renderToFile(React.createElement(Doc), 'test.pdf');
  console.log("Done");
}

main().catch(console.error);
