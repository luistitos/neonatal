import { Router } from 'express';
import motherController from '../app/controllers/MotherController';
import motherChildrenController from '../app/controllers/MotherChildrenController';
import authMiddleware from '../middlewares/auth';

const routes = Router();

routes.get('/', async (request, response) => {
	await motherController().list(request, response);
});

routes.get('/:id', async (request, response) => {
	await motherController().showById(request, response);
});

routes.get('/fingers/:id', async (request, response) => {
	return await motherController().showByFingerId(request, response);
});

routes.use(authMiddleware);
routes.post('/', async (request, response) => {
	await motherController().create(request, response);
});

routes.get('/:id/children', async (request, response) => {
	await motherChildrenController().list(request, response);
});

export { routes as mothersRoutes };
