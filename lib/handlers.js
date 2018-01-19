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
    let sessionid = new Date().getTime()
    user.sessionid=sessionid;
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    res.redirect('/home');
  }
};

module.exports = lib;
