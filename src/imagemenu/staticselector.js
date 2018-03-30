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
