import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "../DocClient";
import departmentHead from '../departmentHead';
import log from "../log";

export class DeptHeadDAO{
    private client: DocumentClient;
    
    constructor(){
        this.client=myDocClient;
    }
    
    //create
    async addDepartmentHead(departmentHead: departmentHead):Promise<boolean>{
    
        const params: DocumentClient.PutItemInput={
            TableName: 'TRMS-data',
            Item:{
                ...departmentHead,
                type:'Department Head',
            },
            ConditionExpression: 'ID<> :ID',
            ExpressionAttributeValues:{
                ':ID':departmentHead.ID,
            },
        };
        try{
            await this.client.put(params).promise();
            return true
        }catch(error){
            console.log('Failed to add department head: ',error);
            return false;
        }
    }
    
    
    //read:
        //getall:
        async getAllDepartmentHeads(): Promise<departmentHead[]>{
            const params: DocumentClient.QueryInput={
                TableName: 'TRMS-data',
                KeyConditionExpression: '#o = :D',
                ExpressionAttributeNames: {
                  '#o': 'ObjType',
                },
                ExpressionAttributeValues: {
                  ':D': 'Department Head',
                },
                ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
            };
            const data=await this.client.query(params).promise();
            return data.Items as departmentHead[];
        }

    
        //getbyid:
        async getDeptHeadByID(ID: string): Promise<departmentHead | null>{
            const params: DocumentClient.GetItemInput={
                TableName: 'TRMS-data',
                Key: {
                    Type:'Department Head',
                    ID,
                },
                ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
                };
    
            const data=await this.client.get(params).promise();
            return data.Item as departmentHead;
        }


        //getbyname:


        //getbyusername;
        async getDeptHeadByUsername(username:string):Promise<departmentHead|null>{
            const params: DocumentClient.QueryInput={
                TableName:'TRMS-data',
                IndexName:'username',
                KeyConditionExpression:'ObjType=:o AND username=:u',
                ExpressionAttributeValues:{
                    ':o':'Department Head',
                    ':u':username,
                },
                ProjectionExpression:'ObjType,ID,username,password,RealName,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
            };
            const data= await this.client.query(params).promise();
            if(!data.Items || data.Count===0){
                return null;
            }
    
            return data.Items[0] as departmentHead;}
    
    
    
    //update:
    async update_departmentHead(departmentHead:departmentHead):Promise<boolean>{
        const params: DocumentClient.PutItemInput={
            TableName:'TRMS-data',
            Item:{
                ...departmentHead,
                type:'Department Head',
            },
            ConditionExpression:'ID=:ID',
            ExpressionAttributeValues:{
            ':ID':departmentHead.ID,
            },
        };
        try{
            await this.client.put(params).promise();
            return true;
        } catch(error){
            console.log('Failed to update department head: ',error);
            return false;
        }
    }
    
    
    
    //delete
    async delete_departmentHead(ID:string):Promise<boolean>{
        const params: DocumentClient.DeleteItemInput={
            TableName:"TRMS-data",
            Key:{
                Type:'Department Head',
                ID,
            },
        };
        try{
            await this.client.delete(params).promise();
            return true;
        }catch(error){
            console.log('Failed to delete department head: ',error);
            return false;
        };
    }
    
    
    }
    const deptHeadDAO = new DeptHeadDAO();
    export default deptHeadDAO;