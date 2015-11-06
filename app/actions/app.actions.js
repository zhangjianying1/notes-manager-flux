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
        debugger;
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
    },
    createNotice: (notice) => {
        API
            .post('http://localhost:3000/notices/', notice)
            .then((notice) => {
                handleViewAction({
                    actionType: AppConstant.NOTICE_CREATE,
                    data: notice
                });
            });
    },
    createFolder: (data) => {
        API
            .post('http://localhost:3000/directories/', data)
            .then( (folder) => {

                handleViewAction({
                    actionType: AppConstant.FOLDER_CREATE,
                    data: folder
                });
            })
            .catch( err => {
                console.log(err);
            });
    },
    updateFolder: (data) => {
        API
            .put(`http://localhost:3000/directories/${data.id}`, data)
            .then( () => {
                handleViewAction({
                    actionType: AppConstant.FOLDER_UPDATE,
                    data: data
                });
            })
            .catch( err => {
                console.log(err);
            });
    },
    updateNotice: (data) => {
        debugger;
        API
            .put(`http://localhost:3000/notices/${data.id}`, data)
            .then( (notice) => {
                debugger;
                handleViewAction({
                    actionType: AppConstant.NOTICE_UPDATE,
                    data: notice
                });
            })
            .catch( err => {
                console.log(err);
            });
    },
    deleteFolder: (id) => {
        API
            .delete(`http://localhost:3000/directories/${id}`)
            .then( () => {
                handleViewAction({
                    actionType: AppConstant.FOLDER_DESTROY,
                    data: id
                });
            })
            .catch( (err) => {
                console.log(err);
            });
    },
    setActive: (id) => {
        handleViewAction({
            actionType: AppConstant.FOLDER_OPEN,
            data: id
        });
    }

};

export default AppActions;
