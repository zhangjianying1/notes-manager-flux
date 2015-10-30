/**
 * Created by ilitvinov on 29.10.2015.
 */
import {handleViewAction} from '../app.dispatcher.js';
import API from '../utils/API.js';
import AppConstant from '../constants/app.constant.js';

const AppActions = {
    getFolders: () => {
        API
            .get('/directories/')
            .then((directories) => {
                console.log(directories)
            })
            .catch((err) => {
                console.log(err);
            })
    },
    noteCreate: (text) => {
        console.log('Create NOTE!');

        handleViewAction({
            actionType: AppConstant.NOTE_CREATE,
            text
        })
    },
    destroy: (id) => {
        handleViewAction({
            actionType:AppConstant.TODO_DESTROY,
            id
        });
    }
};

export default AppActions;
