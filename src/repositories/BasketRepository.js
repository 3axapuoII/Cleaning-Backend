const Service = require('../models/CleaningJob');
const Order = require('../models/Orders');
const Basket = require('../models/Basket');


class BasketRepository {
    async GetAll() {
        return await Basket.findAll();
    }

    async GetDetailedById(BasketId) {
        return await Basket.findOne({
            include: [Service, Order],
            where: {
                id: BasketId
            }
        });
    }

    async Create(basket) {
        return Basket.create(basket);
    }

    async EditById(basketId, Basket) {
        await Basket.update( Basket, {
            where: {
                id: basketId
            }
        });

        return await this.GetDetailedById(basketId);
    }

    async DeleteById(basketId) {
        await Basket.destroy({
            where: {
                id: basketId
            }
        });
    }
}

module.exports = new BasketRepository();
