const express = require("express");
const router = express.Router();

const validate = require("../middleware/Validate");
const userScheme = require("../schemes/UserScheme");

const userController = require("../controllers/UserController");

const cors = require("cors");

router.use(cors());

router.post(
    "/login",
    userController.Login
    /*
      #swagger.tags = ['Users']
      */
);
router.post(
    "/register",
    validate(userScheme.create),
    
    userController.Register
    /*
      #swagger.tags = ['Users']
      */
);

module.exports = router;
