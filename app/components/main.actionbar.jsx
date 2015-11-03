import React from 'react';

class ActionBar extends React.Component {
    constructor (prop) {
        super(prop);
    }

    render () {
        return (
            <div className='b-actionBar'>
                <div className='b-btn b-btns__add_folder'>
                    <span className='fontawesome-plus'
                        onClick = {this.props.create.bind(this)}></span>
                </div>
                <div className='b-btn b-btns__add_note'>
                    <span className='fontawesome-pencil'></span>
                </div>
                <div className='b-btn b-btns__remove_note'>
                    <span className='fontawesome-remove'></span>
                </div>
                <div className='b-btn b-btn_more'>...</div>
            </div>
        );
    }
}

export default ActionBar;