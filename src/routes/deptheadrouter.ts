import express, { Router } from 'express';
import DeptHeadService from '../services/DeptHeadService';
import { AuthenticationError } from '../errors';
import departmentHead from '../models/departmentHead';
import session from 'express-session'

const DeptHeadRouter = Router();

DeptHeadRouter.get('/', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await DeptHeadService.getAllDepartmentHeads(),
  );
});

DeptHeadRouter.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  res.json(
    await DeptHeadService.getDeptHeadByID(ID),
  );
});

DeptHeadRouter.post('/', async (req: express.Request<unknown, unknown, departmentHead, unknown, {}>, res) => {
    res.json(
      await DeptHeadService.addDepartmentHead(req.body),
    );
  });

DeptHeadRouter.put('/', async (req: express.Request<unknown, unknown, departmentHead, unknown, {}>, res) => {
  res.json(
    await DeptHeadService.updateDeptHead(req.body),
  );
});

DeptHeadRouter.delete('/:ID', async (req, res) => {
  const { ID } = req.params;

  res.json(
    await DeptHeadService.deleteDepartmentHead(ID),
  );
});

export default DeptHeadRouter;