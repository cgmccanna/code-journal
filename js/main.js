/* global data */
/* exported data */
var $photoURL = document.querySelector('#url');
var $imagePreview = document.querySelector('img');
$photoURL.addEventListener('input', function (event) {
  if (/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test($photoURL.value) === true) {
    $imagePreview.src = $photoURL.value;
  } else {
    $imagePreview.src = 'images/placeholder-image-square.jpg';
  }
});
