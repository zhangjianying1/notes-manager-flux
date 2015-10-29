/**
 * Created by ilitvinov on 29.10.2015.
 */
import { Dispatcher } from 'flux';

const flux = new Dispatcher();

export function register(callback) {
    console.log('In dispatcher');
    return flux.register(callback);
}

export function handleViewAction (action) {
    flux.dispatch({
        source: 'VIEW_ACTION',
        action: action
    })
}

export function waitFor(ids) {
    return flux.waitFor(ids);
}

/**
 * Dispatches a single action.
 */
export function dispatch(type, action = {}) {
    if (!type) {
        throw new Error('You forgot to specify type.');
    }

    // In production, thanks to DefinePlugin in webpack.config.production.js,
    // this comparison will turn `false`, and UglifyJS will cut logging out
    // as part of dead code elimination.
    if (process.env.NODE_ENV !== 'production') {
        // Logging all actions is useful for figuring out mistakes in code.
        // All data that flows into our application comes in form of actions.
        // Actions are just plain JavaScript objects describing “what happened”.
        // Think of them as newspapers.
        if (action.error) {
            console.error(type, action);
        } else {
            console.log(type, action);
        }
    }

    flux.dispatch({ type, ...action });
}

/**
 * Dispatches three actions for an async operation represented by promise.
 */
export function dispatchAsync(promise, types, action = {}) {
    const { request, success, failure } = types;

    dispatch(request, action);
    promise.then(
            response => dispatch(success, { ...action, response }),
            error => dispatch(failure, { ...action, error })
    );
}
