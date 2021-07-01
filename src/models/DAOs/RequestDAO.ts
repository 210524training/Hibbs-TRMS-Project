import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "../DocClient";
import request from '../request';
import log from "../log";

export class RequestDAO{
    private client: DocumentClient;
    
    constructor(){
        this.client=myDocClient;
    }
    async addRequest(request: request):Promise<boolean>{
    
        const params: DocumentClient.PutItemInput={
            TableName: 'TRMS-data',
            Item:{
                ...request,
                ObjType:'Request',
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
    async getAllRequests(): Promise<request[]>{
            const params: DocumentClient.QueryInput={
                TableName: 'TRMS-data',
                KeyConditionExpression: '#o = :r',
                ExpressionAttributeNames: {
                  '#o': 'ObjType',
                  '#s':'status',
                  '#d':'Date',
                  '#desc':'description',
                  '#u':'username',
                },
                ExpressionAttributeValues: {
                  ':r': 'Request',
                },
                ProjectionExpression:'ObjType,#u,realName,ID,cost,#s,eventType,reimbursePortion,expectedAmount,#d,#desc,grade,gradeFormat,passingGrade,presentationSubmission',
            };
            const data=await this.client.query(params).promise();
            return data.Items as request[];
        }
    async getRequestByID(ID: string): Promise<request | null>{
            const params: DocumentClient.GetItemInput={
                TableName: 'TRMS-data',
                Key: {
                    ObjType:'Request',
                    ID,
                },
                ExpressionAttributeNames:{
                    '#s':'status',
                    '#d':'Date',
                    '#desc':'description',
                    '#u':'username'
                },
                ProjectionExpression:'ObjType,#u,realName,ID,cost,#s,eventType,reimbursePortion,expectedAmount,#d,#desc,grade,gradeFormat,passingGrade,presentationSubmission',
                };
    
            const data=await this.client.get(params).promise();
            return data.Item as request;
        }
    async getRequestByUsername(username:string):Promise<request[]|null>{
            const params: DocumentClient.QueryInput={
                TableName:'TRMS-data',
                IndexName:'username',
                KeyConditionExpression:'ObjType=:o AND #u=:u',
                FilterExpression:':u=#u',
                ExpressionAttributeValues:{
                    ':o':"Employee",
                    ':u':username
                },
                ExpressionAttributeNames:{
                    '#s':'status',
                    '#d':"Date",
                    '#u':'username',
                    '#desc':'description',
                },
                ProjectionExpression:'ObjType,#u,realName,ID,cost,#s,eventType,reimbursePortion,expectedAmount,#d,#desc,grade,gradeFormat,passingGrade,presentationSubmission',
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
        
    async getRequestByStatus(status:string):Promise<request[]|null>{
        const params: DocumentClient.QueryInput={
            TableName:'TRMS-data',
            IndexName:'status',
            KeyConditionExpression:'ObjType=:o AND #s=:s',
            ExpressionAttributeValues:{
            ':o':"Request",
            ':s':status,
        },
        ExpressionAttributeNames:{
            '#s':'status',
            '#d':"Date",
            '#u':'username',
            '#desc':'description',
        },
        ProjectionExpression:'ObjType,#u,realName,ID,cost,#s,eventType,reimbursePortion,expectedAmount,#d,#desc,grade,gradeFormat,passingGrade,presentationSubmission',
    };
    let userRequests: request[]=[];
    const data=await this.client.query(params).promise();
    console.log(data);
    if(!data.Items ||data.Count===0){
        return null;
    }else{
        for(let i=0; i<data.Items.length;i++){
            userRequests.push(data.Items[i] as request);
        }
    };
    return userRequests;
};
    async update_request(request:request):Promise<boolean>{
        const params: DocumentClient.PutItemInput={
            TableName:'TRMS-data',
            Item:{
                ...request,
                ObjType:'Request',
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
    async delete_request(ID:string):Promise<boolean>{
        const params: DocumentClient.DeleteItemInput={
            TableName:"TRMS-data",
            Key:{
                ObjType:'Request',
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
    }}
    const requestDAO = new RequestDAO();
    export default requestDAO;