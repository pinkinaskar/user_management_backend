const UserService = require("../services/user.service");

const UserController = {

    /**
     * @Author Name: Pinki Naskar
     * @Function Description: add user
     * @param req
     * @param res
     * @param next
     */
    async createUser(req, res, next) {
        try {
            const data = req.body;
            const user = await UserService.createUser(data);
            next({ message: 'User added successfully', ...{ user } });
        } catch (e) {
            next(e);
        }
    },
    /**
     * @Author Name: Pinki Naskar
     * @Function Description: add user image
     * @param req
     * @param res
     * @param next
     */
    async profileImageUpdate(req, res, next) {
        try {
            // console.log("file==>", req.file);
            next({ image: req.file.filename });
        } catch (err) {
            next(err);
        }
    },
    /**
     * @Author Name: Pinki Naskar
     * @Function Description: update users
     * @param req
     * @param res
     * @param next
     */
    async updateUser(req, res, next) {

        try {
            const data = { ...req.body };
            const { uniqueId } = { ...req.params };


            const user = await UserService.updateUser(data, uniqueId);
            next({ message: 'User updated successfully' });
        } catch (e) {
            next(e)
        }

    },
    /**
     * @Author Name: Pinki Naskar
     * @Function Description: list of users
     * @param req
     * @param res
     * @param next
     */
    async listUser(req, res, next) {
        const users = await UserService.getUsers({
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 0
        });

        next(users);
    },
    /**
     * @Author Name: Pinki Naskar
     * @Function Description: list of users
     * @param req
     * @param res
     * @param next
     */
    async getUser(req, res, next) {
        try {
            const { uniqueId } = { ...req.params };
            const userData = await UserService.getUserByuniqueId(uniqueId);
            next(userData)
        } catch (e) {
            next(e)
        }

    },

};

module.exports = UserController;
