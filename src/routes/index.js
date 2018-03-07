/* eslint-disable global-require */
const routes = {
  path: '',
  children: [
    {
      path: '',
      load: () => import(/* webpackMode: 'eager' */ './home'),
    },
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './not-found'),
    },
  ],
  async action({ next }) {
    const route = await next();

    // Some defaults, metadata etc...
    route.title = `${route.title || 'Untitled Page'} - `;
    route.description = route.description || '';

    return route;
  },
};

if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
