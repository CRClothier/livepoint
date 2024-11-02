// Get input, button, and error message elements
const productStatusIdInput = document.getElementById("productStatusId");
const submitButton = document.getElementById("submitButton");
const errorMessage = document.getElementById("errorMessage");

let taskIds = [];
let taskDetailsList = [];
let totalCost = 0;

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

  // Fetch and display task details for each task ID
  taskDetailsList = await Promise.all(taskIds.map(async (task) => {
    return await fetchTaskDetails(task);
  }));

  calculateTotalCost(taskDetailsList);
  console.log(totalCost);
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

async function fetchTaskDetails(task) {
  const url = `https://demonstration.swiftcase.co.uk/api/v2/a92f4f344d55636df0e7cc7abab26dc9/task/${task}.json`;

  try {
      const response = await fetch(url);
      
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      // Parse the JSON response
      const details = await response.json();
      
      // Extract task details from the response
      const taskDetails = details.data;
      
      
      return taskDetails; // Return task details for further processing
  } catch (error) {
      console.error("Failed to fetch task details:", error);
  }
}

function calculateTotalCost(array) {
  for (let subArray of array) {
    let cost = parseFloat(subArray[0].value);
    let cancelled = subArray[2].value
    if (cancelled === "No") {
      totalCost += cost;
    }
  }
}