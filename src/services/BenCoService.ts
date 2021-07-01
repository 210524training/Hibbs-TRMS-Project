import { NoUserMatchesUsernameError, PasswordNotMatchesError } from '../errors';
import BenCo from '../models/BenCo';
import benCoDAO, {BenCoDAO} from '../models/DAOs/BenCoDAO';
import uuid from 'uuid';

export class BenCoService{
    private DAO: BenCoDAO;
    constructor(){
        this.DAO= benCoDAO;
    }

    //CRUD
    //Create-POST:
    addBenCo(benCo: BenCo): Promise<boolean> {
        return this.DAO.addBenCo(new BenCo(
            benCo.ObjType="Benefits Controller",
            benCo.ID=uuid.v4(),
            benCo.username,
            benCo.password,
            benCo.RealName,
            benCo.status="null",
            benCo.pendingReimbursements,
            benCo.awardedReimbursements,
            benCo.usedReimbrsements=benCo.pendingReimbursements+benCo.awardedReimbursements,
            benCo.availableReimbursements=1000-benCo.usedReimbrsements,
            benCo.supervisor,
            benCo.department,
          
        ));
      }

    //Read-GET:
     //getall:
    getAllBenCos(): Promise<BenCo[]> {
        return this.DAO.getAllBenCos();
      }

    //getbyid:
    getBenCoByID(ID: string): Promise<BenCo | null> {
        return this.DAO.getBenCoByID(ID);
      }



  //getbyusername:
  getBenCoByUsername(username: string): Promise<BenCo | null> {
    return this.DAO.getBenCoByUsername(username);
  }


    //Update-PUT:
    updateBenCo(benCo: BenCo): Promise<boolean> {
        return this.DAO.update_benCo(new BenCo(
            benCo.ObjType="Benefits Controller",
            benCo.ID,
            benCo.username,
            benCo.password,
            benCo.RealName,
            benCo.status="null",
            benCo.pendingReimbursements,
            benCo.awardedReimbursements,
            benCo.usedReimbrsements=benCo.pendingReimbursements+benCo.awardedReimbursements,
            benCo.availableReimbursements=1000-benCo.usedReimbrsements,
            benCo.supervisor,
            benCo.department,
        ));
      }


    //Delete-DELETE:
    deleteBenCo(ID: string): Promise<boolean> {
        return this.DAO.delete_benCo(ID);
      }

    registerBenCo(employee: BenCo): Promise<boolean> {
        return this.addBenCo(employee);
    }
    async loginBenCo(username: string, password: string): Promise<BenCo> {
        const BenCo = await this.DAO.getBenCoByUsername(username);
    
        if(!BenCo) {
          throw new NoUserMatchesUsernameError();
        }
    
        if(BenCo.password !== password) {
          throw new PasswordNotMatchesError();
        }
    
        return BenCo;
      }
}

const benCoService = new BenCoService();

export default benCoService;