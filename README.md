# LivePoint Task Management Interface

This project is a user-friendly interface for internal teams to interact with product tasks. The interface retrieves and processes task-related data via API integrations, providing a streamlined and efficient workflow.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Project Overview

The LivePoint Task Management Interface enables team members to efficiently retrieve task data using a Product Status ID. Once the data is retrieved, the page provides further task-specific details, calculates total costs, and presents the data in a formatted way for easy reference and use. This interface integrates with the SwiftCase API to interact with task data, facilitating a smooth workflow.

## Features

- **Form Input**: Users can input a Product Status ID to fetch task data.
- **Data Validation**: Ensures valid inputs are entered.
- **API Integration**: Retrieves task IDs and task details based on workflow status.
- **Cost Calculation**: Aggregates cost data for specific tasks.
- **Formatted Display**: Presents calculated costs and task details in a readable format.
- **File Upload**: Option to upload a file with task data back to the SwiftCase system.

## Getting Started

To run this project locally or on a server, follow the instructions below.

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- An active SwiftCase API Key and valid subdomain.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/CRClothier/livepoint.git
   cd livepoint

2. **Open the Project**  
   Open `index.html` in your preferred browser to run the project.

## Usage

1. Enter a valid Product Status ID into the input field.
2. Click the "Submit" button to fetch the task data.
3. The interface will display task details, aggregated costs, and formatted dates.
4. Additional options are available to save data to a file or upload it back to SwiftCase.


## API Endpoints

This project uses the following SwiftCase API endpoints:

1. **Task IDs by Workflow Status**
   - **Method**: `GET`
   - **Endpoint**: `https://{YOURSUBDOMAIN}.swiftcase.co.uk/api/v2/{APIKEY}/status/{WORKFLOWSTATUSID}.json`
   - **Description**: Fetches a list of task IDs by workflow status.

2. **Task Details by Task ID**
   - **Method**: `GET`
   - **Endpoint**: `https://{YOURSUBDOMAIN}.swiftcase.co.uk/api/v2/{APIKEY}/task/{TASKID}.json`
   - **Description**: Retrieves details for each task ID.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **SwiftCase API** - for providing API resources used in this project.
- **Livepoint Software Solutions** - for documentation and support.

