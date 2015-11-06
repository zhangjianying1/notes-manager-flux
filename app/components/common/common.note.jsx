import React from 'react';
import classNames from 'classnames';
import Actions from '../../actions/app.actions.js';

const ENTER_KEY_CODE = 13;

class Note extends React.Component {
    constructor (props) {
        super (props);
        debugger;
        this.state = {
            isEdit: false,
            title: this.props.notice.title,
            value: (this.props.notice.title).trim()
        };
    }

    _quickEdit () {
        debugger;
        this.setState({
            isEdit: true
        });
        setTimeout(() => {
            this.refs.input.focus();
            this.refs.input.select();
        }, 0);

    }

    _update() {
        debugger;
        let data = {
            id: Number(this.props.notice.id),
            title: (this.refs.input.value).trim(),
            position: this.props.notice.position,
            directoryId: this.props.notice.directoryId,
            description: this.props.notice.description,
            tags: this.props.notice.tags
        };

        Actions.updateNotice(data);

        this.setState({
            isEdit: false,
            title: this.refs.input.value,
            value: this.refs.input.value
        });
    }

    _onChangeInput (e) {
        this.setState({
            value: (e.target.value).trim()
        });
    }

    _onKeyDown (e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            this.refs.input.blur();
            this. _update();
        }
    }

    render () {
        let _classEdit = classNames('b-note__title', {
            'edit': this.state.isEdit

        });

        return (
            <div className='b-note'>
                <div className='b-note__icon'>
                    <img className = 'b-note__icon_img'  src='../assets/note.png' alt='note'/>
                </div>
                <div className={_classEdit}>
                    <div className = 'b-input_note__wrapper'>
                        <input ref = 'input'
                            value = { this.state.value }
                            onChange = { this._onChangeInput.bind(this) }
                            onBlur = { this._update.bind(this) }
                            onKeyDown = {this._onKeyDown.bind(this)}
                            className = 'b-input_note' />
                    </div>
                    <div className = 'b-note__title_text'
                         onDoubleClick = {this._quickEdit.bind(this)}>
                        {this.state.title}
                    </div>
                </div>
            </div>
        );
    }
}

export default Note;