/*=========================================
 * animatedModal.js: Version 1.0
 * author: João Pereira
 * website: http://www.joaopereira.pt
 * email: joaopereirawd@gmail.com
 * Licensed MIT
=========================================*/

var animatedModal = function (target, options) {
  //Defaults
  var settings = {
    ...{
      modalTarget: target.getAttribute('href').replace('#', ''),
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndexIn: '9999',
      zIndexOut: '-9999',
      color: '#39BEB9',
      opacityIn: '1',
      opacityOut: '0',
      animatedIn: 'animate__zoomIn',
      animatedOut: 'animate__zoomOut',
      animationDuration: '.6s',
      overflow: 'auto',
      // Callbacks
      beforeOpen: function () { },
      afterOpen: function () { },
      beforeClose: function () { },
      afterClose: function () { }
    }, ...options
  };

  var closeBt = document.querySelector('.close-' + settings.modalTarget);

  //console.log(closeBt)

  var href = target.getAttribute('href'),
    id = document.querySelector('body').querySelector('#' + settings.modalTarget),
    idConc = '#' + id.getAttribute('id');
  //console.log(idConc);
  // Default Classes
  id.classList.add('animated');
  id.classList.add(settings.modalTarget + '-off');

  //Init styles
  var initStyles = {
    'position': settings.position,
    'width': settings.width,
    'height': settings.height,
    'top': settings.top,
    'left': settings.left,
    'background-color': settings.color,
    'overflow-y': settings.overflow,
    'z-index': settings.zIndexOut,
    'opacity': settings.opacityOut,
    '-webkit-animation-duration': settings.animationDuration,
    '-moz-animation-duration': settings.animationDuration,
    '-ms-animation-duration': settings.animationDuration,
    'animation-duration': settings.animationDuration
  };
  //Apply stles
  for (var key in initStyles) {
    id.style[key] = initStyles[key];
  }

  target.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelectorAll('body, html').forEach(
      (element) => element.style.overflow = 'hidden'
    );
    if (href == idConc) {
      if (id.classList.contains(settings.modalTarget + '-off')) {
        id.classList.remove(settings.animatedOut);
        id.classList.remove(settings.modalTarget + '-off');
        id.classList.add(settings.modalTarget + '-on');
      }

      if (id.classList.contains(settings.modalTarget + '-on')) {
        settings.beforeOpen();
        let styles = { 'opacity': settings.opacityIn, 'z-index': settings.zIndexIn };
        for (var key in styles) {
          id.style[key] = styles[key];
        }
        id.classList.add(settings.animatedIn);
        ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend'].forEach((eventName) => id.addEventListener(eventName, afterOpen, { once: true }));
      };
    }
  });



  closeBt.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelectorAll('body, html').forEach(
      (element) => element.style.overflow = 'auto'
    );

    settings.beforeClose(); //beforeClose
    if (id.classList.contains(settings.modalTarget + '-on')) {
      id.classList.remove(settings.modalTarget + '-on');
      id.classList.add(settings.modalTarget + '-off');
    }

    if (id.classList.contains(settings.modalTarget + '-off')) {
      id.classList.remove(settings.animatedIn);
      id.classList.add(settings.animatedOut);
      ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend'].forEach((eventName) => id.addEventListener(eventName, afterClose, { once: true }));
    };

  });

  function afterClose() {
    id.style.zIndex = settings.zIndexOut;
    settings.afterClose(); //afterClose
  }

  function afterOpen() {
    settings.afterOpen(); //afterOpen
  }

}; // End animatedModal.js
