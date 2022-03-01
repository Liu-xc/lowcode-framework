import Koa from 'koa';
import Router, { RouterContext } from '@koa/router';

const router = new Router({
  prefix: '/data'
});

router.get('/:name', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { name } = ctx.params;
  ctx.body = name;
  console.log(ctx.url);
  await next();
});

export default router;