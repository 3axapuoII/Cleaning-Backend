const OrdersService = require('../service/OrdersService');
const jwt = require('jwt-simple');
const AuthConfig = require("../config/AuthConfig.json");
const BasketService = require('../service/BasketService');

class OrdersController {
    async GetAll(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await OrdersService.GetAll());
    }

    async GetAllByQuery(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await OrdersService.GetAllByQuery(req));
    }

    async GetDetailedById(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await OrdersService.GetDetailedById(req.params.id))
    }

    async Create(req, res) {
        let token = req.body.token;
        let userId = (jwt.decode(token, AuthConfig.SecretKey).userId);
        let price = 0;
        req.body.services.forEach((id)=>{
            price += id.price*id.quantity;
       });

        let Orders = {
            userId:userId,
            price: price,
        };
        let abc = await OrdersService.Create(Orders);
        console.log(req.body);
        let Basket;
        req.body.services.forEach((id)=>{
             Basket = {
                ServiceId:id.id,
                OrderId: abc.id
            }
            BasketService.Create(Basket);
           // console.log(id.name);
        });
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(abc);
        
    }

    async EditById(req, res) {
        let Orders = {
            review: req.body.order.rating
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await OrdersService.EditById(req.params.id, Orders));
    }

    async DeleteById(req, res) {
        await OrdersService.DeleteById(req.params.id);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('Ok');
    }
}

module.exports = new OrdersController();