const express = require('express');
const {
    createGroups,
    getAllGroups,
    getOneGroups,
    updateGroups,
    deleteGroups
} = require('../controller/groups');
const logger = require('../logger');

const apiGroups = express.Router();
const apiGroupsProtected = express.Router();

apiGroups.post('/', (req, res) =>
    !req.body.title || !req.body.description || !req.body.metadatas || !req.body.user ?
    res.status(400).send({
        success: false,
        message: 'title, description, metadatas, user are required'
    }) :
    createGroups(req.body)
    .then(groups => {
        return res.status(201).send({
            success: true,
            profile: groups,
            message: 'Groups created'
        });
    })
    .catch(err => {
        logger.error(`💥 Failed to create groups : ${err.stack}`);
        return res.status(500).send({
            success: false,
            message: `${err.name} : ${err.message}`
        });
    })
);

module.exports = {
    apiGroups,
    apiGroupsProtected
};