document.addEventListener('DOMContentLoaded', function() {
  const statusText = document.getElementById('statusText');
  const toggleBtn = document.getElementById('toggleBtn');

  // Load saved state
  chrome.storage.sync.get(['active'], function(result) {
    updateUI(result.active !== undefined ? result.active : true);
  });

  toggleBtn.addEventListener('click', function() {
    chrome.storage.sync.get(['active'], function(result) {
      const currentState = result.active !== undefined ? result.active : true;
      const newState = !currentState;
      
      chrome.storage.sync.set({active: newState}, function() {
        updateUI(newState);
      });
    });
  });

  function updateUI(isActive) {
    statusText.textContent = isActive ? 'Active' : 'Inactive';
    statusText.style.color = isActive ? '#43b581' : '#f04747';
    toggleBtn.textContent = isActive ? 'Deactivate' : 'Activate';
  }
});
