import AbstractPlate from './AbstractPlate.js';

class DivPlate extends AbstractPlate {
  constructor(...options) {
    super(document.createElement('div'), ...options);
  }

  _updateDimension() {
    const width = this.width();
    const height = this.height();
    const margin = this.margin();

    this.node.style.width = `${width - margin.left - margin.right}px`;
    this.node.style.height = `${height - margin.top - margin.bottom}px`;
    this.node.style.marginLeft = `${margin.left}px`;
    this.node.style.marginRight = `${margin.right}px`;
    this.node.style.marginTop = `${margin.top}px`;
    this.node.style.marginBottom = `${margin.bottom}px`;

    return this;
  }
}

export default DivPlate;
