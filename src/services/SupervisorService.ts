import { NoUserMatchesUsernameError, PasswordNotMatchesError } from '../errors';
import Supervisor from '../models/supervisor';
import supervisorDAO, {SupervisorDAO} from '../models/DAOs/SupervisorDAO';
import uuid from 'uuid';

export class SupervisorService{
    private DAO: SupervisorDAO;
    constructor(){
        this.DAO= supervisorDAO;
    }

    //CRUD
    //Create-POST:
    addSupervisor(supervisor: Supervisor): Promise<boolean> {
        return this.DAO.addSupervisor(new Supervisor(
            supervisor.Type="Supervisor",
            supervisor.ID=uuid.v4(),
            supervisor.username,
            supervisor.password,
            supervisor.name,
            supervisor.pendingReimbursements,
            supervisor.awardedReimbursements,
            supervisor.usedReimbrsements=supervisor.pendingReimbursements+supervisor.awardedReimbursements,
            supervisor.availableReimbursements=1000-supervisor.usedReimbrsements,
            supervisor.supervisor,
            supervisor.department,
            null,
          
        ));
      }

    //Read-GET:
    //getall:
    getAllSupervisors(): Promise<Supervisor[]> {
        return this.DAO.getAllSupervisors();
      }

    //getbyid:
    getSupervisorByID(ID: string): Promise<Supervisor | null> {
        return this.DAO.getSupervisorByID(ID);
      }



  //getbyusername:
  getSupervisorByUsername(username: string): Promise<Supervisor | null> {
    return this.DAO.getSupervisorByUsername(username);
  }


    //Update-PUT:
    updateSupervisor(supervisor: Supervisor): Promise<boolean> {
        return this.DAO.update_supervisor(new Supervisor(
            supervisor.Type="Supervisor",
            supervisor.ID,
            supervisor.username,
            supervisor.password,
            supervisor.name,
            supervisor.pendingReimbursements,
            supervisor.awardedReimbursements,
            supervisor.usedReimbrsements=supervisor.pendingReimbursements+supervisor.awardedReimbursements,
            supervisor.availableReimbursements=1000-supervisor.usedReimbrsements,
            supervisor.supervisor,
            supervisor.department,
            null,
        ));
      }


    //Delete-DELETE:
    deleteSupervisor(ID: string): Promise<boolean> {
        return this.DAO.delete_supervisor(ID);
      }

    registerSupervisor(supervisor: Supervisor): Promise<boolean> {
        return this.addSupervisor(supervisor);
    }
    async loginSupervisor(username: string, password: string): Promise<Supervisor> {
        const Supe = await this.DAO.getSupervisorByUsername(username);
    
        if(!Supe) {
          throw new NoUserMatchesUsernameError();
        }
    
        if(Supe.password !== password) {
          throw new PasswordNotMatchesError();
        }
    
        return Supe;
      }


}
const supervisorService = new SupervisorService();

export default supervisorService;