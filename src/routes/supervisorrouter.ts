import express, { Router } from 'express';
import supervisorService from '../services/SupervisorService';
import { AuthenticationError } from '../errors';
import supervisor from '../models/supervisor';
import session from 'express-session'

const supervisorRouter = Router();

supervisorRouter.get('/', async (req, res) => {
  console.log('Reached our supervisor router get all function');

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await supervisorService.getAllSupervisors(),
  );
});

supervisorRouter.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  res.json(
    await supervisorService.getSupervisorByID(ID),
  );
});

supervisorRouter.post('/', async (req: express.Request<unknown, unknown, supervisor, unknown, {}>, res) => {
    res.json(
      await supervisorService.addSupervisor(req.body),
    );
  });

supervisorRouter.put('/', async (req: express.Request<unknown, unknown, supervisor, unknown, {}>, res) => {
  res.json(
    await supervisorService.updateSupervisor(req.body),
  );
});

supervisorRouter.delete('/:ID', async (req, res) => {
  const { ID } = req.params;

  res.json(
    await supervisorService.deleteSupervisor(ID),
  );
});

export default supervisorRouter;