import { Request, Response, Router } from 'express';
import { SongView } from './Views';
import { ObjectId } from "mongodb";
import { Upload } from "../../Utils/Upload";
import { dirname } from "../../Dir";
import { successRes, errorRes } from "../../Utils/Responses";
import fs from 'fs';
import path from 'path';

const SongRouter = Router();
const _songView = new SongView();

const _upload = new Upload(dirname);
const _uploader = _upload.uploader();

SongRouter.post('/add', async (req: Request, res: Response)=>{
  try {
    const payload: any = {
      ...req.body,
      album: new ObjectId(req.body.album)
    }
    await _songView.addSong(payload, (result:any)=>{
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.json(errorRes('json error'))
  }
});

SongRouter.post('/addsong', (req: Request, res: Response)=>{
  try {
    _uploader(req, res, (err: any)=>{
      if(!err){
        res.json(successRes({ message: 'uploaded' }))
      }else{
        res.json(errorRes('song not upload'))
      }
    });
  } catch (err) {
    console.log(err);
    res.json(errorRes('error'))
  }
});

SongRouter.post('/list/:skip', async (req: Request, res: Response)=>{
  const result = await _songView.getSong(req.body, req.params.skip, (result:any)=>{
    res.json(result);
  });
});

SongRouter.get('/:id', async (req: Request, res: Response)=>{
  const result = await _songView.getSong({ _id: new ObjectId(req.params.id) }, '0', (result:any)=>{
    res.json(result);
  });
});

SongRouter.get('/album/:album', async (req: Request, res: Response)=>{
  const result = await _songView.getSong({ album: new ObjectId(req.params.album) }, '0', (result:any)=>{
    res.json(result);
  });
});

SongRouter.get('/play/:id', async (req: Request, res: Response)=>{
  const result = await _songView.getSong({ _id: new ObjectId(req.params.id) }, '0', (result:any)=>{

    let filePath = path.join(dirname + '/files/'+result[0].name);
    console.log(filePath);
    let stat = fs.statSync(filePath);
    let total = stat.size;
    if (req.headers.range) {
        let range = req.headers.range;
        let parts = range.replace(/bytes=/, "").split("-");
        let partialstart = parts[0];
        let partialend = parts[1];

        let start = parseInt(partialstart, 10);
        let end = partialend ? parseInt(partialend, 10) : total-1;
        let chunksize = (end-start)+1;
        let readStream = fs.createReadStream(filePath, {start: start, end: end});
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        });
        readStream.pipe(res);
     } else {
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
        fs.createReadStream(filePath).pipe(res);
     }
  });
});


export default SongRouter;
