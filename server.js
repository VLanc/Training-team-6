var restify = require('restify');
var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get(/\/(.*)?.*/, restify.plugins.serveStatic({
	directory: __dirname,
}));

server.listen(3030,function() {
	console.log('Listening on port 3030');
});