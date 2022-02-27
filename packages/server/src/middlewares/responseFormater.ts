import Koa from 'koa';
import { Response } from '@/types';

const OkStatus = [200];

export default async function respFormat(ctx: Koa.BaseContext, next: Koa.Next) {
  await next();
  const { body, status } = ctx;
  if (OkStatus.some(s => s === status)) {
    const data = body;
    ctx.body = {
      data,
      status,
      statusText: 'OK'
    } as Response;
  } else {
    const err = body as Error;
    ctx.body = {
      data: null,
      status,
      statusText: err.message || '服务端错误'
    } as Response;
  }
}