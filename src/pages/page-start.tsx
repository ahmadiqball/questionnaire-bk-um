import { useRef, useState } from "react";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

export function PageStart() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const pinRef = useRef<HTMLInputElement>(null);

  const pinSubmitHanlder = () => {
    if (pinRef.current?.value !== import.meta.env.VITE_ADMIN_PIN) {
      setError(true);
      return;
    }
    sessionStorage.setItem('role', import.meta.env.VITE_ADMIN_ID)
    navigate('/counselor');
  }

  return(
    <main className="w-full min-h-screen bg-[url(/assets/background-blob.svg)] bg-center bg-cover bg-no-repeat">
     <div className="backdrop-blur-lg min-h-screen w-full bg-primary bg-opacity-30 py-10 flex justify-center items-center">
      <div className="border-2 border-primary rounded-lg bg-[#EAF2FD] backdrop-blur-[18px] px-10 w-[80%] lg:w-auto lg:px-[126px] py-[185px] shadow-[2px_4px_30px_0px_rgba(0,0,0,.15)]">
        <h1 className="text-black text-center text-4xl md:text-left md:text-[64px] font-bold">Masukkan PIN</h1>
        <input ref={pinRef} type="text" className="w-full lg:w-[754px] p-4 outline-none border-2 border-primary rounded-md my-10 text-center placeholder:text-[#757575] placeholder:text-2xl text-2xl font-bold" placeholder="Ex. 123456"/>
        <Button className="ml-auto w-full" onClick={pinSubmitHanlder}>Submit</Button>
      </div>
     </div>
      
      {error ? (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-[#0A0A0A] bg-opacity-80 flex justify-center items-center">
          <div className="bg-white rounded-md w-[85%] lg:w-[626px] overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <h4 className="text-[#0a0a0a] text-2xl sm:text-4xl font-bold flex items-center">
                <img src="/assets/warning.svg" className="h-7 sm:h-9 mt-1 mr-2 -ml-2"/>
                PIN Salah
              </h4>
              <p className="text-[#616161] text-lg sm:text-2xl mt-2 ml-7 sm:ml-9">
                PIN yang anda masukkan salah. Mohon isi kembali dan pastikan yang anda masukkan benar.
              </p>
            </div>
            <div className="flex justify-end bg-[#F5F5F5] py-3 px-6 gap-3">
              <Button
                className="w-full" 
                light 
                onClick={() => {
                  setError(false);
                  navigate('/');
                }}
              >
                Kembali ke Home
              </Button>
              <Button className="w-full"  onClick={() => setError(false)}>Masukkan PIN</Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}