import { ChevronDown, ChevronUp, Clapperboard, Clock, Film, Flame, Gamepad2, History, Home, Library, Lightbulb, ListVideo, Music2, Newspaper, PlaySquare, Podcast, Radio, Repeat, Shirt, ShoppingBag, Trophy } from 'lucide-react'
import { Children, ElementType, ReactNode, useState } from 'react'
import Button,{buttonStyles} from '../components/Button'
import { twMerge } from 'tailwind-merge'
import { playlists, subscriptions } from '../data/sidebar'
import { useSidebar } from '../contexts/SidebarContext'

const Sidebar = () => {
  const {isLargeOpen, isSmallOpen, close}= useSidebar()
  return (
      <>  
      <aside className= {`sticky top-0 flex flex-col overflow-y-auto scrollbar-hidden pb-4 ml-1 ${isLargeOpen?'lg:hidden':'flex'}`}>
        <Button variant= "ghost">
          <SmallSidebarItem Icon= {Home} title="Home" url= "/"/>
        </Button>
        <Button variant= "ghost">
          <SmallSidebarItem Icon= {Repeat} title="Repeat" url= "/"/>
        </Button>
        <Button variant= "ghost">
          <SmallSidebarItem Icon= {Clapperboard} title="Subscription" url= "/"/>
        </Button>
        <Button variant= "ghost">
          <SmallSidebarItem Icon= {Library} title="Library" url= "/"/>
        </Button>
      </aside>
      {!isSmallOpen && (
        <div onClick = {close} className='lg:hidden z-[999] inset-0 bg-secondary-dark opacity-50 absolute'></div>
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen? 'lg:flex': `lg:hidden`} ${isSmallOpen?'hidden': 'flex z-[999] bg-white max-h-screen'}`}
      >
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImgUrl= {Home} title="Home" url= "/"/>
          <LargeSidebarItem IconOrImgUrl= {Clapperboard} title="Subscription" url= "/subscription"/>
        </LargeSidebarSection>
        <hr/>
        <LargeSidebarSection visibleItemCount={5} title = "You">
          <LargeSidebarItem IconOrImgUrl={Library} title="Library" url="/library"/>
          <LargeSidebarItem IconOrImgUrl={History} title="History" url="/history"/>
          <LargeSidebarItem IconOrImgUrl={PlaySquare} title="Your Videos" url="your-videos" />
          <LargeSidebarItem IconOrImgUrl={Clock} title="Watch Later" url="/playlist?list=WL"/>
          {playlists.map((playlist)=>(
            <LargeSidebarItem key = {playlist.id} IconOrImgUrl={ListVideo} title={playlist.name} url={`/playlist?list=${playlist.id}`}/>
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title = "Subscriptions">
          {subscriptions.map(subscription=>(
            <LargeSidebarItem key= {subscription.id} IconOrImgUrl={subscription.imgUrl} url= {`/@${subscription.id}`}title={subscription.channelName} />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSidebarSection>
        
      </aside>
      </>
  )
}

export default Sidebar

type LargeSidebarSectionProp={
  children: ReactNode
  title?:string
  visibleItemCount?:number
}
function LargeSidebarSection({children, title,  visibleItemCount= Number.POSITIVE_INFINITY}: LargeSidebarSectionProp){
  const [isExpanded, setIsExpanded]= useState(false)
  const childrenArray = Children.toArray(children).flat() 
  const visibleChildren = isExpanded? childrenArray: childrenArray.slice(0, visibleItemCount)
  const showExpandedButton= childrenArray.length> visibleItemCount
  const ChevronIcon= isExpanded? ChevronUp: ChevronDown
  return <div className='pb-2 pt-2'>
    {title && <div className='ml-4 mt-2 mb-1 font-semibold'>{title}</div>}
    {visibleChildren}
    {showExpandedButton && 
      <Button variant="ghost" className='flex gap-4 items-center px-3 py-2 rounded-lg w-full'
      onClick={()=>setIsExpanded(!isExpanded)}>
        <ChevronIcon className='w-5 h-5'/>
        {isExpanded? "Show Less": "Show More"}
      </Button>
    }
    </div>
}

type LargeSidebarItemProp={
  IconOrImgUrl:ElementType | string
  title:string 
  url:string
  isActive?: boolean
}

function LargeSidebarItem({IconOrImgUrl, title, url, isActive=false}: LargeSidebarItemProp){
  return(
    <a href={url} 
    className={twMerge(
      buttonStyles({variant:"ghost"}), `flex gap-4 items-center px-3 py-2 rounded-lg   ${isActive? "font-bold bg-neutral-100 ": "hover:bg-neutral-100"}`
    )}
   >
    {typeof IconOrImgUrl=== "string"?(<img className='w-5 h-5 rounded-full' src={IconOrImgUrl}></img>):
      <IconOrImgUrl className="w-5 h-5"/>
    }
      <div className='whitespace-nowrap overflow-hidden text-ellipsis'>{title}</div>
    </a>
  )
}

type SmallSidebarItemProps = {
  Icon: ElementType
  title: string
  url: string
}
function SmallSidebarItem ({Icon, title, url}: SmallSidebarItemProps){
  return (
    <a href={url} className='text-xs items-center justify-center flex flex-col gap-1 py-3'>
      <Icon className="w-5 h-5"/>
      <div>{title}</div>
    </a>
  )
}