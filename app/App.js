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
        this.state = {
            directories: AppStore.getDirectories(1),
            notices: AppStore.getNotices(1),
            opened: 1
        };
    }

    _create () {
        debugger;
        Actions.createFolder({ 'parentId': 1, 'name': 'TeqstTEst' });
        Actions.getDirectoriesAPI();
    }

    componentWillMount () {
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentDidMount () {
        Actions.getDirectoriesAPI();
        Actions.getNoticesAPI();
    }

    componentWillUnmount () {
        AppStore.removeChangeListener(this._onChange.bind(this));
    }

    _open (id) {
        Actions.getDirectoriesAPI();
        Actions.getNoticesAPI();
        this.setState({
            opened: id
        });
    }

    _updateFolder (data) {
        debugger;
        Actions.updateFolder(data);
        Actions.getDirectoriesAPI();
    }

    _onChange () {
       this.setState({
            directories: AppStore.getDirectories(1),
            notices: AppStore.getNotices(this.state.opened)
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className='b-container'>
                <Header />
                <Main create = { this._create.bind(this) }
                    open = { this._open.bind(this) }
                    active = { this.state.opened }
                    directories = { this.state.directories }
                    notices = { this.state.notices }
                    updateFolder = {this._updateFolder.bind(this)}/>
            </div>
        );
    }
}