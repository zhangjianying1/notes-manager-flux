/**
 * Created by ilitvinov on 29.10.2015.
 */
import { createStore } from './store.utils.js';
import { register } from '../app.dispatcher.js';
import AppConstant from '../constants/app.constants.js';

const CHANGE_EVENT = 'change';

let notes = {};

const AppStore = createStore({
    getAll () {
        return _notes;
    }
});

AppStore.dispatchToken = register(actionObject => {
    let action = actionObject.action;

    console.log(action);
    switch(action.actionType) {
        case AppConstant.NOTE_CREATE:
            AppStore.emitChange();
            break;

        case AppConstant.NOTE_DESTROY:
            destroy(action.id);
            TodoStore.emitChange();
            break;

    }
});

export default AppStore;
