import React from 'react';
import ActionBar from './main.actionbar.jsx';
import AppStore from '../stores/app.store.js';
import Desktop from './main.desktop.jsx';
import Folders from './main.folders.jsx';
import Actions from '../actions/app.actions.js';

class Main extends React.Component {
    constructor (prop) {
        super(prop);
    }


    _blurSelect (e) {
        if(e.target.id !== 'root') {
            e.stopPropagation();
            return;
        }
        Actions.setActive(1);
    }

    render () {
        return (
            <div className='b-content'>
                <ActionBar

                    />
                <div className='b-folders'>
                    <div className = 'b-folders_content'
                         onClick = {this._blurSelect.bind(this)}
                         id = 'root'
                        >
                        <Folders
                            parentId = '1'
                            />
                    </div>
                </div>


                <Desktop />
            </div>
        );
    }
}

export default Main;