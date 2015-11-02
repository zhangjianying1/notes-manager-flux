import React from 'react';
import Search from './common/common.search.jsx';
import Note from './common/common.note.jsx';
import { forEach } from 'lodash';

class Desktop extends React.Component {
    constructor (prop) {
        super(prop);
    }

    render () {
        let _notices = [];

        forEach(this.props.notices, (item, i) => {
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