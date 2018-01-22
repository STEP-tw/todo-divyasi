const presenter = require('../lib/presenter.js');
const assert = require('chai').assert;
describe("getTodoItemsInHtml",()=>{
  it("should give todoItem in html form without '<br>' at end when single item in list",()=>{
    let actual=presenter.getTodoItemsInHtml([{id:1,objective:'build a todo app'}])
    let expected = `<p>build a todo app</p>`;
    assert.equal(actual,expected);
  })
  it("should give all todoItems in html form with joining them by '<br>' when more than one item in list",()=>{
    let actual=presenter.getTodoItemsInHtml([{id:1,objective:'build a todo app'},{id:1,objective:'create sever.js'},{id:1,objective:'add login page'}])
    let expected = `<p>build a todo app</p><br><p>create sever.js</p><br><p>add login page</p>`;
    assert.equal(actual,expected);
  })
})
describe("viewTodo",()=>{
  it("should give only todo title and description in html form when no item in list",()=>{
    let actual=presenter.viewTodo({"divya":
      {"allTodos":[
        {"id":"1","title":"purchage","description":"buy vegetables","allItems":[]
        }]
      }},'divya',1);
    let expected = `<p>Title:purchage</p><br><p>Description:buy vegetables</p><br>Todo Items:<br>`;
    assert.equal(actual,expected);
  })
  it("should give todo title, description and all todoItems in html form when items in list",()=>{
    let actual=presenter.viewTodo({"divya":
      {"allTodos":[
        {"id":"1","title":"purchage","description":"buy vegetables","allItems":[{"id":1, "objective":"1/2 potato"}]
        }]
      }},'divya',1);
    let expected = `<p>Title:purchage</p><br><p>Description:buy vegetables</p><br>Todo Items:<br><p>1/2 potato</p>`;
    assert.equal(actual,expected);
  })
})
describe('showListOfAllTodos',()=>{
  it("should give titles of allTodos in html",()=>{
    let data={"yogi":
      {"allTodos":[
        {"id":"1","title":"purchage","description":"buy vegetables","allItems":[
          {"id":1, "objective":"1/2 potato"}
          ]
        },{"id":"2","title":"purchage2","description":"buy vegetables","allItems":[
          {"id":1, "objective":"1/2 potato"}
          ]
        }]
      }
    }
    let actual=presenter.showListOfAllTodos(data,'yogi');
    let expected=`<a href='/todo/view/1'>purchage</a> <a href='/todo/delete/1'> delete</a><br><a href='/todo/view/2'>purchage2</a> <a href='/todo/delete/2'> delete</a>`;
    assert.equal(expected,actual);
  })
})
