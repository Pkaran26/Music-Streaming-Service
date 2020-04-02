import { MongoClient } from "mongodb";
const assert = require('assert');

export const DBPool = (callback: Function)=>{
  MongoClient.connect('mongodb://localhost:27017',
  { useUnifiedTopology: true }, (err, client) => {
    const db = client.db('music_app');
    assert.equal(null, err);
    callback(db);
    console.log('Connected');
  });
}
