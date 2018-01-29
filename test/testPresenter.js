const presenter = require('../lib/presenter.js');
const assert = require('chai').assert;
describe("getTodoItemsInHtml",()=>{
  it("should give todoItem in html form without '<br>' at end when single item in list",()=>{
    let actual=presenter.getTodoItemsInHtml([{id:1,objective:'build a todo app'}],1)
    let expected = `<span><span><input type="checkbox" id=item1 onclick=requestMarkAs(event) ></span><span>build a todo app</span><span><a href="/todo/delete/1/1">Delete</a></span></span>`;
    assert.equal(actual,expected);
  })
  it("should give all todoItems in html form with joining them by '<br>' when more than one item in list",()=>{
    let todoItems=[{id:1,objective:'build a todo app'},{id:1,objective:'create sever.js'}];
    let todoId=1;
    let actual=presenter.getTodoItemsInHtml(todoItems,todoId);
    let item1=`<span><input type="checkbox" id=item1 onclick=requestMarkAs(event) ></span><span>build a todo app</span><span><a href="/todo/delete/1/1">Delete</a></span></span><br><span>`;
    let item2=`<span><input type="checkbox" id=item1 onclick=requestMarkAs(event) ></span><span>create sever.js</span><span><a href="/todo/delete/1/1">Delete</a></span>`;
    let expected = `<span>${item1}${item2}</span>`;
    assert.equal(actual,expected);
  })
})
describe("viewTodo",()=>{
  let template="TODO_DETAILS";
  it("should give only todo title and description in html form when no item in list",()=>{
    let userData={"allTodos":[
        {"id":"1","title":"purchage","description":"buy vegetables","allItems":[]
        }]
      };
    let actual=presenter.viewTodo(template,userData,1);
    let expected=`<div id=1 class=todo><p>Title:purchage</p><br><p>Description:buy vegetables</p><br>Todo Items:<br><div class=todoItems></div></div>`
    assert.equal(actual,expected);
  })
  it("should give todo title, description and all todoItems in html form when items in list",()=>{
    let userData={"allTodos":[
        {"id":"1","title":"purchage","description":"buy vegetables","allItems":[{"id":1,"objective":"1/2 potato","status":false}]
        }]
      }
    let actual=presenter.viewTodo(template,userData,1);
    let todoItems=`Todo Items:<br><div class=todoItems><span><span><input type="checkbox" id=item1 onclick=requestMarkAs(event) ></span><span>1/2 potato</span><span><a href="/todo/delete/1/1">Delete</a></span></span></div>`
    let expected=`<div id=1 class=todo><p>Title:purchage</p><br><p>Description:buy vegetables</p><br>${todoItems}</div>`
    assert.equal(actual,expected);
  })
})
describe('showListOfAllTodos',()=>{
  it("should give titles of allTodos in html",()=>{
    let data={"allTodos":[
        {"id":"1","title":"purchage","description":"buy vegetables","allItems":[
          {"id":1, "objective":"1/2 potato"}
          ]
        },{"id":"2","title":"purchage2","description":"buy vegetables","allItems":[
          {"id":1, "objective":"1/2 potato"}
          ]
        }]
      }
    let actual=presenter.showListOfAllTodos(data,'yogi');
    let expected=`<a href='/todo/view/1'>purchage</a> <a href='/todo/delete/1'> delete</a><br><a href='/todo/view/2'>purchage2</a> <a href='/todo/delete/2'> delete</a>`;
    assert.equal(actual,expected);
  })
})
