var restify = require('restify');

function respond(req, res, next) {
    res.header('X-Frame-Options', 'ALLOWALL');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    var entity = {
        name : "egor"
    };
    res.send(entity);
    next();
}

var server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/test', respond);
//server.head('/test', respond);

server.post('/test', function (req, res, next) {

    console.log(req.body);

});

server.listen(8080,'127.0.0.1', function() {
    console.log('%s listening at %s', server.name, server.url);
});