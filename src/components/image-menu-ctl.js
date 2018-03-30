/* globals AFRAME */

/**
 * Component that activates / deactivates the image menu on click
 */
AFRAME.registerComponent('image-menu-ctl', {

  init: function () {
    var el = this.el;
    el.addEventListener('click', function () {
      if (window.imageMenuManager.active) {
        window.imageMenuManager.switchOff();
        el.setAttribute('material', 'color', 'red');
      } else {
        window.imageMenuManager.switchOn();
        el.setAttribute('material', 'color', 'green');
      }
    });
  }
});
