/**
 * Created by ilitvinov on 28.10.2015.
 */

import React, { Component } from 'react';

let s = ['asdsas','asdasd'];
let t = {
    key: 'value',
    test: 'asdasasddsasdassd'
};
let test = {
    key: 'asasdasdasd'
};

class Test {
    constructor () {
    }
}
class test2 extends Test {
    constructor () {
        super();
    }
}

export default class App extends Component {
    render() {
        return (
            <h1 test='asds'>Fuck,yedadssasdsah!qweqwe</h1>
        );
    }
}