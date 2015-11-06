import React from 'react';
import Search from './common/common.search.jsx';
import Note from './common/common.note.jsx';
import Actions from '../actions/app.actions.js';
import AppStore from '../stores/app.store.js';
import { forEach } from 'lodash';

class Desktop extends React.Component {
    constructor (prop) {
        super(prop);

        Actions.getNoticesAPI();
        this.state = {
            notices: AppStore.getNotices(AppStore.getActive()),
            active: AppStore.getActive()
        };
    }

    componentWillMount () {
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount () {
        AppStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange () {

        this.setState({
            active: AppStore.getActive(),
            notices: AppStore.getNotices(AppStore.getActive())
        });
    }

    render () {
        let _notices = [];


        forEach(this.state.notices, (item, i) => {
            _notices.push( <Note notice = { item } key = { i }/>);
        });

        return (
            <div className='b-desktop'>
                <Search />
                <div className='b-desktop__content'>
                    {_notices}
                </div>
            </div>
        );
    }
}

export default Desktop;