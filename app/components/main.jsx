import React from 'react';
import ActionBar from './main.actionbar.jsx';
import AppStore from '../stores/app.store.js';
import Desktop from './main.desktop.jsx';
import Folders from './main.folders.jsx';

class Main extends React.Component {
    constructor (prop) {
        super(prop);
    }


    render () {
        return (
            <div className='b-content'>
                <ActionBar

                    />
                <Folders />

                <Desktop />
            </div>
        );
    }
}

export default Main;