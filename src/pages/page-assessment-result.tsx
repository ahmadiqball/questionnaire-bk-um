import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"
import { useStore } from "../store";

const resultList = [
  'Cara individu menilai dirinya sendiri ke arah negatif',
  'Reaksi berlebihan akan suatu kondisi',
  'Pengelolaan emosi yang buruk akan suatu kejadian buruk',
  'Tekanan yang timbul dari lingkunggan sekitar'
]

export function PageAssessmentResult() {
  const navigate = useNavigate();
  const { storeAnswers } = useStore();
  const arrayAnswer = Object.values(storeAnswers)
  const total = arrayAnswer.reduce((res, cur) => res + (cur.value || 0), 0)
  
  const result = total <= 79 
  ? (<span className="text-red">kurang</span>)
  : total <= 119 
  ? (<span className="text-[#CD7B2E]">cukup</span>)
  : null;


  return(
    <main className="w-full min-h-screen bg-[url(/assets/background-white.svg)] bg-center bg-cover bg-no-repeat">
      <div className="w-full flex justify-between items-center bg-primary py-5 px-10 sm:px-20">
        <h1 className="text-white text-2xl sm:text-4xl font-bold">Hasil Asesmen</h1>
      </div>

      <div className="px-10 lg:px-[100px] py-14">
        <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl">Individu {result} memiliki kecenderungan terhadap :</h1>

        <div className="bg-white rounded-2xl p-4 mt-10 shadow-[0px_4px_8px_0px_rgba(0,0,0,.25)]"> 
          {resultList.map((item, index) => (
            <div className="flex gap-2 sm:gap-6 my-6 items-center" key={index}>
              <div className="text-white text-lg sm:text-[40px] font-bold bg-primary-light h-10 w-10 sm:h-20 sm:w-20 rounded-[50%] flex items-center justify-center ">{index+1}</div>
              <p className="text-[#0A0A0A] w-[calc(100%-40px)] sm:w-[calc(100%-104px)] text-base sm:text-2xl lg:text-4xl font-bold px-4 py-2 sm:py-5 bg-[#F6F5FD] border border-primary rounded-md shrink">{item}</p>
            </div>
          ))}
        </div>

        <Button className="mt-20 ml-auto" onClick={() => navigate('/')}>Kembali ke Home</Button>
      </div>
    </main>
  )
}