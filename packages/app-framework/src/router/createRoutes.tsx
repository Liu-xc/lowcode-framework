import React from 'react';
import { Route, Redirect, RouteProps, RedirectProps } from 'react-router-dom';
import CacheRoute from 'react-router-cache-route';

/**
 * TODO
 * 设计routeProps
 * 实现createRoute\createRoutes
 * 支持配置SchemaName以及配置getPageSchema
*/

// TODO
// * 用react-router-cache-route实现keep-alive

// ? 从哪里传入getPageSchema
// * 应该从app那里的外层提供一个context
// * 提供：getPageSchema\renderEngine\StatusView\componentsMap

export interface RouteConfig extends Partial<RouteProps>, Partial<Omit<RedirectProps, 'path'>> {
  schemaName?: string;
  redirect?: boolean;
  keepAlive?: boolean;
}

export interface RouteConfigMap {
  [routeName: string]: RouteConfig;
}

export function createRoute(routeConfig: RouteConfig) {
  const {
    path,
    redirect,
    to,
    from,
    keepAlive = true,
    schemaName,
    component,
    exact,
    ...otherProps
  } = routeConfig;

  const DefaultComp = () => <>default comp</>;

  let RouteComp = keepAlive ? CacheRoute : Route;
  let Component = schemaName ? DefaultComp : component || DefaultComp;

  if (redirect && to) {
    // TODO 重定向
    return (
      <Redirect
        key={to.toString()}
        to={to}
        from={from}
        exact={exact}
      />
    );
  }

  if (schemaName) {
    const getPageSchema = (name: string) => {console.log(name); return name;};
    const renderEngine = (schema: string) => <>{schema}</>;
    try {
      const schema = getPageSchema(schemaName);
      Component = () => renderEngine(schema);
    } catch (error) {
      throw new Error(`获取schema ${schemaName} 失败`);
    }
  }

  return <RouteComp key={path?.toString()} path={path} component={Component} exact={exact} {...otherProps} />;
}

export default function createRoutes(routeConfigMap: RouteConfigMap) {
  const routeList = Object.keys(routeConfigMap);
  return routeList.map(name => {
    const routeConfig = routeConfigMap[name];
    return createRoute(routeConfig);
  });
}
