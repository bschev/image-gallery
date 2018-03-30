/* globals AFRAME */

/**
 * Component that adds borders to a plane or image.
 */
AFRAME.registerComponent('border', {
  schema: {
    color: {type: 'color', default: 'white'},
    size: {type: 'number', default: 10},
    opacity: {type: 'number', default: 1.0}
  },

  init: function () {
    var distanceFromZeroX = this.el.getAttribute('geometry').height / 2 + (this.data.size / 2);
    var distanceFromZeroY = this.el.getAttribute('geometry').width / 2 + (this.data.size / 2);
    this.createBorder(0, distanceFromZeroY, 0);
    this.createBorder(0, -distanceFromZeroY, 0);
    this.createBorder(distanceFromZeroX, 0, 90);
    this.createBorder(-distanceFromZeroX, 0, 90);
  },

  /**
   * Create border box.
   */
  createBorder: function (posX, posY, rotZ) {
    var data = this.data;
    var el = this.el;

    var border = document.createElement('a-box');
    el.appendChild(border);

    var length = el.getAttribute('geometry').width + (data.size * 2);

    border.setAttribute('width', length);
    border.setAttribute('depth', data.size);
    border.setAttribute('height', data.size);

    border.setAttribute('material', {'shader': 'flat', 'color': data.color, 'opacity': data.opacity});
    border.setAttribute('position', {x: posX, y: posY, z: 0});
    border.setAttribute('rotation', {x: 0, y: 0, z: rotZ});
  }
});
