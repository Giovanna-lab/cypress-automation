# Cypress Parallel Test Runner
**This project demonstrates running Cypress tests in parallel using Python's multiprocessing module.**

## Setup

### 1. Clone the repository:

git clone <your-repository-url>
cd <your-project-directory>

### 2. Install dependencies:

npm install
pip install multiprocessing

## Running Tests

### In Parallel

Run the Python script to execute tests in parallel:

python python/run_tests_parallel.py

### Manually

Run tests for a specific lead index:

npm run cy:run --spec cypress/e2e/home.cy.js --env leadIndex=0

### Test Data

Test data is in test_data.json. Update it for different lead simulations.