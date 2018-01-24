let chai = require('chai');
let assert = chai.assert;

let th = {};
th.should_be_redirected_to = (res,location)=>{
  assert.equal(res.statusCode,302);
  assert.equal(res.headers.location,location);
};
th.status_is_ok = (res)=>assert.equal(res.statusCode,200);
th.content_type_is = (res,expected)=> assert.equal(res.headers['Content-Type'],expected);

th.body_contains = (text)=> (res)=>assert.isOk(res.text.includes(text),`missing ${text}`);
th.body_does_not_contain = (text)=> (res)=>assert.isNotOk(res.text.includes(text),`missing ${text}`);

th.should_not_have_cookie = (res,name)=> {
  let cookieText = res.headers['set-cookie']||'';
  assert.notInclude(cookieText,`${name}=`);
};
th.should_have_cookie = (name,value)=> {
  return (res)=>{
    let cookieText = res.headers['set-cookie'];
    assert.include(cookieText,`${name}=${value}`);
  };
};
th.should_have_expiring_cookie = (name,value)=> {
  return (res)=>{
    let cookieText = res.headers['set-cookie'];
    assert.include(cookieText,`${name}=${value};Max-Age=5`);
  };
};
module.exports = th;
