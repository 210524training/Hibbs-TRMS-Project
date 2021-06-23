import employee from './employee';
import uuid from 'uuid';

export default class Supervisor extends employee{
    constructor(
        public Type: "Supervisor" | "Department Head",
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
        super(Type,ID,username,password,name,pendingReimbursements,awardedReimbursements,usedReimbursements,availableReimbursements,supervisor,department);
    }
};
//export function makeSupervisor(ID:string=uuid.v4(),username:string,password:string,name:string,pendingReimbursements:number,awardedReimbursements:number,supervisor:string,department:string){
//    let Supe=new Supervisor("Supervisor",ID=uuid.v4(),username,password,name,pendingReimbursements,awardedReimbursements,pendingReimbursements+awardedReimbursements,1000-(pendingReimbursements+awardedReimbursements),supervisor,department,null);
//    return Supe;
//}