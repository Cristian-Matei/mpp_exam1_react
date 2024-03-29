import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
//import App from './App';
import Login from './components/Login';
import Game from './components/Game';
import SignIn from './components/Signin';
const routing = (
    <Router>
        <div>
            <Route exact path="/" component = {Login} />
            <Route path="/game" component = {Game} />
            <Route path="/sign" component = {SignIn} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
