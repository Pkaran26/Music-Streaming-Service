import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Playlist = ({ album, returnFunc, newIndex })=>{
  const [songs, setSongs] = useState([])

  useEffect(()=>{
    if(album && album._id){
      axios.get(`http://localhost:3005/song/album/${ album._id }`)
      .then(res=>{
        setSongs(res.data)
        // setTimeout(()=>{
        //   returnFunc({...res.data[0], index: 0, total: res.data - 1})
        // }, 100)
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
      <div className="card-body" style={{ padding: '5px', height: '350px', overflow: 'auto' }}>
      <div className="list-group">
        { songs && songs.length>0?
          songs.map((e, i)=>(
            <span
              key={ i }
              onClick={ ()=> returnFunc({...e, index: i, total: songs.length-1}) }
              className={`${ newIndex === i? 'active': '' } list-group-item list-group-item-action cursor`}
              style={{ color: 'black' }}
            >
              <i className={`${ newIndex === i? 'text-white': '' } far fa-play-circle align-middle play_song`} style={{ fontSize: '30px', marginRight: '10px' }}></i>
              <span className={`${ newIndex === i? 'text-white': '' } align-middle`}>{ e.name }</span>
            </span>
          ))
        :null }
        </div>
      </div>
    </div>
  )
}

export default Playlist
