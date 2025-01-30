// Select elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

// Variables to store calculation data
let currentInput = '';
let operator = null;
let previousInput = '';

// Add event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (value === '.') {
      if (!currentInput.includes('.')) currentInput += value;
    } else if (!isNaN(value)) {
      currentInput += value;
    } else {
      if (currentInput) {
        if (operator && previousInput) calculate();
        operator = value;
        previousInput = currentInput;
        currentInput = '';
      }
    }
    updateDisplay();
  });
});

// Clear button functionality
clearButton.addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  operator = null;
  updateDisplay();
});

// Equals button functionality
equalsButton.addEventListener('click', () => {
  if (operator && currentInput && previousInput) calculate();
  operator = null;
  updateDisplay();
});

// Update display
function updateDisplay() {
  display.textContent = currentInput || previousInput || '0';
}

// Perform calculation
function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  switch (operator) {
    case '+':
      currentInput = (num1 + num2).toString();
      break;
    case '-':
      currentInput = (num1 - num2).toString();
      break;
    case '*':
      currentInput = (num1 * num2).toString();
      break;
    case '/':
      currentInput = num2 === 0 ? 'Error' : (num1 / num2).toString();
      break;
  }

  previousInput = '';
}
