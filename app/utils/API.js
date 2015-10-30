import request from 'superagent';

const API = {
    get: (url) => {
        return new Promise((resolve, reject)=> {
            request
                .get(url)
                .end((res) => {
                    if  (res.status === 404) {
                        reject()
                    } else {
                        resolve()
                    }
                })
        })
    }
};

export default API;
