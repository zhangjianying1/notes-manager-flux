import React from 'react';

class Folder extends React.Component {
    constructor (props) {
        super(props);
    }

    _open () {
        debugger;
        this.props.open(this.refs.folder.id);
    }
    render () {
        return (
            <div className='b-folder__item'
                 id = {this.props.directory.id}
                 ref = 'folder'
                 onClick = {this._open.bind(this)}
                >
                <div className='b-folder__item_icon'>
                    <span className='fontawesome-folder-close'></span>
                </div><div className='b-folder__item_title'>
                    {this.props.directory.name}
                </div>
            </div>
        );
    }
}

export default Folder;