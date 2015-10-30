import React from 'react';

class Search extends React.Component {
    constructor (prop) {
        super(prop);
    }

    render () {
        return (
            <div className='b-search__wrapper'>
                <div className='b-search'>
                    <input type='text'
                           className='b-search__input'
                           placeholder = '..'/>
                </div>
            </div>
        );
    }
}

export default Search;