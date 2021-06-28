import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "../DocClient";
import request from '../request';
import log from "../log";

export class RequestDAO{
    private client: DocumentClient;
    
    constructor(){
        this.client=myDocClient;
    }
    
    //create
    async addRequest(request: request):Promise<boolean>{
    
        const params: DocumentClient.PutItemInput={
            TableName: 'TRMS-data',
            Item:{
                ...request,
                type:'Request',
            },
            ConditionExpression: 'ID<> :ID',
            ExpressionAttributeValues:{
                ':ID':request.ID,
            },
        };
        try{
            await this.client.put(params).promise();
            return true
        }catch(error){
            console.log('Failed to add request: ',error);
            return false;
        }
    }
    
    
    //read:
        //getall:
        async getAllRequests(): Promise<request[]>{
            const params: DocumentClient.QueryInput={
                TableName: 'TRMS-data',
                KeyConditionExpression: '#o = :r',
                ExpressionAttributeNames: {
                  '#o': 'ObjType',
                  '#s':'status',
                  '#d':'Date',
                },
                ExpressionAttributeValues: {
                  ':r': 'Request',
                },
                ProjectionExpression:'ObjType,ID,amount,#s,eventType,reimbursePortion,#d'
            };
            const data=await this.client.query(params).promise();
            return data.Items as request[];
        }

    
        //getbyid:
        async getRequestByID(ID: string): Promise<request | null>{
            const params: DocumentClient.GetItemInput={
                TableName: 'TRMS-data',
                Key: {
                    Type:'Request',
                    ID,
                },
                ExpressionAttributeNames:{
                    '#s':'status',
                    '#d':'Date',
                },
                ProjectionExpression:'ObjType,ID,amount,#s,eventType,reimbursePortion,#d'
                };
    
            const data=await this.client.get(params).promise();
            return data.Item as request;
        }


        //getbyname:
        async getRequestByUsername(username:string):Promise<request[]|null>{
            const params: DocumentClient.QueryInput={
                TableName:'TRMS-data',
                IndexName:'username',
                KeyConditionExpression:'ObjType=:o AND username=:u',
                FilterExpression:':u=#u',
                ExpressionAttributeValues:{
                    ':o':"Employee",
                    ':u':username
                },
                ExpressionAttributeNames:{
                    '#s':'status',
                    '#d':"Date",
                    '#u':'username'
                },
                ProjectionExpression:'ObjType,#u,realName,ID,amount,#s,eventType,reimbursePortion,#d'
            };
            
            let userRequests: request[]=[];
            const data=await this.client.query(params).promise();
            if(!data.Items ||data.Count===0){
                return null;
            }else{
                for(let i=0; i<data.Items.length;i++){
                    userRequests.push(data.Items[i] as request);
                }
            };
            return userRequests;
        };
        //getbydate:


        
    
    
    
    //update
    async update_request(request:request):Promise<boolean>{
        const params: DocumentClient.PutItemInput={
            TableName:'TRMS-data',
            Item:{
                ...request,
                type:'Request',
            },
            ConditionExpression:'ID=:ID',
            ExpressionAttributeValues:{
            ':ID':request.ID,
            },
        };
        try{
            await this.client.put(params).promise();
            return true;
        } catch(error){
            console.log('Failed to update request: ',error);
            return false;
        }
    }
    
    
    //delete
    async delete_request(ID:string):Promise<boolean>{
        const params: DocumentClient.DeleteItemInput={
            TableName:"TRMS-data",
            Key:{
                Type:'Request',
                ID,
            },
        };
        try{
            await this.client.delete(params).promise();
            return true;
        }catch(error){
            console.log('Failed to delete request: ',error);
            return false;
        };
    }
    
    
    }
    const requestDAO = new RequestDAO();
    export default requestDAO;