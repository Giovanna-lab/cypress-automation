import os
from multiprocessing import Pool

def run_test(index):
    os.system(f'npm run cy:run --spec cypress/e2e/home.cy.js --env leadIndex={index}')

if __name__ == '__main__':
    # Definir o número de processos a serem executados em paralelo
    num_processes = 3

    # Criar um pool de processos
    pool = Pool(processes=num_processes)

    # Executar o teste em paralelo
    pool.map(run_test, range(num_processes))
