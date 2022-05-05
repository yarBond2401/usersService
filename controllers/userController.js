const catchAsync = require('../errors/catchAsync')
const AppError = require('../errors/appError')

class UserController {
    constructor(UserService, UserModel, APIFeatures) {
        this.UserServiceObj = new UserService(UserModel, APIFeatures);
    }

    getAllUsers = catchAsync(async (req, res, next) => {
        const response = await this.UserServiceObj.getAllUsers(req.query)
        res.status(200).json({
            status: 'success',
            data: { users: response },
        });
    })

    getUserById = catchAsync(async (req, res, next) => {
        const response = await this.UserServiceObj.getUserById(req.params.id);
        if(!response) {
            return next(new AppError('No user found with that Id', 404))
        }
        res.status(200).json({
                    status: 'success',
                    data: { user: response },
        });
    })

    setNewUser = catchAsync(async (req, res, next) => {
        const response = await this.UserServiceObj.setNewUser(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                user: response
            }
        });
    })

    updateUserById = catchAsync(async (req, res, next) => {
            const response = await this.UserServiceObj.updateUserById(req.params.id, req.body)
            if(!response) {
                return next(new AppError('No user found with that Id', 404))
            }
            res.status(200).json({
                status: 'success',
                data: {
                    user: response
                    }
            });
    })

    deleteUserById = catchAsync(async (req, res, next) => {
        const response = await this.UserServiceObj.deleteUserById(req.params.id)
        if(!response) {
            return next(new AppError('No user found with that Id', 404))
        }
        res.status(204).json({
            status: 'success',
            data: {
                user: response
            }
        });
    })

    getUsersStats = catchAsync(async(req, res, next) => {
        const response = await this.UserServiceObj.userStats()
        res.status(200).json({
            status: 'success',
            data: {
                user: response
            }
        });
    })
}

module.exports = UserController;
