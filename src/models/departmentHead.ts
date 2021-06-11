import supervisor from './supervisor';

export default class departmentHead extends supervisor{
    constructor(
        public Type: "Department Head",
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
        public superviseeNames:string[],
    ) {
        super(Type,ID,username,password,name,totalReimbursement,pendingReimbursements,awardedReimbursements,availableReimbursements,supervisor,department,superviseeNames);
    }
};