// Repositories //
const userRepository = require("../repositories/UserRepository");
const userInfoRepository = require("../repositories/UserInfoRepository");
const roleRepository = require("../repositories/RoleRepository");
// Password Encryption //
const crypt = require("../utils/Crypt");
const jwt = require("jwt-simple");
// Configs //
const UserConfig = require("../config/ModelsConfig.json");
const AuthConfig = require("../config/AuthConfig.json");
// errors //
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
// Mailer //
const Mailer = require("../utils/Mailer");
const nodemailer = require('nodemailer');


class UserService {
    async GetAll() {
        return await userRepository.GetAll();
    }

    async GetById(userId) {
        let user = await userRepository.GetById(userId);

        if (!user) {
            throw new NotFoundError("No such user");
        }

       return user;
    }

    async GetDetailById(userId) {
        let user = await userRepository.GetById(userId);

        if (!user) {
            throw new NotFoundError("No such user");
        }

        let userInfo = await userInfoRepository.GetByUserId(userId);
        //userInfo.userId = undefined; // Hide redundant parameter

        //return user;
        return {user: { username: userInfo.firstName, image: userInfo.avatar, userId: userId }};
    }

    async Register(user, userInfo) {
        let role = await roleRepository.GetById(UserConfig.Users.DefaultRole);
        if (role === null) {
            throw new Error("Role not found");
        }

        // Hashing the password
        user.password = await crypt.CryptPassword(user.password);

        user = await userRepository.Create(user, role, userInfo);

        /*let mail = {
            to: userInfo.email,
            subject: "Welcome to Cleaning",
            text: "Thank you for registering at the Cleaning",
            html: "<b>You are welcome!</b>",
        };

        await Mailer(JSON.stringify(mail));*/

        let payload = {
            userId: user.id,
        };

        let token = jwt.encode(payload, AuthConfig.SecretKey);

        return {user: { token: token, username: userInfo.firstName, image: userInfo.avatar }};
        //return user;
    }

    async Login(user) {
        const password =  user.password;
        user = await userRepository.GetOneByQuery({ login: user.login });
        let detail = await userRepository.GetDetailById(user.id);

        if (!user) {
            /*throw*/ return new NotFoundError("No such user");
        }

        if (!crypt.ValidatePassword(password, user.password)) {
            /*throw*/ return new UnauthorizedError("Bad password"); // 401 : RFC 7235
        }

        let payload = {
            userId: user.id,
        };

        let token = jwt.encode(payload, AuthConfig.SecretKey);
        return {user: { token: token, username: detail.UserInfo.firstName, image: detail.UserInfo.avatar }};
        //return {user: { token: token, username: "abc", image: null }};
    
    }

    async EditById(userId, user, userInfo) {
        if (user) {
            // If password is not null, then it is supposed that we want to change it
            if (user.password) {
                user.password = await crypt.CryptPassword(user.password);
            }
            await userRepository.EditById(userId, user);
        }

        if (userInfo) {
            await userInfoRepository.EditByUserId(userId, userInfo);
        }

        return await userRepository.GetDetailById(userId);
    }

    async DeleteById(userId) {
        await userRepository.DeleteById(userId);
    }

    async SendMessage(info) {
        const name = info.login;
        const email = info.email;
        const text = info.text;

        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 587,
            secure: false,
            auth: {
              user: 'tempprojectmail@mail.ru',
              pass: 'ajUSLNQF6DsSk9ctN4gR',
            },
          });
      
          // Определение настроек письма
          const mailOptions = {
            from: 'tempprojectmail@mail.ru',
            to: 'tempprojectmail@mail.ru',
            subject: name,
            text: text,
          };
      
          // Отправка письма
          const send = await transporter.sendMail(mailOptions);
      
    }
}

module.exports = new UserService();