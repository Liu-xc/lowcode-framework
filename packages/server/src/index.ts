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
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';


const PORT = 8080;
const app = new Koa() as Koa;

app.use(bodyParser());
app.use(routers);
app.use(CORS());
app.use(respFormat);

mongoose.connect('mongodb://localhost:27017/lowcode').then(() => {
  console.log('mongodb connected');
  app.listen(PORT, () => console.log('morning'));
}).catch(() => {
  console.log('mongodb connect failed');
});
