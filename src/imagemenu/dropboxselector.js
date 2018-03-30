/* globals Dropbox */

window.addEventListener('load', function (event) {
  var script = document.createElement('script');
  script.id = 'dropboxjs';
  script.src = '//www.dropbox.com/static/api/2/dropins.js';
  // ToDo Even if domain restriction is activated it would be best to not use the API key in the client.
  script.setAttribute('data-app-key', 'xxxxxxxxx');
  document.getElementsByTagName('head')[0].appendChild(script);
});

window.DropboxSelector = function () {
};

window.DropboxSelector.options = {
  // Required. Called when a user selects an item in the Chooser.
  success: function (files) {
    window.imageMenuManager.cleanUpAll();
    for (var i = 0; i < files.length; i++) {
      var corsThumbLink = files[i].thumbnailLink.replace('api-content.dropbox.com', 'dl.dropboxusercontent.com');
      window.imageMenuManager.addImageAssets(i, files[i].link, corsThumbLink);
    }
  },
  // Optional. Called when the user closes the dialog without selecting a file
  // and does not include any parameters.
  cancel: function () {},

  linkType: 'direct', // "direct" or "preview"
  multiselect: true,
  extensions: ['images'],
  folderselect: false
};

window.DropboxSelector.getAndDisplay = function () {
  Dropbox.choose(window.DropboxSelector.options);
};
