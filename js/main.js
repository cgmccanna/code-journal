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

var $form = document.querySelector('form');
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var newEntry = {
    title: $form.elements.title.value,
    imageURL: $form.elements.url.value,
    notes: $form.elements.notes.value
  };
  newEntry.id = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(newEntry);
  $imagePreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});
