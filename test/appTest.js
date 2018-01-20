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
      getSession: (sessionid)=> {
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
    it('should give login page',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'Login')
        th.body_contains(res,'userName')
        done();
      })
    })
  })
  describe('GET /login',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        done();
      })
    })
  })
  describe('GET /home',()=>{
    it('serves the home',done=>{
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
  })
})
