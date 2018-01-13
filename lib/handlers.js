let lib = {
  registerUser: (resisteredUsers, req, res)=>{
    let user = resisteredUsers.find(u=>req.body.userName==u);
    if(!user) {
      res.statusCode = 404;
      res.write('Login Failed');
      res.end();
      return;
    }
  }

};

module.exports = lib;
