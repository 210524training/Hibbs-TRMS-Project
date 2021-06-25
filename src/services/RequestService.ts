import { NoUserMatchesUsernameError, PasswordNotMatchesError } from '../errors';
import Request from '../models/request';
import requestDAO, {RequestDAO} from '../models/DAOs/RequestDAO';
import uuid from 'uuid';

export class RequestService{
    private DAO: RequestDAO;
    constructor(){
        this.DAO= requestDAO;
    }
    //CRUD
    //Create-POST:
    addRequest(request: Request): Promise<boolean> {
        return this.DAO.addRequest(new Request(
            request.ObjType="Request",
            request.ID=uuid.v4(),
            request.ammount,
            request.status,
            request.eventType,
            request.reimbursePortion,
            request.Date,
          
        ));
      }

    //Read-GET:
    //getall:
    getAllRequests(): Promise<Request[]> {
        return this.DAO.getAllRequests();
      }

    //getbyid:
    getRequestByID(ID: string): Promise<Request | null> {
        return this.DAO.getRequestByID(ID);
      }


    //Update-PUT:
    updateReimbursement(request: Request): Promise<boolean> {
        return this.DAO.update_request(new Request(
            request.ObjType="Request",
            request.ID,
            request.ammount,
            request.status,
            request.eventType,
            request.reimbursePortion,
            request.Date,
        ));
      }


    //Delete-DELETE:
    deleteRequest(ID: string): Promise<boolean> {
        return this.DAO.delete_request(ID);
      }
}

const requestService = new RequestService();

export default requestService;