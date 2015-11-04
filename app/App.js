/**
 * Created by ilitvinov on 28.10.2015.
 */
import React, { Component } from 'react';
import Header from './components/header.jsx';
import Main from './components/main.jsx';
import AppStore from './stores/app.store.js';
import Actions from './actions/app.actions.js';



export default class App extends Component {
    constructor (props) {
        super(props);
    }
    componentWillMount () {
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentDidMount () {
    }

    componentWillUnmount () {
        AppStore.removeChangeListener(this._onChange.bind(this));
    }


    _onChange () {
    }


    render() {
        return (
            <div className='b-container'>
                <Header />
                <Main
                    //open = { this._open.bind(this) }
                    //active = { this.state.opened }
                    //directories = { this.state.directories }
                    //notices = { this.state.notices }
                    //updateFolder = { this._updateFolder.bind(this) }
                    //deleteFolder = { this._deleteFolder.bind(this) }
                    />
            </div>
        );
    }
}