import React from 'react';
import Header from '../components/header.jsx';
import Main from '../components/main.jsx';

export default class App extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className='b-container'>
                <Header />
                <Main />
            </div>
        );
    }
}
