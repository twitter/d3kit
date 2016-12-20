import AbstractPlate from './AbstractPlate.js';

class CanvasPlate extends AbstractPlate {
  constructor(...options) {
    super(document.createElement('canvas'), ...options);
  }

  getContext2d() {
    const width = this.width();
    const height = this.height();
    const pixelRatio = this.pixelRatio();
    const { top, left } = this.margin();
    const [x, y] = this.offset();

    const ctx = this.node.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.translate(left + x, top + y);
    return ctx;
  }

  clear() {
    const width = this.width();
    const height = this.height();
    const pixelRatio = this.pixelRatio();

    const ctx = this.node.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.clearRect(0, 0, width, height);
    return this;
  }

  _updateDimension() {
    const width = this.width();
    const height = this.height();
    const pixelRatio = this.pixelRatio();

    this.node.setAttribute('width', width * pixelRatio);
    this.node.setAttribute('height', height * pixelRatio);
    this.node.style.width = `${width}px`;
    this.node.style.height = `${height}px`;

    return this;
  }
}

export default CanvasPlate;
