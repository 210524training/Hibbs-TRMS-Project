import { NoUserMatchesUsernameError, PasswordNotMatchesError } from '../errors';
import Request from '../models/request';
import requestDAO, {RequestDAO} from '../models/DAOs/RequestDAO';
import uuid from 'uuid';

export class RequestService{
    private DAO: RequestDAO;
    constructor(){
        this.DAO= requestDAO;
    }
    
    addRequest(request: Request): Promise<boolean> {
        return this.DAO.addRequest(new Request(
            request.ObjType="Request",
            request.username,
            request.realName,
            request.ID,
            request.cost,
            request.status,
            request.eventType,
            request.reimbursePortion,
            request.expectedAmount,
            request.Date,
            request.description,
            request.grade,
            request.gradeFormat,
            request.passingGrade,
            request.presentationSubmission,
          
        ));
      }

    
    getAllRequests(): Promise<Request[]> {
        return this.DAO.getAllRequests();
      }

    
    getRequestByID(ID: string): Promise<Request | null> {
        return this.DAO.getRequestByID(ID);
      }

    
    getRequestByUsername(username:string):Promise<Request[]|null>{
      return this.DAO.getRequestByUsername(username);
    };
    
      
    updateReimbursement(request: Request): Promise<boolean> {
        return this.DAO.update_request(new Request(
            request.ObjType="Request",
            request.username,
            request.realName,
            request.ID,
            request.cost,
            request.status,
            request.eventType,
            request.reimbursePortion,
            request.expectedAmount,
            request.Date,
            request.description,
            request.grade,
            request.gradeFormat,
            request.passingGrade,
            request.presentationSubmission,
        ));
      }


    
    deleteRequest(ID: string): Promise<boolean> {
        return this.DAO.delete_request(ID);
      }
}

const requestService = new RequestService();

export default requestService;