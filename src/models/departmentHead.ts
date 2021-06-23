import supervisor from './supervisor';
import uuid from 'uuid';

export default class DepartmentHead extends supervisor{
    constructor(
        public Type: "Department Head",
        public ID: string=uuid.v4(),
        public username:String,
        public password:string,
        public name:string,
        public pendingReimbursements:number,
        public awardedReimbursements:number,
        public usedReimbursements:number=pendingReimbursements+awardedReimbursements,
        public availableReimbursements:number=1000-usedReimbursements,
        public supervisor:null | string,
        public department:string,
        public superviseeNames:string[] | null,
    ) {
        super(Type,ID,username,password,name,pendingReimbursements,awardedReimbursements,usedReimbursements,availableReimbursements,supervisor,department,superviseeNames);
    }
};
//export function makeDeptHead(ID:string=uuid.v4(),username:string,password:string,name:string,pendingReimbursements:number,awardedReimbursements:number,supervisor:string,department:string){
//    let Dept=new DepartmentHead("Department Head",ID=uuid.v4(),username,password,name,pendingReimbursements,awardedReimbursements,pendingReimbursements+awardedReimbursements,1000-(pendingReimbursements+awardedReimbursements),supervisor,department,null);
//    return Dept;
//}