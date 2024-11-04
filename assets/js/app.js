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

  // Fetch and display task details for each task ID
  taskDetailsList = await Promise.all(taskIds.map(async (task) => {
    return await fetchTaskDetails(task);
  }));

  calculateTotalCost(taskDetailsList);
  openModal(taskDetailsList);
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

// Get modal elements
const taskModal = document.getElementById("taskModal");
const modalBody = document.getElementById("modalBody");
const closeButton = document.querySelector(".close-button");

// Function to open and populate modal with a table
function openModal(taskDetailsList) {
  // Clear previous content
  modalBody.innerHTML = "";

  // Create the table element
  const table = document.createElement("table");
  table.classList.add("task-table");

  // Create the header row for the table
  const headerRow = document.createElement("tr");
  const headers = ["Task", "Cost", "Date Ordered", "Cancelled", "Product Name", "Email"];

  headers.forEach(headerText => {
    const header = document.createElement("th");
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  // Loop through each task and add it as a row in the table
  taskDetailsList.forEach((task, index) => {
    const row = document.createElement("tr");

    // Add task number in the first column
    const taskCell = document.createElement("td");
    taskCell.textContent = `Task ${taskIds[index]}`;
    row.appendChild(taskCell);

    // Add each detail in the following columns
    const details = {
      cost: "",
      date_ordered: "",
      cancelled: "",
      product_name: "",
      email: ""
    };

    // Fill details object with actual values
    task.forEach(detail => {
      if (detail.name === "date_ordered") {
        // Convert date to DD/MM/YYYY format
        const date = new Date(detail.value);
        details.date_ordered = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
      } else {
      details[detail.name] = detail.value;
  }});

    // Populate the row cells with the values
    Object.values(details).forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    // Append the row to the table
    table.appendChild(row);
  });

  // Append the table to the modal body
  modalBody.appendChild(table);

  const totalCostParagraph = document.createElement("p");
  totalCostParagraph.textContent = `Total Cost: £${totalCost.toFixed(2)}`;
  totalCostParagraph.classList.add("total-cost");
  modalBody.appendChild(totalCostParagraph);

  // Display the modal
  taskModal.style.display = "block";
}


// Function to close modal
closeButton.addEventListener("click", () => {
  taskModal.style.display = "none";
  totalCost = 0;
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target == taskModal) {
    taskModal.style.display = "none";
    totalCost = 0;
  }
});

