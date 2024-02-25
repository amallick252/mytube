import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import Button from "../components/Button";
import { useState } from "react";
import { useSidebar } from "../contexts/SidebarContext";


const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  
  return (
    <div className={`flex gap-10  lg:gap-20 justify-between pt-2 mx-4 mb-6 `}>
      <PageHeaderFirstSection isHidden={showFullWidthSearch}/>
      <form
        className={`md:flex gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden"
        }`}
      >
        {showFullWidthSearch ? (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            size="icon"
            variant="ghost"
            className="md:hidden"
          >
            <ArrowLeft />
          </Button>
        ) : null}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-neutral-400 outline-none shadow-inner shadow-neutral-200 py-1 px-4 text-lg w-full focus:border-blue-600"
          />
          <Button className="px-5 py-2 rounded-r-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-400 border-l-0 flex flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button
          type="button"
          size="icon"
          className="bg-neutral-100 hover:bg-neutral-200"
        >
          <Mic />
        </Button>
      </form>
      <div
        className={`flex flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : null
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;

type PageHeaderFirstSectionProps={
  isHidden?:boolean
}

export function PageHeaderFirstSection ({isHidden= false}: PageHeaderFirstSectionProps){
  const {toggle}= useSidebar()
  return(
  <div
        className={` gap-4 items-center  flex-shrink-0 ${
          isHidden ? "hidden" : "flex"
        } `}
      >
        <Button onClick={toggle} variant="ghost" size="icon" >
          <Menu />
        </Button>
        <a href="/">
          <img src="Logo.png" alt="mytube_logo" className="h-6" />
        </a>
      </div>
  )
}
