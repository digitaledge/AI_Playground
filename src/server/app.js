import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';

import Html from '../components/Html';
import errorPageStyle from '../routes/error/ErrorPage.css';
import config from './config';
import reactRouter from './routes/reactRouter';
import api from './routes/api';
import { ErrorPageWithoutStyle } from '../routes/error/ErrorPage';

const app = express();

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// take care of the order, reactRouter should be after express routes
app.use('/api', api);
app.get('*', reactRouter);

// handle errors
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

// run server
if (!module.hot) {
  app.listen(config.port, () => {
    console.info(`Server is running at http://localhost:${config.port}/`);
  });
}

// HMR
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('../router');
}

export default app;
