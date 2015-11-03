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


function setDirectories (directories) {
    _directories = directories;
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
    getNotices (id) {
        return  _.filter(_notes, (item) => {
            return item.directoryId === Number(id);
        });
    }
});

AppStore.dispatchToken = register(actionObject => {
    let action = actionObject.action;

    switch(action.actionType) {
        case AppConstant.RECEIVE_DIRECTORIES:
            setDirectories(action.data);
            break;

        case AppConstant.RECEIVE_NOTICES:
            setNotes(action.data);
            break;

        case AppConstant.NOTE_CREATE:
            break;

    }

    AppStore.emitChange();

    return true;
});

export default AppStore;
