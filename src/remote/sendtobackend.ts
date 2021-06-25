import TRMSClient from "./axiosClient";
import employee from '../models/employee';
import supervisor from '../models/supervisor';
import departmentHead from '../models/departmentHead';
import benCo from '../models/BenCo';

export async function  sendEmployeeLogin(username: string, password: string): Promise<employee> {
  const {data: Employee} = await TRMSClient.post<employee>('/employeeLogin', {
    username,
    password,
  });

  return Employee;
}

export async function sendSupervisorLogin(username: string, password: string): Promise<supervisor>{
  const {data: Supervisor} = await TRMSClient.post<supervisor>('/supervisorLogin', {
    username,
    password,
  });

  return Supervisor;
}

export async function sendDeptHeadLogin(username: string, password: string): Promise<departmentHead>{
  const {data: DeptHead} = await TRMSClient.post<departmentHead>('/departmentHeadLogin', {
    username,
    password,
  });

  return DeptHead;
}

export async function sendBenCoLogin(username: string, password: string): Promise<benCo>{
  const {data: Benco} = await TRMSClient.post<benCo>('/benCoLogin', {
    username,
    password,
  });

  return Benco;
}