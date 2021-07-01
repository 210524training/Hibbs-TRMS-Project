import reimburseService from './ReimburseService';
import reimburseDAO from '../models/DAOs/ReimbursementDAO'
import Reimbursement from '../models/reimbursement';
class reconciler{
    constructor(){}

reconcileReimbursementUpdate(reimbursement: Reimbursement,original:Reimbursement): Reimbursement {
          reimbursement.ObjType="Reimbursement";
          reimbursement.username=original!.username;
          reimbursement.realName=original!.realName;
          reimbursement.ID=original!.ID;
          reimbursement.cost=original!.cost;
          reimbursement.status;
          reimbursement.eventType=original!.eventType;
          reimbursement.reimbursePortion=original!.reimbursePortion;
          reimbursement.expectedAmount=original!.expectedAmount;
          reimbursement.Date=original!.Date;
          reimbursement.description=original!.description;
          reimbursement.grade=original!.grade;
          reimbursement.gradeFormat=original!.gradeFormat;
          reimbursement.passingGrade=original!.gradeFormat;
          reimbursement.presentationSubmission=original!.presentationSubmission;
      return reimbursement;
    };
}
const thereconciler=new reconciler();
export default thereconciler;