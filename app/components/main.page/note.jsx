import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Actions from '../../actions/app.actions.js';
import ItemTypes from '../../constants/item.types';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import { DragSource, DropTarget } from 'react-dnd';

const ENTER_KEY_CODE = 13;

const noticeSource = {
    beginDrag(props) {
        return {
            position: props.notice.position,
            id: props.notice.id
        };
    }
};

const noticeTarget = {
    hover(props, monitor, component) {
        const dragPosition = monitor.getItem().position;
        const hoverPosition = props.position;

        // Don't replace items with themselves
        if (dragPosition === hoverPosition) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        //// Dragging downwards
        //if (dragPosition < hoverPosition && hoverClientY < hoverMiddleY) {
        //    return;
        //}
        //
        //// Dragging upwards
        //if (dragPosition > hoverPosition && hoverClientY > hoverMiddleY) {
        //    return;
        //}

        // Time to actually perform the action
        props.moveNotice(dragPosition, hoverPosition);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().position = hoverPosition;
    }
};


function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

@DropTarget(ItemTypes.NOTICE, noticeTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}))
@DragSource(ItemTypes.NOTICE, noticeSource, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
}))

class Note extends React.Component {
    constructor(props) {
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
        const { connectDragSource, connectDropTarget, isDragging } = this.props;

        console.log(isDragging);
        return connectDragSource(connectDropTarget(
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
        ));
    }
}

Note.propsTypes = {
    notice: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
};

export default Note;
