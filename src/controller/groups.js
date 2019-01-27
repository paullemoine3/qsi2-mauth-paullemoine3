const pick = require('lodash.omit');
const logger = require('../logger');

const {
    Groups
} = require('../model');

const createGroups = ({
        title,
        description,
        metadatas,
        id
    }) =>
    Groups.create({
        title: title,
        description: description || '',
        metadatas: metadatas,
        ownerId: id
    }).then(group =>
        pick(
            group.get({
                plain: true
            })
        )
    );

const getAllGroups = () =>
    Groups.findAll().then(groups =>
        groups && !groups.deletedAt ?
        groups :
        Promise.reject(new Error('No groups created.'))
    );

const joinGroups = ({
        idGroup,
        idUser
    }) =>
    Groups.findOne({
        where: {
            id: idGroup
        }
    }).then(groups =>
        groups.addUsers(idUser)
    );

const dismissGroups = ({
        idGroup,
        idUser
    }) =>
    Groups.findOne({
        where: {
            id: idGroup
        }
    }).then(groups =>
        groups.removeUsers(idUser)
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
    updateGroups,
    deleteGroups,
    joinGroups,
    dismissGroups
};