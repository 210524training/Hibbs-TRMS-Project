import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function exit() {
  rl.close();
  process.exit(0);
}

function questionAsync(question: string, isValid?: (answer: string) => boolean): Promise<string> {
  return new Promise<string>(
    (resolve, reject) => {
      rl.question(question, (answer) => {
        if(!isValid) {
          resolve(answer);
          return;
        }

        if(isValid(answer)) {
          resolve(answer);
        }

        reject(new Error(`${answer} is not valid according to ${isValid}`));
      });
    },
  );
}

function initialPrompt(): Promise<string> {
    return questionAsync(
      `What do you want to do?
        0. Register
        1. Login
        2. Display Products
        q. Exit\n`,
      (answer) => ['0', '1', '2', 'q'].includes(answer),
    );
  }

/* export function initialPrompt(): Promise<string> {
    return new Promise<string>(
      (resolve, reject) => {
        rl.question(
          `
  ############# COMMANDS #################
  0. Register as New Customer
  1. Login
  q. Exit
  ########################################\n`,
          (answer) => {
            let valid = false;
            if((!Number.isNaN(Number(answer)) && (Number(answer) <= 1) && (Number(answer) >= 0)) || (answer === 'q')) {
              valid = true;
            }
            if(valid) {
              resolve(answer);
            } else {
              log.warn('Invalid Input');
              reject();
            }
          },
        );
      },
    );
  } */
