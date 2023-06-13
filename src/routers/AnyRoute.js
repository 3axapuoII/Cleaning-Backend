const express = require("express");
const router = express.Router();

const validate = require("../middleware/Validate");
const userScheme = require("../schemes/UserScheme");

const isAuthorize = require("../middleware/IsAuthorize");
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


router.post(
  "/message",
  userController.SendMessage
  /*
    #swagger.tags = ['Users']
    */
);

module.exports = router;
