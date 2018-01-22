const utils = require('../utility/utils.js');
const assert = require('chai').assert;

describe("deleteTodo",()=>{
  it("should delete sepcified todo of sepcified user",()=>{
    let data={"divya":{"allTodos":[{title:"app",id:1,description:"build app",allItems:[{id:1,ojective:"create a login page"}]},{title:"html",id:2,description:"create html page",allItems:[{id:1,ojective:"give login option"}]}]}}
    let actual = utils.deleteTodo(data,'divya',1);
    let expected={"divya":{"allTodos":[{title:"html",id:2,description:"create html page",allItems:[{id:1,ojective:"give login option"}]}]}}
    assert.deepEqual(actual,expected);
  })
})
