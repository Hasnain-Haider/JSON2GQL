import Router from 'koa-router';
import passport from 'koa-passport';
import config from '../../config';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import koaBody from 'koa-bodyparser';
import genGQLSchema from '../db/genGQLSchema';

const router = new Router();

module.exports = (app, resources) => {
  const schema = genGQLSchema(resources);
  router.post('/graphql', koaBody(), graphqlKoa({ schema }));
  router.get('/graphql', graphqlKoa({ schema }));
  router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
  app.use(router.allowedMethods());
  app.use(router.routes());
  return app;
};
