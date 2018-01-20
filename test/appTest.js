let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app',()=>{
  beforeEach(()=>{
    let dummySession = {
      createSession: (userName)=> {
        return 123;
      },
      getUserName: (sessionid)=> {
        return sessionid == 123;
      },
      deleteSession: (sessionid)=> {
        return true;
      }
    }
    app.sessionManager = dummySession;
  })
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('should serve login page for not loggedin',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'Login');
        th.body_contains(res,'userName');
        th.body_contains(res,'submit');
        done();
      })
    })
    it('should redirect to home for loogedin users',done=>{
      request(app,{method:'GET',url:'/', headers:{cookie:`sessionid=${123}`}},(res)=>{
        th.should_be_redirected_to(res, '/home');
        done();
      })
    })
    it('should serve login page for invalid sessionid',done=>{
      request(app,{method:'GET',url:'/', headers:{cookie:`sessionid=${122}`}},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'Login');
        th.body_contains(res,'userName');
        th.body_contains(res,'submit');
        done();
      })
    })
  })
  describe('GET /login',()=>{
    it('should serve the login page for not loggedin',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Login');
        th.body_contains(res,'userName');
        th.body_contains(res,'submit');
        done();
      })
    })
    it('should serve the login page for invalid sessionid',done=>{
      request(app,{method:'GET',url:'/login',headers:{cookie:`sessionid=${122}`}},(res)=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Login');
        th.body_contains(res,'userName');
        th.body_contains(res,'submit');
        done();
      })
    })
    it('should redirect to home page for loogedin users',done=>{
      request(app,{method:'GET',url:'/login', headers:{cookie:`sessionid=${123}`}},res=>{
        th.should_be_redirected_to(res, '/home')
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('should serve the home page with sessionid for valid users',done=>{
      request(app,{method:'POST',url:'/login', body:'userName=yogi'},res=>{
        th.status_is_ok(res);
        th.should_have_cookie(res, 'sessionid', 123);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Create Todo');
        th.body_contains(res,'View Todo');
        done();
      })
    })
    it('should serve the login page with message `login failed` for invalid users',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=yogiraj'},(res)=>{
        th.should_be_redirected_to(res, '/login');
        th.should_have_expiring_cookie(res, 'message', `login failed`);
        done();
      })
    })
    it('should redirect to home page for loogedin users',done=>{
      request(app,{method:'POST',url:'/login', headers:{cookie:`sessionid=${123}`}},res=>{
        th.should_be_redirected_to(res, '/home')
        done();
      })
    })
    it('should redirect to login page for invalid sessionid',done=>{
      request(app,{method:'POST',url:'/login',headers:{cookie:`sessionid=${122}`}},(res)=>{
        th.should_be_redirected_to(res, '/login');
        done();
      })
    })
  })
  describe('GET /home',()=>{
    it('serves the home for valid sessionid',done=>{
      request(app,{method:'GET',url:'/home', headers:{cookie:`sessionid=${123}`}},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Create Todo');
        th.body_contains(res,'View Todo');
        done();
      })
    })
    it('redirect to login page when invalid sessionid',done=>{
        request(app,{method:'GET',url:'/home', headers:{cookie:`sessionid=${122}`}},res=>{
          th.should_be_redirected_to(res, '/login');
          done();
        })
    })
    it('redirect to login page for not loggedin users',done=>{
        request(app,{method:'GET',url:'/home'},res=>{
          th.should_be_redirected_to(res, '/login');
          done();
        })
    })
  })
  describe('GET /logout',()=>{
    it("should give login link when user successfully loggedout",done=>{
      request(app,{method:'GET',url:'/logout', headers:{cookie:`sessionid=${123}`}},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'successfully loggedout');
        th.body_contains(res,'login here');
        th.should_have_expiring_cookie(res,'sessionid',0);
        done();
      })
    })
    it("should redirect to login page for user without sessionid",done=>{
      request(app,{method:'GET',url:'/logout'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
    it("should redirect to login page for user invalid sessionid",done=>{
      request(app,{method:'GET',url:'/logout',headers:{cookie:`sessionid=${122}`}},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('GET /todo/create',()=>{
    it('should serve create todo page for loggedin users',done=>{
      request(app,{method:'GET',url:'/todo/create',headers:{cookie:`sessionid=${123}`}},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Create Todo');
        th.body_contains(res,'Title');
        th.body_contains(res,'Description');
        th.body_contains(res,'submit');
        done();
      })
    })
    it('should redirect to login page for invalid sessionid',done=>{
      request(app,{method:'GET',url:'/todo/create',headers:{cookie:`sessionid=${122}`}},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
    it('should redirect to login page for loggedout users',done=>{
      request(app,{method:'GET',url:'/todo/create'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
  describe('POST /todo/create',()=>{
    it('should serve home page with added todo for loggedin users',done=>{
      request(app,{method:'POST',url:'/todo/create',headers:{cookie:`sessionid=${123}`},body:`title=app&description=build a todo app`},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Create Todo');
        th.body_contains(res,'app');
        th.body_contains(res,'Logout');
        done();
      })
    })
    it('should redirect to login page for invalid sessionid',done=>{
      request(app,{method:'POST',url:'/todo/create',headers:{cookie:`sessionid=${122}`}},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
    it('should redirect to login page for loggedout users',done=>{
      request(app,{method:'POST',url:'/todo/create',body:`title=app&description=build a todo app`},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
    it('should redirect to login page for loggedout users',done=>{
      request(app,{method:'POST',url:'/todo/create'},res=>{
        th.should_be_redirected_to(res,'/login');
        done();
      })
    })
  })
})
