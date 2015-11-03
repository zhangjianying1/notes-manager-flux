import React from 'react';
import classNames from 'classnames';

class Folder extends React.Component {
    constructor (props) {
        super(props);
        debugger;
        this.parentId = this.props.directory.parentId;
        this.state = {
           isEdit: false
        };
    }

    _open () {
        this.props.open(this.refs.folder.id);
    }
    _edit () {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }
    _update() {
        let data = {
            id: this.refs.folder.id,
            name: this.refs.input.value,
            parentId: this.parentId
        };

        this.props.updateFolder(data);
        this.setState({
            isEdit: !this.state.isEdit
        });
    }
    render () {
        let _classEdit = classNames('b-folder__item_title', {
            'edit': this.state.isEdit
        });
        let _classActive = classNames('b-folder__item', {
            'active': (this.props.directory.id === Number(this.props.active))
        });

        return (
            <div className={ _classActive }
                 id = {this.props.directory.id}
                 ref = 'folder'
                 onClick = {this._open.bind(this)}
                >
                <div className='b-folder__item_icon'>
                    <span className='fontawesome-folder-close'></span>
                </div><div className={_classEdit}>
                    <input
                        className = 'b-folder__input'
                        onBlur = {this._update.bind(this)}
                        ref = 'input'
                        />
                    <div className = 'b-folder__title'
                         onDoubleClick = {this._edit.bind(this)}>
                        {this.props.directory.name}
                    </div>
                </div>
            </div>
        );
    }
}

export default Folder;