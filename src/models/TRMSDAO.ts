import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "./DocClient";
import log from "./log";
import user from './user';

class TRMSDAO {
  constructor(
      private DocClient: DocumentClient= myDocClient,
  ) {}
  async function register(employee: employee):Promise<void>{
    /* let rl.question(`
      What type of user are you?
      1. Regular Employee
      2. Supervisor
      3. Department Head
      4. Benefits controller
    `); */
    const params = {
      TableName: 'TRMS-Data',
      Item: {
        Type: 'employee',
        ID: employee.ID,
        Username: employee.Username,
        Password: employee.Password,
        Balance: employee.Balance=0
      },
    };
    this.DocClient.put(params, (err, data) => {
      if(err) {
        console.error('You could not be registered.', JSON.stringify(err, null, 2));
      } else {
        console.log('You are registered, welcome to our car lot.', JSON.stringify(data, null, 2));
        log.info("A new customer, ID: "+Customer.ID+"has decided to shop with us.");
      }
    });

  }

};

export default new TRMSDAO();