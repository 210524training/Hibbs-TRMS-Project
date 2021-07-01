import employee from './employee';
import uuid from 'uuid';

export default class Supervisor extends employee{
    constructor(
        public ObjType: "Supervisor" | "Department Head",
        public ID: string=uuid.v4(),
        public username:String,
        public password:string,
        public RealName:string,
        public status:string='null',
        public pendingReimbursements:number,
        public awardedReimbursements:number,
        public usedReimbursements:number=pendingReimbursements+awardedReimbursements,
        public availableReimbursements:number=1000-usedReimbursements,
        public supervisor:null | string,
        public department:string,
        public superviseeNames:string[] | null,
    ) {
        super(ObjType,ID,username,password,RealName,status,pendingReimbursements,awardedReimbursements,usedReimbursements,availableReimbursements,supervisor,department);
    }
};
