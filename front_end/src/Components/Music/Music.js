import React, { useState, useEffect } from 'react'
import Album from './Album/Album'
import Playlist from './SubComponents/Playlist'
import Player from './Player/Player'
import axios from 'axios'
import { SERVER_URL } from '../Utils/Urls'

const Music = ()=>{
  const [albums, setAlbums] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const [selectedSong, setSelectedSong] = useState('')
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')
  const [skip, setSkip] = useState(0)

  const searchFunc = (search)=>{
    setSearch(search)
  }

  useEffect(()=>{
    let payload = {}
    if(search){
      payload = {
        name: search
      }
    }
    axios.post(`${ SERVER_URL }/album/list/${ skip }`, payload)
    .then(res=>{
      setAlbums(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }, [search])

  return(
    <div className="row">
      <div className="col-lg-4 col-md-4">
        <Playlist
          album={ selectedAlbum }
          returnFunc={ (e)=> {
            setSelectedSong(e)
            setIndex(e.index)
          } }
          newIndex={ index }
        />
      </div>
      <div className="col-lg-8 col-md-8">
        <Album
          albums={ albums }
          returnFunc={ (e)=> {
            setSelectedAlbum(e)
            setIndex(0)
          } }
          searchFunc={ searchFunc }
        />
      </div>
      { selectedSong && selectedSong._id?
        <div className="row" style={{ position: 'fixed', zIndex: '10', bottom: '0', left: '10px', right: '0' }}>
        <div className="col-lg-8 col-md-8">
          <div className="card bg-success" style={{ marginTop: '15px'}}>
            <div className="card-body" style={{ padding: '5px' }}>
              <Player
                songDetail={ selectedSong }
                changeSong={ (i)=> setIndex(i) }
              />
            </div>
          </div>
        </div>
      </div>
      :null }
    </div>
  )
}

export default Music
