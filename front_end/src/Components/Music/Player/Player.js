import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Player = ({ songDetail, changeSong })=>{
  const [play, setPlay] = useState(false)
  const [song, setSong] = useState('')
  const [time, setTime] = useState('--:--')
  const [totalTime, setTotalTime] = useState('--:--')
  const [width, setWidth] = useState(0)
  const [repeat, setRepeat] = useState(false)
  const [audio] = useState(new Audio());

  const audioRef = useRef()
  const [soundfile, setSoundfile] = useState('')

  const formatTime = (time)=>{
    let minutes = Math.floor(time / 60)
    let seconds = (time - minutes * 60).toFixed(0)
    if(minutes < 10){
      minutes = `0${ minutes }`
    }
    if(seconds < 10){
      seconds = `0${ seconds }`
    }
    return {
      minutes,
      seconds
    }
  }

  const getPercentage = (currentTime, duration)=>{
    setWidth(Math.floor(currentTime * 100 / duration))
  }

  useEffect(()=>{
    if(songDetail && songDetail._id){
      setWidth(0)
      setSong(songDetail)
      setSoundfile(`http://localhost:3005/song/play/${ songDetail._id }`)
      setPlay(true)
    }
  }, [songDetail])

  useEffect(()=>{
    if(audioRef && audioRef.current){
      audioRef.current.ontimeupdate = ()=>{
        const currentTime = audioRef.current.currentTime
        const total = audioRef.current.duration

        const current = formatTime(currentTime)
        const duration = formatTime(total)
        getPercentage(currentTime, total)

        setTime(`${ current.minutes }:${ current.seconds }`)
        setTotalTime(`${ duration.minutes }:${ duration.seconds }`)
      }

      audioRef.current.onended = ()=>{
        setPlay(false)
        audioRef.current.currentTime = 0
        setWidth(0)

        if(repeat){
          setPlay(true)
        }else {
          nextSong()
        }
      }

      if(play){
       audioRef.current.play()
      }else {
       audioRef.current.pause()
      }
    }
  }, [play, audioRef, repeat])

  const setSeek = (w)=>{
    setWidth(w)
    audioRef.current.currentTime = audioRef.current.duration * w / 100
  }

  const forwardSong = ()=>{
    if(audioRef.current.duration > audioRef.current.currentTime){
      audioRef.current.currentTime += 10
    }
  }

  const backwardSong = ()=>{
    if(audioRef.current.currentTime > 0){
      audioRef.current.currentTime -= 10
    }
  }

  const nextSong = ()=>{
    if(song.index < song.total){
      changeSong(song.index + 1)
    }
  }

  const prevSong = ()=>{
    if(song.index > -1){
      changeSong(song.index - 1)
    }
  }

  return(
    <div className="row">
      <div className="col-lg-1 text-center" style={{ position: 'relative' }}>
        <i style={{ fontSize: '65px', padding: '5px' }} className={`fas fa-compact-disc ${ play? 'spin' : '' }`}></i>
      </div>
      <div className="col-lg-3 text-center">
        <audio ref={ audioRef } src={ soundfile } autoPlay/>
        <p style={{ margin: 0, marginTop: '5px' }}>
          <i
            onClick={ prevSong }
            className={`fas fa-step-backward marlr10 ${ song.index === 0? 'text-secondary': 'cursor' }`}
          ></i>
          <i
            onClick={ backwardSong }
            className="fas fa-backward cursor marlr10"
          ></i>
          <i
            className={`fas cursor play text-primary marlr10 ${ play? 'fa-pause-circle': 'fa-play-circle' } `}
            onClick={ ()=> setPlay(!play) }
          ></i>
          <i
            onClick={ forwardSong }
            className="fas fa-forward cursor marlr10"
          ></i>
          <i
            onClick={ nextSong }
            className={`fas fa-step-forward marlr10 ${ song.index === song.total? 'text-secondary': 'cursor' }`}
          ></i>
        </p>
        <p style={{ margin: 0, margin: '0px 33px 0px', textAlign: 'right' }}>
          <i
            className={`fas fa-retweet marlr10 cursor text-${ repeat? 'info' : 'secondary' }`}
            onClick={ ()=> setRepeat(!repeat) }
          ></i>
        </p>
      </div>
      { song?
        <div className="col-lg-6">
          <p style={{ margin: 0 }}>{ song.name }</p>
          <small>{`${ song.album[0].name } ${ song.album[0].release_date }`}</small>
          <p style={{ margin: 0, marginBottom: '5px' }}>
            <span className="badge badge-primary">{ time } | { totalTime }</span>
          </p>
          <Progressbar
            width={ width }
            setSeek={ setSeek }
          />
        </div>
      :null }
    </div>
  )
}

const Progressbar = ({ width, setSeek })=>{
  const [currentWidth, setCurrentWidth] = useState(0)
  const barRef = useRef()

  useEffect(()=>{
    setCurrentWidth(width)
  }, [width])

  useEffect(()=>{
    if(barRef && barRef.current){
      barRef.current.addEventListener("click", seek);
    }
  }, [barRef])

  const seek = (e)=>{
    const w = e.offsetX / barRef.current.offsetWidth *100
    setSeek(w)
    setCurrentWidth(w)
  }
  return(
    <div ref={ barRef } className="progress">
      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{ width: `${ currentWidth }%` }}
        aria-valuenow={ currentWidth }
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  )
}

export default Player
