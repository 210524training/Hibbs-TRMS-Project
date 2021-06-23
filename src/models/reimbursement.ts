import TableItem from "./Tableitem";
import uuid from 'uuid';

export default class Reimbursement extends TableItem{
    constructor(
        public Type: "Reimbursement",
        public ID: string=uuid.v4(),
        public ammount: number,
        public status: "pending" | "approved" | "rejected" | "awarded",
        public eventType:"University Course(s)" |"Seminar" | "Certification" | "Cert Prep" | "Certification" | "Technical Training" | "Other",
        //Books and other course materials aren't reimbursed just the direct costs such as tuition
        public reimbursePortion: 0.8 | 0.6 | 0.75 | 1 | 0.9 | 0.3,
        public Date: Date,
        
    ){
        super(Type,ID);
    }
}
//export function makeReimbursement(ID:string=uuid.v4(),ammount:number,status:"pending"|"approved"|"rejected"|"awarded",eventType:"University Course(s)"|"Seminar"|"Certification"|"Cert Prep"|"Certification"|"Technical Training"|"Other",reimbursePortion:0.8|0.6|0.75|1|0.9|0.3,Date:Date){
//    let reimbursement=new Reimbursement("Reimbursement",ID=uuid.v4(),ammount,status,eventType,reimbursePortion,Date);
//    return reimbursement;
//}