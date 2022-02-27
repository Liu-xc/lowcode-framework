/**
 * 需要哪些依赖
 * - koa
 * - koa router
 * - @koa/cors
 * - @types/koa
 * - axios
 * - koa body parser
*/
import Koa from 'koa';
import routers from './router';
import CORS from '@koa/cors';
import respFormat from '@/middlewares/responseFormater';

const PORT = 8080;
const app = new Koa() as Koa;

app.use(routers);
app.use(CORS());
app.use(respFormat);

app.listen(PORT, () => console.log('morning'))