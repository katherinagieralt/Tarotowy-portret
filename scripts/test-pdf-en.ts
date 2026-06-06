import { renderToBuffer } from '@react-pdf/renderer';
import { TarotReportTemplate } from '@/components/TarotReportTemplate';
import React from 'react';
import { calculateIndividualPortrait } from '@/lib/tarotCalculations';
import { generatePersonalizedSummary } from '@/lib/generateSummary';

async function testPdf() {
  const date = new Date('1990-01-01');
  const portrait = calculateIndividualPortrait(date, 'en');
  const cardsArray = Object.values(portrait.detailedCards);
  console.log('Got cards array length', cardsArray.length);
  
  // mock generateSummary
  const summary = 'Test summary EN';

  const props = {
    email: 'test@example.com',
    name: 'Test',
    date1: date,
    reportType: 'INDIVIDUAL' as const,
    aiSummary: summary,
    pageNumbers: {},
    locale: 'en'
  };

  try {
    const buffer = await renderToBuffer(React.createElement(TarotReportTemplate, props) as any);
    console.log('Success, generated buffer of size', buffer.length);
  } catch(e) {
    console.error('Render error:', e);
  }
}
testPdf();
