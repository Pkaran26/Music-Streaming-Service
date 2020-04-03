import { ObjectId } from "mongodb";

export interface Song {
  artist: string,
  year: string,
  name: string,
  album: ObjectId,
  thumb: any,
  created_at: string
}
