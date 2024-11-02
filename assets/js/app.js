// Get input, button, and error message elements
const productStatusIdInput = document.getElementById("productStatusId");
const submitButton = document.getElementById("submitButton");
const errorMessage = document.getElementById("errorMessage");

let taskIds = [];

// Add event listener to submit button
submitButton.addEventListener("click", validateForm);

// Function to validate form input
async function validateForm(event) {
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

  // Update taxIds array
  taskIds = await fetchTaskIds();
  console.log(taskIds);
}
 

async function fetchTaskIds() {
  const url = "https://demonstration.swiftcase.co.uk/api/v2/a92f4f344d55636df0e7cc7abab26dc9/status/1043.json";
  
  try {
      const response = await fetch(url);
      
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      // Parse the JSON response
      const data = await response.json();
      
      // Extract task IDs from the response
      const taskIds = data.task_ids.map(task => task.id);
      
      
      return taskIds; // Return task IDs for further processing
  } catch (error) {
      console.error("Failed to fetch task IDs:", error);
  }
}
