import React from 'react';
import Search from './common/common.search.jsx';
import Note from './common/common.note.jsx';

class Desktop extends React.Component {
    constructor (prop) {
        super(prop);
    }

    render () {
        return (
            <div className='b-desktop'>
                <Search />
                <div className='b-desktop__content'>
                    <Note />
                </div>
            </div>
        );
    }
}

export default Desktop;