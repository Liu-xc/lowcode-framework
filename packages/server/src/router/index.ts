import schemaRouter from './schemas';
import datRouter from './form';
import compose from 'koa-compose';

export const NOT_EXIST_CODE = 2128;
export const ALREADY_EXIST_CODE = 2131;

export default compose([schemaRouter.routes(), datRouter.routes()]);