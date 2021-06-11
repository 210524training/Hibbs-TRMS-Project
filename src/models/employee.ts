import user from './user';

export default class employee extends user{
    constructor(
        public Type: "Employee" | "Supervisor" | "Department Head" | "Benefits Controller",
        public ID: number,
        public username:String,
        public password:string,
        public name:string,
        public totalReimbursement:number=1000,
        public pendingReimbursements:number,
        public awardedReimbursements:number,
        public availableReimbursements:number=totalReimbursement-pendingReimbursements-awardedReimbursements,
        public supervisor:null | string,
        public department:string,
    ) {
        super(Type,ID,username,password);
    }
};