import React from 'react';
import Search from './search.jsx';
import Note from './note.jsx';
import Actions from '../../actions/app.actions.js';
import AppStore from '../../stores/app.store.js';
import update from '../../../node_modules/react/lib/update';
import { forEach } from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)

export default  class Desktop extends React.Component {
    constructor (prop) {
        super(prop);

        this.state = {
            notices: AppStore.getNotices(AppStore.getActive())
        };
    }

    componentWillMount () {
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount () {
        debugger;
        AppStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange () {
        this.setState({
            notices: AppStore.getNotices(AppStore.getActive())
        });
    }

    moveNotice (dragPosition, hoverPosition) {
        const { notices } = this.state;
        const dragNotice = notices[dragPosition];

        this.setState(update(this.state, {
            notices: {
                $splice: [
                    [dragPosition, 1],
                    [hoverPosition, 0, dragNotice]
                ]
            }
        }));
    }

    render () {
        let _notices = [];

        forEach(this.state.notices, (item, i) => {
            _notices.push( <Note moveNotice = {this.moveNotice.bind(this)} notice = { item } key = { i }/>);
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

