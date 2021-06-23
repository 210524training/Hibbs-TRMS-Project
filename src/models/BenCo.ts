import employee from './employee';
import uuid from 'uuid';

export default class BenCo extends employee{
    constructor(
        public Type: "Benefits Controller",
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
    ) {
        super(Type,ID,username,password,name,pendingReimbursements,awardedReimbursements,usedReimbursements,availableReimbursements,supervisor,department);
    }
};
//export function makebenCo(ID:string=uuid.v4(),username:string,password:string,name:string,pendingReimbursements:number,awardedReimbursements:number,supervisor:string,department:string){
//    let benCo=new BenCo("Benefits Controller",ID=uuid.v4(),username,password,name,pendingReimbursements,awardedReimbursements,pendingReimbursements+awardedReimbursements,1000-(pendingReimbursements+awardedReimbursements),supervisor,department);
//    return benCo;
//}