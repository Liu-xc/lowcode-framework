import Koa from 'koa';
import Router, { RouterContext } from '@koa/router';
import { FormModel } from '@/db';

const router = new Router({
  prefix: '/form'
});

router.get('/:name', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { name } = ctx.params;
  ctx.body = name;
  // console.log(ctx.url);
  await next();
});

router.post('/', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { body } = ctx.request;
  const { formKey, formValue } = body;
  await FormModel.create({
    formKey,
    formValue,
  }).then(() => {
    ctx.status = 200;
  }).catch(() => {
    ctx.status = 500;
    ctx.statusText = '提交失败';
  });
  await next();
});

export default router;