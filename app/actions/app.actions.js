/**
 * Created by ilitvinov on 29.10.2015.
 */
import { handleViewAction } from '../app.dispatcher.js';
import API from '../utils/API.js';
import AppConstant from '../constants/app.constants.js';

const AppActions = {
    getDirectoriesAPI: () => {
        API
            .get('http://localhost:3000/directories/')
            .then((directories) => {
                handleViewAction({
                    actionType: AppConstant.RECEIVE_DIRECTORIES,
                    data: directories
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getNoticesAPI: () => {
        API
            .get('http://localhost:3000/notices/')
            .then((notices) => {
                handleViewAction({
                    actionType: AppConstant.RECEIVE_NOTICES,
                    data: notices
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

export default AppActions;
