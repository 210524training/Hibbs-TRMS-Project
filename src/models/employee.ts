import user from './user';
import uuid from 'uuid';

export default class Employee extends user{
    constructor(
        public ObjType: "Employee" | "Supervisor" | "Department Head" | "Benefits Controller",
        public ID: string=uuid.v4(),
        public username:String,
        public password:string,
        public RealName:string,
        public status:string='null',
        public pendingReimbursements:number,
        public awardedReimbursements:number,
        public usedReimbrsements:number=pendingReimbursements+awardedReimbursements,
        public availableReimbursements:number=1000-usedReimbrsements,
        public supervisor:null | string,
        public department:string,
    ) {
        super(ObjType,ID,username,password); 
    }
};

