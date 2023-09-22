'use strict';

var consts = require(__config_path + '/consts');

module.exports = function() {
    // Root routing
    var controller = require('../controllers/system.user.controller.js');

    consts.registerApi('api.v1.systemuser.deactivate', controller.deactivateUsers, { systemApi: true });
    consts.registerApi('api.v1.systemuser.unlock', controller.unlockUsers, { systemApi: true });
    consts.registerApi('api.v1.systemuser.list', controller.list, { systemApi: true });
    consts.registerApi('api.v1.systemuser.checkemailexist', controller.checkEmailExist, { systemApi: true });
    consts.registerApi('api.v1.systemuser.login', controller.login, { notAuth: true });
    consts.registerApi('api.v1.systemuser.get', controller.getUser, { systemApi: true });
    consts.registerApi('api.v1.systemuser.changepassword', controller.changePassword, { systemApi: true });
    consts.registerApi('api.v1.systemuser.signup', controller.signUp, { notAuth: true });
    consts.registerApi('api.v1.systemuser.signupwithoauth', controller.createUserOAuth, { notAuth: true });
    consts.registerApi('api.v1.systemuser.delete', controller.deleteUsers, { systemApi: true });
    consts.registerApi('api.v1.systemuser.update', controller.updateUser, { anyAuth: true });
    consts.registerApi('api.v1.systemuser.getkey', controller.encryptSessionAndUrl, { anyAuth: true });
    consts.registerApi('api.v1.systemuser.authkey', controller.authenticateKeyUrl, { anyAuth: true });
};
