import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "../DocClient";
import reimbursement from "../reimbursement";
import log from "../log";

export class ReimbursementDAO{
    private client: DocumentClient;
    
    constructor(){
        this.client=myDocClient;
    }
    
    //create
    async addReimbursement(reimbursement:reimbursement ):Promise<boolean>{
    
        const params: DocumentClient.PutItemInput={
            TableName: 'TRMS-data',
            Item:{
                ...reimbursement,
                type:'Reimbursement',
            },
            ConditionExpression: 'ID<> :ID',
            ExpressionAttributeValues:{
                ':ID':reimbursement.ID,
            },
        };
        try{
            await this.client.put(params).promise();
            return true
        }catch(error){
            console.log('Failed to add reimbursement: ',error);
            return false;
        }
    }
    
    
    //read:
        //getall:
        async getAllReimbursements(): Promise<reimbursement[]>{
            const params: DocumentClient.QueryInput={
                TableName: 'TRMS-data',
                KeyConditionExpression: '#T = :r',
                ExpressionAttributeNames: {
                  '#T': 'Type',
                },
                ExpressionAttributeValues: {
                  ':r': 'Reimbursement',
                },
                ProjectionExpression:'Type,ID,amount,status,eventType,reimbursePortion,Date'
            };
            const data=await this.client.query(params).promise();
            return data.Items as reimbursement[];
        }

    
        //getbyid:
        async getReimbursementByID(ID:string): Promise<reimbursement | null>{
            const params: DocumentClient.GetItemInput={
                TableName: 'TRMS-data',
                Key: {
                    Type:'Reimbursement',
                    ID,
                },
                ProjectionExpression:'Type,ID,amount,status,eventType,reimbursePortion,Date'
                };
    
            const data=await this.client.get(params).promise();
            return data.Item as reimbursement;
        }


        //getbydate:


        
    
    
    
    //update
    async update_reimbursement(reimbursement:reimbursement):Promise<boolean>{
        const params: DocumentClient.PutItemInput={
            TableName:'TRMS-data',
            Item:{
                ...reimbursement,
                type:'Reimbursement',
            },
            ConditionExpression:'ID=:ID',
            ExpressionAttributeValues:{
            ':ID':reimbursement.ID,
            },
        };
        try{
            await this.client.put(params).promise();
            return true;
        } catch(error){
            console.log('Failed to update reimbursement: ',error);
            return false;
        }
    }
    
    
    //delete
    async delete_reimbursement(ID:string):Promise<boolean>{
        const params: DocumentClient.DeleteItemInput={
            TableName:"TRMS-data",
            Key:{
                Type:'Reimbursement',
                ID,
            },
        };
        try{
            await this.client.delete(params).promise();
            return true;
        }catch(error){
            console.log('Failed to delete reimbursement: ',error);
            return false;
        };
    }
    
    
    }
    const reimbursementDAO = new ReimbursementDAO();
    export default reimbursementDAO;