const chai = require('chai');
const assert = chai.assert;
const Task = require('../lib/task.js');


describe('Title', ()=>{
  describe('setTitle', ()=>{
    it('should set the title', ()=>{
      let title = new Task('todo');
      title.setTitle('purchage');
      assert.equal(title.title, 'purchage');
    })
  })
  describe('getTitle', ()=>{
    it('should give a title', ()=>{
      let title = new Task('todo');
      let expected = 'todo';
      let actual = title.getTitle();
      assert.deepEqual(actual, expected);
    })
  })
  describe('setStatus', ()=>{
    it('by default should set the false status', ()=>{
      let title = new Task('todo');
      assert.equal(title.status, false);
    })
  })
  describe('setStatus', ()=>{
    it('by default should set the true status if todo will be done', ()=>{
      let title = new Task('todo');
      title.setStatus(true);
      assert.equal(title.status, true);
    })
  })
  describe('getStatus', ()=>{
    it('should give status if todo will be done', ()=>{
      let title = new Task('todo');
      title.setStatus(true);
      assert.equal(title.status, true);
    })
  })
})
