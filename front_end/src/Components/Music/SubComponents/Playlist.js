import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Playlist = ({ album, returnFunc, newIndex })=>{
  const [songs, setSongs] = useState([])

  useEffect(()=>{
    if(album && album._id){
      axios.get(`http://localhost:3005/song/album/${ album._id }`)
      .then(res=>{
        setSongs(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }, [album])

  useEffect(()=>{
    if(newIndex>-1){
      returnFunc({...songs[newIndex], index: newIndex, total: songs.length-1})
    }
  }, [newIndex])

  return(
    <div className="card border-success">
      <div className="card-header bg-success text-white">
        { album.name }
      </div>
      <div className="card-body" style={{ padding: '5px', height: '400px', overflow: 'auto' }}>
      <div className="list-group">
        { songs && songs.length>0?
          songs.map((e, i)=>(
            <span key={ i } onClick={ ()=> returnFunc({...e, index: i, total: songs.length-1}) } className="list-group-item list-group-item-action cursor">{ e.name }</span>
          ))
        :null }
        </div>
      </div>
    </div>
  )
}

export default Playlist
