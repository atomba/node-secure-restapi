var jwt = require('restify-jwt')

exports.notFound = function(req, res) {
    res.status(404)
    res.json({
        error: 'not found',
        url: req.originalUrl
    })
}

exports.checkVersionAndContentType = function(req, res, next) {
    var version = "";
    if (req.headers["accept"]) {
        version = req.headers["accept"].split("-")[1].split("+")[0];
    }
    req.version = version;
    next()
}

exports.secure = function(req, res) {    
    if (!req.user.role && req.user.role !== 'common') {
        // return res.send(401);
        res.status(401);
        res.json({
            type: false,
            data: "Unauthorized."
        });
        return;
    }
    // res.send(200);
    res.status(200);
    res.json({
        type: true,
        data: "Token verified."
    });
}

exports.getMiddleware = function (key) {
    
    console.log("using key: " + key);
    
    return jwt({secret: key
    //,credentialsRequired: false,
    // getToken: function fromHeaderOrQuerystring(req) {
    //   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    //     return req.headers.authorization.split(' ')[1];
    //   } else if (req.query && req.query.token) {
    //     return req.query.token;
    //   }
    //   return null;
    // }
    });   
} 