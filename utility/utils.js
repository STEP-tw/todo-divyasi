const loadUser = function(req, res) {
  let user = registeredUsers.find(u => u.sessionid == req.cookies.sessionid);
  if (user) req.user = user;
}

const isValidSession = function(registeredUsers,req) {
  let sessionid = req.cookies.sessionid;
  let user = registeredUsers.find(u => u.sessionid == req.cookies.sessionid);
  debugger;
  return user && sessionid;
}
exports.loadUser = loadUser;
exports.isValidSession = isValidSession;
