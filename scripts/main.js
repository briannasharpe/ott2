var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';

var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

var SLIDE_BUTTONS = '[data-image-role="button"]';

function setDetails(imageUrl, titleText) {
  'use strict';

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function slideshow() {
  'use strict';

  var temp_img;
  var temp_title;
  var thumbnails = getThumbnailsArray();
  var thumb_size = thumbnails.length;

  var buttons_array = [].slice.call(document.querySelectorAll(SLIDE_BUTTONS));

  var prev = buttons_array[0];
  var next = buttons_array[1];

  prev.addEventListener('click', function(event) {
    event.preventDefault();

    for (var i = 0; i < thumb_size; ++i) {
      if (document.querySelector(DETAIL_TITLE_SELECTOR).textContent === thumbnails[i].getAttribute("data-image-title")) {
        prev = i;
      } //if
    } //for

    if (prev === 0) {
      temp_img = imageFromThumb(thumbnails[thumb_size - 1]);
      temp_title = titleFromThumb(thumbnails[thumb_size - 1]);
      prev = thumb_size - 1;

      setDetails(temp_img, temp_title);
    } else { 
      temp_img = imageFromThumb(thumbnails[prev - 1]);
      temp_title = titleFromThumb(thumbnails[prev - 1]);
      prev--;

      setDetails(temp_img, temp_title);
    } //if
  }); //prev button ()

  next.addEventListener('click', function(event) {
    event.preventDefault();

    for (var i = 0; i < thumb_size; ++i) {
      if (document.querySelector(DETAIL_TITLE_SELECTOR).textContent === thumbnails[i].getAttribute("data-image-title")) {
        next = i;
      } //if
    } //for

    if (next === thumb_size - 1) {
      temp_img = imageFromThumb(thumbnails[0]);
      temp_title = titleFromThumb(thumbnails[0]);
      next = 0;
      
      setDetails(temp_img, temp_title);
    } else { 
      temp_img = imageFromThumb(thumbnails[next + 1]);
      temp_title = titleFromThumb(thumbnails[next + 1]);
      next++;

      setDetails(temp_img, temp_title);
    } //if
  }); //next button ()
} //slideshow()


function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
  slideshow();
}

initializeEvents();