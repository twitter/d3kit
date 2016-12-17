import { select } from 'd3-selection';

class CanvasPlate {
  constructor(chart) {
    this.chart = chart;
    this.node = document.createElement('canvas');
    this.selection = select(this.node);
  }

  getNode() {
    return this.node;
  }

  getSelection() {
    return this.selection;
  }

  getContext2d() {
    const { pixelRatio = window.devicePixelRatio, margin, offset } = this.chart.options();
    const [x, y] = offset;
    const ctx = this.node.getContext('2d');
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.translate(
      margin.left + x,
      margin.top + y
    );
    return ctx;
  }

  clear() {
    const { pixelRatio = window.devicePixelRatio } = this.options();
    const ctx = this.node.getContext('2d');
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.clearRect(0, 0, this.chart.width(), this.chart.height());
    return this;
  }

  updateDimension() {
    const { width, height } = this.chart._state;
    const { pixelRatio = window.devicePixelRatio } = this.chart.options();

    this.node.setAttribute('width', width * pixelRatio);
    this.node.setAttribute('height', height * pixelRatio);
    this.node.style.width = `${width}px`;
    this.node.style.height = `${height}px`;

    return this;
  }
}

export default CanvasPlate;
