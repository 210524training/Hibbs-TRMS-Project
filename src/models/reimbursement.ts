import TableItem from "./Tableitem";
import uuid from 'uuid';

export default class Reimbursement extends TableItem{
    constructor(
        public ObjType: "Reimbursement",
        public username:string,
        public realName:string,
        public ID: string=uuid.v4(),
        public cost: number,
        public status: "Pending" | "Approved By Supervisor"|'Approved By Department Head'|'Approved By Benefits Controller' | "Rejected" | "Awarded",
        public eventType:"University Course" |"Seminar" | "Certification" | "Cert Prep" | "Technical Training" | "Other",
        public reimbursePortion: 0.8 | 0.6 | 0.75 | 1 | 0.9 | 0.3,
        public expectedAmount:number=cost*reimbursePortion,
        public Date: Date,
        public description: string,
        public grade:string,
        public gradeFormat:"letter"|"percent"|"pass/fail"|"other",
        public passingGrade:string,
        public presentationSubmission:File|null,
        
    ){
        super(ObjType,ID);
    }
}
