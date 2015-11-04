import React from 'react';

class Note extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div className='b-note'>
                <div className='b-note__icon'>
                    <img className = 'b-note__icon_img'  src='../assets/note.png' alt='note'/>
                </div>
                <div className='b-note__title'>
                    {this.props.notice.title}
                </div>
            </div>
        );
    }
}

export default Note;