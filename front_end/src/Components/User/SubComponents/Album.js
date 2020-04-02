import React from 'react'

const Album = ({ albums, returnFunc })=>{

  return(
    <div className="card border-success">
      <div className="card-header">Albums</div>
      <div className="card-body" style={{ height: '450px', overflow: 'auto' }}>
        <div className="list-group">
          { albums && albums.length>0?
            albums.map((e, i)=>(
              <span key={ i }
                onClick={ ()=> returnFunc(e) }
                className={`list-group-item list-group-item-action cursor`}
              >{ e.name }</span>
            ))
          :null }
        </div>
      </div>
    </div>
  )
}

export default Album
