export function generateBubbles() {
  const array = [];
  for(let i=0;i<100;i++){
    array.push({
      x: Math.random()*100,
      y: Math.random()*100,
      r: Math.random()*5+3
    });
  }
  return array;
}