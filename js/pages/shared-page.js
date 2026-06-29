// Shared page wiring helpers.
// Loaded as a classic script so each tool page still works from file://.

function onValueInput(input, handler) {
  input.addEventListener("input", handler);
  input.addEventListener("sl-input", handler);
  input.addEventListener("sl-change", handler);
}

function onValueChange(input, handler) {
  input.addEventListener("change", handler);
  input.addEventListener("sl-change", handler);
}
