import React from 'react';
import ReactDOM from 'react-dom/server';
import nodeFetch from 'node-fetch';
import router from '../../router';
import config from '../config';
import createFetch from '../../createFetch';
import configureStore from '../../store/configureStore';
import App from '../../components/App';
import Html from '../../components/Html';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import { setProperty } from '../../actions/app';

const reactRouter = async (req, res, next) => {
  try {
    const css = new Set();

    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
    });

    const initialState = {
      app: {},
    };

    const store = configureStore(initialState, {
      fetch,
    });

    // we can dispatch server side and pass data to the client
    store.dispatch(setProperty({ name: 'serverTime', value: Date.now() }));

    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      pathname: req.path,
      query: req.query,
      store,
      storeSubscription: null,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };

    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];
    data.scripts = [assets.vendor.js];

    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }

    data.scripts.push(assets.client.js);
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
};

export default reactRouter;
