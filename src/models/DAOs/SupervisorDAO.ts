import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "../DocClient";
import supervisor from '../supervisor';
import log from "../log";

export class SupervisorDAO{
    private client: DocumentClient;
    
    constructor(){
        this.client=myDocClient;
    }
    
    
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
    async getAllSupervisors(): Promise<supervisor[]>{
            const params: DocumentClient.QueryInput={
                TableName: 'TRMS-data',
                KeyConditionExpression: '#o = :o',
                ExpressionAttributeNames: {
                  '#o': 'ObjType',
                  '#s':'status',
                  '#u':'username',
                },
                ExpressionAttributeValues: {
                  ':o': 'Supervisor',
                },
                ProjectionExpression:'#o,ID,#u,password,RealName,#s,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
            };
            const data=await this.client.query(params).promise();
            return data.Items as supervisor[];
        }
    async getSupervisorByID(ID: string): Promise<supervisor | null>{
            const params: DocumentClient.GetItemInput={
                TableName: 'TRMS-data',
                Key: {
                    ObjType:'Supervisor',
                    ID,
                },
                ProjectionExpression:'ObjType,ID,username,password,RealName,status,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
                };
    
            const data=await this.client.get(params).promise();
            return data.Item as supervisor;
        }
    async getSupervisorByUsername(username:string):Promise<supervisor|null>{
            const params: DocumentClient.QueryInput={
                TableName:'TRMS-data',
                IndexName:'username',
                KeyConditionExpression:'#o=:o AND #u=:u',
                ExpressionAttributeValues:{
                    ':o':'Supervisor',
                    ':u':username,
                },
                ExpressionAttributeNames: {
                    '#o': 'ObjType',
                    '#s':'status',
                    '#u':'username',
                  },
                ProjectionExpression:'#o,ID,#u,password,RealName,#s,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
            };
            const data= await this.client.query(params).promise();
            if(!data.Items || data.Count===0){
                return null;
            }
    
            return data.Items[0] as supervisor;}
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
    }}
    const supervisorDAO = new SupervisorDAO();
    export default supervisorDAO;