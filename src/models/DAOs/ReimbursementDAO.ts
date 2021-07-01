import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "../DocClient";
import reimbursement from "../reimbursement";
import log from "../log";

export class ReimbursementDAO{
    private client: DocumentClient;
    
    constructor(){
        this.client=myDocClient;
    }
    async addReimbursement(reimbursement:reimbursement ):Promise<boolean>{ 
        const params: DocumentClient.PutItemInput={
            TableName: 'TRMS-data',
            Item:{
                ...reimbursement,
                ObjType:'Reimbursement',
            },
            ConditionExpression: 'ID<> :ID',
            ExpressionAttributeValues:{
                ':ID':reimbursement.ID,
            },
        };
        try{
            //console.log(params);
            await this.client.put(params).promise();
            return true
        }catch(error){
            console.log('Failed to add reimbursement: ',error);
            return false;
        }
    }
    async getAllReimbursements(): Promise<reimbursement[]>{
            const params: DocumentClient.QueryInput={
                TableName: 'TRMS-data',
                KeyConditionExpression: '#o = :r',
                ExpressionAttributeNames: {
                  '#o': 'ObjType',
                  '#s':'status',
                  '#d':"Date",
                  '#u':'username',
                  '#desc':'description',
                },
                ExpressionAttributeValues: {
                  ':r': 'Reimbursement',
                },
                ProjectionExpression:'ObjType,#u,realName,ID,cost,#s,eventType,reimbursePortion,expectedAmount,#d,#desc,grade,gradeFormat,passingGrade,presentationSubmission',
            };
            const data=await this.client.query(params).promise();
            return data.Items as reimbursement[];
        }
    async getReimbursementByID(ID:string): Promise<reimbursement | null>{
            const params: DocumentClient.GetItemInput={
                TableName: 'TRMS-data',
                Key: {
                    ObjType:'Reimbursement',
                    ID,
                },
                ExpressionAttributeNames:{
                    '#s':'status',
                    '#d':'Date',
                    '#u':'username',
                    '#desc':'description',
                },
                ProjectionExpression:'ObjType,#u,realName,ID,cost,#s,eventType,reimbursePortion,expectedAmount,#d,#desc,grade,gradeFormat,passingGrade,presentationSubmission',
                };
    
            const data=await this.client.get(params).promise();
            return data.Item as reimbursement;
        };
    async getReimbursementByUsername(username:string):Promise<reimbursement[]|null>{
            const params: DocumentClient.QueryInput={
                TableName:'TRMS-data',
                IndexName:'username',
                KeyConditionExpression:'ObjType=:o AND username=:u',
                
                ExpressionAttributeValues:{
                    ':o':"Reimbursement",
                    ':u':username,
                },
                ExpressionAttributeNames:{
                    '#s':'status',
                    '#d':"Date",
                    '#u':'username',
                    '#desc':'description',
                },
                ProjectionExpression:'ObjType,#u,realName,ID,cost,#s,eventType,reimbursePortion,expectedAmount,#d,#desc,grade,gradeFormat,passingGrade,presentationSubmission',
            };
            let userReimbursements: reimbursement[]=[];
            const data=await this.client.query(params).promise();
            //console.log(data);
            console.log(data.Count);
            if(!data.Items ||data.Count===0){
                return null;
            }else{
                for(let i=0; i<data.Items.length;i++){
                    userReimbursements.push(data.Items[i] as reimbursement);
                }
            };
            console.log(userReimbursements[0].expectedAmount);
            return userReimbursements;
        };
    async getReimbursementByStatus(status:string):Promise<reimbursement[]|null>{
        //console.log(status);
            const params: DocumentClient.QueryInput={
                TableName:'TRMS-data',
                IndexName:'status',
                //KeyConditionExpression:'ObjType=:o AND #s=:s',
                FilterExpression:'ObjType=:o AND #s=:s',
                ExpressionAttributeValues:{
                    ':o':"Reimbursement",
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
            //console.log(params);
            let userReimbursements: reimbursement[]=[];
            const data=await this.client.scan(params).promise();
            //console.log(data);
            //console.log(data.Items);
            
            if(!data.Items ||data.Count===0){
                console.log("where'd everything go?")
                return null;
            }else{
                for(let i=0; i<data.Items.length;i++){
                    userReimbursements.push(data.Items[i] as reimbursement);
                }
            };
            console.log(userReimbursements[0].expectedAmount);
            return userReimbursements;
        };
        
    async update_reimbursement(reimbursement:reimbursement):Promise<boolean>{
        const params: DocumentClient.PutItemInput={
            TableName:'TRMS-data',
            Item:{
                ...reimbursement,
                ObjType:'Reimbursement',
            },
            ConditionExpression:'ID=:ID',
            ExpressionAttributeValues:{
            ':ID':reimbursement.ID,
            },
        };
        console.log(reimbursement);
        try{
            await this.client.put(params).promise();
            return true;
        } catch(error){
            console.log('Failed to update reimbursement: ',error);
            return false;
        }
    }
    async delete_reimbursement(ID:string):Promise<boolean>{
        //console.log('delete DAO: '+ID);
        const params: DocumentClient.DeleteItemInput={
            TableName:"TRMS-data",
            Key:{
                ObjType:'Reimbursement',
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
    }}
    const reimbursementDAO = new ReimbursementDAO();
    export default reimbursementDAO;