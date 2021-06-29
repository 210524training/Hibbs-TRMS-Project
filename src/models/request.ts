import TableItem from "./Tableitem";
import uuid from 'uuid';

export default class Request extends TableItem{
    constructor(
        public ObjType: "Request",
        public username:string,
        public realName:string,
        public ID: string=uuid.v4(),
        public cost: number,
        public status: "Pending" | "Approved By Supervisor"|'Approved By Department Head'|'Approved By Benefits Controller' | "Rejected" | "Awarded",
        public eventType:"University Course" |"Seminar" | "Certification" | "Cert Prep"| "Technical Training" | "Other",
        //Books and other course materials aren't reimbursed just the direct costs such as tuition
        public reimbursePortion: 0.8 | 0.6 | 0.75 | 1 | 0.9 | 0.3,
        public expectedAmount:number=cost*reimbursePortion,
        public Date: Date,
        public description:string,
        public grade:string,
        public gradeFormat:"letter"|"percent"|"pass/fail"|"other",
        public passingGrade:string,
        public presentationSubmission:File|null,
        
    ){
        super(ObjType,ID);
    }
}
//export function makeRequest(ID:string=uuid.v4(),ammount:number,status:"pending"|"approved"|"rejected"|"awarded",eventType:"University Course(s)"|"Seminar"|"Certification"|"Cert Prep"|"Certification"|"Technical Training"|"Other",reimbursePortion:0.8|0.6|0.75|1|0.9|0.3,Date:Date){
//    let request=new Request("Request",ID=uuid.v4(),ammount,status,eventType,reimbursePortion,Date);
//    return request;
//}