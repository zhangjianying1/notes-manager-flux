import React from 'react';
import Search from './common/common.search.jsx';
import Note from './common/common.note.jsx';
import Actions from '../actions/app.actions.js';
import AppStore from '../stores/app.store.js';
import update from 'react/lib/update';
import { forEach } from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class Desktop extends React.Component {
    constructor (prop) {
        super(prop);

        Actions.getNoticesAPI();
        this.state = {
            notices: AppStore.getNotices(AppStore.getActive())
        };
    }

    componentWillMount () {
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount () {
        AppStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange () {
        debugger;
        console.log(AppStore.getActive());
        this.setState({
            notices: AppStore.getNotices(AppStore.getActive())
        });
        debugger;
    }

    moveNotice (dragIndex, hoverIndex) {
        const { notices } = this.state;
        const dragNotice = notices[dragIndex];

        this.setState(update(this.state, {
            notices: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragNotice]
                ]
            }
        }));
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

export default DragDropContext(HTML5Backend)(Desktop);