import React from 'react';
import Folder from './common/common.folder.jsx';
import Actions from '../actions/app.actions.js';
import AppStore from '../stores/app.store.js';
console.log('-----------------');
console.log(AppStore);

class Folders extends React.Component {
    constructor (prop) {
        super(prop);
        this.state = {
            active: AppStore.getActive(),
            directories: AppStore.getDirectories(1)
        };
    }

    _open (id, e) {
        if (e.target.id !== 'root') {
            e.stopPropagation();
        }

        Actions.setActive(id);
    }


    componentDidMount () {
        Actions.getDirectoriesAPI();
    }

    componentWillMount () {
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount () {
        AppStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange () {

        this.setState({
            directories: AppStore.getDirectories(1),
            active: AppStore.getActive()
        });
    }

    _update (data) {
        debugger;
        Actions.updateFolder(data);
        Actions.getDirectoriesAPI();
    }

    render () {
        let directories = [];
        let allDirectories = this.state.directories;

        for (let key in allDirectories) {
            directories.push(
                <Folder
                    active = { this.state.active }
                    id = {allDirectories[key].id}
                    ref = 'folder'
                    update = { this._update.bind(this) }
                    open = { this._open.bind(this) }
                    key = {key}
                    directory = {allDirectories[key]}
                    />);
        }
        return (
            <div className='b-folders'>
                <div className = 'b-folders_content'
                     id = 'root'
                     >
                    {directories}
                </div>
            </div>
        );
    }
}

export default Folders;