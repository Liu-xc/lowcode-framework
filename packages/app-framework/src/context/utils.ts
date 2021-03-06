import Router, { RouterContext } from '@koa/router';
import { checkExistence, SchemaModel, StateModel } from '@/db';
import Koa from 'koa';
import { NOT_EXIST_CODE, ALREADY_EXIST_CODE } from '.';

const router = new Router({
  prefix: '/schemas'
}) as Router;

router.get('/', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { query = {} } = ctx;
  await SchemaModel.find({ ...query }).then(
    (doc) => {
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
      } else {
        ctx.body = {
          code: NOT_EXIST_CODE
        };
        ctx.statusText = "schema不存在";
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
  const exist = await checkExistence(schemaName);
  if (exist) {
    const existDataSchema = SchemaModel.findOneAndDelete({ bindSchema: schemaName });
    const delSchema = SchemaModel.findOneAndDelete({ name: schemaName });
    const delState = StateModel.findOneAndDelete({ name: schemaName });
    await Promise.all([delSchema, delState, existDataSchema]).then(
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
  } else {
    ctx.statusText = 'schema不存在';
    ctx.status = 200;
    ctx.body = {
      code: NOT_EXIST_CODE
    };
  }

  await next();
});

router.post('/create', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { body } = ctx.request;
  const { schema, state } = body;
  const { bindSchema } = schema;
  const exist = await checkExistence(schema.name);
  if (!exist) {
    const createSchema = SchemaModel.create(schema);
    const createState = StateModel.create(state);
    const updateForm = bindSchema && SchemaModel.findOneAndUpdate({ name: bindSchema }, { dataSchema: schema.name });
    await Promise.all([createSchema, createState, updateForm]).then(
      ([schemaDoc, stateDoc,]) => {
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
  } else {
    ctx.status = 200;
    ctx.statusText = `${schema.name}已存在`;
    ctx.body = {
      code: ALREADY_EXIST_CODE,
    };
  }

  await next();
});

router.post('/update', async (ctx: RouterContext<any, Koa.Context>, next: Koa.Next) => {
  const { body } = ctx.request;
  const { schema, state } = body;
  const { name } = schema;
  const exist = await checkExistence(name);
  if (exist) {
    const updateSchema = SchemaModel.findOneAndUpdate({ name }, schema, { new: true });
    const updateState = StateModel.findOneAndUpdate({ name }, state, { new: true });
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
  } else {
    ctx.status = 200;
    ctx.statusText = "schema不存在";
    ctx.body = {
      code: NOT_EXIST_CODE
    };
  }

  await next();
});

export default router;
