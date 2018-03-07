import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action() {
  return {
    title: 'AI Playground - Node.js + OpenCV + React',
    description: 'having fun while playing around',
    keywords: 'node, react, opencv',
    component: (
      <Layout>
        <Home />
      </Layout>
    ),
  };
}

export default action;
