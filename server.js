var restify = require('restify');
var fs = require('fs');
var server = restify.createServer({
    name: 'HRAPP',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// server.get('/', restify.plugins.serveStatic({
//     directory: __dirname,
//     file: 'workplace.html'
// }));
//
// server.get(/\/(.*)?.*/, restify.plugins.serveStatic({
//     directory: __dirname
// }));

// server.get('/', function (req, res, next) {
//     fs.readFile(__dirname + '/workplace.html', function (err, data) {
//         if (err) {
//             next(err);
//             return;
//         }
//
//         res.setHeader('Content-Type', 'text/html');
//         res.write(data);
//         res.end();
//         next();
//     });
// });
//
// server.get('/test', function (req, res, next) {
//     fs.readFile(__dirname + '/test.html', function (err, data) {
//         if (err) {
//             next(err);
//             return;
//         }
//
//         res.setHeader('Content-Type', 'text/html');
//         res.write(data);
//         res.end();
//         next();
//     });
//
// });

server.get('/test', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    var entity = {
        name : "egor"
    };
    res.json(entity);


});

server.post('/test', function (req, res, next) {

        console.log(req.body);

});

server.listen(8000, '127.0.0.1',  function () {
    console.log('%s listening at %s', server.name, server.url);
});