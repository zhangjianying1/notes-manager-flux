import React from 'react';
import Actions from '../actions/app.actions.js';
import AppStore from '../stores/app.store.js';

class ActionBar extends React.Component {
    constructor (prop) {
        super(prop);
        //this.state = {
        //    active: AppStore.getActive()
        //};
    }

    _create () {
        Actions.getDirectoriesAPI();
        Actions.createFolder({
            'parentId': AppStore.getActive, 'name': ' New folder'
        });

    }

    _delete () {
        if(this.state.active !== 1) {
            Actions.deleteFolder(AppStore.getActive());
            Actions.getDirectoriesAPI();
        }
    }

    componentWillMount () {
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount () {
        AppStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange () {
        this.setState({
            active: AppStore.getActive()
        });
    }

    _createNote () {

        Actions.createNotice({
                'directoryId': this.state.active,
                'title': 'TestNotice',
                'description': 'Test description',
                'tags': 'T4'
            });
    }

    render () {
        return (
            <div className='b-actionBar'>
                <div className='b-btn b-btns__add_folder'>
                    <span className='fontawesome-plus'
                        onClick = {this._create.bind(this)}></span>
                </div>
                <div className='b-btn b-btns__add_note'>
                    <span className='fontawesome-pencil'
                          onClick = {this._createNote.bind(this)}></span>
                </div>
                <div className='b-btn b-btns__remove_note'>
                    <span className='fontawesome-remove'
                        onClick = { this._delete.bind(this) }></span>
                </div>
                <div className='b-btn b-btn_more'>...</div>
            </div>
        );
    }
}

export default ActionBar;