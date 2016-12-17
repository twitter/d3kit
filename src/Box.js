import { deepExtend } from './helper.js';

class Box {
  static getDefaultOptions(...options) {
    return deepExtend({
      initialWidth: 720,
      initialHeight: 500,
      margin: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
      },
      offset: [0.5, 0.5],
    }, ...options);
  }

  constructor(...options) {
    const mergedOptions = deepExtend(
      this.constructor.getDefaultOptions(),
      ...options
    );

    this._state = {
      width: mergedOptions.initialWidth,
      height: mergedOptions.initialHeight,
      options: mergedOptions,
    };
  }

  copyDimension(anotherBox) {
    if (anotherBox) {
      const { width, height } = anotherBox._state;
      const { offset, margin } = anotherBox._state.options;

      deepExtend(this._state, {
        width,
        height,
        options: {
          offset: offset.concat(),
          margin,
        },
      });
    }
  }
}

export default Box;
