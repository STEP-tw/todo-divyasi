let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app',()=>{
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
  describe('GET /homePage',()=>{
    it('serves the homePage',done=>{
      request(app,{method:'GET',url:'/homePage'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Create Todo');
        th.body_contains(res,'View Todo');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('redirects to homePage for valid user',done=>{
      request(app,{method:'POST',url:'/login',body:'userName=divya'},res=>{
        th.should_be_redirected_to(res,'/homePage');
        th.should_have_cookie(res,'sessionid','0');
        done();
      })
    })
  })
})
