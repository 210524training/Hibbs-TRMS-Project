import TableItem from "./Tableitem";

export default class reimbursement extends TableItem{
    constructor(
        public Type: "Reimbursement",
        public ID: number,
        public ammount: number,
        public status: "pending" | "approved" | "rejected" | "awarded",
        public eventType:"University Course(s)" |"Seminar" | "Certification" | "Cert Prep" | "Certification" | "Technical Training" | "Other",
        //Books and other course materials aren't reimbursed just the direct costs such as tuition
        public reimbursePortion: 0.8 | 0.6 | 0.75 | 1 | 0.9 | 0.3,
        
    ){
        super(Type,ID);
    }
}