// const { EnumConfig } = require("../../../../config");
const UserService = require('../../services/user.service');
const { ConflictError, NotFoundError, BadRequestError, ForbiddenError, UnprocessableEntityError, ServiceUnavailableError } = require('./../../../../errors/http/http.errors');

const UserMiddleware = {

    user_keys: [
        { post_key: 'name', column_key: 'name', required: true },
        { post_key: 'email', column_key: 'email', required: true },
        { post_key: 'phone', column_key: 'phone', required: true },
        // { post_key: 'image', column_key: 'image', required: true },
    ],
    /**
     * @Author Name: Pinki Naskar
     * @Function Description: validate user input payload
     * @param req
     * @param res
     * @param next
     */
    async validateUserData(req, res, next) {
        const keySets = UserMiddleware.user_keys;
        const data = req.body;
        for (let i = 0; i < keySets.length; i++) {
            const keyData = keySets[i];
            if (keyData.required && !data[keyData.post_key]) {
                return next({ error: true, code: 422, message: `${keyData.post_key} is missing.` });
            }
        }
        next();
    },
    /**
     * @Author Name: Pinki Naskar
     * @Function Description: check unique email of user
     * @param req
     * @param res
     * @param next
     */
    async checkUniqueUser(req, res, next) {
        const { uniqueId } = { ...req.params };
        const user = await UserService.checkUniqueUser(req.body, uniqueId);
        //console.log('-----------', user);
        if (user) {
            next({ error: true, code: 409, message: `Email already exist.` });
            return;
        }
        next();
    },

};
module.exports = UserMiddleware;