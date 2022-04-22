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

var $entryList = document.querySelector('ul');

var $form = document.querySelector('form');
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.editing !== null) {
    var oldEntry = data.entries[(data.editing.id - 1)];
    oldEntry.title = $form.elements.title.value;
    oldEntry.imageURL = $form.elements.url.value;
    oldEntry.notes = $form.elements.notes.value;
    $imagePreview.src = 'images/placeholder-image-square.jpg';
    $form.reset();
    data.view = 'entries';
    switchView('entries');
    data.editing = null;
  } else {
    var newEntry = {
      title: $form.elements.title.value,
      imageURL: $form.elements.url.value,
      notes: $form.elements.notes.value
    };
    newEntry.id = data.nextEntryId;
    var $newEntry = createNewEntry(newEntry);
    $entryList.prepend($newEntry);
    data.nextEntryId++;
    data.entries.push(newEntry);
    $imagePreview.src = 'images/placeholder-image-square.jpg';
    $form.reset();
    data.view = 'entries';
    switchView('entries');
  }
});

function createNewEntry(entry) {
  var $listEntry = document.createElement('li');
  $listEntry.setAttribute('class', 'row');
  $listEntry.setAttribute('data-entry-id', entry.id);

  var $image = document.createElement('img');
  $image.setAttribute('class', 'column-half');
  $image.setAttribute('src', entry.imageURL);
  $listEntry.appendChild($image);

  var $entryContent = document.createElement('div');
  $entryContent.setAttribute('class', 'column-half');
  $listEntry.appendChild($entryContent);

  var $titleEdit = document.createElement('div');
  $titleEdit.setAttribute('class', 'row title-edit');
  $entryContent.appendChild($titleEdit);

  var $entryTitle = document.createElement('h3');
  $entryTitle.setAttribute('class', 'entry-title');
  $entryTitle.textContent = entry.title;
  $titleEdit.appendChild($entryTitle);

  var $penIcon = document.createElement('i');
  $penIcon.setAttribute('class', 'fas fa-pen');
  $titleEdit.appendChild($penIcon);

  var $entryNotes = document.createElement('p');
  $entryNotes.textContent = entry.notes;
  $entryContent.appendChild($entryNotes);

  return $listEntry;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = data.entries.length - 1; i >= 0; i--) {
    var listEntry = createNewEntry(data.entries[i]);
    $entryList.appendChild(listEntry);
  }
  switchView(data.view);
});

function switchView(view) {
  var $entries = document.querySelector('div[data-view="entries"]');
  var $entryForm = document.querySelector('div[data-view="entry-form"]');

  if (view === 'entry-form') {
    $entries.setAttribute('class', 'hidden');
    $entryForm.setAttribute('class', 'show');
  } else if (view === 'entries') {
    $entries.setAttribute('class', 'show');
    $entryForm.setAttribute('class', 'hidden');
  }
}

var $entriesNav = document.querySelector('.entries');
$entriesNav.addEventListener('click', function (event) {
  data.view = 'entries';
  switchView('entries');
});

var $createEntry = document.querySelector('.new-entry');
$createEntry.addEventListener('click', function (event) {
  data.view = 'entry-form';
  switchView('entry-form');
});

var $renderedEntries = document.querySelector('ul');
$renderedEntries.addEventListener('click', function (event) {
  if (event.target.matches('.fas')) {
    data.view = 'entry-form';
    switchView('entry-form');
    var grandpa = event.target.parentElement.parentElement.parentElement;
    data.editing = data.entries[(grandpa.getAttribute('data-entry-id') - 1)];
    document.getElementById('title').setAttribute('value', data.editing.title);
    document.getElementById('url').setAttribute('value', data.editing.imageURL);
    $imagePreview.src = data.editing.imageURL;
    document.getElementById('notes').textContent = data.editing.notes;
  }
});
