const { GlobalKeyboardListener } = require("node-global-key-listener");

const hooks = [0, 0, 0, 0];
const hookTimers = [0, 0, 0, 0];
const hookTimerIntervals = [null, null, null, null];
const countdownDuration = 70;

const listener = new GlobalKeyboardListener();

const updateDisplay = () => {
  const display = hooks.map((hookCount, index) => {
    const timerDisplay = hookTimers[index] > 0 ? ` (${hookTimers[index]}s)` : '';
    return `${hookCount} - ${index + 1}st Survivor${timerDisplay}`;
  }).join('<br>');

  document.getElementById('hookCounter').innerHTML = display;
};

const startHookTimer = (index) => {
  hookTimers[index] = countdownDuration;

  hookTimerIntervals[index] = setInterval(() => {
    hookTimers[index] -= 1;
    updateDisplay();

    if (hookTimers[index] <= 0) {
      clearInterval(hookTimerIntervals[index]);
      hookTimers[index] = 0;
      updateDisplay();
    }
  }, 1000);
};

const resetHookTimer = (index) => {
  clearInterval(hookTimerIntervals[index]);
  hookTimers[index] = 0;
  updateDisplay();
};

listener.addListener((e) => {
  if (e.state === "DOWN") {
    if (e.name === "F1") {
      if (hooks[0] > 0) {
        resetHookTimer(0);
      }
      hooks[0] = (hooks[0] + 1) % 4;
      if (hooks[0] === 1) startHookTimer(0);
      if (hooks[0] === 2) startHookTimer(0);
    }
    if (e.name === "F2") {
      if (hooks[1] > 0) {
        resetHookTimer(1);
      }
      hooks[1] = (hooks[1] + 1) % 4;
      if (hooks[1] === 1) startHookTimer(1);
      if (hooks[1] === 2) startHookTimer(1);
    }
    if (e.name === "F3") {
      if (hooks[2] > 0) {
        resetHookTimer(2);
      }
      hooks[2] = (hooks[2] + 1) % 4;
      if (hooks[2] === 1) startHookTimer(2);
      if (hooks[2] === 2) startHookTimer(2);
    }
    if (e.name === "F4") {
      if (hooks[3] > 0) {
        resetHookTimer(3);
      }
      hooks[3] = (hooks[3] + 1) % 4;
      if (hooks[3] === 1) startHookTimer(3);
      if (hooks[3] === 2) startHookTimer(3);
    }
    updateDisplay();
  }
});
