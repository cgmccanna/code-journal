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
  var newEntry = {
    title: $form.elements.title.value,
    imageURL: $form.elements.url.value,
    notes: $form.elements.notes.value
  };
  newEntry.id = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $imagePreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});

function createNewEntry(entry) {
  var $listEntry = document.createElement('li');
  $listEntry.setAttribute('class', 'row');

  var $image = document.createElement('img');
  $image.setAttribute('class', 'column-half');
  $image.setAttribute('src', entry.imageURL);
  $listEntry.appendChild($image);

  var $entryContent = document.createElement('div');
  $entryContent.setAttribute('class', 'column-half');
  $listEntry.appendChild($entryContent);

  var $entryTitle = document.createElement('h3');
  $entryTitle.setAttribute('class', 'entry-title');
  $entryTitle.textContent = entry.title;
  $entryContent.appendChild($entryTitle);

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;
  $entryContent.appendChild($entryNotes);

  return $listEntry;
}

var $entryList = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var listEntry = createNewEntry(data.entries[i]);
    $entryList.appendChild(listEntry);
  }
});
