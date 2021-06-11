import expressSession from 'express-session';
import express, { Request, Response } from 'express';
import 'express-async-errors' ;
import path from 'path';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';

dotenv.config({});
const baseRouter = express.Router();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(expressSession({
  secret: 'whatever-probably-should-be-from-env-vars',
  cookie: {},
}));