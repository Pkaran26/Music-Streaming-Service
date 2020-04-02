import React, { useState, useEffect } from 'react'

const Album = ({ albums, returnFunc })=>{

  return(
    <div className="card border-light">
      <div className="card-body" style={{ height: '400px', overflow: 'auto' }}>
        <Search />
        <div className="row">
          { albums?
            albums.map((e, i)=>(
              <div className="col-lg-4" key={ i } style={{ marginBottom: '25px' }}>
                <div className="card border-success cursor" onClick={ ()=> returnFunc(e) }>
                  <div className="card-body text-center">
                    <i style={{ fontSize: '65px', padding: '5px' }} className="fas fa-compact-disc"></i>
                    <p>
                      <strong>{ e.name }</strong>
                    </p>
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

const Search = ()=>{
  const [search, setSearch] = useState('')

  return(
    <form method="post">
      <div className="form-group">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={ search }
            onChange={ (e)=> setSearch(e.target.value) }
            placeholder="search something here..."
          />
          <div className="input-group-append">
            <input type="submit" value="Search" />
          </div>
        </div>
      </div>
    </form>
  )
}

export default Album
