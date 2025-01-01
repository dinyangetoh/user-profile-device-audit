import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import express, { Application, RequestHandler, Router } from 'express';
import App from './app';
import { APP_PORT } from './constants';
import userAgent from 'express-useragent';
import authMiddleware from './app/middlewares/authMiddleware';

dotenv.config();

// Express App
const expressApp: Application = express();

// Express Router
const expressRouter: Router = express.Router();

// Plugins
const plugins: RequestHandler[] = [bodyParser.json(), userAgent.express()];

// Configurable Request Middlewares
const requestMiddlewares: RequestHandler[] = [authMiddleware];

const app = new App(expressApp, expressRouter, plugins, requestMiddlewares);

// Start Server here
app.startServer(APP_PORT);
