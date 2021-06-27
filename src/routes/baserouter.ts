import express, { Router } from 'express';
import helmet from 'helmet';


import employeerouter from './employeerouter';
import supervisorrouter from './supervisorrouter';
import deptheadrouter from './deptheadrouter';
import bencorouter from './benCoRouter';
import reimburserouter from './reimburseRouter';
import requestrouter from './requestRouter';

import employeeservice from "../services/employeeService";
import supervisorservice from '../services/SupervisorService';
import deptheadservice from '../services/DeptHeadService';
import bencoservice from '../services/BenCoService';
import reimbursementservice from '../services/ReimburseService';
import requestservice from '../services/RequestService';

const cors={
    origin:"localhost:3050"
}

const baseRouter=Router();

/*
baseRouter.get('/employeeLogin',async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
    res.send()
});
*/

baseRouter.post('/employeeLogin', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
    const { username, password } = req.body;
    //console.log("username at baseRouter: "+username);
    //console.log("request reached /employeelogin")
    const employee = await employeeservice.loginEmployee(username, password);
  
    req.session.isLoggedIn = true;
  
    req.session.user = employee;

    //res.header("Access-Control-Allow-Origin",cors.origin);
  
    res.json(req.session.user); 
});

baseRouter.post('/supervisorLogin', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
    const { username, password } = req.body;
  
    const supervisor = await supervisorservice.loginSupervisor(username, password);
  
    req.session.isLoggedIn = true;
  
    req.session.user = supervisor;
  
    res.json(req.session.user);
});

baseRouter.post('/departmentHeadLogin', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
    const { username, password } = req.body;
  
    const departmenthead = await deptheadservice.loginDeptHead(username, password);
  
    req.session.isLoggedIn = true;
  
    req.session.user = departmenthead;
  
    res.json(req.session.user);
});

baseRouter.post('/benCologin', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
    const { username, password } = req.body;
  
    const benco = await bencoservice.loginBenCo(username, password);
  
    req.session.isLoggedIn = true;
  
    req.session.user = benco;
  
    res.json(req.session.user);
});

export async function logout(req: express.Request, res: express.Response): Promise<void> {
    if(req.session.user) {
      const { username } = req.session.user;
  
      req.session.destroy(() => {
        console.log(`${username} logged out`);
      });
    }
    
  
    res.status(202).send();
}
  
baseRouter.post('/logout', logout);

baseRouter.use('/api/v1/employee', employeerouter);
baseRouter.use('/api/v1/supervisor', supervisorrouter);
baseRouter.use('/api/v1/departmenthead',deptheadrouter);
baseRouter.use('/api/v1/benCo',bencorouter);
baseRouter.use('/api/v1/reimbursement',reimburserouter);
baseRouter.use('/api/v1/request',requestrouter);



export default baseRouter;