/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* globals ImageMenuManager StaticSelector FileSelector */

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
// require('./imagemenu/dropboxselector.js');
__webpack_require__(5);
__webpack_require__(6);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* globals FileReader */

window.FileSelector = function (entityId) {
  window.addEventListener('load', function (event) {
    window.document.getElementById(entityId).addEventListener('change', handleFileSelect, false);
  });
};

function handleFileSelect (evt) {
  window.imageMenuManager.cleanUpAll();
  var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    console.log(f.name);
    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function (file) {
      return function (e) {
        window.imageMenuManager.addImageAssets(i, e.target.result, e.target.result);
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

window.StaticSelector = function () {
};

window.StaticSelector.getAndDisplay = function () {
  window.imageMenuManager.cleanUpAll();
  // var ul = document.getElementById('photo-credit-list'); // ToDo make id configurable
  // var divCredit = ul.parentElement;
  // divCredit.style.display = divCredit.parentElement.style.display;
  for (var i = 0; i < window.StaticSelector.images.length; i++) {
    var img = window.StaticSelector.images[i];
    window.imageMenuManager.addImageAssets(i, img.link, img.thumbLink);

    // var li = document.createElement('li');
    // li.innerHTML += img.artist + ', ' + '<a href="' + img.creditLink + '">' + img.name +
    //                   '</a> <a href="' + img.licenceLink + '">[license]</a>';
    // ul.appendChild(li);
  }
};

window.StaticSelector.images = [
  {
    artist: '',
    name: 'Scene A',
    link: 'https://ucarecdn.com/342a87b8-67e1-4188-91cd-f0c4484e9436/',
    thumbLink: 'https://ucarecdn.com/342a87b8-67e1-4188-91cd-f0c4484e9436/',
    creditLink: '',
    licenceLink: ''
  },
  {
    artist: '',
    name: 'Scene D',
    link: 'https://ucarecdn.com/b41c63d9-5d87-4808-a218-771a1a22cbd6/',
    thumbLink: 'https://ucarecdn.com/b41c63d9-5d87-4808-a218-771a1a22cbd6/',
    creditLink: '',
    licenceLink: ''
  },
  {
    artist: '',
    name: 'Scene E',
    link: 'https://ucarecdn.com/ce3689f9-5520-40ef-a657-e02ee529fdb7/',
    thumbLink: 'https://ucarecdn.com/ce3689f9-5520-40ef-a657-e02ee529fdb7/',
    creditLink: '',
    licenceLink: ''
  },
  {
    artist: '',
    name: 'Scene C',
    link: 'https://ucarecdn.com/f0005401-da6b-4b3e-9920-aa70c62aaea1/',
    thumbLink: 'https://ucarecdn.com/f0005401-da6b-4b3e-9920-aa70c62aaea1/',
    creditLink: '',
    licenceLink: ''
  }
];


/***/ })
/******/ ]);