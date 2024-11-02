// Get input, button, and error message elements
const productStatusIdInput = document.getElementById("productStatusId");
const submitButton = document.getElementById("submitButton");
const errorMessage = document.getElementById("errorMessage");

// Add event listener to submit button
submitButton.addEventListener("click", validateForm);

// Function to validate form input
function validateForm() {
  // Prevent form from submitting by default
  event.preventDefault();

  // Clear past error messages
  errorMessage.style.display = "none";
  errorMessage.textContent = "";

  // Get input and trim whitespace
  const productStatusId = productStatusIdInput.value.trim();
  

  // Check input is empty
  if (!productStatusId) {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Product Status ID is required.";
      return;
  }

  // Check input is not a float
  if (productStatusId.includes(".")) {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Product Status ID must not contain a decimal point.";
      return;
  }

  // Check input is a valid integer
  if (!+productStatusId) {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Product Status ID must be an integer.";
      return;
  }

  console.log("Form is valid. Proceeding with submission...");
}
 