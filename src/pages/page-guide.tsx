import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"
import { optionList } from "../constants/options";

export function PageGuide() {
  const navigate = useNavigate();

  return(
    <main className="w-full min-h-screen bg-[url(/assets/background-cloud.svg)] bg-center bg-cover bg-no-repeat">
      <div className="w-full flex justify-between items-center bg-primary py-5 px-10 sm:px-20">
        <h1 className="text-white text-2xl sm:text-4xl font-bold">Panduan Mengisi Form</h1>
      </div>

      <div className="min-h-[calc(100vh-80px)] px-10 sm:px-20 pb-20 backdrop-blur-[26px] bg-[#F6F5FDB2]">
        <h3 className="text-black text-2xl sm:text-4xl font-bold pt-10 text-center xl:text-left">Pilih berdasarkan kondisi Anda saat ini dengan panduan sebagai berikut</h3>

        <div className="grid grid-cols-2 sm:flex gap-10 lg:gap-20 mt-10 justify-center xl:justify-start">
          {optionList.map((item) => (
            <div key={item.label} className="flex flex-col max-w-[80px] items-center lg:max-w-[106px] text-center mx-auto sm:mx-0">
              <img src={item.img} alt={item.label} className="sm:h-16 sm:w-16 md:h-[100px] md:w-[100px]"/>
              <p className="mt-2 text-sm lg:text-base">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex gap-4 flex-col xl:flex-row">
          <div className="p-4 bg-primary-light rounded-lg text-center">
            <p className="text-xl sm:text-2xl">Berikut contoh tampilan form yang akan Anda isi.</p>

            <div className="bg-white px-4 sm:px-8 py-4 rounded-[4px] mt-[25px] flex flex-col items-center">
              <p className="font-bold text-2xl sm:text-3xl">Saya telah memahami panduan</p>
              <div className="grid grid-cols-2 sm:flex gap-5 mt-10">
                {optionList.map((item) => (
                  <div key={item.label} className="flex flex-col items-center max-w-[106px] text-center">
                    <img src={item.img} alt={item.label} className="h-16 w-16"/>
                    <p className="mt-2 text-sm">{item.label}</p>
                  </div>
                ))}
               </div>
            </div>
          </div>

          <div className="p-4 bg-primary-light rounded-lg text-center">
            <p className="text-xl sm:text-2xl">Berikut contoh tampilan form yang telah Anda isi.</p>

            <div className="bg-white  px-4 sm:px-8 py-4 rounded-[4px] mt-[25px] flex flex-col items-center">
              <p className="font-bold text-2xl sm:text-3xl">Saya telah memahami panduan</p>
              <div className="grid grid-cols-2 sm:flex gap-5 mt-10">
                {optionList.map((item) => (
                  <div key={item.label} className="flex flex-col items-center max-w-[106px] text-center relative z-10">
                    <img src={item.label !== 'Setuju' ? item.img : item.imgSelect} alt={item.label} className="h-16 w-16"/>
                    <p className="mt-2 text-sm">{item.label}</p>
                  </div>
                ))}
               </div>
            </div>
          </div>
        </div>

        <Button className="ml-auto mt-28" onClick={() => navigate('/assessment/start')}>Lanjut</Button>
      </div>
    </main>
  )
}