import { ObjectId } from "mongodb";

export interface Song {
  artist: string,
  year: string,
  name: string,
  album: ObjectId,
  thumb: string,
  created_at: string
}
