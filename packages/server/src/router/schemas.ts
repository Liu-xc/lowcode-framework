import Router, { RouterContext } from '@koa/router';
import { SchemaModel, StateModel } from '@/db';
import Koa from 'koa';

const router = new Router({
  prefix: '/schemas'
}) as Router;

router.get('/', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  await SchemaModel.find({}).then(
    (doc) => {
      console.log(doc);
      ctx.body = {
        schema: doc.map(d => {
          const { content, ...info } = d.toObject();
          return info;
        })
      };
    }
  ).catch(err => {
    console.log(err);
    ctx.status = 500;
    ctx.statusText = '查询失败';
    ctx.body = null;
  });

  await next();
});

router.get('/get/:schemaName', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { schemaName } = ctx.params;
  const getSchema = SchemaModel.findOne({ name: schemaName });
  const getState = StateModel.findOne({ name: schemaName });
  await Promise.all([getSchema, getState]).then(
    ([schemaDoc, stateDoc]) => {
      if (schemaDoc && stateDoc) {
        ctx.body = {
          schema: schemaDoc.toJSON(),
          state: stateDoc.toJSON()
        };
      }
    }
  ).catch(err => {
    console.log(err);
    ctx.status = 500;
    ctx.statusText = '查询失败';
    ctx.body = null;
  });
  await next();
});

router.get('/delete/:schemaName', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { schemaName } = ctx.params;
  const delSchema = SchemaModel.findOneAndDelete({ name: schemaName });
  const delState = StateModel.findOneAndDelete({ name: schemaName });
  await Promise.all([delSchema, delState]).then(
    ([schemaDoc, stateDoc]) => {
      if (schemaDoc && stateDoc) {
        ctx.body = '删除成功';
      }
    }
  ).catch(err => {
    console.log(err);
    ctx.status = 500;
    ctx.statusText = '删除失败';
    ctx.body = null;
  });
  await next();
});

router.post('/create', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { body } = ctx.request;
  const { schema, state } = body;
  const createSchema = SchemaModel.create(schema);
  const createState = StateModel.create(state);
  await Promise.all([createSchema, createState]).then(
    ([schemaDoc, stateDoc]) => {
      if (schemaDoc && stateDoc) {
        ctx.body = {
          schema: schemaDoc.toJSON(),
          state: stateDoc.toJSON()
        };
      }
    }
  ).catch(
    (err) => {
      console.log(err);
    }
  )
  await next();
});

router.post('/update', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { body } = ctx.request;
  const { schema, state } = body;
  const { name } = schema;
  const updateSchema = SchemaModel.findOneAndUpdate({ name }, schema, { new: true });
  const updateState = StateModel.findByIdAndUpdate({ name }, state, { new: true });
  await Promise.all([updateSchema, updateState]).then(
    ([schemaDoc, stateDoc]) => {
      if (schemaDoc && stateDoc) {
        ctx.body = {
          schema: schemaDoc.toJSON(),
          state: stateDoc.toJSON()
        };
      }
    }
  ).catch((err) => {
    console.log(err);
  });

  await next();
});

export default router;
