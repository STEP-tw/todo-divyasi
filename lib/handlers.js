let fs = require('fs');
let lib = {
  registerUser: (registeredUsers,req,res)=>{
    let user = registeredUsers.find(u=>req.body.userName==u);
    if(!user) {
      res.statusCode = 404;
      res.write('Login Failed');
      res.end();
      return;
    }
    res.redirect('/homePage.html');
  }
};

module.exports = lib;
