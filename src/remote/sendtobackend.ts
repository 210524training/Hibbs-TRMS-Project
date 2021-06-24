import TRMSClient from "./axios";
import employee from '../models/employee';
import supervisor from '../models/supervisor';
import departmentHead from '../models/departmentHead';
import benCo from '../models/BenCo';

export const sendEmployeeLogin = async (username: string, password: string): Promise<employee> => {
  const {data: Employee} = await TRMSClient.post<employee>('/employeeLogin', {
    username,
    password,
  });

  return Employee;
}

export const sendSupervisorLogin = async (username: string, password: string): Promise<supervisor> => {
  const {data: Supervisor} = await TRMSClient.post<supervisor>('/supervisorLogin', {
    username,
    password,
  });

  return Supervisor;
}

export const sendDeptHeadLogin = async (username: string, password: string): Promise<departmentHead> => {
  const {data: DeptHead} = await TRMSClient.post<departmentHead>('/departmentHeadLogin', {
    username,
    password,
  });

  return DeptHead;
}

export const sendBenCoLogin = async (username: string, password: string): Promise<benCo> => {
  const {data: Benco} = await TRMSClient.post<benCo>('/benCoLogin', {
    username,
    password,
  });

  return Benco;
}