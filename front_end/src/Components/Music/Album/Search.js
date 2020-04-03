import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { SERVER_URL } from '../../Utils/Urls'

const Search = ({ searchFunc })=>{
  const [search, setSearch] = useState('')
  const [albums, setAlbums] = useState([])
  const [skip, setSkip] = useState(0)

  useEffect(()=>{
    if(search){
      axios.post(`${ SERVER_URL }/album/list/${ skip }`, { search: search })
      .then(res=>{
        setAlbums(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }, [search])

  return(
    <div className="form-group" style={{ position: 'relative' }}>
      <input
        type="text"
        className="form-control"
        value={ search }
        onChange={ (e)=> {
          setSearch(e.target.value)
        } }
        placeholder="search something here..."
        required={ true }
      />
    { search?
      <div className="searchResult">
      <ul>
        { albums && albums.length>0?
          albums.map((e, i)=>(
            <li key={ i } onClick={ ()=> {
              searchFunc(e)
              setSearch('')
              setAlbums([])
            } } className="cursor">
              <span>{ e.name }</span>
              <small className="text-secondary"> (release year { e.release_date })</small>
            </li>
          ))
        :
          <li>No Result Found</li>
        }
      </ul>
    </div>
    :null }
    </div>
  )
}

export default Search
