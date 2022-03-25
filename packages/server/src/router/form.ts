import Koa from 'koa';
import Router, { RouterContext } from '@koa/router';
import { FormModel } from '@/db';
import { NOT_EXIST_CODE, ALREADY_EXIST_CODE } from '.';

const checkFormExistence = async (formKey: string): Promise<boolean> => {
  return await FormModel.findOne({ formKey }).then(doc => {
    if (doc) {
      return true;
    }
    return false;
  });
}

const router = new Router({
  prefix: '/form'
});

router.get('/:formKey', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { formKey } = ctx.params;
  const { query = {} } = ctx;
  const existence = await checkFormExistence(formKey);

  if (existence) {
    await FormModel.find({ formKey, ...query }).then(doc => {
      ctx.body = doc.map(d => d.toObject().formValue);
      ctx.status = 200;
    }).catch(() => {
      ctx.status = 500;
      ctx.statusText = '查询出错';
      ctx.code = 500;
    });
  } else {
    ctx.body = [];
    ctx.status = 200;
    ctx.statusText = `${formKey}不存在`;
  }
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