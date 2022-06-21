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

routes.post('/search/type/:type', (request, response) => {
	FingerController().setLastSearchType(request, response);
});

routes.post('/search/:id', (request, response) => {
	FingerController().setLastSearch(request, response); // Pesquisar aqui
});

routes.get('/search/last', (request, response) => {
	FingerController().getSearch(request, response);
});

routes.get('/match', (request, response) => {
	FingerController().verifyMatch(request, response);
});

export { routes as fingerRoutes };
