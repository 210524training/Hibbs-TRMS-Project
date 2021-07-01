import { DocumentClient } from "aws-sdk/clients/dynamodb";
import myDocClient from "../DocClient";
import departmentHead from '../departmentHead';
import log from "../log";

export class DeptHeadDAO{
    private client: DocumentClient;
    
    constructor(){
        this.client=myDocClient;
    }
    async addDepartmentHead(departmentHead: departmentHead):Promise<boolean>{
        const params: DocumentClient.PutItemInput={
            TableName: 'TRMS-data',
            Item:{
                ...departmentHead,
                ObjType:'Department Head',
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
    async getAllDepartmentHeads(): Promise<departmentHead[]>{
            const params: DocumentClient.QueryInput={
                TableName: 'TRMS-data',
                KeyConditionExpression: '#o = :D',
                ExpressionAttributeNames: {
                  '#o': 'ObjType',
                  '#s':'status',
                  '#u':'username',
                },
                ExpressionAttributeValues: {
                  ':D': 'Department Head',
                },
                ProjectionExpression:'#o,ID,#u,password,RealName,#s,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
            };
            const data=await this.client.query(params).promise();
            return data.Items as departmentHead[];
        }
    async getDeptHeadByID(ID: string): Promise<departmentHead | null>{
            const params: DocumentClient.GetItemInput={
                TableName: 'TRMS-data',
                Key: {
                    ObjType:'Department Head',
                    ID,
                },
                ProjectionExpression:'ObjType,ID,username,password,RealName,status,pendingReimbursements,awardedReimbursements,usedReimbursments,availableReimbursements,supervisor,department'
                };
    
            const data=await this.client.get(params).promise();
            return data.Item as departmentHead;
        }
    async getDeptHeadByUsername(username:string):Promise<departmentHead|null>{
            const params: DocumentClient.QueryInput={
                TableName:'TRMS-data',
                IndexName:'username',
                KeyConditionExpression:'#o=:o AND #u=:u',
                ExpressionAttributeValues:{
                    ':o':'Department Head',
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
            return data.Items[0] as departmentHead;}
    async update_departmentHead(departmentHead:departmentHead):Promise<boolean>{
        const params: DocumentClient.PutItemInput={
            TableName:'TRMS-data',
            Item:{
                ...departmentHead,
                ObjType:'Department Head',
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
    async delete_departmentHead(ID:string):Promise<boolean>{
        const params: DocumentClient.DeleteItemInput={
            TableName:"TRMS-data",
            Key:{
                ObjType:'Department Head',
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
    }}
    const deptHeadDAO = new DeptHeadDAO();
    export default deptHeadDAO;