"use strict";

const Users = require("../mdb/models/Users");

class UserStorageMongo {
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      Users.find({id: id}, (error, users) => {
        console.log('--- Read all ---');
        if (error) {
          reject(`${error}`);
        } else {
          resolve(users[0]);
        }
      });
    });
  }

  static save(userInfo) {
    const users = new Users(userInfo);
    return new Promise((resolve, reject) => {
      users.save((error, data) => {
        if(error){
          reject(`${error}`);
        }else{
          resolve({ success: true });
        }
      });
    });
  }
}

module.exports = UserStorageMongo;