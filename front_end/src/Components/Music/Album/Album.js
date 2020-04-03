import React, { useState, useEffect } from 'react'

const Album = ({ albums, returnFunc, searchFunc })=>{

  useEffect(()=>{
    if(albums && albums.length>0){
      returnFunc(albums[0])
    }
  }, [albums])

  return(
    <div className="card border-light">
      <div className="card-body" style={{ height: '400px', overflow: 'auto' }}>
        <Search
          searchFunc={ searchFunc }
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

const Search = ({ searchFunc })=>{
  const [search, setSearch] = useState('')

  return(
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        value={ search }
        onChange={ (e)=> {
          searchFunc(e.target.value)
          setSearch(e.target.value)
        } }
        placeholder="search something here..."
        required={ true }
      />
    </div>
  )
}

export default Album
