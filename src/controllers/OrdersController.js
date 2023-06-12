const OrdersService = require('../service/OrdersService');

class OrdersController {
    async GetAll(req, res) {
        res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4100');
        res.send(await OrdersService.GetAll());
    }

    async GetDetailedById(req, res) {
        res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4100');
        res.send(await OrdersService.GetDetailedById(req.params.id))
    }

    async Create(req, res) {
        let Orders = {
            ServicesId: req.body.ServicesId,
            RoomsId: req.body.RoomsId
        };
        res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4100');
        res.send(await OrdersService.Create(Orders));
    }

    async EditById(req, res) {
        let Orders = {
            ServicesId: req.body.ServicesId,
            RoomsId: req.body.RoomsId
        };
        res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4100');
        res.send(await OrdersService.EditById(req.params.id, Orders));
    }

    async DeleteById(req, res) {
        await OrdersService.DeleteById(req.params.id);
        res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4100');
        res.send('Ok');
    }
}

module.exports = new OrdersController();