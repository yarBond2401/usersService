const express = require('express');
const router = express.Router();
const UserMiddleWare = require('../middleWares/UserMiddleWare');
const UserController = require('../controllers/userController');
const UserService = require('../UserService/UserService');
const APIFeatures = require('../UserService/APIFeatures');
const UserModel = require('../models/userModel');

const UserControllerObj = new UserController(UserService, UserModel, APIFeatures);
const UserMiddleWareObj = new UserMiddleWare(UserModel);

router.
 route('/stats').get( UserControllerObj.getUsersStats)

router
    .route('/')
    .get(UserMiddleWareObj.usersQueryParams, (req, res, next) => UserControllerObj.getAllUsers(req, res, next))
    .post((req, res, next) => UserControllerObj.setNewUser(req, res, next));

router
    .route('/:id')
    .get((req, res, next) => UserControllerObj.getUserById(req, res, next))
    .patch((req, res, next) => UserControllerObj.updateUserById(req, res, next))
    .delete((req, res, next) => UserControllerObj.deleteUserById(req, res, next))

module.exports = router;
