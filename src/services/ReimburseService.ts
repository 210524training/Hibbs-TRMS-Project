import { NoUserMatchesUsernameError, PasswordNotMatchesError } from '../errors';
import Reimbursement from '../models/reimbursement';
import reimbursementDAO, {ReimbursementDAO} from '../models/DAOs/ReimbursementDAO';
import uuid from 'uuid';

export class ReimbursementService{
    private DAO: ReimbursementDAO;
    constructor(){
        this.DAO= reimbursementDAO;
    }

    
    addReimbursement(reimbursement: Reimbursement): Promise<boolean> {
      
        return this.DAO.addReimbursement(new Reimbursement(
            reimbursement.ObjType="Reimbursement",
            reimbursement.username,
            reimbursement.realName,
            reimbursement.ID,
            reimbursement.cost,
            reimbursement.status,
            reimbursement.eventType,
            reimbursement.reimbursePortion,
            reimbursement.expectedAmount=reimbursement.cost*reimbursement.reimbursePortion,
            reimbursement.Date,
            reimbursement.description,
            reimbursement.grade,
            reimbursement.gradeFormat,
            reimbursement.passingGrade,
            reimbursement.presentationSubmission,
          
        ));
      }

    
     getAllReimbursements(): Promise<Reimbursement[]> {
      
      return this.DAO.getAllReimbursements();
        
      }

    
    getReimbursementByID(ID: string): Promise<Reimbursement | null> {
        return this.DAO.getReimbursementByID(ID);
      }

    
    getReimbursementByUsername(username:string):Promise<Reimbursement[]|null>{
      
      return this.DAO.getReimbursementByUsername(username);
    }

    getReimbursementByStatus(status:string):Promise<Reimbursement[]|null>{
      
      return this.DAO.getReimbursementByStatus(status);
    }
    
      
    updateReimbursement(reimbursement: Reimbursement): Promise<boolean> {
       
      return this.DAO.update_reimbursement(new Reimbursement(
            reimbursement.ObjType="Reimbursement",
            reimbursement.username,
            reimbursement.realName,
            reimbursement.ID,
            reimbursement.cost,
            reimbursement.status,
            reimbursement.eventType,
            reimbursement.reimbursePortion,
            reimbursement.expectedAmount,
            reimbursement.Date,
            reimbursement.description,
            reimbursement.grade,
            reimbursement.gradeFormat,
            reimbursement.passingGrade,
            reimbursement.presentationSubmission,
        ));
      }

      

    
    deleteReimbursement(ID: string): Promise<boolean> {
      //console.log("delete service: "+ID)
        return this.DAO.delete_reimbursement(ID);
      }
}

const reimbursementService = new ReimbursementService();

export default reimbursementService;