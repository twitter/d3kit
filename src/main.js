import SvgExample from './SvgExample.js';
import CanvasExample from './CanvasExample.js';
import HybridExample from './HybridExample.js';
import { generateBubbles } from './util.js';

//---------------------------------------------------
// Generate random data
//---------------------------------------------------
const bubbles = generateBubbles();
const info = document.querySelector('#info');

//---------------------------------------------------
// Use the bubble chart
//---------------------------------------------------

const options = {
  margin: { top: 20, left: 30, right: 30, bottom: 40 },
  initialWidth: 300,
  initialHeight: 200,
};
const fitOptions = {
  width: '100%',
  height: 200
};
const charts = [
  new SvgExample('#chart', options)
    .data(bubbles)
    .on('bubbleClick', d => { info.innerHTML = (JSON.stringify(d)); })
    .fit(fitOptions, true),
  new CanvasExample('#chart2', options)
    .data(bubbles)
    .fit(fitOptions, true),
  new HybridExample('#chart3', options)
    .data(bubbles)
    .fit(fitOptions, true)
];

//---------------------------------------------------
// Buttons
//---------------------------------------------------
document.querySelector('#data-btn')
  .addEventListener('click', () => {
    const newData = generateBubbles();
    charts.forEach(chart => {
      chart.data(newData);
    });
  });

document.querySelector('#fit-btn')
  .addEventListener('click', () => {
    charts.forEach(chart => {
      chart.fit(fitOptions);
    });
  });

let i = 1;
document.querySelector('#resize-btn')
  .addEventListener('click', () => {
    charts.forEach(chart => {
      chart.dimension([200 * i, 100 * i]);
    });
    i = i===1 ? 2 : 1;
  });

