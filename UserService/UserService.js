class DataSet {

    constructor(UserModel, APIFeatures) {
        this.APIFeaturesObj = APIFeatures;
        this.UserModelObj = UserModel;
    }

    getAllUsers = (query) => {
            const features = new this.APIFeaturesObj(this.UserModelObj.find(), query).filter().sort().limitFields().paginate();
            return features.query;
    }

    getUserById = (id) => {
            return this.UserModelObj.findById(id);
    }

    setNewUser = (data) => {
        return this.UserModelObj.create(data);
    }

    updateUserById = (id, data) => {
            return this.UserModelObj.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
            })
    }

    deleteUserById = async (id) => {
            return this.UserModelObj.findByIdAndDelete(id)
    }

    userStats = () => {
            return this.UserModelObj.aggregate([
                {
                    $match: { age: { $gte: 18 } }
                },
                {
                    $group: {
                        _id: null,
                        avgAge: { $avg: '$age' },
                    }
                }
            ])
    }

}

module.exports = DataSet;
