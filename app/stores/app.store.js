/**
 * Created by ilitvinov on 29.10.2015.
 */
import { createStore } from './store.utils.js';
import { register } from '../app.dispatcher.js';
import AppConstant from '../constants/app.constants.js';

const CHANGE_EVENT = 'change';

let _todos = {};

const TodoStore = createStore({
    getAll () {
        return _todos;
    }
});

TodoStore.dispatchToken = register(actionObject => {
    let text;
    let action = actionObject.action;

    console.log(action);
    switch(action.actionType) {
        case AppConstant.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text);
                TodoStore.emitChange();
            }
            break;

        case AppConstant.TODO_DESTROY:
            destroy(action.id);
            TodoStore.emitChange();
            break;

    }
});

export default TodoStore;
