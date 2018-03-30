/* globals ImageMenuManager StaticSelector FileSelector */

require('./components/set-image.js');
require('./components/border.js');
require('./components/image-menu-ctl.js');
require('./imagemenu/imagemenumanager.js');
// require('./imagemenu/dropboxselector.js');
require('./imagemenu/fileselector.js');
require('./imagemenu/staticselector.js');

if (!window.imageMenuManager) {
  window.imageMenuManager = new ImageMenuManager('image-menu', 'image-360', 'photo-credit-list');
}

if (!window.fileSelector) {
  window.fileSelector = new FileSelector('files');
}

// initial images
window.addEventListener('load', function (event) {
  StaticSelector.getAndDisplay();
});
