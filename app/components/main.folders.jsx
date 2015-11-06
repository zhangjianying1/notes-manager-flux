import React from 'react';
import Folder from './common/common.folder.jsx';
import Actions from '../actions/app.actions.js';
import AppStore from '../stores/app.store.js';
import classNames from 'classnames';

class Folders extends React.Component {
    constructor (prop) {
        super(prop);

        this.state = {
            active: AppStore.getActive(),
            directories: AppStore.getDirectories(Number(this.props.parentId))
        };
    }

    _open (id, e) {

        Actions.setActive(Number(id));
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
            directories: AppStore.getDirectories(Number(this.props.parentId)),
            active: AppStore.getActive()
        });
    }

    _update (data) {
        Actions.updateFolder(data);
        Actions.getDirectoriesAPI();
    }

    render () {
        let directories = [];
        let allDirectories = this.state.directories;
        let _childClass = classNames({
            'child': (Number(this.props.parentId) !== 1)
        });

        for (let key in allDirectories) {
            directories.push(
                <Folder
                    active = { this.state.active }
                    id = {allDirectories[key].id}
                    ref = 'folder'
                    onChange = {this._onChange.bind(this)}
                    update = { this._update.bind(this) }
                    open = { this._open.bind(this) }
                    key = {key}
                    directory = {allDirectories[key]}
                    />);
        }
        return (
                <div className = { _childClass }>
                    {directories}
                </div>
        );
    }
}

export default Folders;