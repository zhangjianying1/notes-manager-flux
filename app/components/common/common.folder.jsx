import React from 'react';
import classNames from 'classnames';

class Folder extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
           isEdit: true
        };
    }

    _open () {
        debugger;
        this.props.open(this.refs.folder.id);
    }
    _edit () {

    }
    render () {
        debugger;
        let _classNames = classNames('b-folder__item_title', {
            'edit': this.state.isEdit
        });

        return (
            <div className='b-folder__item'
                 id = {this.props.directory.id}
                 ref = 'folder'
                 onClick = {this._open.bind(this)}
                >
                <div className='b-folder__item_icon'>
                    <span className='fontawesome-folder-close'></span>
                </div><div className={_classNames}>
                    <input className = 'b-folder__input' />
                    <div className = 'b-folder__title'>
                        {this.props.directory.name}
                    </div>
                </div>
            </div>
        );
    }
}

export default Folder;