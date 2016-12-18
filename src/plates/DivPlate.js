import AbstractPlate from './AbstractPlate.js';

class DivPlate extends AbstractPlate {
  constructor(...options) {
    super(document.createElement('div'), ...options);
  }

  _updateDimension() {
    const width = this.width();
    const height = this.height();

    this.node.style.width = `${width}px`;
    this.node.style.height = `${height}px`;

    return this;
  }
}

export default DivPlate;
