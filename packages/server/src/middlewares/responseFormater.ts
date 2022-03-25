import Koa from 'koa';
import { Response } from '@/types';

const OkStatus = [200];

export default async function respFormat(ctx: Koa.Context, next: Koa.Next) {
  await next();
  const { body = {}, status } = ctx;
  if (OkStatus.some(s => s === status)) {
    const data = (body as any).code ? { ...(body as any), message: ctx.statusText } : body;
    ctx.body = {
      data,
      status,
      statusText: (ctx as any).statusText || 'OK',
    } as Response;
  } else {
    const err = body as Error;
    ctx.body = {
      data: null,
      status,
      statusText: err?.message || '服务端错误',
    } as Response;
  }
}