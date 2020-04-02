import multer from "multer";
import path from "path";

export class Upload{
  private _storage: any;

  constructor(url:any){
    this._storage = multer.diskStorage({
      destination: `${ url }/files`,
      filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
      }
    });
  }

  uploader(){
    return multer({
       storage: this._storage,
       limits: {fileSize: 25000000},
    }).fields([{name: "thumb"}, {name: "song"}]);
  }
}
