window.ImageMenuManager = function (entityId, screenId, creditListId) {
  this.entityId = entityId;
  this.screenId = screenId;
  this.creditListId = creditListId;
  this.active = true;
};

window.ImageMenuManager.prototype = {

  addImageAssets: function (id, link, thumbLink) {
    var picThumb = document.createElement('a-image');
    picThumb.setAttribute('class', 'image');
    picThumb.setAttribute('asset-on-demand',
        {'src': thumbLink, 'attributes': 'xid:pic-thumb-' + id + ',crossorigin:anonymous'});
    picThumb.setAttribute('geometry', {'height': 0.6, 'width': 0.6});
    picThumb.setAttribute('material', {'shader': 'flat', 'src': thumbLink});
    picThumb.setAttribute('set-image', {'on': 'click', 'target': '#image-360', 'src': link});
    picThumb.setAttribute('look-at', '[camera]');
    picThumb.setAttribute('event-set__3', {'_event': 'mouseenter', 'scale': '1.2 1.2 1'});
    picThumb.setAttribute('event-set__4', {'_event': 'mouseleave', 'scale': '1 1 1'});
    picThumb.setAttribute('border', {'size': 0.03, 'color': '#EDEDED', 'opacity': 0.6});

    document.getElementById(this.entityId).appendChild(picThumb);
  },

  cleanUpAll: function () {
    // remove images from the menu
    var menu = document.querySelector('a-entity[id=' + this.entityId + ']');
    while (menu.firstChild) {
      menu.removeChild(menu.firstChild);
    }

    // remove image assets
    var imgAssets = document.querySelectorAll('img[xid]');
    if (imgAssets) {
      for (var i = 0; i < imgAssets.length; i++) {
        imgAssets[i].parentNode.removeChild(imgAssets[i]);
      }
    }

    // remove photo credits
    var ul = document.getElementById(this.creditListId);
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    var divCredit = ul.parentElement;
    if (divCredit.style.display !== 'none') {
      divCredit.style.display = 'none';
    }

    // remove sky image
    var screen = document.querySelector('#' + this.screenId);
    screen.setAttribute('material', 'color', '#769CB4');
    screen.setAttribute('material', 'src', null);
  },

  switchOn: function () {
    this.active = true;
    var menu = document.querySelector('#' + this.entityId);
    menu.emit('activate');
  },

  switchOff: function () {
    this.active = false;
    var menu = document.querySelector('#' + this.entityId);
    menu.emit('deactivate');
  }
};
