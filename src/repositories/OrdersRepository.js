const Services = require('../models/CleaningJob');
const Rooms = require('../models/Rooms');
const Orders = require('../models/Orders');
const jwt = require('jwt-simple');
const AuthConfig = require("../config/AuthConfig.json");

class OrdersRepository {
    async GetAll() {
        return await Orders.findAll();
    }

    async GetAllByQuery(req) {
        let token = req.body.token;
        let userId = (jwt.decode(token, AuthConfig.SecretKey).userId);


        return await Orders.findAll({
            where:{
                userId:userId
            }
        });
    }

    async GetDetailedById(OrdersId) {
        return await Orders.findOne({
            where: {
                id: OrdersId
            }
        });
    }

    async Create(orders) {
        return Orders.create(orders); // await redundant because is async method and create also async method
    }

    async EditById(OrdersId, orders) {
        await Orders.update(orders, {
            where: {
                id: OrdersId
            }
        });

        console.log(await this.GetDetailedById(OrdersId));
        return await this.GetDetailedById(OrdersId);
    }

    async DeleteById(OrdersId) {
        await Orders.destroy({
            where: {
                id: OrdersId
            }
        });
    }

    async GetOneByQuery(query) {
        return await Orders.findOne({ where: query })
    }
}

module.exports = new OrdersRepository();
