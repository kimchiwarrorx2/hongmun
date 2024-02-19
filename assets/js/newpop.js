
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
  localStorage.setItem(modalId + '-lastClosed', new Date().toDateString());
}

// Function to set no show preference
function setNoShow(modalId) {
  var checkbox = document.getElementById('noShow' + modalId.slice(-1));
  localStorage.setItem(modalId + '-noShow', checkbox.checked);
  if (checkbox.checked) {
    closeModal(modalId);
  }
}

// Event listener to close modals when clicking outside of them
window.onclick = function(event) {
  if (event.target.classList.contains('modal-close') || event.target.classList.contains('modal')) {
    closeModal(event.target.closest('.modal').id);
  }
}

// Event listener for the checkbox to not show the modal again
document.querySelectorAll('.no-show-checkbox').forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    setNoShow(this.dataset.modalId);
  });
});

// Initialization to open modals
window.onload = function() {
  openModal('popup1');
  openModal('popup2');
}

// Close button functionality
document.querySelectorAll('.close-modal').forEach(function(button) {
  button.addEventListener('click', function() {
    closeModal(this.dataset.modalId);
  });
});
