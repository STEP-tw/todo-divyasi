let chai = require('chai');
let assert = chai.assert;
let request = require('supertest');
process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app',()=>{
  beforeEach(()=>{
    let dummySession = {
      createSession: (userName)=> {
        return 123;
      },
      getUserName: (sessionid)=> {
        if (sessionid==123) return 'divya';
      },
      deleteSession: (sessionid)=> {
        return true;
      }
    }
    let dummyStore = {
      userData:{"allTodos":[{"id":"1","title":"purchage","description":"buy vegetables","allItems":[{"id":1,"objective":"1/2 potato"}]}]},
      loadData:()=>{
        return true;
      },
      storeData:()=>{
        return true;
      },
      getUserData:(userName)=>{
        return dummyStore.userData;
      },
      modifyUserData:(userName,usersNewData)=>{
        dummyStore.userData=usersNewData;
      }
    }
    app.sessionManager = dummySession;
    app.userStore = dummyStore;
  })
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app)
        .get("/bad")
        .expect(404)
        .end(done)
    })
  })
  describe('GET /',()=>{
    it('should serve login page for not loggedin',done=>{
      request(app)
        .get("/")
        .expect(200)
        .expect(th.body_contains("userName"))
        .expect(th.body_contains("Login"))
        .expect(th.body_contains("submit"))
        .end(done)
    })
    it('should redirect to home for loogedin users',done=>{
      request(app)
        .get("/")
        .set("cookie",`sessionid=${123}`)
        .expect(302)
        .expect("Location","/home")
        .end(done)
    })
    it('should serve login page for invalid sessionid',done=>{
      request(app)
        .get("/")
        .set("cookie",`sessionid=${122}`)
        .expect(200)
        .expect(th.body_contains('Login'))
        .expect(th.body_contains('userName'))
        .expect(th.body_contains('submit'))
        .end(done)
    })
  })
  describe('GET /login',()=>{
    it('should serve the login page for not loggedin',done=>{
      request(app)
        .get("/login")
        .expect(200)
        .expect("Content-Type",/text\/html/)
        .expect(th.body_contains('Login'))
        .expect(th.body_contains('userName'))
        .expect(th.body_contains('submit'))
        .end(done)
    })
    it('should serve the login page for invalid sessionid',done=>{
      request(app)
        .get("/login")
        .set("cookie",`sessionid=${122}`)
        .expect(200)
        .expect("Content-Type",/text\/html/)
        .expect(th.body_contains('Login'))
        .expect(th.body_contains('userName'))
        .expect(th.body_contains('submit'))
        .end(done)
    })
    it('should redirect to home page for loogedin users',done=>{
      request(app)
        .get("/")
        .set("cookie",`sessionid=${123}`)
        .expect(302)
        .expect("Location","/home")
        .end(done)
    })
  })
  describe('POST /login',()=>{
    it('should serve the home page with sessionid for valid users',done=>{
      request(app)
        .post("/login")
        .send("userName=yogi")
        .expect(200)
        .expect("Content-Type",/text\/html/)
        .expect(th.should_have_cookie('sessionid',123))
        .expect(th.body_contains('Create Todo'))
        .end(done)
    })
    it('should serve the login page with message `login failed` for invalid users',done=>{
      request(app)
        .post("/login")
        .send("userName=yogiraj")
        .expect(302)
        .expect("Location","/login")
        .expect(th.should_have_expiring_cookie('message',"login failed"))
        .end(done)
    })
    it('should redirect to home page for loogedin users',done=>{
      request(app)
        .post("/login")
        .set("cookie",`sessionid=${123}`)
        .expect(302)
        .expect("Location","/home")
        .end(done)
    })
    it('should redirect to login page for invalid sessionid',done=>{
      request(app)
        .post("/login")
        .set("cookie",`sessionid=${122}`)
        .expect(302)
        .expect("Location","/login")
        .end(done)
    })
  })
  describe('GET /home',()=>{
    it('serves the home for valid sessionid',done=>{
      request(app)
        .get("/home")
        .set("cookie",`sessionid=${123}`)
        .expect(200)
        .expect("Content-Type",/text\/html/)
        .expect(th.body_contains('Create Todo'))
        .end(done)
    })
    it('redirect to login page when invalid sessionid',done=>{
      request(app)
        .get("/home")
        .set("cookie",`sessionid=${122}`)
        .expect(302)
        .expect("Location","/login")
        .end(done)
    })
    it('redirect to login page for not loggedin users',done=>{
      request(app)
        .get("/home")
        .expect(302)
        .expect("Location","/login")
        .end(done)
    })
  })
  describe('GET /logout',()=>{
    it("should give login link when user successfully loggedout",done=>{
      request(app)
        .get("/logout")
        .set("cookie",`sessionid=${123}`)
        .expect(200)
        .expect(th.body_contains('successfully loggedout'))
        .expect(th.body_contains('login here'))
        .expect(th.should_have_expiring_cookie('sessionid',0))
        .end(done)
    })
    it("should redirect to login page for user without sessionid",done=>{
      request(app)
        .get("/logout")
        .expect(302)
        .expect("Location","/login")
        .end(done)
    })
    it("should redirect to login page for user invalid sessionid",done=>{
      request(app)
        .get("/logout")
        .set("cookie",`sessionid=${122}`)
        .expect(302)
        .expect("Location","/login")
        .end(done)
    })
  })
  describe('GET /todo/create',()=>{
    it('should serve create todo page for loggedin users',done=>{
      request(app)
        .get("/todo/create")
        .set("cookie",`sessionid=${123}`)
        .expect(200)
        .expect("Content-Type",/text\/html/)
        .expect(th.body_contains('Create Todo'))
        .expect(th.body_contains('Title'))
        .expect(th.body_contains('Description'))
        .expect(th.body_contains('submit'))
        .end(done)
    })
    it('should redirect to login page for invalid sessionid',done=>{
      request(app)
        .get("/todo/create")
        .set("cookie",`sessionid=${122}`)
        .expect(302)
        .expect("Location","/login")
        .end(done)
    })
    it('should redirect to login page for loggedout users',done=>{
      request(app)
        .get("/todo/create")
        .expect(302)
        .expect("Location","/login")
        .end(done)
    })
  })
  describe('POST /todo/create',()=>{
    it('should serve home page with added todo for loggedin users',done=>{
      request(app)
        .post("/todo/create")
        .send("title=app&description=build a todo app")
        .set("cookie",`sessionid=${123}`)
        .expect(200)
        .expect("Content-Type",/text\/html/)
        .expect(th.body_contains('Create Todo'))
        .expect(th.body_contains('app'))
        .expect(th.body_contains('Logout'))
        .end(done)
    })
    it('should redirect to login page for invalid sessionid',done=>{
      request(app)
        .post("/todo/create")
        .set("cookie",`sessionid=${122}`)
        .expect(302)
        .expect("Location","/login")
        .end(done)
    })
    it('should redirect to login page for loggedout users',done=>{
      request(app)
        .post("/todo/create")
        .send("title=app&description=build a todo app")
        .expect(302)
        .expect("Location","/login")
        .end(done)
    })
    it('should redirect to login page for loggedout users',done=>{
      request(app)
        .post("/todo/create")
        .expect(302)
        .expect("Location","/login")
        .end(done)
    })
  })
})
