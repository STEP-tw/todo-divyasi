let Account = require('../lib/account.js');
let Task = require('../lib/task.js');
let Todo = require('../lib/todo.js');
let chai = require('chai');
let assert = chai.assert;


describe('Account', ()=>{
  describe('#addTodo', ()=>{
    it('should add a todo with specific id', ()=>{
      let account = new Account('divya', 123);
      let todoDetails={title:'app',description:'build a todo app'}
      account.addTodo(todoDetails);
      let expected = new Todo('app',1,'build a todo app')
      expected.count= 0,
      assert.deepEqual(account.allTodos[0],expected);
    })
  })
  describe('#getTodo', ()=>{
    it('should give a todo by id', ()=>{
      let account = new Account('divya', 123);
      let todoDetails={title:'app',description:'build a todo app'}
      account.addTodo(todoDetails);
      account.addTodoItemInTodo(1,'task1');
      let task = new Task('task1',1);
      let expected = new Todo('app',1,'build a todo app')
      expected.count= 1,
      expected.allTodoItems.push(task);
      assert.deepEqual(account.getTodo(1),expected);
    })
  })
  describe('#deleteTodo', ()=>{
    it('should delete a specified todo', ()=>{
      let account = new Account('divya', 123);
      let todoDetails={title:'app',description:'build a todo app'}
      account.addTodo(todoDetails);
      account.deleteTodo(1);
      let expected = [];
      assert.deepEqual(account.allTodos,expected);
    })
  })
  describe('#getAllTodoTitle', ()=>{
    it('should give a list of allTodos title', ()=>{
      let account = new Account('divya', 123);
      let todoDetails={title:'app',description:'build a todo app'}
      account.addTodo(todoDetails);
      let expected = ['app']
      assert.deepEqual(account.getAllTodoTitle(),expected);
    })
  })
  describe('#addTodoItemInTodo', ()=>{
    it('should add a todo item in todo of given todo id', ()=>{
      let account = new Account('divya', 123);
      let todoDetails={title:'app',description:'build a todo app'}
      account.addTodo(todoDetails);
      account.addTodoItemInTodo(1,'task1');
      let task = new Task('task1',1);
      let expected = new Todo('app',1,'build a todo app')
      expected.count= 1,
      expected.allTodoItems.push(task);
      assert.deepEqual(account.allTodos[0],expected);
    })
  })
  describe('#getTodoItemById', ()=>{
    it('should give todo item by id in specified todo', ()=>{
      let account = new Account('divya', 123);
      let todoDetails={title:'app',description:'build a todo app'}
      account.addTodo(todoDetails);
      account.addTodoItemInTodo(1,'task1');
      let expected = new Task('task1',1);
      assert.deepEqual(account.getTodoItemById(1,1),expected);
    })
  })
  describe('#deleteTodoItemById', ()=>{
    it('should delete todo item by id in specified todo', ()=>{
      let account = new Account('divya', 123);
      let todoDetails={title:'app',description:'build a todo app'}
      account.addTodo(todoDetails);
      account.addTodoItemInTodo(1,'task1');
      account.deleteTodoItemById(1,1);
      let expected = [{title:'app', desc:'build a todo app', todoId:1, count:1, allTodoItems:[]}]
      assert.deepEqual(account.allTodos,expected);
    })
  })
})
