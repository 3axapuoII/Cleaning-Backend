const BasketService = require('../service/BasketService');

class BasketController {
    async GetAll(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await BasketService.GetAll());
    }

    async GetDetailedById(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await BasketService.GetDetailedById(req.params.id))
    }

    async Create(req, res) {
        let Basket = {
            userId: req.user.id,
            ticketId: req.body.OrdertId
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await BasketService.Create(Basket));
    }

    async EditById(req, res) {
        let Basket = {
            userId: req.body.userId,
            ticketId: req.body.OrdertId
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await BasketService.EditById(req.params.id, Basket));
    }

    async DeleteById(req, res) {
        await BasketService.DeleteById(req.params.id);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('Ok');
    }
}

module.exports = new BasketController();