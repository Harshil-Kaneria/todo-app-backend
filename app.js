import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit'
import helmet from "helmet";

import { StatusCodes } from "http-status-codes";
import { generateResponse } from "./src/helpers"
global.StatusCodes = StatusCodes
global.generateResponse = generateResponse

import publicRoutes from './src/routes/public';
import apiRoutes from './src/routes/api';
import apiMiddleware from './src/middleware/apiAuth';
import errorHandler from './src/middleware/errorHandler';

const limiter  = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use(bodyParser.json());
app.use(limiter)
app.use('/api', apiMiddleware, apiRoutes);
app.use('/public/api', publicRoutes);
app.use(errorHandler);

module.exports = app;
