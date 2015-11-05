import request from 'superagent';

const API = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            request
                .get(url)
                .end((err, res) => {
                    if  (res.status === 404) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    },
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            request
                .post(url)
                .set('Content-Type', 'application/json')
                .send(data)
                .end((err, res) => {
                   if(res.status === 404 || res.status === 500) {
                       reject();
                   } else {

                       console.log('OK!');
                       resolve(JSON.parse(res.text));
                   }
                });
        });
    },
    put: (url, data) => {
        return new Promise((resolve, reject) => {
            request
                .put(url)
                .set('Content-Type', 'application/json')
                .send(data)
                .end((err, res) => {
                    if(res.status === 404 || res.status === 500) {
                        reject();
                    } else {
                        console.log(res.status);
                        resolve();
                    }
                });
        });
    },
    delete: (url) => {
        return new Promise((resolve, reject) => {
            request
                .del(url)
                .end((err, res) => {
                    if(res.status === 200) {
                        console.log(res);
                        resolve();
                    } else {
                        reject();
                    }
                });
        });
    }
};

export default API;
