import React, { useState, useEffect, useRef } from 'react'

const Player = ({ songDetail, changeSong })=>{
  const [play, setPlay] = useState(false)
  const [song, setSong] = useState('')
  const [time, setTime] = useState('--:--')
  const [totalTime, setTotalTime] = useState('--:--')
  const [volume, setVolume] = useState(0.5)
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
      audioRef.current.volume = volume
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
  }, [play, audioRef, repeat, volume])

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
        <i style={{ fontSize: '65px', padding: '5px' }}
          className={`fas fa-compact-disc remShadow ${ play? 'spin' : '' }`}>
        </i>
      </div>
      <div className="col-lg-3 text-center">
        <audio ref={ audioRef } src={ soundfile } autoPlay/>
        <p style={{ margin: 0, marginTop: '5px' }}>
          <i onClick={ prevSong }
            className={`fas fa-step-backward marlr10 ${ song.index === 0? 'text-secondary': 'cursor' }`}
          ></i>
          <i onClick={ backwardSong }
            className="fas fa-backward cursor marlr10">
          </i>
          <i className={`fas cursor play text-primary marlr10 ${ play? 'fa-pause-circle': 'fa-play-circle' } `}
            onClick={ ()=> setPlay(!play) }>
          </i>
          <i onClick={ forwardSong }
            className="fas fa-forward cursor marlr10">
          </i>
          <i onClick={ nextSong }
            className={`fas fa-step-forward marlr10 ${ song.index === song.total? 'text-secondary': 'cursor' }`}>
          </i>
        </p>
        <p style={{ margin: '10px 33px 0px', textAlign: 'center' }}>
          <input
            type="range"
            min={ 0 } max={ 1 }
            step={ 0.1 }
            value={ volume }
            onChange={ (e)=> setVolume(e.target.value) }
            className="custom-range" id="customRange1"
          />
        </p>
      </div>
      { song?
        <div className="col-lg-6">
          <p style={{ margin: 0, color: '#fff', fontWeight: '600' }}>{ song.name } </p>
          <small style={{ color: '#fff' }}>{`${ song.album[0].name } ${ song.album[0].release_date }`}</small>
          <p style={{ margin: 0, marginBottom: '5px' }}>
            <span className="badge badge-primary">{ time } | { totalTime }</span>
            <i className={`fas fa-retweet marlr10 cursor text-${ repeat? 'info' : 'secondary' }`}
              onClick={ ()=> setRepeat(!repeat) }>
            </i>
          </p>
          <Progressbar
            width={ width }
            setSeek={ setSeek }
          />
        </div>
      :null }
      <div className="col-lg-2">

      </div>
    </div>
  )
}

const Progressbar = ({ width, setSeek })=>{
  const [currentWidth, setCurrentWidth] = useState(0)
  const barRef = useRef()

  useEffect(()=>{
    setCurrentWidth(width)
  }, [width])

  const barRefFunc = ()=>{
    if(barRef && barRef.current){
      barRef.current.addEventListener("click", (e)=>{
        const w = e.offsetX / barRef.current.offsetWidth *100
        setSeek(w)
        setCurrentWidth(w)
      });
    }
  }

  useEffect(barRefFunc, [barRef])

  return(
    <div ref={ barRef } className="progress" style={{ border: '1px solid #2C3E50' }}>
      <div
        className="progress-bar bg-primary"
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
