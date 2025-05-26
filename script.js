const inputRef = document.getElementById("input");
const valueBox = document.getElementById("currentValue");
const renderBox = document.getElementById("renderCount");
const toast = document.getElementById("successToast");
let renderCount = 0;

window.onload = function() {
  inputRef.focus();
};

function clearInput() {
  inputRef.value = '';
  handleInput({ target: inputRef });
  inputRef.focus();
}

function handleInput(event) {
  valueBox.textContent = event.target.value;
  if (event.target.value !== "") {
    renderCount++;
    showToast();
  }
  renderBox.textContent = renderCount;
}

function showToast() {
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 1400);
}
