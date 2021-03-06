//import bodyParser from 'body-parser';
import expressSession from 'express-session';
import Express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors' ;
import { NoUserFoundError, PasswordNotMatchesError, AuthenticationError } from '../errors';
//import path from 'path';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import log from '../models/log';
import baseRouter from './baserouter';

dotenv.config({});


const app = Express();


app.use(helmet());
app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(Express.json());

app.use(expressSession({
  secret: 'Not_Actually_Secret',
  cookie: {secure:false},
  resave:false,
  saveUninitialized:false,
}));

app.use('/', baseRouter);

const { BAD_REQUEST, UNAUTHORIZED } = StatusCodes;
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof NoUserFoundError) {
    log.error(err);
    res.status(BAD_REQUEST).json({
      error: err.message,
    });

    return;
  }

  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof PasswordNotMatchesError) {
    log.error(err);
    res.status(BAD_REQUEST).json({
      error: err.message,
    });

    return;
  }

  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AuthenticationError) {
    log.error(err);
    res.status(UNAUTHORIZED).json({
      error: err.message,
    });

    return;
  }

  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  
  console.log('Our custom error handler');
  log.error(err);
  res.status(BAD_REQUEST).json({
    error: err.message,
  });

  next(err);
});

export default app;