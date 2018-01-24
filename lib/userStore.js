class UserStore {
  constructor(fs,filePath) {
    this.fs=fs;
    this.filePath=filePath;
    this.data={};
  }

  loadData() {
    let data=this.fs.readFileSync(this.filePath,"utf8");
    this.data=JSON.parse(data);
  }

  storeData() {
    let stringifiedData = JSON.stringify(this.data);
    this.fs.writeFileSync(this.filePath,stringifiedData,"utf8");
  }

  getUserData(userName) {
    return this.data[userName];
  }

  modifyUserData(userName,usersNewData) {
    this.data[userName]=usersNewData;
    this.storeData();
  }

}
module.exports = UserStore;
