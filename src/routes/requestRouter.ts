import express, { Router } from 'express';
import requestService from '../services/RequestService';
import { AuthenticationError } from '../errors';
import request from '../models/request';
import session from 'express-session'

const requestRouter = Router();

requestRouter.get('/', async (req, res) => {
  

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await requestService.getAllRequests(),
  );
});

requestRouter.get('/:ID', async (req, res) => {
  const { ID } = req.params;
  

  res.json(
    await requestService.getRequestByID(ID),
  );
});

requestRouter.get('/:username', async (req, res) => {
  const { username } = req.params;
  

  res.json(
    await requestService.getRequestByUsername(username),
  );
});

requestRouter.post('/addRequest', async (req: express.Request<unknown, unknown, request, unknown, {}>, res) => {
    res.json(
      await requestService.addRequest(req.body),
    );
  });

requestRouter.put('/', async (req: express.Request<unknown, unknown, request, unknown, {}>, res) => {
  res.json(
    await requestService.updateReimbursement(req.body),
  );
});

requestRouter.delete('/:ID', async (req, res) => {
  const { ID } = req.params;

  res.json(
    await requestService.deleteRequest(ID),
  );
});

export default requestRouter;