const express = require('express');
const {
    apiUsers,
    apiUsersProtected,
} = require('./users');
const {
    apiGroups,
    apiGroupsProtected
} = require('./groups');
const {
    isAuthenticated,
    initAuth
} = require('../controller/auth');

//import security
var hpp = require('hpp');
var helmet = require('helmet');
var enforce = require('express-sslify');
var cors = require('cors')

var corsOptions = {
    origin: process.env.URL_CORS,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// create an express Application for our api
const api = express();
//adding hpp to api
api.use(hpp());

//adding helmet to api
api.use(helmet());
api.use(cors(corsOptions))

//adding ssl
api.use(enforce.HTTPS({
    trustProtoHeader: true
}));
initAuth();

// apply a middelware to parse application/json body
api.use(express.json({
    limit: '1mb'
}));
// create an express router that will be mount at the root of the api
const apiRoutes = express.Router();
apiRoutes
    // test api
    .get('/', (req, res) =>
        res.status(200).send({
            message: 'hello from my api'
        })
    )
    // connect api users router
    .use('/users', apiUsers)
    .use('/groups', apiGroups)
    // api bellow this middelware require Authorization
    .use(isAuthenticated)
    .use('/users', apiUsersProtected)
    .use('/groups', apiGroupsProtected)
    .use((err, req, res, next) => {
        res.status(403).send({
            success: false,
            message: `${err.name} : ${err.message}`,
        });
        next();
    });

// root of our API will be http://localhost:5000/api/v1
api.use('/api/v1', apiRoutes);
module.exports = api;