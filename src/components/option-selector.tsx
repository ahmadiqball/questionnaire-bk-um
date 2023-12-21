import { optionList } from "../constants/options";

export function OptionSelector({active, setActive, id}: any) {
  return(
    <div className="grid grid-cols-2 sm:flex gap-10 lg:gap-20 mt-10 justify-center xl:justify-start z-10">
      {optionList.map((item) => (
        <div 
          key={item.label} 
          className="flex flex-col flex-1 items-center lg:max-w-[106px] text-center mx-auto sm:mx-0 cursor-pointer" 
          onClick={() => setActive(item.value, id)}
        >
            <img src={active === item.value ? item.imgSelect : item.img} alt={item.label} className="h-20 w-20 md:h-[100px] md:w-[100px]"/>
          <p className="mt-2 text-sm lg:text-base">{item.label}</p>
        </div>
      ))}
    </div>
  )
}