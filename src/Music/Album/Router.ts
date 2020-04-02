import { Request, Response, Router } from 'express';
import { AlbumView } from './Views';
import { ObjectId } from "mongodb";

const AlbumRouter = Router();
const _albumView = new AlbumView();

AlbumRouter.post('/create', async (req: Request, res: Response)=>{
  await _albumView.createAlbum(req.body, (result:any)=>{
    res.json(result);
  });
});

AlbumRouter.post('/list/:skip', async (req: Request, res: Response)=>{
  const result = await _albumView.getAlbum(req.body, req.params.skip, (result:any)=>{
    res.json(result);
  });
});

AlbumRouter.get('/:id', async (req: Request, res: Response)=>{
  const result = await _albumView.getAlbum({ _id: new ObjectId(req.params.id) }, '0', (result:any)=>{
    res.json(result);
  });
});


export default AlbumRouter;
