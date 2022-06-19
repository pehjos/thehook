import React, { useEffect, useState } from 'react'

const useVideoPlayer = (videoRef) => {
    const [isPlaying, setIsplaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [time, setTime] = useState(0)
 
    const togglePlay = () => {
        isPlaying ? videoRef.current.pause() : videoRef.current.play();
        setIsplaying(!isPlaying)
    }



    const toggleMute = () => {
         isMuted ? (videoRef.current.muted = false) : (videoRef.current.muted = true)
        setIsMuted( !isMuted)
    }
    

    const handleTimeUpdate = () => {
        setTime(videoRef.current.currentTime);
       
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(
            progress
        )
    }


var minutes = "0" + Math.floor(time / 60);
var seconds = "0" + (time - minutes * 60);
var cur = minutes.substr(-2) + ":" + seconds.substr(-2);


    const handleVideoProgress = (event) => {
        const controlProgres = Number(event.target.value)
        videoRef.current.currentTime = (videoRef.current.duration / 100) * controlProgres;
        setProgress(
            controlProgres
        )
    }

    const handleVideoSpeed = (event) => {
        const speed = Number(event.target.value)
        videoRef.current.playbackRate = speed;
        setSpeed(speed)
    }


    return {
        isMuted,
        isPlaying,
        speed,
        progress,
        handleVideoSpeed,
        handleVideoProgress,
        handleTimeUpdate,
        toggleMute,
        togglePlay,
        time,cur
    }
        
}

export default useVideoPlayer
