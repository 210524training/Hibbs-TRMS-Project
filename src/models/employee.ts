import user from './user';
import uuid from 'uuid';

export default class Employee extends user{
    constructor(
        public Type: "Employee" | "Supervisor" | "Department Head" | "Benefits Controller",
        public ID: string=uuid.v4(),
        public username:String,
        public password:string,
        public name:string,
        public pendingReimbursements:number,
        public awardedReimbursements:number,
        public usedReimbrsements:number=pendingReimbursements+awardedReimbursements,
        public availableReimbursements:number=1000-usedReimbrsements,
        public supervisor:null | string,
        public department:string,
    ) {
        super(Type,ID,username,password); 
    }
};

//export function makeEmployee(ID:string=uuid.v4(),username:string,password:string,name:string,pendingReimbursements:number,awardedReimbursements:number,supervisor:string,department:string){
//    let Emp=new Employee("Employee",ID=uuid.v4(),username,password,name,pendingReimbursements,awardedReimbursements,pendingReimbursements+awardedReimbursements,1000-(pendingReimbursements+awardedReimbursements),supervisor,department);
//    return Emp;
//}