// content.js - Discord Quest Bypasser Logic

console.log("[Quest Bypasser] Injected and ready.");

let isBypasserActive = true;

// Load setting
chrome.storage.sync.get(['active'], function(result) {
  isBypasserActive = result.active !== undefined ? result.active : true;
});

// Listen for settings changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.active) {
    isBypasserActive = changes.active.newValue;
    console.log("[Quest Bypasser] Active state changed to:", isBypasserActive);
  }
});

// Main Interval
setInterval(() => {
  if (!isBypasserActive) return;

  attemptBypass();
}, 5000);

function attemptBypass() {
  // 1. Look for Quest UI indicators (This matches generic Discord class patterns for quests)
  // Note: Discord classes change frequently, so we look for partial matches or ARIA labels
  
  const questContainers = document.querySelectorAll('[class*="quest-"], [class*="questCard-"]');
  
  if (questContainers.length > 0) {
    console.log("[Quest Bypasser] Found quest container(s). Analyzing...");
    
    questContainers.forEach(container => {
      // Logic to simulate 'streaming' or 'playing' would go here.
      // Since we can't easily hook into the React internal state from a content script without
      // injection into the page context (unsafeWindow), we mimic user interaction.
      
      // Attempt to find "Accept Quest" buttons
      const buttons = container.querySelectorAll('button');
      buttons.forEach(btn => {
        if (btn.innerText.toLowerCase().includes("accept") || btn.innerText.toLowerCase().includes("start")) {
           console.log("[Quest Bypasser] Auto-accepting quest...");
           btn.click();
        }
      });
    });
  }

  // 2. Spoof Visibility API to ensure Discord thinks the tab is always focused (for "Watch stream" quests)
  // We need to inject this into the page context, not just content script
  injectScript(`
    Object.defineProperty(document, 'hidden', { value: false, writable: false });
    Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: false });
    console.log("[Quest Bypasser] Page visibility spoofed.");
  `);
}

function injectScript(code) {
  const script = document.createElement('script');
  script.textContent = code;
  (document.head || document.documentElement).appendChild(script);
  script.remove();
}
