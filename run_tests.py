import os
from multiprocessing import Pool
import subprocess

def run_test(index):
    # Run the Cypress test with a specific lead index
    result = subprocess.run(
        f'npm run cy:run --spec cypress/e2e/home.cy.js --env leadIndex={index}', 
        shell=True, 
        stdout=subprocess.PIPE, 
        stderr=subprocess.PIPE
    )
    
    # Check if the test ran successfully or if there was an error
    if result.returncode != 0:
        print(f"Test {index} failed: {result.stderr.decode()}")
    else:
        print(f"Test {index} completed successfully")

if __name__ == '__main__':
    # Define the number of parallel processes
    num_processes = 3  # Change this as needed

    # Create a pool of processes
    pool = Pool(processes=num_processes)

    # Execute the tests in parallel
    pool.map(run_test, range(num_processes))

    # Close and join the pool to ensure clean exit
    pool.close()
    pool.join()
