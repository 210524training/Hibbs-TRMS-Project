import express, { Router } from 'express';
import reimbursementService from '../services/ReimburseService';
import { AuthenticationError } from '../errors';
import reimbursement from '../models/reimbursement';
import session from 'express-session'

const reimbursementRouter = Router();

reimbursementRouter.get('/', async (req, res) => {
  console.log('Reached our reimbursement router get all function');

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.getAllReimbursements(),
  );
});

reimbursementRouter.get('/:ID', async (req, res) => {
  const { ID } = req.params;
  //console.log(req);
  //console.log(res);

  res.json(
    await reimbursementService.getReimbursementByID(ID),
  );
});

reimbursementRouter.get('/:username', async (req, res) => {
  const { username } = req.params;
  //console.log(req);
  //console.log(res);

  res.json(
    await reimbursementService.getReimbursementByUsername(username),
  );
});

reimbursementRouter.post('/addReimbursement', async (req: express.Request<unknown, unknown, reimbursement, unknown, {}>, res) => {
    console.log(req.body);
    //console.log(res.json(req.body));
    res.json(
      
      await reimbursementService.addReimbursement(req.body),
    );
  });

reimbursementRouter.put('/', async (req: express.Request<unknown, unknown, reimbursement, unknown, {}>, res) => {
  res.json(
    await reimbursementService.updateReimbursement(req.body),
  );
});

reimbursementRouter.delete('/:ID', async (req, res) => {
  const { ID } = req.params;

  res.json(
    await reimbursementService.deleteReimbursement(ID),
  );
});

export default reimbursementRouter;