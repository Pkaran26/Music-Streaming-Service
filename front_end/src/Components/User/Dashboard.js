import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SERVER_URL } from '../Utils/Urls'
import Album from './SubComponents/Album'
import Song from './SubComponents/Song'

const Dashboard = ()=>{
  const [albums, setAlbums] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState('')

  useEffect(()=>{
    axios.post(`${ SERVER_URL }/album/list/0`)
    .then(res=>{
      setAlbums(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  }, [])

  return(
    <div className="row">
      <div className="col-lg-4">
        <Album
          albums={ albums }
          returnFunc={ (e)=> setSelectedAlbum(e) }
        />
      </div>
      <div className="col-lg-8">
        <Song
          selectedAlbum={ selectedAlbum }
        />
      </div>
    </div>
  )
}

export default Dashboard
