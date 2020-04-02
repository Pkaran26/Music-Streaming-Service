import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Song = ({ selectedAlbum })=>{
  const [songs, setSongs] = useState([])

  useEffect(()=>{
    if(selectedAlbum && selectedAlbum._id){
      axios.get(`http://localhost:3005/song/album/${ selectedAlbum._id }`)
      .then(res=>{
        setSongs(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }, [selectedAlbum])

  return(
    <div className="card border-success">
      <div className="card-header">
        { selectedAlbum && selectedAlbum.name? `Album:- ${ selectedAlbum.name }`: 'Songs' }
      </div>
      <div className="card-body" style={{ height: '450px', overflow: 'auto' }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>S No.</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { songs && songs.length>0?
              songs.map((e, i)=>(
                <tr key={ i }>
                  <td>{ i + 1 }</td>
                  <td>{ e.name }</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))
            :
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No data</td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Song
