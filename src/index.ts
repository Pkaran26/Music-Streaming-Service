import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import moment from 'moment';
import fileupload from "express-fileupload";


import AlbumRouter from "./Music/Album/Router";
import SongRouter from "./Music/Song/Router";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(fileupload());
app.use('/album', AlbumRouter);
app.use('/song', SongRouter);

const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`started on port: ${port}`);
});
