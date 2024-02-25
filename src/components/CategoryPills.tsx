import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 100;
const CategoryPills = ({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef= useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(containerRef.current == null) return
    const container= containerRef.current
    const scroll= container.scrollWidth
    const client= container.clientWidth
    const observer = new ResizeObserver((entries)=>{
      const entry = entries[0]?.target
      if(entry ==null) return
      setIsLeftVisible(translate>0)
      setIsRightVisible(client+translate<scroll)
    })
    observer.observe(containerRef.current)
    return()=>{
      observer.disconnect()
    }
  }, [categories, translate])

  return (
    <div className="overflow-x-hidden relative" ref= {containerRef}>
      <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]" style= {{transform:`translateX(-${translate}px)`}}>
        {categories.map((item) => (
          <Button
            key={item}
            variant={selectedCategory === item ? "dark" : "default"}
            onClick={() => onSelect(item)}
            className="px-3 py-1 rounded-lg whitespace-nowrap"
          >
            {item}
          </Button>
        ))}
      </div>
      {isLeftVisible ? (
        <div className="absolute left-0 top-0 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button size="icon" variant="ghost" className="h-full w-auto p-1"
          onClick={()=>{
            setTranslate(translate=> {
              const newTranslate = translate-TRANSLATE_AMOUNT
              if(translate<=0) return 0
              return newTranslate
            })
          }}
          >
            <ChevronLeft />
          </Button>
        </div>
      ) : null}
      {isRightVisible ? (
        <div className="absolute right-0 top-0 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button size="icon" variant="ghost" className="h-full w-auto p-1"
          onClick={()=>{
            setTranslate((translate)=>{
              const newTranslate = TRANSLATE_AMOUNT+translate
              if(containerRef.current==null) return translate
              const scroll =containerRef.current.scrollWidth
              const client =containerRef.current.clientWidth
              if(newTranslate+client>=scroll){
                return scroll-client
              }
              return newTranslate
            })
          }}
          >
            <ChevronRight />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default CategoryPills;
