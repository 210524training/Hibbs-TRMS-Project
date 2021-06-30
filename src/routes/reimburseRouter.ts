import express, { Router } from 'express';
import reimbursementService from '../services/ReimburseService';
import { AuthenticationError } from '../errors';
import reimbursement from '../models/reimbursement';
import session from 'express-session'

const reimbursementRouter = Router();

reimbursementRouter.get('/getall', async (req, res) => {
  console.log('Reached our reimbursement router get all router');

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.getAllReimbursements(),
  );
});

reimbursementRouter.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  //username.substring(1);
  console.log("Reached router for username: "+username);
  //console.log(req);
  //console.log(res);
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.getReimbursementByUsername(username),
  );
});

reimbursementRouter.post('/addReimbursement', async (req: express.Request<unknown, unknown, reimbursement, unknown, {}>, res) => {
    console.log(req.body);
    //console.log(res.json(req.body));
    if(!req.session.isLoggedIn || !req.session.user) {
      throw new AuthenticationError('You must be logged in to access this functionality');
    }
    res.json(
      
      await reimbursementService.addReimbursement(req.body),
    );
  });

reimbursementRouter.get('/id/:ID', async (req, res) => {
  const { ID } = req.params;
  //console.log(req);
  //console.log(res);
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.getReimbursementByID(ID),
  );
});



reimbursementRouter.put('/', async (req: express.Request<unknown, unknown, reimbursement, unknown, {}>, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.updateReimbursement(req.body),
  );
});

reimbursementRouter.delete('/:ID', async (req, res) => {
  const { ID } = req.params;

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.deleteReimbursement(ID),
  );
});



export default reimbursementRouter;