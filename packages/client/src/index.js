import React from 'react';
import ReactDOM from 'react-dom';
// import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// const client = new ApolloClient({
//     uri: 'http://localhost:3000/graphql'
// });

const cache = new InMemoryCache();

const SERVICE_URL = 'http://localhost:4200/graphql';

const httpLink = new HttpLink({
    uri: SERVICE_URL,
    headers: {
        authorization: ''
    },
});
const client = new ApolloClient({
    link: httpLink,
    cache,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <Route exact path='/' component={App} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/create' component={Create} />
            <Route path='/show/:id' component={Show} />
        </Router>
    </ApolloProvider>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
