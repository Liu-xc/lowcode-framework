import Koa from 'koa';
import Router, { RouterContext } from '@koa/router';
import { FormModel, SchemaModel } from '@/db';
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
    await FormModel.find({ formKey, ...query }).then(async (doc) => {
      const fieldsMap = await SchemaModel.findOne({ name: formKey }).then(doc => {
        const { content = {} } = doc?.toObject() as any;
        const formFields: Record<string, string> = {};
        let formSchema: any = {};
        let found = false;
        const findFormSchema = (schema: any) => {
          if (found || !schema) {
            return;
          }
          if (schema.ComponentType.toLowerCase() === 'form') {
            formSchema = schema;
            found = true;
          } else {
            const { children = [] } = schema;
            children.forEach((c: any) => {
              findFormSchema(c);
            });
          }
        }
        findFormSchema(content);
        const { children = [] } = formSchema;
        children.forEach((c: any) => {
          const { props = {} } = c;
          const { fieldLabel, fieldKey } = props;
          formFields[fieldKey] = fieldLabel;
        });
        return formFields;
      });
      ctx.body = {
        values: doc.map(d => d.toObject().formValue),
        fieldsMap
      };
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