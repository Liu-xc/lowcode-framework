import schemaRouter from './schemas';
import datRouter from './data';
import compose from 'koa-compose';

export default compose([schemaRouter.routes(), datRouter.routes()]);