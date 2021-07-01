import express, { Router } from 'express';
import reimbursementService from '../services/ReimburseService';
import { AuthenticationError } from '../errors';
import reimbursement from '../models/reimbursement';
import thereconciler from '../services/reconciliation';
import session from 'express-session'
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';

const reimbursementRouter = Router();

reimbursementRouter.get('/getall', async (req, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.getAllReimbursements(),
  );
});

reimbursementRouter.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.getReimbursementByUsername(username),
  );
  
});

reimbursementRouter.get('/status/:status', async (req, res) => {
  const { status } = req.params;
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.getReimbursementByStatus(status),
  );
  
});

reimbursementRouter.post('/addReimbursement', async (req: express.Request<unknown, unknown, reimbursement, unknown, {}>, res) => {
    if(!req.session.isLoggedIn || !req.session.user) {
      throw new AuthenticationError('You must be logged in to access this functionality');
    }
    res.json(
      
      await reimbursementService.addReimbursement(req.body),
    );
  });

reimbursementRouter.get('/id/:ID', async (req, res) => {
  const { ID } = req.params;
  
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.getReimbursementByID(ID),
  );
});



reimbursementRouter.put('/update', async (req: express.Request<unknown, unknown, reimbursement, unknown, {}>, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }
  res.json(
    await reimbursementService.updateReimbursement(req.body),
  );
});

reimbursementRouter.patch('/patch', async (req: express.Request<unknown, unknown, reimbursement, unknown, {}>, res) => {
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }
  let original=await reimbursementService.getReimbursementByID(req.body.ID);
  console.log(original);
  let ReconciledReimbursement=thereconciler.reconcileReimbursementUpdate(req.body,original!);
  console.log(ReconciledReimbursement);
  res.json(
    await reimbursementService.updateReimbursement(ReconciledReimbursement),
  );
});

reimbursementRouter.delete('/:ID', async (req, res) => {
  //console.log("delet router: "+req);
  const { ID } = req.params;
  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await reimbursementService.deleteReimbursement(ID),
  );
});



export default reimbursementRouter;