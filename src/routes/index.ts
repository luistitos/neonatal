import { Router } from 'express';
import { childrenRoutes } from './children.routes';
import { fingerRoutes } from './finger.routes';
import { mothersRoutes } from './mothers.routes';
import { pageRoutes } from './pages.routes';
import { searchRoutes } from './search.routes';
import { sessionRoutes } from './sessions.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/sessions', sessionRoutes);
routes.use('/users', usersRoutes);
routes.use('/mothers', mothersRoutes);
routes.use('/children', childrenRoutes);
routes.use('/search', searchRoutes);
routes.use('/fingers', fingerRoutes);
routes.use(pageRoutes);

export default routes;
