import TableItem from "./Tableitem";
import uuid from 'uuid';

export default class Reimbursement extends TableItem{
    constructor(
        public ObjType: "Reimbursement",
        public username:string,
        public realName:string,
        public ID: string,
        public cost: number,
        public status: "Pending" | "ApprovedBySupervisor"|'ApprovedByDepartmentHead'|'ApprovedByBenefitsController' | "Rejected" | "Awarded"|'',
        public eventType:"University Course" |"Seminar" | "Certification" | "Cert Prep" | "Technical Training" | "Other",
        public reimbursePortion: 0.8 | 0.6 | 0.75 | 1 | 0.9 | 0.3,
        public expectedAmount:number=cost*reimbursePortion,
        public Date: string,
        public description: string,
        public grade:string,
        public gradeFormat:"letter"|"percent"|"pass/fail"|"other",
        public passingGrade:string,
        public presentationSubmission:File|null,
        
    ){
        super(ObjType,ID);
    }
}
