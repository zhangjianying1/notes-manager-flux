/**
 * Created by ilitvinov on 29.10.2015.
 */
import { EventEmitter } from 'events';
import { each, isFunction } from 'lodash';

const CHANGE_EVENT = 'change';

console.log(each);
export function createStore(spec) {
    const emitter = new EventEmitter();

    emitter.setMaxListeners(0);

    const store = Object.assign({
        emitChange() {
            emitter.emit(CHANGE_EVENT);
        },

        addChangeListener(callback) {
            emitter.on(CHANGE_EVENT, callback);
        },

        removeChangeListener(callback) {
            emitter.removeListener(CHANGE_EVENT, callback);
        }
    }, spec);

    each(store, (val, key) => {
        if(isFunction(val)) {
            store[key] = store[key].bind(store);
        }
    });

    return store;
}
