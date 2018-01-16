let fs = require('fs');
let lib = {
  registerUser: (session,registeredUsers,req,res)=>{
    let user = registeredUsers.find(u=>req.body.userName==u.userName);
    if(!user) {
      res.statusCode = 404;
      res.write('Login Failed');
      res.end();
      return;
    }
    let sessionid = Object.keys(session).length;
    session[sessionid]=req.body.userName;
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    res.redirect('/homePage.html');
  }
};

module.exports = lib;
