import { Router, Request, Response } from 'express';
import FingerController from '../app/controllers/FingerController';

const routes = Router();

routes.post('/:type', (request: Request, response: Response) => {
	FingerController().create(request, response);
});

routes.get('/save/last/', (request, response) => {
	FingerController().saveLast(request, response);
});

routes.get('/:id', (request, response) => {
	FingerController().showFinger(request, response);
});

export { routes as fingerRoutes };
