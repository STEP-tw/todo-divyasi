let chai = require('chai');
let assert = chai.assert;
let Todo = require('../lib/todo.js');
let Task = require('../lib/task.js');

describe('Todo', ()=>{
  describe('editTodoTitle', ()=>{
    it('should edit the title', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.editTodoTitle('webApp');
      assert.equal(todo.title, 'webApp');
    })
  })
  describe('editTodoDesc', ()=>{
    it('should edit the desc', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.editTodoDesc('build a flowerCatlog app');
      assert.equal(todo.desc, 'build a flowerCatlog app');
    })
  })
  describe('addTodoItem', ()=>{
    it('should add the newTodoItem', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.addTodoItem('app has login feature so user can be login to their account');
      let item = 'app has login feature so user can be login to their account'
      let expected = [{todoItem:item, id:1, status:false}];
      assert.deepEqual(todo.allTodoItems, expected);
    })
  })
  describe('addTodoItem', ()=>{
    it('should add the todoItem', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.addTodoItem('app has login feature so user can be login to their account');
      let item = 'app has login feature so user can be login to their account'
      let expected = [{todoItem:item, id:1, status:false}];
      assert.deepEqual(todo.allTodoItems, expected);
    })
    it('should add the new todo items', ()=>{
    let todo = new Todo('app',1, 'build a todo app');
    todo.addTodoItem('app has login feature so user can be login to their account');
    todo.addTodoItem('app has logout feature so user can be logout to their account');
    let item1 = 'app has login feature so user can be login to their account'
    let item2 = 'app has logout feature so user can be logout to their account'
    let expected = [{todoItem:item1, id:1, status:false},{todoItem:item2, id:2, status:false}];
    assert.deepEqual(todo.allTodoItems, expected);
    })
  })
  describe('getTodoItem', ()=>{
    it('should give the newTodoItem', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.addTodoItem('app has login feature so user can be login to their account');
      let item = 'app has login feature so user can be login to their account'
      let expected = {todoItem:item, id:1, status:false};
      assert.deepEqual(todo.getTodoItem(1), expected);
    })
  })
  describe('editTodoItem', ()=>{
    it('should edit the newTodoItem', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.addTodoItem('app has login feature so user can be login to their account');
      let item = 'app has logout feature so user can be logout to their account'
      todo.editTodoItem(1, item)
      let expected = {todoItem:item, id:1, status:false};
      assert.deepEqual(todo.getTodoItem(1), expected);
    })
  })
  describe('deleteTodoItem', ()=>{
    it('should delete a todo item by id', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.addTodoItem('app has login feature so user can be login to their account');
      todo.deleteTodoItem(1);
      let expected = undefined;
      assert.deepEqual(this.allTodoItems, expected);
    })
    it('should delete a specific todo item', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.addTodoItem('app has login feature so user can be login to their account');
      todo.addTodoItem('app has logout feature so user can be logout to their account');
      let item = 'app has login feature so user can be login to their account'
      todo.deleteTodoItem(2);
      let expected = [{todoItem:item, id:1, status:false}];
      assert.deepEqual(todo.allTodoItems, expected);
    })
  })
  describe('markTodoItemAsDone', ()=>{
    it('should mark true for complete todo item', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.addTodoItem('app has login feature so user can be login to their account');
      let item = 'app has login feature so user can be login to their account'
      todo.markTodoItemAsDone(1);
      let expected = {todoItem:item, id:1, status:true};
      assert.deepEqual(todo.getTodoItem(1), expected);
    })
    it('should mark true for specific complete todo item', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.addTodoItem('app has login feature so user can be login to their account');
      todo.addTodoItem('app has logout feature so user can be logout to their account');
      let item = 'app has logout feature so user can be logout to their account'
      todo.markTodoItemAsDone(2);
      let expected = {todoItem:item, id:2, status:true};
      assert.deepEqual(todo.getTodoItem(2), expected);
    })
  })
  describe('markTodoItemAsUndone', ()=>{
    it('should mark false for uncomplete todo item', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.addTodoItem('app has login feature so user can be login to their account');
      let item = 'app has login feature so user can be login to their account'
      todo.markTodoItemAsUndone(1);
      let expected = {todoItem:item, id:1, status:false};
      assert.deepEqual(todo.getTodoItem(1), expected);
    })
    it('should mark false for specific uncomplete todo item', ()=>{
      let todo = new Todo('app',1, 'build a todo app');
      todo.addTodoItem('app has login feature so user can be login to their account');
      todo.addTodoItem('app has logout feature so user can be logout to their account');
      let item1 = 'app has login feature so user can be login to their account';
      let item2 = 'app has logout feature so user can be logout to their account';
      todo.markTodoItemAsDone(1);
      todo.markTodoItemAsUndone(2);
      let expected1 = {todoItem:item2, id:2, status:false};
      let expected2 = [{todoItem:item1, id:1, status:true},{todoItem:item2, id:2, status:false}];
      assert.deepEqual(todo.getTodoItem(2), expected1);
      assert.deepEqual(todo.allTodoItems, expected2);
    })
  })
})
