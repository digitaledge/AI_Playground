import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import queryString from 'query-string';
import { createPath } from 'history/PathUtils';
import App from './components/App';
import createFetch from './createFetch';
import configureStore from './store/configureStore';
import history from './history';
import { updateMeta, updateLink } from './DOMTools';
import router from './router';

// https://facebook.github.io/react/docs/context.html
const context = {
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
  fetch: createFetch(fetch, {
    baseUrl: window.App.apiUrl,
  }),
  store: configureStore(window.App.state, { history }),
  storeSubscription: null,
};

const container = document.getElementById('app');
let currentLocation = history.location;
let appInstance;

const scrollPositionsHistory = {};

async function onLocationChange(location, action) {
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };

  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }

  currentLocation = location;

  const isInitialRender = !action;
  try {
    context.pathname = location.pathname;
    context.query = queryString.parse(location.search);

    const route = await router.resolve(context);

    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    const renderReactApp = isInitialRender ? ReactDOM.hydrate : ReactDOM.render;
    appInstance = renderReactApp(
      <App context={context}>{route.component}</App>,
      container,
      () => {
        if (isInitialRender) {
          if (window.history && 'scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
          }
          const elem = document.getElementById('css');
          if (elem) elem.parentNode.removeChild(elem);
          return;
        }

        document.title = route.title;

        updateMeta('description', route.description);
        updateMeta('keywords', route.keywords);
        updateLink('canonical', route.canonicalUrl);

        let scrollX = 0;
        let scrollY = 0;
        const pos = scrollPositionsHistory[location.key];
        if (pos) {
          scrollX = pos.scrollX;
          scrollY = pos.scrollY;
        } else {
          const targetHash = location.hash.substr(1);
          if (targetHash) {
            const target = document.getElementById(targetHash);
            if (target) {
              scrollY = window.pageYOffset + target.getBoundingClientRect().top;
            }
          }
        }

        window.scrollTo(scrollX, scrollY);

        if (window.ga) {
          window.ga('send', 'pageview', createPath(location));
        }
      },
    );
  } catch (error) {
    if (__DEV__) {
      throw error;
    }
    if (!isInitialRender && currentLocation.key === location.key) {
      console.error('Reloading the page after error');
      window.location.reload();
    }
  }
}

history.listen(onLocationChange);
onLocationChange(currentLocation);

// Enable HMR
if (module.hot) {
  module.hot.accept('./router', () => {
    if (appInstance && appInstance.updater.isMounted(appInstance)) {
      deepForceUpdate(appInstance);
    }
    onLocationChange(currentLocation);
  });
}
