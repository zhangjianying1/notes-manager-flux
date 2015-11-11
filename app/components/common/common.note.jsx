import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Actions from '../../actions/app.actions.js';
import { Link } from 'react-router';
import { DragSource } from 'react-dnd';

const ENTER_KEY_CODE = 13;
const noteSource = {
    beginDrag(props) {
        return {};
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class Note extends React.Component {
    constructor(props) {
        debugger;
        super(props);
        this.state = {
            isEdit: false,
            value: (this.props.notice.title).trim()
        };
    }

    _quickEdit() {

        this.setState({
            isEdit: true
        });
        setTimeout(() => {
            this.refs.input.focus();
            this.refs.input.select();
        }, 0);

    }

    _update() {
        let data = {
            id: Number(this.props.notice.id),
            title: (this.state.value).trim(),
            position: this.props.notice.position,
            directoryId: this.props.notice.directoryId,
            description: this.props.notice.description,
            tags: this.props.notice.tags
        };

        Actions.updateNotice(data);

        this.setState({
            isEdit: false
        });
    }

    _onChangeInput(e) {
        this.setState({
            value: (e.target.value).trim()
        });
    }

    _onKeyDown(e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            this.refs.input.blur();
            this._update();
        }
    }

    render() {
        let _classEdit = classNames('b-note__title', {
            'edit': this.state.isEdit
        });
        const { connectDragSource, isDragging } = this.props;

        debugger;
        return connectDragSource(
            <div className='b-note' style={{
                opacity: isDragging ? 0.5 : 1
                }}>
                <div className='b-note__icon'>
                    <Link to={`/update/${this.props.notice.id}`}>
                        <img onDragStart={() => { return false; }}
                             className='b-note__icon_img'
                             src='../assets/note.png'
                             alt='note'/>
                    </Link>
                </div>
                <div className={_classEdit}>
                    <div className='b-input_note__wrapper'>
                        <input ref='input'
                               value={ this.state.value }
                               onChange={ this._onChangeInput.bind(this) }
                               onBlur={ this._update.bind(this) }
                               onKeyDown={this._onKeyDown.bind(this)}
                               className='b-input_note'/>
                    </div>
                    <div className='b-note__title_text'
                         onDoubleClick={this._quickEdit.bind(this)}>
                        {this.props.notice.title}
                    </div>
                </div>
            </div>
        );
    }
}

Note.propsTypes = {
    notice: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default DragSource('note', noteSource, collect)(Note);
