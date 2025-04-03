const UserController = require('../controllers/user.controller');
const Router = require('express').Router();
const { UserMiddleware } = require('../middlewares');
const { UploadLib, envs, StringLib, security } = require('../../../lib');
const { Constants } = require('../../../config/constant');

Router.get('/', UserController.listUser);

Router.post('/', [
    UserMiddleware.validateUserData,
    UserMiddleware.checkUniqueUser
], UserController.createUser);

Router.patch(
    '/profile-image',
    [UploadLib(Constants.fileRootDirectory).single("image")],
    UserController.profileImageUpdate,
);

Router.put('/:uniqueId', [
    UserMiddleware.validateUserData,
    UserMiddleware.checkUniqueUser
], UserController.updateUser);

Router.get('/:uniqueId', [], UserController.getUser);

Router.patch('/delete/:uniqueId', [
    UserMiddleware.validateUserData,
], UserController.updateUser);

module.exports = Router;