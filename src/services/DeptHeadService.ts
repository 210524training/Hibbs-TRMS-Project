import { NoUserMatchesUsernameError, PasswordNotMatchesError } from '../errors';
import DepartmentHead from '../models/departmentHead';
import deptHeadDAO, {DeptHeadDAO} from '../models/DAOs/DeptHeadDAO';
import uuid from 'uuid';

export class DeptHeadService{
    private DAO: DeptHeadDAO;
    constructor(){
        this.DAO= deptHeadDAO;
    }

    //CRUD
    //Create-POST:
    addDepartmentHead(departmentHead: DepartmentHead): Promise<boolean> {
        return this.DAO.addDepartmentHead(new DepartmentHead(
            departmentHead.ObjType="Department Head",
            departmentHead.ID=uuid.v4(),
            departmentHead.username,
            departmentHead.password,
            departmentHead.RealName,
            departmentHead.status="null",
            departmentHead.pendingReimbursements,
            departmentHead.awardedReimbursements,
            departmentHead.usedReimbrsements=departmentHead.pendingReimbursements+departmentHead.awardedReimbursements,
            departmentHead.availableReimbursements=1000-departmentHead.usedReimbrsements,
            departmentHead.supervisor,
            departmentHead.department,
            null,
          
        ));
      }

    //Read-GET:
    //getall:
    getAllDepartmentHeads(): Promise<DepartmentHead[]> {
        return this.DAO.getAllDepartmentHeads();
      }

    //getbyid:
    getDeptHeadByID(ID: string): Promise<DepartmentHead | null> {
        return this.DAO.getDeptHeadByID(ID);
      }



  //getbyusername:
  getDeptHeadByUsername(username: string): Promise<DepartmentHead | null> {
    return this.DAO.getDeptHeadByUsername(username);
  }


    //Update-PUT:
    updateDeptHead(departmentHead: DepartmentHead): Promise<boolean> {
        return this.DAO.update_departmentHead(new DepartmentHead(
            departmentHead.ObjType="Department Head",
            departmentHead.ID,
            departmentHead.username,
            departmentHead.password,
            departmentHead.RealName,
            departmentHead.status="null",
            departmentHead.pendingReimbursements,
            departmentHead.awardedReimbursements,
            departmentHead.usedReimbrsements=departmentHead.pendingReimbursements+departmentHead.awardedReimbursements,
            departmentHead.availableReimbursements=1000-departmentHead.usedReimbrsements,
            departmentHead.supervisor,
            departmentHead.department,
            null,
        ));
      }


    //Delete-DELETE:
    deleteDepartmentHead(ID: string): Promise<boolean> {
        return this.DAO.delete_departmentHead(ID);
      }

    registerDeptHead(employee: DepartmentHead): Promise<boolean> {
        return this.addDepartmentHead(employee);
    }
    async loginDeptHead(username: string, password: string): Promise<DepartmentHead> {
        const DeptHead = await this.DAO.getDeptHeadByUsername(username);
    
        if(!DeptHead) {
          throw new NoUserMatchesUsernameError();
        }
    
        if(DeptHead.password !== password) {
          throw new PasswordNotMatchesError();
        }
    
        return DeptHead;
      }

}

const deptheadService = new DeptHeadService();

export default deptheadService;