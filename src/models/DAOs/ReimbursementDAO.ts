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
                ObjType:'Reimbursement',
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

    
        //getbyid:
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

        //getbyname:
        async getReimbursementByUsername(username:string):Promise<reimbursement[]|null>{
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
                    '#u':'username',
                    '#desc':'description',
                },
                ProjectionExpression:'ObjType,#u,realName,ID,cost,#s,eventType,reimbursePortion,expectedAmount,#d,#desc,grade,gradeFormat,passingGrade,presentationSubmission',
            };
            
            let userReimbursements: reimbursement[]=[];
            const data=await this.client.query(params).promise();
            if(!data.Items ||data.Count===0){
                return null;
            }else{
                for(let i=0; i<data.Items.length;i++){
                    userReimbursements.push(data.Items[i] as reimbursement);
                }
            };
            return userReimbursements;
        };




        //getbydate:


        
    
    
    
    //update
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
    
    
    //delete
    async delete_reimbursement(ID:string):Promise<boolean>{
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
    }
    
    
    }
    const reimbursementDAO = new ReimbursementDAO();
    export default reimbursementDAO;