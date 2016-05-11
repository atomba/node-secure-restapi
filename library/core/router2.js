JSON.minify = require('node-json-minify');

var restify = require('restify')
    , fs = require('fs');

var cwd = process.cwd();

var routesJSON = JSON.minify(fs.readFileSync(cwd + '/config/route.json', 'utf8'));
var routes = JSON.parse(routesJSON);

var controllers = {}
    , controllers_path = cwd + '/library/controllers'
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

var server = restify.createServer();

server
    .use(restify.fullResponse())
    .use(restify.bodyParser())

var middleware = controllers.main.getMiddleware(global.app_secret);

//server.all('/.*', middleware, control.bind(this));

for (var method in routes) {
    var mRoutes = routes[method];
    mRoutes.forEach(function (route) {
        server[method](route.route, middleware, controllers[route.controller][route.handler]);
    })
}
// server.get('/.*', middleware, control.bind(this));
// server.put('/.*', middleware, control.bind(this));
// server.del('/.*', middleware, control.bind(this));
// server.post('/.*', middleware, control.bind(this));
  
// Article Start
// server.post("/articles", controllers.article.createArticle)
// server.put("/articles/:id", controllers.article.updateArticle)
// server.del("/articles/:id", controllers.article.deleteArticle)
// server.get({path: "/articles/:id", version: "1.0.0"}, controllers.article.viewArticle)
// server.get({path: "/articles/:id", version: "2.0.0"}, controllers.article.viewArticle_v2)

// This is comment operations referenced in article
// server.put("/articles/:id/comments", controllers.article.createArticleComment)
// Article End

// Comment Start
// You can also operate on commands in Comment resource. Some of the URI below, refers to above URIs for article
// server.put("/comments/:id", controllers.comment.updateComment)
// server.del("/comments/:id", controllers.comment.deleteComment)
// server.get("/comments/:id", controllers.comment.viewComment)
// Comment End

var port = process.env.PORT || 3000;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})

if (process.env.environment == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    })