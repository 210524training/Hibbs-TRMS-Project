import express, { Router } from 'express';
import benCoService from '../services/BenCoService';
import { AuthenticationError } from '../errors';
import benCo from '../models/BenCo';
import session from 'express-session'

const benCoRouter = Router();

benCoRouter.get('/', async (req, res) => {
  console.log('Reached our benefits controller router get all function');

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new AuthenticationError('You must be logged in to access this functionality');
  }

  res.json(
    await benCoService.getAllBenCos(),
  );
});

benCoRouter.get('/:ID', async (req, res) => {
  const { ID } = req.params;

  res.json(
    await benCoService.getBenCoByID(ID),
  );
});

benCoRouter.post('/', async (req: express.Request<unknown, unknown, benCo, unknown, {}>, res) => {
    res.json(
      await benCoService.addBenCo(req.body),
    );
  });

benCoRouter.put('/', async (req: express.Request<unknown, unknown, benCo, unknown, {}>, res) => {
  res.json(
    await benCoService.updateBenCo(req.body),
  );
});

benCoRouter.delete('/:ID', async (req, res) => {
  const { ID } = req.params;

  res.json(
    await benCoService.deleteBenCo(ID),
  );
});

export default benCoRouter;