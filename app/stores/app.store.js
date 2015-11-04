/**
 * Created by ilitvinov on 29.10.2015.
 */
import { createStore } from './store.utils.js';
import { register } from '../app.dispatcher.js';
import AppConstant from '../constants/app.constants.js';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _notes = [];
let _directories = [];
let _lastId = null;
let _active = 1;


function setDirectories (directories) {
    _lastId = _.max(directories, (dir) => {
        return dir.id;
    }).id;
    _directories = directories;
}

function createFolder (directory) {
    _directories.push(directory);
}

function setActive (id) {
    _active = Number(id);
}

function updateDirectory (data) {
    let indexOfElement = _.indexOf(_directories, _.find(_directories, item => {
        return item.id === data.id;
    }));

   _directories[indexOfElement] = data;
}

function destroyFolder (id) {
    let indexOfElement = _.indexOf(_directories, _.find(_directories, item => {
        return item.id === id;
    }));

    _.remove(_directories,  (item) => {
        return item.id === id;
    });
    _lastId = _.max(_directories, (dir) => {
        return dir.id;
    }).id;
    _active =  _lastId;

}
function setNotes (notes) {
    _notes = notes;
}
const AppStore = createStore({
    getDirectories (id) {
        return _.filter(_directories, (item) => {
            return item.parentId === Number(id);
        });
    },

    getActive () {
      return _active;
    },
    getLastId () {
        return _lastId;
    }
});

AppStore.dispatchToken = register(actionObject => {
    let action = actionObject.action;

    switch(action.actionType) {
        case AppConstant.RECEIVE_DIRECTORIES:

            setDirectories(action.data);
            break;

        case AppConstant.UPDATE_FOLDER:
            updateDirectory(action.data);
            break;

        case AppConstant.RECEIVE_NOTICES:
            setNotes(action.data);
            break;

        case AppConstant.FOLDER_CREATE:
            createFolder(action.data);
            break;

        case AppConstant.FOLDER_DESTROY:
           destroyFolder(action.data);
            break;


        case AppConstant.FOLDER_OPEN:

            setActive(action.data);
            break;

        case AppConstant.NOTE_CREATE:
            break;

    }

    AppStore.emitChange();

    return true;
});

export default AppStore;
