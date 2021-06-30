import { NoUserMatchesUsernameError, PasswordNotMatchesError } from '../errors';
import Reimbursement from '../models/reimbursement';
import reimbursementDAO, {ReimbursementDAO} from '../models/DAOs/ReimbursementDAO';
import uuid from 'uuid';

export class ReimbursementService{
    private DAO: ReimbursementDAO;
    constructor(){
        this.DAO= reimbursementDAO;
    }

    //CRUD
    //Create-POST:
    addReimbursement(reimbursement: Reimbursement): Promise<boolean> {
        return this.DAO.addReimbursement(new Reimbursement(
            reimbursement.ObjType="Reimbursement",
            reimbursement.username,
            reimbursement.realName,
            reimbursement.ID=uuid.v4(),
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

    //Read-GET:
    //getall:
     getAllReimbursements(): Promise<Reimbursement[]> {
      console.log('at reimburse get all service')  
      return this.DAO.getAllReimbursements();
        
      }

    //getbyid:
    getReimbursementByID(ID: string): Promise<Reimbursement | null> {
        return this.DAO.getReimbursementByID(ID);
      }

    //getbyusername:
    getReimbursementByUsername(username:string):Promise<Reimbursement[]|null>{
      console.log("Reached service for username: "+username);
      return this.DAO.getReimbursementByUsername(username);
    }
    
      //Update-PUT:
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


    //Delete-DELETE:
    deleteReimbursement(ID: string): Promise<boolean> {
        return this.DAO.delete_reimbursement(ID);
      }
}

const reimbursementService = new ReimbursementService();

export default reimbursementService;