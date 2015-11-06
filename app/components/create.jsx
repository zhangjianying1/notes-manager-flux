import React from 'react';
import AppStore from '../stores/app.store.js';
import Actions from '../actions/app.actions.js';
import { Link, IndexLink } from 'react-router';

class Main extends React.Component {
    constructor (prop) {
        super(prop);
    }

    render () {
        return (
            <div className='b-content'>
                <div className='b-form'>
                    <div className='b-input'>
                        <div className='b-input_title'>
                            Title
                        </div><div className='b-input_input__wrapper'>
                        <input className = 'b-input_input' type='text'/>
                    </div>
                    </div>
                    <div className='b-input'>
                        <div className='b-input_title'>
                            Tags
                        </div><div className='b-input_input__wrapper'>
                        <input className = 'b-input_input' type='text'/>
                    </div>
                    </div>
                    <div className='b-input'>
                        <div className='b-input_title b-input_title__textarea'>
                            Description
                        </div><div className='b-input_input__wrapper'>
                        <textarea className = 'b-input_textarea' type='text'></textarea>
                    </div>
                    </div>
                    <IndexLink to='/home'><div className='b-btn__back'></div></IndexLink>
                </div>
            </div>
        );
    }
}

export default Main;