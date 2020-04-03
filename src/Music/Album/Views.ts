import moment from 'moment';
import { ObjectId } from "mongodb";
import { DBPool } from "../../Utils/DBPool";
import { Album } from "./Interface";
import { ALBUM } from "../../Utils/Collections";
import { successRes, errorRes } from "../../Utils/Responses";

export class AlbumView {

  async createAlbum(payload: Album, callback: Function){
    try {
      DBPool( async (db: any)=>{
        const res = await db.collection(`${ ALBUM }`).insertOne({
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

  async getAlbum(payload: any, skip: string, callback: Function){
    try {
      DBPool( async (db: any)=>{
        let newPayload = {
          ...payload
        }
        if(payload.search){
          newPayload = {
            $or: [
              { name: new RegExp(payload.search, 'i') },
              { release_date: new RegExp(payload.search, 'i') }
            ]
          }
        }
        const res = await db.collection(`${ ALBUM }`).aggregate([
        { $match: { ...newPayload } },
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
