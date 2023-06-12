const userService = require("../service/UserService");
const userRepository = require("../repositories/UserRepository");
const jwt = require('jwt-simple');
const AuthConfig = require("../config/AuthConfig.json");

class UserController {      
    async GetAll(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.send(await userService.GetAll());
    }
    async GetById(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await userService.GetDetailById(req.params.id));
    }

    async GetMeByToken(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        let token = req.body.token;
        let id = (jwt.decode(token, AuthConfig.SecretKey).userId);
        res.send(await userService.GetDetailById(id));
    }

    async EditById(req, res) {
        let userId = req.params.id;

        let user = {
            login: req.body.login,
            password: req.body.password,
        };

        let userInfo = {
            avatar: req.body.avatar,
            firstName: req.body.firstName,
            email: req.body.email,
            phone: req.body.phone,
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await userService.EditById(userId, user, userInfo));
    }

    async DeleteById(req, res) {
        await userService.DeleteById(req.params.id);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send("Ok");
    }

    async Register(req, res) {
        let user = {
            login: req.body.login,
            password: req.body.password,
        };

        let userInfo = {
            avatar: req.body.avatar ?? null,
            firstName: req.body.firstName,
            email: req.body.email,
            phone: req.body.phone ?? null,
            userId: null
        };
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await userService.Register(user, userInfo));
    }

    async Login(req, res) {
        let user = {
            login: req.body.login,
            password: req.body.password,
        };


        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await userService.Login(user));
        
    }
}

module.exports = new UserController();
