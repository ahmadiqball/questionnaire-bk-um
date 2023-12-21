import classNames from "classnames"

export function Button({children, light, warning, className, ...props}: any) {
  return(
    <button 
      className={classNames(className, 'sm:w-[238px] h-[52px] rounded-lg flex justify-center items-center border border-primary', {
      'bg-primary text-white': !light && !warning,
      'bg-white text-primary': light && !warning,
      'bg-red text-white': warning,
      'w-[238px]': !className.includes('w-')
      })}
      {...props}
    >
      {children}
    </button>
  )
}