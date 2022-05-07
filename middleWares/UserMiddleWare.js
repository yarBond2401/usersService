class UserMiddleWare {
    constructor(UserModel) {
        this.UserModelObj = UserModel;
    }

    usersQueryParams = async (req, res, next) => {
        const requiredParams = [{
            name: 'page',
            defaultValue: 1
        }, {
            name: 'limit',
            defaultValue: 1
        }, {
            name: 'sort',
            defaultValue: '-createdAt'
        }, {
            name: 'fields',
            defaultValue: '-__v'
        }]
        requiredParams.forEach(field => {
            if (!req.query[field.name]) {
                req.query[field.name] = field.defaultValue;
            }
        })
        next();
    }
}

module.exports = UserMiddleWare;
