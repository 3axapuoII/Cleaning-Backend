const sequelize = require('../config/DatabaseConfig');
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const UserRole = require('../models/UserRole');
const Op = require('sequelize').Op;


class UserRepository {
    async GetAll() {
        return await User.findAll();
    }

    async GetById(userId) {
        return await User.findOne({
            where: {
                id: userId
            }
        })
       // let userInfo = await user.getUserInfo();
       // return {...user.get(), ...userInfo.get()};
    }

    async GetDetailById(userId) {
       return await User.findOne({
           include: { model: UserInfo, as: 'UserInfo' },
           where: { id: userId }
       })
    }

    // Get Only ONE user with the specified fields
    // Send object with fields: {login: user.login, id: 10}
    async GetOneByQuery(query) {
        return await User.findOne({ where: query })
    }

    // Get Many users with the specified fields
    // Send array with object fields: [{id: 10}, {login: 'ds11d1s111d'}, {login: 'MrTester610'}]
   async GetAllByQuery(query) {
       return await User.findAll({
           include: [{
               model: UserInfo,
               as: 'UserInfo'
           }],
           where: {
               [Op.or]: query
           }
       })
   }

    async Create(user, role, userInfo) {
       return await sequelize.transaction(
           async (t) => {
               user = await User.create(user, { transaction: t });
               let id = user.id;
               userInfo.userId = id;
               userInfo = await UserInfo.create(userInfo, { transaction: t });
               let addRole={
                roleId: role.id,
                userId: user.id
               };
               role = await UserRole.create(addRole, {transaction: t});
               return user;
           }
       )
    }

    async EditById(userId, user) {
        return await User.update(user, {
            where: {
                id: userId
            }
        });
    }

    async DeleteById(userId) {
        await User.destroy({
            where: {
                id: userId
            }
        })
    }
}

module.exports = new UserRepository();