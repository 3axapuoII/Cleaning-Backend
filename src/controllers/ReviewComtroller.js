const reviewService = require("../service/ReviewService");
const jwt = require('jwt-simple');
const AuthConfig = require("../config/AuthConfig.json");

class ReviewController {
    async GetAll(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await reviewService.GetAll());
    }

    async GetDetailedById(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await reviewService.GetDetailedById(req.params.id));
    }

    async Create(req, res) {
        let token = req.body.token;
        
        let id = (jwt.decode(token, AuthConfig.SecretKey).userId);
        let review = {
            comment: req.body.comment,
            serviceId: req.body.slug,
            userId: id,
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await reviewService.CreateOne(review));
    }

    async EditById(req, res) {
        let review = {
            comment: req.body.comment,
            rate: req.body.rate,
            date: req.body.date,
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await reviewService.EditById(req.params.id, review));
    }

    async DeleteById(req, res) {
        await reviewService.DeleteById(req.params.id);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send("Ok");
    }
}

module.exports = new ReviewController();
