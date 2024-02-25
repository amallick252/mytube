import {createContext, useContext, useState} from 'react'

type SidebarContextType= {
    isLargeOpen: boolean
    isSmallOpen: boolean
    toggle: ()=> void
    close: ()=> void
}
const SidebarContext= createContext<SidebarContextType | null>(null)

export function useSidebar(){ 
    const value = useContext(SidebarContext)
    if (value==null) throw Error(`can not use outside of SidebarPovider`)
    return value
}

type SidebarProviderProps= {
    children: React.ReactNode
}
export function SidebarProvider({children}: SidebarProviderProps){
    const [isLargeOpen, setIsLargeOpen] = useState(true)
    const [isSmallOpen, setIsSmallOpen] = useState(true)
    
    const isScreenSmall = function (){
        return window.innerWidth<1024
    }
    const toggle = function (){
        setIsLargeOpen(l=>!l)
        setIsSmallOpen(s=>!s)
    }
    const close= function(){
        if(isScreenSmall()){
            setIsLargeOpen(l=>!l)
            setIsSmallOpen(s=>!s)
        }
    }


    return(
        <SidebarContext.Provider value ={{isLargeOpen, isSmallOpen, toggle, close}}>
            {children}
        </SidebarContext.Provider>
    )
}