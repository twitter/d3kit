import AbstractPlate from './AbstractPlate.js';

class CanvasPlate extends AbstractPlate {
  constructor() {
    super(document.createElement('canvas'));
    this._state.options.pixelRatio = window.devicePixelRatio;
  }

  getContext2d() {
    const { pixelRatio = window.devicePixelRatio, margin, offset } = this._state.options;
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
    const { pixelRatio } = this._state.options;
    const ctx = this.node.getContext('2d');
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.clearRect(0, 0, this._state.width, this._state.height);
    return this;
  }

  updateDimension(parentPlate) {
    super.updateDimension(parentPlate);
    if (parentPlate) {
      this._state.options.pixelRatio = parentPlate._state.options.pixelRatio || window.devicePixelRatio;
    }

    const { width, height } = this._state;
    const { pixelRatio } = this._state.options;

    this.node.setAttribute('width', width * pixelRatio);
    this.node.setAttribute('height', height * pixelRatio);
    this.node.style.width = `${width}px`;
    this.node.style.height = `${height}px`;

    return this;
  }
}

export default CanvasPlate;
