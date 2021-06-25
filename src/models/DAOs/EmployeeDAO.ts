import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "../DocClient";
import employee from '../employee';
import log from "../log";

export class EmployeeDAO{
private client: DocumentClient;

constructor(){
    this.client=myDocClient;
}

//create
async addEmployee(employee: employee):Promise<boolean>{

    const params: DocumentClient.PutItemInput={
        TableName: 'TRMS-data',
        Item:{
            ...employee,
            type:'Employee',
        },
        ConditionExpression: 'ID<> :ID',
        ExpressionAttributeValues:{
            ':ID':employee.ID,
        },
    };
    try{
        await this.client.put(params).promise();
        return true
    }catch(error){
        console.log('Failed to add employee: ',error);
        return false;
    }
}


//read:

    //getall:
async getAllEmployees(): Promise<employee[]>{
    const params: DocumentClient.QueryInput={
        TableName: 'TRMS-data',
        KeyConditionExpression: '#o = :E',
        ExpressionAttributeNames: {
          '#o': 'ObjType',
        },
        ExpressionAttributeValues: {
          ':E': 'Employee',
        },
        ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
    };
    const data=await this.client.query(params).promise();
    return data.Items as employee[];
}
    
    //getbyid:
    async getEmployeeByID(ID: string): Promise<employee | null>{
        const params: DocumentClient.GetItemInput={
            TableName: 'TRMS-data',
            Key: {
                Type:'Employee',
                ID,
            },
            ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
            };

        const data=await this.client.get(params).promise();
        return data.Item as employee;
    }


    //getbyname:


    //getbyusername:
    async getEmployeeByUsername(username:string):Promise<employee|null>{
        //console.log("username at DAO: "+username);
        const params: DocumentClient.QueryInput={
            TableName:'TRMS-data',
            IndexName:'username',
            KeyConditionExpression:'ObjType=:o AND username=:u',
            ExpressionAttributeValues:{
                ':o':'Employee',
                ':u':username,
            },
            ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
        };
        const data= await this.client.query(params).promise();
        if(!data.Items || data.Count===0){
            return null;
        }

        return data.Items[0] as employee;

    }
    



//update
async update_Employee(employee:employee):Promise<boolean>{
    const params: DocumentClient.PutItemInput={
        TableName:'TRMS-data',
        Item:{
            ...employee,
            type:'employee',
        },
        ConditionExpression:'ID=:ID',
        ExpressionAttributeValues:{
            ':ID':employee.ID,
        },
    };
    try{
        await this.client.put(params).promise();
        return true;
    } catch(error){
        console.log('Failed to update employee: ',error);
        return false;
    }
}


//delete
async delete_employee(ID:string):Promise<boolean>{
    const params: DocumentClient.DeleteItemInput={
        TableName:"TRMS-data",
        Key:{
            Type:'Employee',
            ID,
        },
    };
    try{
        await this.client.delete(params).promise();
        return true;
    }catch(error){
        console.log('Failed to delete employee: ',error);
        return false;
    };
}


}
const employeeDAO = new EmployeeDAO();
export default employeeDAO;