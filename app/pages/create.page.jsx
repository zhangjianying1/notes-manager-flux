import React from 'react';
import Header from '../components/header.jsx';
import Create from '../components/create.jsx';

export default class App extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className='b-container'>
                <Header />
               <Create />
            </div>
        );
    }
}
