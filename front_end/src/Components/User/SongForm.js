import React, { useState } from 'react'
import moment from 'moment'

const Form = ()=>{
  const [payload, setPayload] = useState({
    name : "",
    album: "",
    url : "",
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
      label: "Select Album",
      type: "text",
      key: "album",
      value: payload.album
    }
  ]

  return(
    <div className="row">
      <div className="col-lg-4">
        <div className="form-group">
          <label>Song Name</label>
          <input
            type="text"
            value={ payload.name }
            onChange={ (e)=> setter("name", e.target.value) }
            placeholder={`Enter name`}
            className="form-control"
            required={ true }
          />
        </div>
        <div className="form-group">
        <label>Select Album</label>
          <select
            value={ payload.album }
            onChange={ (e)=> setter("album", e.target.value) }
            className="form-control"
            required={ true }
          >

          </select>
        </div>
      <div>
      <div className="col-lg-8">

      <div>
    <div>
  )
}

export default Form
