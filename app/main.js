import React from 'react';
import MainPage from './components/main.jsx';
import Header from './components/header.jsx';
import Create from './components/create.jsx';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import { createHistory, useBasename } from 'history';


console.log(Router);
export default class App extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className='b-container'>
                <Header />
                {this.props.children}
            </div>
        );
    }
}



render((
    <Router>
        <Route path='/home' component={App}>
            <IndexRoute component = {MainPage} />
            <Route path ='/create' component = {Create}>
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));

