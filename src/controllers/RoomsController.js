const RoomsService = require('../service/RoomsService');

class RoomsController {
    async GetAll(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await RoomsService.GetAll());
    }

    async GetDetailedById(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await RoomsService.GetDetailedById(req.params.id))
    }

    async Create(req, res) {
        let Rooms = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.desc
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await RoomsService.Create(Rooms));
    }

    async EditById(req, res) {
        let Rooms = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.desc
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await RoomsService.EditById(req.params.id, Rooms));
    }

    async DeleteById(req, res) {
        await RoomsService.DeleteById(req.params.id);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('Ok');
    }
}

module.exports = new RoomsController();