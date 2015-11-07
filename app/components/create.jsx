import React from 'react';
import AppStore from '../stores/app.store.js';
import Actions from '../actions/app.actions.js';
import { Link, IndexLink } from 'react-router';

const refs = {
    '0': 'title',
    '1': 'tags',
    '2': 'description'

};
const ENTER_KEY_CODE = 13;

class Main extends React.Component {
    constructor (prop) {
        super(prop);
        this.notice = AppStore.getNotice(this.props.params.id);
        this.state = {
            title: this.notice.title,
            description: this.notice.description,
            tags: this.notice.tags
        };
    }

    _update (e) {
        let newState = {};

        newState[refs[e.target.id]] = this.refs[refs[e.target.id]].value.trim();
        this.setState(newState);
    }

    _onKeyDown (e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            this._toFocus(e.target.id);
            this._save();
            this. _update(e);
        }
    }

    _toFocus (id) {
        debugger;
        this.refs[refs[id]].blur();

        if(Number(id) + 1 < Object.keys(refs).length) {
            this.refs[refs[Number(id)+1]].focus();
            this.refs[refs[Number(id)+1]].select();
        }
    }

    _save () {
        debugger;
        this.notice.title = this.state.title;
        this.notice.description = this.state.description;
        this.notice.tags = this.state.tags;
        debugger;
        Actions.updateNotice(this.notice);
    }

    render () {
        return (
            <div className='b-content'>
                <div className='b-form'>
                    <div className='b-input'>
                        <div className='b-input_title'>
                            Title
                        </div><div className='b-input_input__wrapper'>
                        <input value = { this.state.title }
                            ref = 'title'
                            onKeyDown = { this._onKeyDown.bind(this) }
                            onChange = { this._update.bind(this) }
                            onBlur = { this._save.bind(this) }
                            className = 'b-input_input'
                            type='text'
                            id = '0'/>
                    </div>
                    </div>
                    <div className='b-input'>
                        <div className='b-input_title'>
                            Tags
                        </div><div className='b-input_input__wrapper'>
                        <input className = 'b-input_input'
                               value = { this.state.tags }
                               ref = 'tags'
                               onKeyDown = { this._onKeyDown.bind(this) }
                               onChange = { this._update.bind(this) }
                               onBlur = { this._save.bind(this) }
                               className = 'b-input_input'
                               type='text'
                            id = '1'/>
                    </div>
                    </div>
                    <div className='b-input'>
                        <div className='b-input_title b-input_title__textarea'>
                            Description
                        </div><div className='b-input_input__wrapper'>
                        <textarea
                            value = { this.state.description }
                            className = 'b-input_textarea'
                            onKeyDown = { this._onKeyDown.bind(this) }
                            onChange = { this._update.bind(this) }
                            onBlur = { this._save.bind(this) }
                            type='text'
                            ref = 'description'
                            id = '2'
                            ></textarea>
                        </div>
                    </div>
                    <IndexLink to='/home'><div className='b-btn__back'></div></IndexLink>
                </div>
            </div>
        );
    }
}

export default Main;