import React, { useState } from 'react'
import moment from 'moment'

const AlbumForm = ()=>{
  const [payload, setPayload] = useState({
    name : "",
    release_date : "",
    thumb: "",
    created_at: moment().format('DD-MM-YYYY hh:mm A')
  })

  const setter = (key, value)=>{
    setPayload({
      ...payload,
      [key]: value
    })
  }

  const controls = [
    {
      label: "Album Name",
      type: "text",
      key: "name",
      value: payload.name
    },
    {
      label: "Release Date",
      type: "number",
      key: "release_date",
      value: payload.release_date
    }
  ]

  return(
    <div className="card border-success">
      <div className="card-heading">Add Album<div>
      <div className="card-body">
        <form method="post">
          { controls?
            controls.map((e, i)=>(
              <div className="form-group">
                <label>{ e.label }</label>
                <input
                  type={ e.type }
                  value={ e.value }
                  onChange={ (e)=> setter(e.key, e.target.value) }
                  placeholder={`Enter ${ e.key }`}
                  className="form-control"
                  required={ true }
                />
              </div>
            ))
          :null }
        </form>
      <div>
    <div>
  )
}

export default AlbumForm
