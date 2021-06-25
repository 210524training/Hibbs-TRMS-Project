import { NoUserMatchesUsernameError, PasswordNotMatchesError } from '../errors';
import Employee from '../models/employee';
import employeeDAO, {EmployeeDAO} from '../models/DAOs/EmployeeDAO';
import uuid from 'uuid';

export class EmployeeService{
    private DAO: EmployeeDAO;
    constructor(){
        this.DAO= employeeDAO;
    }

    //CRUD
    //Create-POST:
    addEmployee(employee: Employee): Promise<boolean> {
        return this.DAO.addEmployee(new Employee(
            employee.ObjType="Employee",
            employee.ID=uuid.v4(),
            employee.username,
            employee.password,
            employee.RealName,
            employee.pendingReimbursements,
            employee.awardedReimbursements,
            employee.usedReimbrsements=employee.pendingReimbursements+employee.awardedReimbursements,
            employee.availableReimbursements=1000-employee.usedReimbrsements,
            employee.supervisor,
            employee.department,
          
        ));
      }

    //Read-GET:
        //getall:
        getAllEmployees(): Promise<Employee[]> {
            return this.DAO.getAllEmployees();
          }
    
    
        //getbyid:
        getEmployeeByID(ID: string): Promise<Employee | null> {
            return this.DAO.getEmployeeByID(ID);
          }



      //getbyusername:
      getEmployeeByUsername(username: string): Promise<Employee | null> {
        return this.DAO.getEmployeeByUsername(username);
      }


    //Update-PUT:
    updateEmployee(employee: Employee): Promise<boolean> {
        return this.DAO.update_Employee(new Employee(
            employee.ObjType="Employee",
            employee.ID,
            employee.username,
            employee.password,
            employee.RealName,
            employee.pendingReimbursements,
            employee.awardedReimbursements,
            employee.usedReimbrsements=employee.pendingReimbursements+employee.awardedReimbursements,
            employee.availableReimbursements=1000-employee.usedReimbrsements,
            employee.supervisor,
            employee.department,
        ));
      }


    //Delete-DELETE:
    deleteEmployee(ID: string): Promise<boolean> {
        return this.DAO.delete_employee(ID);
      }

    registerEmployee(employee: Employee): Promise<boolean> {
        return this.addEmployee(employee);
    }
    async loginEmployee(username: string, password: string): Promise<Employee> {
      //console.log("username at service: "+username);  
      const Emp = await this.DAO.getEmployeeByUsername(username);
    
        if(!Emp) {
          throw new NoUserMatchesUsernameError();
        }
    
        if(Emp.password !== password) {
          throw new PasswordNotMatchesError();
        }
    
        return Emp;
      }

}
const employeeService = new EmployeeService();

export default employeeService;
