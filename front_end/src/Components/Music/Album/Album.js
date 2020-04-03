import React, { useState, useEffect } from 'react'
import Search from './Search'

const Album = ({ albums, returnFunc })=>{

  useEffect(()=>{
    if(albums && albums.length>0){
      returnFunc(albums[0])
    }
  }, [albums])

  return(
    <div className="card border-light">
      <div className="card-body" style={{ height: '400px', overflow: 'auto' }}>
        <Search
          searchFunc={ returnFunc }
        />
        <div className="row">
          { albums?
            albums.map((e, i)=>(
              <div className="col-lg-4" key={ i } style={{ marginBottom: '25px' }}>
                <div className="card border-success cursor album" onClick={ ()=> returnFunc(e) }>
                  <div className="card-body text-center">
                    <i style={{ fontSize: '65px', padding: '5px' }} className="fas fa-compact-disc"></i>
                    <p>{ e.name }</p>
                    <span>{ e.release_date }</span>
                  </div>
                </div>
              </div>
            ))
          :null }
        </div>
      </div>
    </div>
  )
}

export default Album
