const userService = require("./../src/service/UserService");

let user={
    login:"Zaxar12321",
    password:"123321"
};

const start = async function() {
    const result = await userService.Login(user);
    
    console.log(result);
  }
  
  // Call start
  start();