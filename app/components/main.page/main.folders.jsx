import React from 'react';
import Folder from './main.folder.jsx';
import Actions from '../../actions/app.actions.js';
import AppStore from '../../stores/app.store.js';
import classNames from 'classnames';

class Folders extends React.Component {
    constructor (prop) {
        super(prop);

        this.state = {
            active: AppStore.getActive(),
            directories: AppStore.getDirectories(Number(this.props.parentId))
        };
    }

    componentWillMount () {
        Actions.getDirectoriesAPI();
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount () {
        AppStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange () {
        if(!this.props.parentId) return;

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
        let _childClass = classNames({
            'child': (Number(this.props.parentId) !== 1)
        });

        this.state.directories.forEach((item, i) => {
            directories.push(
                <Folder
                    active = { this.state.active }
                    ref = 'folder'
                    onChange = {this._onChange.bind(this)}
                    update = { this._update.bind(this) }
                    key={i}
                    directory = {item}
                />);
        });

        return (
                <div className = { _childClass }>
                    {directories}
                </div>
        );
    }
}

export default Folders;