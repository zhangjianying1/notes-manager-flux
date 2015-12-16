/**
 * Created by ilitvinov on 29.10.2015.
 */
import { createStore } from './store.utils.js';
import { register } from '../app.dispatcher.js';
import AppConstant from '../constants/app.constants.js';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

let _notices = [];
let _directories = [];
let _active = 1;


function setDirectories (directories) {
    _directories = directories;
}

function createDirectorie (directory) {
    _directories.push(directory);
}

function setActive (id) {
    _active = Number(id) || 1;
}

function updateDirectory (data) {
    let indexOfElement = _.indexOf(_directories, _.find(_directories, item => {
        return item.id === data.id;
    }));

   _directories[indexOfElement] = data;
}

function destroyDirectory (id) {
    setActive();
    _.remove(_directories,  (item) => {
        return item.id === id;
    });

}

function setNotices (notices) {
    _notices = notices;
}

function createNotice (notice) {
    _notices.push(notice);
}

function updateNotice (notice) {
    let indexOfElement = _.indexOf(_notices, _.find(_notices, item => {
        return item.id === notice.id;
    }));

    _notices[indexOfElement] = notice;
}

const AppStore = createStore({
    getDirectories (id) {
        return _.filter(_directories, (item) => {
            return item.parentId === Number(id);
        });
    },

    getNotices (id) {
      return _.filter(_notices, (item) => {
          return item.directoryId === Number(id);
      });
    },

    getNotice (id) {
        return _.filter(_notices, (item) => {
            return item.id === Number(id);
        })[0];
    },

    getActive () {
      return _active;
    }
});

AppStore.dispatchToken = register(actionObject => {
    let action = actionObject.action;

    switch(action.actionType) {
        case AppConstant.RECEIVE_DIRECTORIES:
            setDirectories(action.data);
            break;

        case AppConstant.FOLDER_UPDATE:
            updateDirectory(action.data);
            break;

        case AppConstant.RECEIVE_NOTICES:
            setNotices(action.data);
            break;

        case AppConstant.FOLDER_CREATE:
            createDirectorie(action.data);
            break;

        case AppConstant.FOLDER_DESTROY:
            destroyDirectory(action.data);
            break;

        case AppConstant.FOLDER_OPEN:
            setActive(action.data);
            break;

        case AppConstant.NOTICE_CREATE:

            createNotice(action.data);
            break;

        case AppConstant.NOTICE_UPDATE:

            updateNotice(action.data);
            break;
    }

    AppStore.emitChange();

    return true;
});

export default AppStore;
