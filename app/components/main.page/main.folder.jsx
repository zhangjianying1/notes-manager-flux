import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import AppStore from '../../stores/app.store.js';
import Actions from '../../actions/app.actions.js';
import Folders from './main.folders.jsx';

const ENTER_KEY_CODE = 13;


class Folder extends React.Component {
    constructor(props) {
        super(props);
        this.parentId = this.props.directory.parentId;
        this.id = this.props.directory.id;
        this.state = {
            isEdit: false,
            child: [],
            value: this.props.directory.name,
            name: this.props.directory.name
        };


    }

    _open() {
        Actions.setActive(this.props.directory.id);
        this.setState({
            active: AppStore.getActive(),
            child: AppStore.getDirectories(this.props.directory.id)
        });

        Actions.getNoticesAPI();
    }

    componentWillMount() {
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        debugger;
        AppStore.removeChangeListener(this._onChange.bind(this));
    }

    _edit() {
        this.setState({
            isEdit: !this.state.isEdit,
            value: this.state.name
        });
        setTimeout(()=> {
            this.refs.input.focus();
            this.refs.input.select();
        }, 0);

    }

    _update() {
        let data = {
            id: this.id,
            name: (this.refs.input.value),
            parentId: this.parentId
        };

        this.props.update(data);

        this.setState({
            isEdit: !this.state.isEdit,
            name: this.refs.input.value
        });
    }

    _onChangeInput(e) {
        this.setState({
            value: e.target.value
        });
    }

    _onChange() {
        console.info(AppStore.getDirectories(this.props.directory.id));

        this.setState({
            child: AppStore.getDirectories(this.props.directory.id)
        });

    }

    _onKeyDown(e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            this.refs.input.blur();
            this. _update();
        }
    }

    render() {
        let _child = null;

        const _classEdit = classNames('b-folder__item_title', {
            'edit': this.state.isEdit

        });
        const _classActive = classNames('b-folder__item', {
            'active': (this.props.directory.id === Number(this.props.active))
        });
        const _classIcon = classNames('fontawesome-folder-close', {
            'fontawesome-folder-open': (this.props.directory.id === Number(this.props.active))
        });


        if (this.state.child) {
            _child = <Folders parentId={this.state.active}/>;
        }

        //if(this.id === AppStore.getActive()) {
        //
        //    this._open();
        //}
        return (
            <div>
                <div className={ _classActive }
                     id={this.id}
                     ref='folder'
                     onClick={ this._open.bind(this) }
                     onDoubleClick={ this._edit.bind(this) }
                >
                    <div className='b-folder__item_icon'>
                        <span className={ _classIcon }></span>
                    </div>
                    <div className={ _classEdit }>
                        <input
                            className='b-folder__input'
                            ref='input'
                            value={ this.state.value }
                            onChange={ this._onChangeInput.bind(this) }
                            onBlur={ this._update.bind(this) }
                            onKeyDown={this._onKeyDown.bind(this)}
                        />
                        <div className='b-folder__title'
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