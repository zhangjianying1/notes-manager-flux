import React from 'react';
import classNames from 'classnames';

const ENTER_KEY_CODE = 13;

class Folder extends React.Component {
    constructor (props) {
        super(props);
        
        this.parentId = this.props.directory.parentId;
        this.state = {
            isEdit: false,
            name: this.props.directory.name,
            value: this.props.directory.name
        };
    }

    _open (e) {
        this.props.open(this.refs.folder.id, e);
    }
    _edit () {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }
    _update() {
        debugger;
        let data = {
            id: Number(this.refs.folder.id),
            name: this.refs.input.value,
            parentId: this.parentId
        };

        this.props.update(data);
        this.setState({
            isEdit: !this.state.isEdit,
            name: this.refs.input.value,
            value: this.refs.input.value
        });
    }

    _onChange (e) {
        this.setState({
            value: e.target.value
        });
    }

    _onKeyDown (e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            this.refs.input.getDOMNode().blur();
            this. _update();
        }
    }

    render () {
        console.log(this.props);
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
                 onClick = { this._open.bind(this) }
                 onDoubleClick = { this._edit.bind(this) }
                >
                <div className='b-folder__item_icon'>
                    <span className='fontawesome-folder-close'></span>
                </div><div className={_classEdit}>
                    <input
                        className = 'b-folder__input'
                        ref = 'input'
                        value = { this.state.value }
                        onChange = { this._onChange.bind(this) }
                        onBlur = { this._update.bind(this) }
                        onKeyDown = {this._onKeyDown.bind(this)}
                        />
                    <div className = 'b-folder__title'
                        >
                        {this.state.name}
                    </div>
                </div>
            </div>
        );
    }
}

export default Folder;