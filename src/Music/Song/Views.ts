import moment from 'moment';
import { ObjectId } from "mongodb";
import { DBPool } from "../../Utils/DBPool";
import { Song } from "./Interface";
import { SONG } from "../../Utils/Collections";
import { successRes, errorRes } from "../../Utils/Responses";

export class SongView {

  async addSong(payload: Song, callback: Function){
    try {
      DBPool( async (db: any)=>{
        const res = await db.collection(`${ SONG }`).insertOne({
          ...payload,
          created_at: moment(payload.created_at).format('DD-MM-YYYY hh:mm A')
        })
        .catch((err: any)=>{
          callback(errorRes('not inserted'))
         })
        callback(successRes(res))
      });
    } catch (err) {
      callback({});
      callback(errorRes('db error'))
    }
  }

  async getSong(payload: any, skip: string, callback: Function){
    try {
      let newPayload = {
        ...payload
      }
      if(payload.name){
        newPayload = {
          name: new RegExp(payload.name, 'i')
        }
      }
      DBPool( async (db: any)=>{
        const res = await db.collection(`${ SONG }`).aggregate([
        { $match: { ...newPayload } },
        { $lookup: {
          from: "album",
          localField: "album",
          foreignField: "_id",
          as: "album",
        } },
        { $skip: Number(skip) },
        { $limit: 10 }
      ])
      .toArray()
      .catch((err: any)=>{  })
        callback(res);
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
