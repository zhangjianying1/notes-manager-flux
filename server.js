var express = require('express'),
    bodyParser = require('body-parser'),
    chalk = require('chalk'),
    app = express(),
    directoriesRouter = require('./routes/directories'),
    noticesRouter = require('./routes/notices');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: 'public' })
});


app.use('/directories', directoriesRouter);
app.use('/notices', noticesRouter);

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Server for course started at %s port', chalk.green(port))
});

var webpack = require('webpack'),
    config = require('./webpack.config'),
    WebpackDevServer = require('webpack-dev-server');

new WebpackDevServer(webpack(config), {
    hot: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true

}).listen(3001, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3001');
});

