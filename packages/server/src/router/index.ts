import schemaRouter from './schemas';
import datRouter from './form';
import compose from 'koa-compose';

export default compose([schemaRouter.routes(), datRouter.routes()]);