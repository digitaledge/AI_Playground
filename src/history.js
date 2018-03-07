import createBrowserHistory from 'history/createBrowserHistory';

export default process.env.BROWSER && createBrowserHistory();
