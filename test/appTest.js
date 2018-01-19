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
  describe.skip('GET /',()=>{
    it('should give login page',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        th.body_contains(res,'Login')
        th.body_contains(res,'userName')
        done();
      })
    })
  })
  describe.skip('GET /login',()=>{
    it('gives the login page',done=>{
      request(app,{method:'GET',url:'/login'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        done();
      })
    })
  })
  describe.skip('GET /home',()=>{
    it('serves the home',done=>{
      request(app,{method:'GET',url:'/home'},res=>{
        th.status_is_ok(res);
        th.content_type_is(res,'text/html');
        th.body_contains(res,'Create Todo');
        th.body_contains(res,'View Todo');
        done();
      })
    })
  })
})
