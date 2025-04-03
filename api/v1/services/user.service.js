const { CommonLib, envs, StringLib, security } = require('../../../lib');
const { NotFoundError, BadRequestError, InternalServerError, UnprocessableEntityError } = require('../../../errors/http/http.errors');
const User = require('../models/user.model');

const UserService = {
  /**
   * @Author Name: Pinki Naskar
   * @Function Description: add user service
   * @param userData
   */
  async createUser(userData) {

    return await User.create(userData);
  },
  /**
   * @Author Name: Pinki Naskar
   * @Function Description: check user's unique email
   * @param data
   * @param uniqueId
   */
  async checkUniqueUser(data, uniqueId = null) {

    let where = { email: data.email };

    if (uniqueId != undefined && uniqueId != null) {
      where = { ...where, ...{ _id: { $ne: uniqueId } } };
    }

    if (!CommonLib.isEmpty(where)) {
      const user = await User.findOne({ ...where, ...{ isDeleted: false } });
      return user;

    } else {
      return null;
    }
  },
  /**
   * @Author Name: Pinki Naskar
   * @Function Description: update user
   * @param data
   * @param uniqueId
   */
  async updateUser(data, uniqueId) {
    const userData = await User.findOne({ _id: uniqueId, isDeleted: false });
    //console.log('userData==>', userData);
    if (userData) {
      const userData = await User.updateOne({ _id: uniqueId }, { $set: data });
      return userData;
    }
    else {
      throw new NotFoundError('Invalid user detail.');
    };

  },
  /**
   * @Author Name: Pinki Naskar
   * @Function Description: get user detail
   * @param data
   * @param uniqueId
   */
  async getUserByuniqueId(uniqueId) {
    const userData = await User.findOne({ _id: uniqueId, isDeleted: false });
    if (userData) {
      return userData;
    }
    else {
      throw new NotFoundError('Invalid user detail.');
    };
  },
  /**
   * @Author Name: Pinki Naskar
   * @Function Description: get user list
   * @param data
   * @param uniqueId
   */
  async getUsers({ page, limit }) {

    let where = { isDeleted: false };
    const users = await User.find(where).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
    const total = await User.countDocuments(where);
    pagination = CommonLib.getPagination(page, limit, total);
    return { users, pagination };
  },
};

module.exports = UserService;