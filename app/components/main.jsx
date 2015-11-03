import React from 'react';
import ActionBar from './main.actionbar.jsx';
import Desktop from './main.desktop.jsx';
import Folders from './main.folders.jsx';

class Main extends React.Component {
    constructor (prop) {
        super(prop);
    }

    _open (id) {
        this.props.open(id);
    }

    render () {
        return (
            <div className='b-content'>
                <ActionBar
                    create = {this.props.create.bind(this)}
                    />
                <Folders open = {this._open.bind(this)}
                    active = { this.props.active }
                    updateFolder = { this.props.updateFolder.bind(this) }
                    directories = {this.props.directories}/>
                <Desktop
                    notices = { this.props.notices }/>
            </div>
        );
    }
}

export default Main;