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
