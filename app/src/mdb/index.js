const mongoose = require('mongoose');
// const AutoIncrementFactory = require('mongoose-sequence');
// require('mongoose-double')(mongoose);
// const log = require('lib/log');

const log = require("../config/logger");

const {
  MONGO_USER: mongoUser,
  MONGO_PASSWORD: mongoPasswd,
  MONGO_IP: mongoIp,
  MONGO_PORT: mongoPort,
  MONGO_COLLECTION: mongoCollection
} = process.env;

const PASSWORD = encodeURIComponent(mongoPasswd); 
const MONGO_URI = `mongodb://${mongoUser}:${PASSWORD}@${mongoIp}:${mongoPort}/${mongoCollection}`;

const connect = async () => {
  const connection = await mongoose.connect(MONGO_URI, {
  }).then(
    () => {
      log.info('Successfully connected to mongodb');
    }
  ).catch(e => {
    log.error(e);
  });
}

const disconnect = () => {
  return mongoose.disconnect();
}

mongoose.connection.on('error', (err) => {
  log.error('몽고디비 연결 에러', err);
});
mongoose.connection.on('disconnected', async () => {
  log.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  await sleep(1000);
  connect();
});

const sleep = (ms) => {
  return new Promise((resolve)=>{
      setTimeout(resolve,ms)
  })
}

module.exports = (function () {
  mongoose.Promise = global.Promise;

  return {
    connect () {
      return connect();
    },
    disconnect () {
      return disconnect();
    }
  };
})();

