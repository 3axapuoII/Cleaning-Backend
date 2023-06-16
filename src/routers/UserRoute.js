const express = require("express");
const router = express.Router();

const validate = require("../middleware/Validate");
const userScheme = require("../schemes/UserScheme");

const isAuthorize = require("../middleware/IsAuthorize");

const userController = require("../controllers/UserController");
const mongoLogger = require("../utils/MongoLogger");

const cors = require("cors");

router.use(cors());

router.post(
  "/me",
  userController.GetMeByToken
  /*
    #swagger.tags = ['Users']
    #swagger.security = [{ "bearerAuth": [] }]
    */
);


router.post(
  "/edit",
  userController.EditByToken
  /*
    #swagger.tags = ['Users']
    #swagger.security = [{ "bearerAuth": [] }]
    */
);


//router.use(isAuthorize);
router.use(mongoLogger.LogHttpEvent);
router.get(
    "/",
    userController.GetAll
    /*
      #swagger.tags = ['Users']
      #swagger.security = [{ "bearerAuth": [] }]
      */
);
router.get(
    "/:id",
    userController.GetById
    /*
      #swagger.tags = ['Users']
      #swagger.security = [{ "bearerAuth": [] }]
      */
);
router.patch(
    "/:id",
    validate(userScheme.edit),
    userController.EditById
    /*
      #swagger.tags = ['Users']
      #swagger.security = [{ "bearerAuth": [] }]
      */
);
router.delete(
    "/:id",
    userController.DeleteById
    /*
      #swagger.tags = ['Users']
      #swagger.security = [{ "bearerAuth": [] }]
      */
);



module.exports = router;
