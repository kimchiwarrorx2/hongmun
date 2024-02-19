
// Function to open a modal
function openModal(modalId) {
  var modal = document.getElementById(modalId);
  var noShowChecked = localStorage.getItem(modalId + '-noShow') === 'true';
  var today = new Date().toDateString();
  var lastClosed = localStorage.getItem(modalId + '-lastClosed');

  if (!noShowChecked || lastClosed !== today) {
    modal.style.display = 'block';
  }
}

// Function to close a modal
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = 'none';
}

// Function to set no show preference
function setNoShow(modalId) {
  var checkbox = document.getElementById('noShow' + modalId.slice(-1));
  localStorage.setItem(modalId + '-noShow', checkbox.checked);
  if (checkbox.checked) {
    localStorage.setItem(modalId + '-lastClosed', new Date().toDateString());
  }
}

// Event listener to close modals when clicking outside of them
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
}

// Initialization to open modals
window.onload = function() {
  openModal('popup1');
  openModal('popup2');
}
