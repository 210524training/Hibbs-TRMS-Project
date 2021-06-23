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
            reimbursement.Type="Reimbursement",
            reimbursement.ID=uuid.v4(),
            reimbursement.ammount,
            reimbursement.status,
            reimbursement.eventType,
            reimbursement.reimbursePortion,
            reimbursement.Date,
          
        ));
      }

    //Read-GET:
    //getall:
     getAllReimbursements(): Promise<Reimbursement[]> {
        return this.DAO.getAllReimbursements();
      }

    //getbyid:
    getReimbursementByID(ID: string): Promise<Reimbursement | null> {
        return this.DAO.getReimbursementByID(ID);
      }


    //Update-PUT:
    updateReimbursement(reimbursement: Reimbursement): Promise<boolean> {
        return this.DAO.update_reimbursement(new Reimbursement(
            reimbursement.Type="Reimbursement",
            reimbursement.ID,
            reimbursement.ammount,
            reimbursement.status,
            reimbursement.eventType,
            reimbursement.reimbursePortion,
            reimbursement.Date,
        ));
      }


    //Delete-DELETE:
    deleteReimbursement(ID: string): Promise<boolean> {
        return this.DAO.delete_reimbursement(ID);
      }
}

const reimbursementService = new ReimbursementService();

export default reimbursementService;