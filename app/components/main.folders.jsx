import React from 'react';
import Folder from './common/common.folder.jsx';

class Folders extends React.Component {
    constructor (prop) {
        super(prop);
        this.state = {
            isEdit: false
        };
    }

    _open (id) {
       this.props.open(id);
    }

    render () {
        let directories = [];
        let allDirectories = this.props.directories;

        for (let key in allDirectories) {
            directories.push(
                <Folder
                    id = {allDirectories[key].id}
                    open = { this._open.bind(this) }
                    active = { this.props.active }
                    updateFolder = { this.props.updateFolder.bind(this) }
                    ref = 'folder'
                    key = {key}
                    directory = {allDirectories[key]}
                    />);
        }
        return (
            <div className='b-folders'>
                <div className = 'b-folders_content'>
                    {directories}
                </div>
            </div>
        );
    }
}

export default Folders;