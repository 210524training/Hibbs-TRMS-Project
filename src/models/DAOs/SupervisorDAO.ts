import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "../DocClient";
import supervisor from '../supervisor';
import log from "../log";

export class SupervisorDAO{
    private client: DocumentClient;
    
    constructor(){
        this.client=myDocClient;
    }
    
    //create
    async addSupervisor(supervisor: supervisor):Promise<boolean>{
    
        const params: DocumentClient.PutItemInput={
            TableName: 'TRMS-data',
            Item:{
                ...supervisor,
                ObjType:'Supervisor',
            },
            ConditionExpression: 'ID<> :ID',
            ExpressionAttributeValues:{
                ':ID':supervisor.ID,
            },
        };
        try{
            await this.client.put(params).promise();
            return true
        }catch(error){
            console.log('Failed to add supervisor: ',error);
            return false;
        }
    }
    
    
    //read:
        //getall:
        async getAllSupervisors(): Promise<supervisor[]>{
            const params: DocumentClient.QueryInput={
                TableName: 'TRMS-data',
                KeyConditionExpression: '#o = :S',
                ExpressionAttributeNames: {
                  '#o': 'ObjType',
                },
                ExpressionAttributeValues: {
                  ':S': 'Supervisor',
                },
                ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
            };
            const data=await this.client.query(params).promise();
            return data.Items as supervisor[];
        }
           

    
        //getbyid:
        async getSupervisorByID(ID: string): Promise<supervisor | null>{
            const params: DocumentClient.GetItemInput={
                TableName: 'TRMS-data',
                Key: {
                    ObjType:'Supervisor',
                    ID,
                },
                ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
                };
    
            const data=await this.client.get(params).promise();
            return data.Item as supervisor;
        }


        //getbyname:


        //getbyusername:
        async getSupervisorByUsername(username:string):Promise<supervisor|null>{
            const params: DocumentClient.QueryInput={
                TableName:'TRMS-data',
                IndexName:'username',
                KeyConditionExpression:'Type=:t AND username=:u',
                ExpressionAttributeValues:{
                    ':t':'Supervisor',
                    ':u':username,
                },
                ProjectionExpression:'Type,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
            };
            const data= await this.client.query(params).promise();
            if(!data.Items || data.Count===0){
                return null;
            }
    
            return data.Items[0] as supervisor;}
    
    
    
    //update
    async update_supervisor(supervisor:supervisor):Promise<boolean>{
        const params: DocumentClient.PutItemInput={
            TableName:'TRMS-data',
            Item:{
                ...supervisor,
                ObjType:'Supervisor',
            },
            ConditionExpression:'ID=:ID',
            ExpressionAttributeValues:{
            ':ID':supervisor.ID,
            },
        };
        try{
            await this.client.put(params).promise();
            return true;
        } catch(error){
            console.log('Failed to update supervisor: ',error);
            return false;
        }
    }
    
    
    //delete
    async delete_supervisor(ID:string):Promise<boolean>{
        const params: DocumentClient.DeleteItemInput={
            TableName:"TRMS-data",
            Key:{
                ObjType:'Supervisor',
                ID,
            },
        };
        try{
            await this.client.delete(params).promise();
            return true;
        }catch(error){
            console.log('Failed to delete supervisor: ',error);
            return false;
        };
    }
    
    
    }
    const supervisorDAO = new SupervisorDAO();
    export default supervisorDAO;