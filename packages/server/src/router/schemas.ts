import Router, { RouterContext } from '@koa/router';
import Koa from 'koa';

const router = new Router({
  prefix: '/schemas'
}) as Router;

router.get('/:schemaName', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  ctx.body = 'hello';
  console.table(ctx.params);
  await next();
});

export default router;
