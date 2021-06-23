import express, { Router } from 'express';
import employeeService from '../services/employeeService';
import { AuthenticationError } from '../errors';
import employee from '../models/employee';
import session from 'express-session'

const employeeRouter = Router();

employeeRouter.get('/', async (req, res) => {
  console.log('Reached our employee router get all function');

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await employeeService.getAllEmployees(),
  );
});

employeeRouter.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  res.json(
    await employeeService.getEmployeeByID(ID),
  );
});

employeeRouter.post('/', async (req: express.Request<unknown, unknown, employee, unknown, {}>, res) => {
    res.json(
      await employeeService.addEmployee(req.body),
    );
  });

employeeRouter.put('/', async (req: express.Request<unknown, unknown, employee, unknown, {}>, res) => {
  res.json(
    await employeeService.updateEmployee(req.body),
  );
});

employeeRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(
    await employeeService.deleteEmployee(id),
  );
});

export default employeeRouter;