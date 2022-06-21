import express, { NextFunction, Request, Response } from 'express';
import { resolve } from 'path';
import { AppError } from './app/errors/AppError';
import 'express-async-errors';
import cors from 'cors';

import './database';
import routes from './routes';

const app = express();
app.use('/views', express.static(resolve(__dirname, 'app', 'views')));
app.set('view engine', 'ejs');
app.set('views', resolve(__dirname, 'app', 'views'));

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				status: 'Error',
				message: err.message
			});
		}
		return response.status(500).json({
			status: 'Error',
			message: `Internal server error - ${err.message}`
		});
	}
);

export default app;
