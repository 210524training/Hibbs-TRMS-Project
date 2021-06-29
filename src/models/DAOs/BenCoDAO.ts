import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "../DocClient";
import benCo from '../BenCo';
import log from "../log";

export class BenCoDAO{
    private client: DocumentClient;
    
    constructor(){
        this.client=myDocClient;
    }
    
    //create
    async addBenCo(benCo: benCo):Promise<boolean>{
    
        const params: DocumentClient.PutItemInput={
            TableName: 'TRMS-data',
            Item:{
                ...benCo,
                ObjType:'Benefits Controller',
            },
            ConditionExpression: 'ID<> :ID',
            ExpressionAttributeValues:{
                ':ID':benCo.ID,
            },
        };
        try{
            await this.client.put(params).promise();
            return true
        }catch(error){
            console.log('Failed to add benefits controller: ',error);
            return false;
        }
    }
    
    
   //read:
        //getall:
        async getAllBenCos(): Promise<benCo[]>{
            const params: DocumentClient.QueryInput={
                TableName: 'TRMS-data',
                KeyConditionExpression: '#) = :B',
                ExpressionAttributeNames: {
                  '#O': 'ObjType',
                },
                ExpressionAttributeValues: {
                  ':B': 'Benefits Controller',
                },
                ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
            };
            const data=await this.client.query(params).promise();
            return data.Items as benCo[];
        }
           

    
        //getbyid:
        async getBenCoByID(ID: string): Promise<benCo | null>{
            const params: DocumentClient.GetItemInput={
                TableName: 'TRMS-data',
                Key: {
                    ObjType:'Benefits Controller',
                    ID,
                },
                ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
                };
    
            const data=await this.client.get(params).promise();
            return data.Item as benCo;
        }


        //getbyname:


        //getbyusername:
        async getBenCoByUsername(username:string):Promise<benCo|null>{
            const params: DocumentClient.QueryInput={
                TableName:'TRMS-data',
                IndexName:'username',
                KeyConditionExpression:'ObjType=:o AND username=:u',
                ExpressionAttributeValues:{
                    ':o':'Benefits Controller',
                    ':u':username,
                },
                ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
            };
            const data= await this.client.query(params).promise();
            if(!data.Items || data.Count===0){
                return null;
            }
    
            return data.Items[0] as benCo;}
    
    
    
    
    //update
    async update_benCo(benCo:benCo):Promise<boolean>{
        const params: DocumentClient.PutItemInput={
            TableName:'TRMS-data',
            Item:{
                ...benCo,
                ObjType:'Benefits Controller',
            },
            ConditionExpression:'ID=:ID',
            ExpressionAttributeValues:{
            ':ID':benCo.ID,
            },
        };
        try{
            await this.client.put(params).promise();
            return true;
        } catch(error){
            console.log('Failed to update benCo: ',error);
            return false;
        }
    }
    
    
    //delete
    async delete_benCo(ID:string):Promise<boolean>{
        const params: DocumentClient.DeleteItemInput={
            TableName:"TRMS-data",
            Key:{
                ObjType:'Benefits Controller',
                ID,
            },
        };
        try{
            await this.client.delete(params).promise();
            return true;
        }catch(error){
            console.log('Failed to delete benCo: ',error);
            return false;
        };
    }
    
    
    }
    const benCoDAO = new BenCoDAO();
export default benCoDAO;