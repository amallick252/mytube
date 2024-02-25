import { useEffect, useRef, useState } from 'react'
import formatDuration from '../utils/formatDuration.ts'
import formatTimeAgo from '../utils/formatTimeAgo.ts'

type VideoGridItemProps = {
  id: string
  title: string
  channel:{
    name: string
    id: string
    profileUrl: string
  }
  views: number
  postedAt: Date
  duration: number
  thumbnailUrl: string
  videoUrl: string
}

const VIEW_FORMATTER= new Intl.NumberFormat( undefined, {notation:"compact"})

const VideoGridItem = ({id, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl}: VideoGridItemProps) => {
  const [isVideoPlaying, setIsVideoPlaying]= useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(()=>{
    if(videoRef.current==null) return
    if(isVideoPlaying){
      videoRef.current.currentTime= 0
      videoRef.current.play()
    }else{
      videoRef.current.pause()
    }
  },[isVideoPlaying])
  return (
    <div className='flex flex-col gap-2'
    onMouseEnter={()=>setIsVideoPlaying(true)}
    onMouseLeave={()=> setIsVideoPlaying(false)}>
      <a href= {`/watch?v=${id}`} className='relative aspect-video'>
        <img src={thumbnailUrl} alt="thumbnail" className={`w-full h-full object-cover ${isVideoPlaying? "rounded-none duration-200": "rounded-xl"}`} />
        <div className='absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded'> {formatDuration(duration)}</div>
        <video ref={videoRef} src= {videoUrl} muted className= {`absolute h-full object-cover inset-0 delay-200 ${isVideoPlaying ? "opacity-100 duration-500" :"opacity-0"}`}/>
      </a>
      <div className='grid grid-cols-[1fr,5fr]'>
        <a href={`/@${channel.id}`}>
          <img src={channel.profileUrl} alt="" className='rounded-full h-10 w-10' />
        </a>
        <div className='flex flex-col'>
          <a href={`/watch?v=${id}`} className='text-secondary-dark text-base font-semibold'>
            {title}
          </a>
          <a href={`/@${channel.id}`} className='text-secondary-text text-sm'>{channel.name}</a>
          <div className='text-secondary-text text-sm'>
            {VIEW_FORMATTER.format(views)} views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default VideoGridItem