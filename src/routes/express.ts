import expressSession from 'express-session';
import express, { Request, Response } from 'express';
import 'express-async-errors' ;
import path from 'path';
import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({});
const baseRouter = express.Router();

const app = express();

app.use(cors({
  credentials: true,
  origin: [
    process.env.WEB_CLIENT_ORIGIN || 'http://localhost:5000',
  ],
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(expressSession({
  secret: 'Not_Actually_Secret',
  cookie: {},
}));