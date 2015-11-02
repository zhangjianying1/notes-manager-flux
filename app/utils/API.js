import request from 'superagent';

const API = {
    get: (url) => {
        return new Promise((resolve, reject)=> {
            request
                .get(url)
                .end((err, res) => {
                    debugger;
                    if  (res.status === 404) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    }
};

export default API;
