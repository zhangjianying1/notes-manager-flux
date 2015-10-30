import React from 'react';

class Header extends React.Component {
    constructor (prop) {
        super(prop);
    }

    render () {
        return (
            <h2 className = 'b-header b-header_title'>Note Manager</h2>
        );
    }
}

export default Header;