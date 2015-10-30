/**
 * Created by ilitvinov on 28.10.2015.
 */

import React, { Component } from 'react';
import Header from './components/header.jsx';
import Main from './components/main.jsx';
import AppStore from './stores/app.store.js';

export default class App extends Component {
    render() {
        return (
            <div className='b-container'>
                <Header />
                <Main/>
            </div>
        );
    }
}