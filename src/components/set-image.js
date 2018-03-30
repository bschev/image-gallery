/* globals AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 1500}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
       // Remove color and old image.
      data.target.setAttribute('material', 'color', null);
      data.target.setAttribute('material', 'src', null);
       // Set new image.
      data.target.setAttribute('material', 'src', data.src);
       // Make image transparent.
      data.target.setAttribute('material', 'opacity', 0);
       // Fade out image.
      data.target.emit('set-image-fade');
    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.opacity',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '0.0',
      to: '1.0'
    });
  }
});
