import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import AppStore from '../../stores/app.store.js';
import Actions from '../../actions/app.actions.js';
import Folders from '../main.folders.jsx';

const ENTER_KEY_CODE = 13;

class Folder extends React.Component {
    constructor (props) {
        super(props);

        this.parentId = this.props.directory.parentId;
        this.state = {
            isEdit: false,
            name: this.props.directory.name,
            value: (this.props.directory.name).trim(),
            child: []
        };
    }

    _open () {
        debugger;
        Actions.setActive(this.props.directory.id);
        this.setState({
            active: AppStore.getActive(),
            child: AppStore.getDirectories(this.props.directory.id)
        });
        debugger;

        Actions.getNoticesAPI();
    }

    componentWillMount () {
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount () {
        AppStore.removeChangeListener(this._onChange.bind(this));
    }

    _edit () {
        this.setState({
            isEdit: !this.state.isEdit
        });
        setTimeout(()=> {
            this.refs.input.focus();
            this.refs.input.select();
        }, 0);

    }

    _update() {
        let data = {
            id: Number(this.refs.folder.id),
            name: (this.refs.input.value).trim(),
            parentId: this.parentId
        };

        this.props.update(data);
        this.setState({
            isEdit: !this.state.isEdit,
            name: this.refs.input.value,
            value: this.refs.input.valu
        });
    }

    _onChangeInput (e) {
        this.setState({
            value: (e.target.value).trim()
        });
    }

    _onChange () {
        this.setState({
            child: AppStore.getDirectories(this.props.id)
        });
    }

    _onKeyDown (e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            this.refs.input.blur();
            this. _update();
        }
    }

    render () {
        let _child = null;
        let _classEdit = classNames('b-folder__item_title', {
            'edit': this.state.isEdit

        });
        let _classActive = classNames('b-folder__item', {
            'active': (this.props.directory.id === Number(this.props.active))
        });
        let _classIcon = classNames('fontawesome-folder-close', {
            'fontawesome-folder-open': (this.props.directory.id === Number(this.props.active))
        });
        let _childClass = null;

        if (this.state.child.length > 0) {
            _child = <Folders parentId = {this.state.active} />;
        }

        return (
            <div  className = {_childClass} >
                <div className={ _classActive }
                     id = {this.props.id}
                     ref = 'folder'
                     onClick = { this._open.bind(this) }
                     onDoubleClick = { this._edit.bind(this) }
                    >
                    <div className='b-folder__item_icon'>
                        <span className = { _classIcon }></span>
                    </div><div className={ _classEdit }>
                        <input
                            className = 'b-folder__input'
                            ref = 'input'
                            autoFocus
                            value = { this.state.value }
                            onChange = { this._onChangeInput.bind(this) }
                            onBlur = { this._update.bind(this) }
                            onKeyDown = {this._onKeyDown.bind(this)}
                            />
                        <div className = 'b-folder__title'
                            >
                            {this.state.name}
                        </div>
                    </div>
                </div>
                {_child}
            </div>
        );
    }
}

export default Folder;