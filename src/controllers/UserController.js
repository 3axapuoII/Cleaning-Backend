const userService = require("../service/UserService");
const userRepository = require("../repositories/UserRepository");
const jwt = require('jwt-simple');
const AuthConfig = require("../config/AuthConfig.json");
const UserService = require("../service/UserService");

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

    async EditByToken(req, res) {
        let token = req.body.token;
        let userId = (jwt.decode(token, AuthConfig.SecretKey).userId);

        let user = await userService.GetById(userId);
        user.password = req.body.user.password ? req.body.user.password : user.password;

        let userInfo = {
            avatar: req.body.user.image,
            firstName: req.body.user.username,
            email: req.body.user.email,
            phone: req.body.user.phone,
        };

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(await userService.EditById(userId, user, userInfo));
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

    async SendMessage(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.send(await userService.SendMessage(req.body));
    }
}

module.exports = new UserController();
