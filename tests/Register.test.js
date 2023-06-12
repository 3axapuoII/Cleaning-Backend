const app= require('./../src/loader/index');
const supertest = require("supertest");
const request = supertest("http://localhost:5555");
const userService = require("./../src/service/UserService");

let user = {
    login: "FinalTestLogin3",
    password: "123321",
};

let userInfo = {
    avatar: null,
    firstName: "Zakhar3",
    email: "aaa@mail.ru",
    phone: null,
};
userService.Register(user, userInfo);