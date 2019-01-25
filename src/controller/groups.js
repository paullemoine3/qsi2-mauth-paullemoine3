const omit = require('lodash.omit');

const {
    Groups
} = require('../model');

const createGroups = ({
        title,
        description,
        metadatas
    }) =>
    Groups.findOrCreate({
        email,
        title: title,
        description: description || '',
        metadatas: metadatas
    }).then(group =>
        pick(
            group.get({
                plain: true
            }),
            Groups.excludeAttributes
        )
    );

const getAllGroups = () =>
    Groups.findAll({
        where: {
            id
        }
    }).then(groups =>
        groups && !groups.deletedAt ?
        omit(
            groups.get({
                plain: true
            }),
            Groups.excludeAttributes
        ) :
        Promise.reject(new Error('No groups created.'))
    );

const getOneGroups = ({
        id
    }) =>
    Groups.findOne({
        where: {
            id
        }
    }).then(groups =>
        groups && !groups.deletedAt ?
        omit(
            groups.get({
                plain: true
            }),
            Groups.excludeAttributes
        ) :
        Promise.reject(new Error('Unknown or deleted group.'))
    );

const updateGroups = ({
    id,
    title,
    description,
    metadatas
}) => {
    Groups.update({
        title: title,
        description: description,
        metadatas: metadatas,
        updatedAt: new Date()
    }, {
        where: {
            id
        },
    })
}

const deleteGroups = ({
    id
}) => {
    Groups.update({
        deletedAt: new Date()
    }, {
        where: {
            id
        },
    })
}

module.exports = {
    createGroups,
    getAllGroups,
    getOneGroups,
    updateGroups,
    deleteGroups
};