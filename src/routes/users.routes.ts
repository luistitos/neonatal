import { Router } from 'express';
import userController from '../app/controllers/UserController';
import authMiddleware from '../middlewares/auth';

const routes = Router();

routes.post('/', async (request, response) => {
	await userController().create(request, response);
});
routes.use(authMiddleware);
export { routes as usersRoutes };
