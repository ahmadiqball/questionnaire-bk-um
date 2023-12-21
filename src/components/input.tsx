import classNames from "classnames";
import { forwardRef, useState } from "react"

export const InputText = forwardRef<HTMLInputElement, any>(({label, placeholder, className, error, dirtyFields, ...props}, ref) => {
  return(
    <div className={classNames('relative',className)}>
      <label>{label}</label>
      <input
        ref={ref} 
        type={props.type || 'text'}
        className={`w-full outline-none border rounded-md pl-3 pr-6 py-1.5 placeholder:text-[#757575] placeholder:text-base 
        ${error ? 'border-red' : dirtyFields ? 'border-[#43936C]' : 'border-[#C2C2C2]'}`}
        placeholder={placeholder}
        {...props}
      />
      {dirtyFields && !error ? <img src="/assets/valid.svg" className="absolute right-2 bottom-2.5"/> : null}
      {error ? <img src="/assets/error.svg" className="absolute right-2 bottom-2.5"/> : null}
    </div>
  )
})

export const InputRadio = forwardRef<HTMLInputElement, any>(({options, label, className, error, ...props}, ref) => {
  const [value, setValue] = useState<string>('');

  return (
    <div className={className}>
      <p className="flex gap-2">
        {label}
        {error ? <img src="/assets/error.svg" className="mt-0.5"/> : null}
      </p>

      <div className="flex gap-2">
        {options.map((option: string) => (
          <label onClick={() => setValue(option)} className="flex gap-1 items-center cursor-pointer" key={option}>
            <input ref={ref} className="w-0 h-0 hidden" value={option} {...props} type="radio" />
            {value === option ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8.5" fill="#E0E0E0" stroke="#426FFF"/>
                <circle cx="9" cy="9" r="4.5" fill="#426FFF" stroke="#426FFF"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8.5" fill="#E0E0E0" stroke="#426FFF"/>
              </svg>
            )}
            <p>{option}</p>
          </label>
        ))}
      </div>
    </div>
  )
})

export const InputDropdown = forwardRef<HTMLInputElement, any>(({className, label, placeholder, error, ...props}, ref) => {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const options = ['X', 'XI', 'XII', 'Mahasiswa'];
  
  return(
    <label className={classNames('relative',className)} onClick={() => setOpen(!open)}>
      <p>{label}</p>
      <input disabled ref={ref} {...props} type='text' className="h-0 w-0 absolute" value={value}/>
      <div
        className={`w-full outline-none border cursor-pointer rounded-md pl-3 pr-6 py-1.5 text-base 
        ${error ? 'border-red' : value ? 'border-[#43936C]' : 'border-[#C2C2C2]'}
        ${value ? '' : 'text-[#757575]'}`}
      >
        {value || placeholder}
      </div>

      {open ? (
        <div className="absolute top-[58px] z-10 bg-white w-full rounded-b-md border border-[#E0E0E0] shadow-[0px_4px_8px_0px_rgba(0,0,0,.10)] py-1 divide-y divide-[#E0E0E0]">
          {options.map((item) => (
            <div key={item} className={`px-4 py-1.5 cursor-pointer ${item === value ? 'bg-[#EAF2FD]' : ''}`} onClick={() => setValue(item)}>{item}</div>
          ))}
        </div>
      ) : null}

      {value && !error ? <img src="/assets/valid.svg" className="absolute right-6 bottom-2.5"/> : null}
      {error ? <img src="/assets/error.svg" className="absolute right-6 bottom-2.5"/> : null}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={`absolute bottom-2.5 right-2 transition-all duration-200 ${open ? 'rotate-180' : ''}`}>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.23431 10.1656C4.54673 10.478 5.05327 10.478 5.36569 10.1656L8 7.53127L10.6343 10.1656C10.9467 10.478 11.4533 10.478 11.7657 10.1656C12.0781 9.85317 12.0781 9.34664 11.7657 9.03422L8.56569 5.83422C8.25327 5.5218 7.74673 5.5218 7.43431 5.83422L4.23431 9.03422C3.9219 9.34664 3.9219 9.85317 4.23431 10.1656Z" fill="#404040"/>
      </svg>
    </label>
  )
})
